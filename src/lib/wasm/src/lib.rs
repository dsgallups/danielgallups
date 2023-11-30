use draw::DynamicElement;
use graph::Vec2;
use physics::{Circle, Dynamics, Kinematics, Matter, Point};
use wasm_bindgen::prelude::*;

use web_sys::HtmlElement;

mod graph;
pub mod physics;

pub mod draw;

use std::cell::RefCell;
use std::panic;
use std::rc::Rc;
use wasm_bindgen::JsCast;

const LOG: bool = false;
const GRAV_CONST: f64 = 0.00005;
const NUM_CIRCLES: usize = 120;
const MOUSE_MASS: f64 = 4000.;
#[allow(dead_code)]
const ENERGY_CONSERVED_ON_COLLISION: f64 = 0.8;

#[wasm_bindgen]
extern "C" {

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

fn window() -> web_sys::Window {
    web_sys::window().expect("no global `window` exists")
}

fn html() -> HtmlElement {
    document()
        .document_element()
        .unwrap()
        .dyn_into::<HtmlElement>()
        .unwrap()
}

fn request_animation_frame(f: &Closure<dyn FnMut()>) {
    window()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("should register `requestAnimationFrame` OK");
}

fn document() -> web_sys::Document {
    window()
        .document()
        .expect("should have a document on window")
}

#[wasm_bindgen]
pub fn run() -> Result<(), JsValue> {
    panic::set_hook(Box::new(console_error_panic_hook::hook));

    let mouse_pos = hook_mouse_pos()?;

    let window_size = hook_window_size()?;

    let mut circles = spawn_circles();

    let f = Rc::new(RefCell::new(None));
    let g = f.clone();

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        let mouse_pos = mouse_pos.borrow();

        let (info, _collision_occured) =
            tick(&mut circles, mouse_pos.as_ref(), *window_size.borrow());

        if LOG {
            let energy = info.potential_energy + info.kinetic_energy;

            let mut msg = format!(
                "energy: {:.2}, potential: {:.2?}, kinetic: {:.2?}\n",
                energy, info.potential_energy, info.kinetic_energy
            );

            for (i, circle) in info.circles.into_iter().enumerate() {
                msg.push_str(&format!(
                        "circle[{}]:\npos: {:?}\nvel: {:?}\ndist from other: {:?}\nforce: {:?}\nkin: {:.?}\npot: {:?}\nmass: {:?}\n\n",
                        i, circle.position, circle.velocity, circle.dist_force_other, circle.force, circle.kin, circle.pot, circle.mass,
                    ));
            }
            msg.push('\n');
            log(&msg);
        }

        request_animation_frame(f.borrow().as_ref().unwrap());
    }) as Box<dyn FnMut()>));

    request_animation_frame(g.borrow().as_ref().unwrap());
    Ok(())
}

fn hook_mouse_pos() -> Result<Rc<RefCell<Option<Point>>>, JsValue> {
    let mouse_pos = Rc::new(RefCell::new(None));
    {
        let mouse_pos = mouse_pos.clone();
        let closure = Closure::wrap(Box::new(move |event: web_sys::MouseEvent| {
            let point = Point::new(
                MOUSE_MASS,
                (event.client_x() as f64, event.client_y() as f64).into(),
            );
            mouse_pos.replace(Some(point));
            //log(&format!("mouse_pos: {:.2?}", mouse_pos.borrow()));
        }) as Box<dyn FnMut(_)>);
        document()
            .document_element()
            .unwrap()
            .add_event_listener_with_callback("mousemove", closure.as_ref().unchecked_ref())?;
        closure.forget();
    }

    {
        let mouse_pos = mouse_pos.clone();
        let closure = Closure::wrap(Box::new(move |_: web_sys::MouseEvent| {
            mouse_pos.replace(None);
            log("mouse_pos: None");
        }) as Box<dyn FnMut(_)>);
        document()
            .document_element()
            .unwrap()
            .add_event_listener_with_callback("mouseleave", closure.as_ref().unchecked_ref())?;
        closure.forget();
    }

    Ok(mouse_pos)
}

fn hook_window_size() -> Result<Rc<RefCell<(f64, f64)>>, JsValue> {
    let window_size = Rc::new(RefCell::new((
        html().client_width() as f64,
        html().client_height() as f64,
    )));
    {
        let window_size = window_size.clone();
        let closure = Closure::wrap(Box::new(move |_: web_sys::Event| {
            window_size.replace((html().client_width() as f64, html().client_height() as f64));
            //log(&format!("window_size: {:.2?}", window_size.borrow()));
        }) as Box<dyn FnMut(_)>);
        window().add_event_listener_with_callback("resize", closure.as_ref().unchecked_ref())?;
        closure.forget();
    }

    Ok(window_size)
}

fn spawn_circles() -> Vec<DynamicElement<Circle>> {
    let bg_el = document().get_element_by_id("background").unwrap();

    (0..NUM_CIRCLES)
        .map(|_| {
            let circle = DynamicElement::default();
            bg_el.append_child(&circle.el).unwrap();
            circle
        })
        .collect::<Vec<_>>()
}

#[allow(dead_code)]
fn spawn_conjoined_circles() -> Vec<DynamicElement<Circle>> {
    let bg_el = document().get_element_by_id("background").unwrap();

    let circle_one = DynamicElement::new(5., (100., 100.).into());
    bg_el.append_child(&circle_one.el).unwrap();
    let circle_two = DynamicElement::new(3., (100., 108.).into());
    bg_el.append_child(&circle_two.el).unwrap();
    vec![circle_one, circle_two]
}

#[allow(dead_code)]
fn spawn_parallel_circles() -> Vec<DynamicElement<Circle>> {
    let bg_el = document().get_element_by_id("background").unwrap();

    let circle_one = DynamicElement::new(5., (200., 200.).into());
    bg_el.append_child(&circle_one.el).unwrap();
    let circle_two = DynamicElement::new(3., (800., 200.).into());
    bg_el.append_child(&circle_two.el).unwrap();
    let circle_three = DynamicElement::new(20., (1600., 200.).into());
    bg_el.append_child(&circle_three.el).unwrap();
    vec![circle_one, circle_two, circle_three]
}

#[allow(clippy::mem_replace_with_uninit)]
fn tick(
    circles: &mut [DynamicElement<Circle>],
    mouse_pos: Option<&Point>,
    window_size: (f64, f64),
) -> (Information, bool) {
    log(&format!("mouse_pos: {:?}", mouse_pos));
    let mut start_tick = false;

    let mut potential_energy = 0.;

    let mut kinetic_energy = 0.;

    let mut dists = Vec::new();

    for index in 0..circles.len() {
        let mut refframe_circle = unsafe {
            std::mem::replace(
                &mut circles[index],
                std::mem::MaybeUninit::zeroed().assume_init(),
            )
        };

        for (i, circle) in circles.iter().enumerate() {
            if i == index {
                continue;
            }
            let (dist, force, begin_tick) = refframe_circle.apply_grav_force(&circle.matter);
            dists.push((dist, force));
            if begin_tick {
                start_tick = true;
            }
        }

        if let Some(mouse_pos) = mouse_pos {
            refframe_circle.apply_grav_force_for_mass(mouse_pos);
        }

        //update_pos_given_mouse(&mut refframe_circle, mouse_pos, mouse_mass);
        //todo

        let _ = std::mem::replace(&mut circles[index], refframe_circle);
    }

    let mut circle_information: Vec<CircleInformation> = Vec::new();

    let mut forces = Vec::new();

    for circle in circles.iter_mut() {
        forces.push(circle.force());
        circle.tick_forces();
        circle.reset_forces();

        let position = circle.matter.pos();
        let radius = circle.matter.mass().sqrt();

        if position.x + (radius + radius) < 0.
            || position.x > window_size.0
            || position.y + (radius + radius) < 0.
            || position.y > window_size.1
        {
            circle.reset();
        }

        circle.draw();
    }

    for (i, refframe_circle) in circles.iter().enumerate() {
        let mut circle_potential_energy = 0.;
        let circle_kinetic_energy =
            0.5 * refframe_circle.mass() * refframe_circle.velocity().magnitude().powf(2.);

        for (j, circle) in circles.iter().enumerate() {
            if i == j {
                continue;
            }

            circle_potential_energy += -1.0 * refframe_circle.mass() * circle.mass() * GRAV_CONST
                / (refframe_circle.pos() - circle.pos()).magnitude();
        }

        //then calcualte the whole potential energy of the system
        for circle in circles.iter().skip(i + 1) {
            potential_energy += -1.0 * refframe_circle.mass() * circle.mass() * GRAV_CONST
                / (refframe_circle.pos() - circle.pos()).magnitude();
        }

        circle_information.push(CircleInformation {
            position: refframe_circle.matter.pos(),
            velocity: refframe_circle.matter.velocity(),
            force: forces[i].clone(),
            dist_force_other: dists[i],
            mass: refframe_circle.matter.mass(),
            pot: circle_potential_energy,
            kin: circle_kinetic_energy,
        });
        kinetic_energy += circle_kinetic_energy;
    }

    (
        Information {
            potential_energy,
            kinetic_energy,
            circles: circle_information,
        },
        start_tick,
    )
}

#[derive(Debug, Clone)]
pub struct Information {
    pub potential_energy: f64,
    pub kinetic_energy: f64,
    pub circles: Vec<CircleInformation>,
}

#[derive(Debug, Clone)]
pub struct CircleInformation {
    pub position: Vec2,
    pub velocity: Vec2,
    pub dist_force_other: (f64, f64),
    pub force: Vec2,
    pub mass: f64,
    pub pot: f64,
    pub kin: f64,
}
