#![allow(dead_code)]
use graph::Vec2;
use physics::Point;
use settings::{Settings, CONFIGS};
use wasm_bindgen::prelude::*;
use web_sys::HtmlElement;
use world::World;
pub mod draw;
mod graph;
pub mod physics;
mod settings;
mod world;
use std::cell::RefCell;
use std::panic;
use std::rc::Rc;
use wasm_bindgen::JsCast;

const CFG: Settings = CONFIGS[0];

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

    let mut world = World::new(CFG);

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
        let window_size = *window_size.borrow();

        world.tick();
        world.draw();

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

/*
// Logging for collision groups
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
    } */

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
