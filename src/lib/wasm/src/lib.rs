mod paint;
mod utils;
use wasm_bindgen::prelude::*;
use web_sys::Element;
use web_sys::HtmlElement;

use console_error_panic_hook;
use std::cell::RefCell;
use std::panic;
use std::rc::Rc;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

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

    let target = document().get_element_by_id("pagetext").unwrap();

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

fn spawn_circle(left: f64, top: f64, color: (f64, f64, f64)) -> Element {
    log("called");
    let document = document();
    let circle = document.create_element("div").unwrap();
    circle.set_class_name("circle");
    circle
        .set_attribute(
            "style",
            &format!(
                "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0});",
                top - 1.,
                left - 1.,
                color.0,
                color.1,
                color.2
            ),
        )
        .unwrap();

    circle
}

fn spawn_circles() -> Vec<Circle> {
    //init background element
    let bg_el = document().get_element_by_id("background").unwrap();

    //let background = document.create_element("div").unwrap();

    let mut circles = Vec::new();
    for _ in 0..20 {
        let rand_color = (
            rand::random::<f64>() * 255.,
            rand::random::<f64>() * 255.,
            rand::random::<f64>() * 255.,
        );

        let rand_position = (
            rand::random::<f64>() * html().client_width() as f64,
            rand::random::<f64>() * html().client_height() as f64,
        );

        let circle = spawn_circle(rand_position.0, rand_position.1, rand_color);
        bg_el.append_child(&circle).unwrap();
        circles.push(Circle {
            el: circle,
            velocity: (0., 0.),
            mass: 1.,
            position: rand_position,
        });
    }
    circles
}

struct Circle {
    pub el: Element,
    pub velocity: (f64, f64),
    pub mass: f64,
    pub position: (f64, f64),
}

impl Circle {
    pub fn reset(&mut self) {
        self.velocity = (0., 0.);
        self.position = (
            rand::random::<f64>() * html().client_width() as f64,
            rand::random::<f64>() * html().client_height() as f64,
        );
    }
    pub fn update_el(&mut self) {
        self.el
            .set_attribute(
                "style",
                &format!(
                    "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0});",
                    self.position.1 - 1.,
                    self.position.0 - 1.,
                    255.,
                    255.,
                    255.
                ),
            )
            .unwrap()
    }
}

fn tick(circles: &mut [Circle], mouse_pos: (f64, f64), window_size: (f64, f64)) {
    let mouse_mass = 10.;

    for circle in circles.iter_mut() {
        if circle.position.0 < 0.
            || circle.position.1 < 0.
            || circle.position.0 > window_size.0
            || circle.position.1 > window_size.1
        {
            circle.reset();
        }
        //note that the y axis is inverted
        update_pos(circle, mouse_pos, mouse_mass);

        //update the element
        circle.update_el();
    }
}

fn update_pos(circle: &mut Circle, point: (f64, f64), point_mass: f64) {
    let distance = (point.0 - circle.position.0, point.1 - circle.position.1);

    let dist = (distance.0.powi(2) + distance.1.powi(2)).sqrt();

    let normal = (distance.0 / dist, distance.1 / dist);

    //calculate the force vector
    let force = (
        normal.0 * point_mass * circle.mass / dist,
        normal.1 * point_mass * circle.mass / dist,
    );

    //calculate the acceleration vector

    let acceleration = (force.0 / circle.mass, force.1 / circle.mass);

    //calculate the velocity vector
    circle.velocity.0 += acceleration.0;
    circle.velocity.1 += acceleration.1;

    //calculate the new position
    circle.position.0 += circle.velocity.0;
    circle.position.1 += circle.velocity.1;
}
