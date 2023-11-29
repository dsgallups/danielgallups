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

const GRAV_CONST: f64 = 1.;
const NUM_CIRCLES: usize = 100;

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
    //current mouse position
    panic::set_hook(Box::new(console_error_panic_hook::hook));

    let mouse_pos = hook_mouse_pos()?;

    let window_size = hook_window_size()?;

    let mut circles = spawn_circles();

    let f = Rc::new(RefCell::new(None));
    let g = f.clone();

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        tick(&mut circles, *mouse_pos.borrow(), *window_size.borrow());
        request_animation_frame(f.borrow().as_ref().unwrap());
    }) as Box<dyn FnMut()>));

    request_animation_frame(g.borrow().as_ref().unwrap());
    Ok(())
}

fn hook_mouse_pos() -> Result<Rc<RefCell<(f64, f64)>>, JsValue> {
    let mouse_pos = Rc::new(RefCell::new((0.0, 0.0)));
    {
        let mouse_pos = mouse_pos.clone();
        let closure = Closure::wrap(Box::new(move |event: web_sys::MouseEvent| {
            mouse_pos.replace((event.offset_x() as f64, event.offset_y() as f64));
            //log(&format!("mouse_pos: {:.2?}", mouse_pos.borrow()));
        }) as Box<dyn FnMut(_)>);
        document()
            .add_event_listener_with_callback("mousemove", closure.as_ref().unchecked_ref())?;
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

#[allow(clippy::mem_replace_with_uninit)]
fn tick(circles: &mut [DynamicElement<Circle>], mouse_pos: (f64, f64), window_size: (f64, f64)) {
    let mouse_mass = -40000.;

    let _mouse_matter = Point::new(mouse_mass, mouse_pos.into());

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

            refframe_circle.apply_grav_force(&circle.matter);
        }

        //update_pos_given_mouse(&mut refframe_circle, mouse_pos, mouse_mass);
        //todo

        let _ = std::mem::replace(&mut circles[index], refframe_circle);
    }

    for circle in circles.iter_mut() {
        circle.tick_forces();

        let position = circle.matter.pos();

        if position.x < 0.
            || position.x > window_size.0
            || position.y < 0.
            || position.y > window_size.1
        {
            let mut new_velocity = circle.matter.velocity();

            if position.x < 0. || position.x > window_size.0 {
                new_velocity.x = -new_velocity.x;
            }

            if position.y < 0. || position.y > window_size.1 {
                new_velocity.y = -new_velocity.y;
            }

            circle.mutate_velocity(|_| new_velocity);
        }

        circle.draw();
        circle.reset_forces();
    }
}
