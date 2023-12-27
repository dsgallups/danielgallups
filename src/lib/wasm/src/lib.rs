#![allow(dead_code)]
use draw::DrawableElement;
use graph::Vec2;
use physics::{Dynamics, Interaction, Kinematics, Matter, Point};
use settings::{Settings, CONFIGS};
use wasm_bindgen::prelude::*;
use web_sys::HtmlElement;
pub mod draw;
mod graph;
pub mod physics;
mod settings;
use std::cell::RefCell;
use std::panic;
use std::rc::Rc;
use wasm_bindgen::JsCast;

const CFG: Settings = CONFIGS[2];

static mut TICK_COUNT: Option<i32> = None;
static mut STOP_TICKING: bool = false;

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
    //let mut begin_ticking = false;
    //let tick_after = 10;
    //let mut tick_count = 0;

    panic::set_hook(Box::new(console_error_panic_hook::hook));

    let mouse_pos = hook_mouse_pos()?;

    let window_size = hook_window_size()?;

    //let mut elements = spawn_elements();

    let mut elements = (CFG.spawning_fn)(spawn_elements_with_props);

    //let another = (CURRENT_CONFIG.spawning_fn)(spawn_elements_with_props);

    /*let mut elements = spawn_elements_with_props(vec![
        (3000., (700., 600.)),
        (3000., (600., 900.)),
        (3000., (900., 820.)),
    ]);*/

    let f = Rc::new(RefCell::new(None));
    let g = f.clone();

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        unsafe {
            if STOP_TICKING {
                f.borrow_mut().take();
                return;
            }
        }

        let mouse_pos = mouse_pos.borrow();

        tick(&mut elements, mouse_pos.as_ref(), *window_size.borrow());

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
                CFG.mouse_mass,
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
            //log("mouse_pos: None");
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

fn spawn_elements_with_props(circle_vals: Vec<(f64, (f64, f64))>) -> Vec<DrawableElement> {
    let bg_el = document().get_element_by_id("background").unwrap();

    circle_vals
        .into_iter()
        .enumerate()
        .map(|(i, val)| {
            let circle = DrawableElement::new_circle(val.0, val.1.into(), i.to_string());
            bg_el.append_child(&circle.el).unwrap();
            circle
        })
        .collect::<Vec<_>>()
}

#[allow(clippy::mem_replace_with_uninit)]
fn tick(elements: &mut [DrawableElement], mouse_pos: Option<&Point>, window_size: (f64, f64)) {
    let mut all_interactions = Vec::new();

    //contains groups of indices in elements in which collisions have occured.
    let mut collision_groups: Vec<Vec<usize>> = Vec::new();

    for (i, refframe_element) in elements.iter().enumerate() {
        let mut interactions = Vec::new();
        for (j, circle) in elements.iter().enumerate() {
            if i == j {
                continue;
            }
            let interaction = refframe_element.apply_grav_force(circle.matter.as_ref());

            if interaction.collision_occured {
                if collision_groups.is_empty() {
                    collision_groups.push(vec![i, j]);
                }
                for i in 0..collision_groups.len() {
                    let collision_group = &mut collision_groups[i];

                    match (collision_group.contains(&i), collision_group.contains(&j)) {
                        (true, true) => {
                            break;
                        }
                        (true, false) => {
                            collision_group.push(j);
                            break;
                        }
                        (false, true) => {
                            collision_group.push(i);
                            break;
                        }
                        (false, false) => collision_groups.push(vec![i, j]),
                    }
                }
            }

            interactions.push(interaction);
        }
        if let Some(mouse_pos) = mouse_pos {
            let interaction = refframe_element.apply_grav_force_for_mass(mouse_pos);
            interactions.push(interaction);
        }

        all_interactions.push(interactions);
    }
    if let Some(log_opts) = CFG.log {
        if !collision_groups.is_empty() {
            log(&format!("collisions: \n{:#?}", collision_groups));

            unsafe {
                if TICK_COUNT.is_none() {
                    TICK_COUNT = Some(0);
                }
            }
        }

        unsafe {
            if let (Some(tick_count), Some(stop_tick_after)) =
                (TICK_COUNT.as_mut(), log_opts.stop_tick_after)
            {
                *tick_count += 1;
                if *tick_count >= stop_tick_after {
                    TICK_COUNT = None;
                    STOP_TICKING = true;
                }
            }
        }
    }

    /*for (i, circle) in elements.iter_mut().enumerate() {
        if let Some(collisions) = collisions.get(&i) {
            let mut position_adj = Vec2::default();
            for collision in collisions.iter() {
                position_adj += *collision;
            }
            circle.apply_pos(position_adj);
        }
    }*/

    //now apply the interactions to every cirlce
    for ((_i, circle), interactions) in elements.iter_mut().enumerate().zip(all_interactions) {
        let mut fake_object_momentum = Vec2::default();
        let mut fake_object_mass = 0.;
        let mut net_force = Vec2::default();
        for Interaction {
            collision_occured: _,
            distance: _,
            force,
            other_mass,
        } in interactions
        {
            if let Some(force) = force {
                net_force += force;
            }
            if let Some(momentum) = other_mass {
                fake_object_mass += momentum.mass;
                fake_object_momentum += momentum.mass * momentum.velocity;
            }
        }

        circle.set_force(net_force);

        if fake_object_mass != 0. {
            let fake_object_velocity = fake_object_momentum / fake_object_mass;
            let el_vel = (circle.velocity() * (circle.mass() - fake_object_mass)
                + (2. * fake_object_mass * fake_object_velocity))
                / (circle.mass() + fake_object_mass);

            circle.apply_velocity((el_vel - circle.velocity()) * CFG.energy_conservation);
            //circle.set_velocity(el_vel * ENERGY_CONSERVED_ON_COLLISION);
        }

        /*if net_velocity != Vec2::default() {
            let normal = net_velocity.normalize();
            let cur_v_mag = circle.velocity().magnitude();
            circle.set_velocity(normal * cur_v_mag * ENERGY_CONSERVED_ON_COLLISION);
        }*/

        circle.tick_forces();
        circle.reset_forces();

        let position = circle.matter.pos();
        let radius = circle.matter.mass().sqrt();

        if position.x + (radius + radius) < 0.
            || position.x > window_size.0
            || position.y + (radius + radius) < 0.
            || position.y > window_size.1
        {
            //circle.reset();
        }

        circle.draw();
    }

    /*if CFG.log.is_some() {
        let mut potential_energy = 0.;
        let mut kinetic_energy = 0.;
        for (i, refframe_element) in elements.iter().enumerate() {
            let mut circle_potential_energy = 0.;

            for (j, circle) in elements.iter().enumerate() {
                if i >= j {
                    continue;
                }

                circle_potential_energy += refframe_element.mass() * circle.mass() * CFG.mass_grav.0
                    / (refframe_element.pos() - circle.pos()).magnitude();
            }
            let circle_kinetic_energy =
                0.5 * refframe_element.mass() * refframe_element.velocity().magnitude().powi(2);

            potential_energy -= circle_potential_energy;
            kinetic_energy += circle_kinetic_energy;
        }

        log(&format!(
            "energy: {}\n, pot: {}\n, kin: {}",
            kinetic_energy + potential_energy,
            potential_energy,
            kinetic_energy
        ));
    }*/
}

#[derive(Debug, Clone)]
pub struct Information {
    pub potential_energy: f64,
    pub kinetic_energy: f64,
    pub elements: Vec<CircleInformation>,
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
