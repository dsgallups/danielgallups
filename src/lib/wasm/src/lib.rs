mod paint;
mod utils;
use wasm_bindgen::prelude::*;
use web_sys::Element;
use web_sys::HtmlElement;

use std::cell::RefCell;
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

    let mouse_pos = hook_mouse_pos()?;

    let window_size = hook_window_size()?;

    let f = Rc::new(RefCell::new(None));
    let g = f.clone();

    let target = document().get_element_by_id("pagetext").unwrap();
    let mut i = 0;
    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        /*if i > 300 {
            target.set_text_content(Some("All done!"));

            // Drop our handle to this closure so that it will get cleaned
            // up once we return.
            let _ = f.borrow_mut().take();
            return;
        }*/

        // Set the body's text content to how many times this
        // requestAnimationFrame callback has fired.
        i += 1;
        let text = format!("requestAnimationFrame has been called {} times.", i);
        target.set_text_content(Some(&text));
        target.set_attribute("top", &format!("{}px", i)).unwrap();

        //use rand crate to generate color
        let rand_color = (
            rand::random::<f64>() * 255.,
            rand::random::<f64>() * 255.,
            rand::random::<f64>() * 255.,
        );

        let rand_position = (
            rand::random::<f64>() * window_size.borrow().0,
            rand::random::<f64>() * window_size.borrow().1,
        );

        let _circle = spawn_circle(rand_position.0, rand_position.1, rand_color);

        // Schedule ourself for another requestAnimationFrame callback.
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
            log(&format!("mouse_pos: {:.2?}", mouse_pos.borrow()));
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
            log(&format!("window_size: {:.2?}", window_size.borrow()));
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

    let parent = document.get_element_by_id("background").unwrap();

    parent.append_child(&circle).unwrap();
    circle
}
