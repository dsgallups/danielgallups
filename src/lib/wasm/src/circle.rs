use web_sys::Element;

use crate::{document, html};

pub struct Circle {
    pub el: Element,
    pub velocity: (f64, f64),
    pub color: (f64, f64, f64),
    pub mass: f64,
    pub position: (f64, f64),
}

impl Circle {
    pub fn new() -> Self {
        let rand_color = (
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
        );

        let rand_position = (
            rand::random::<f64>() * html().client_width() as f64,
            rand::random::<f64>() * html().client_height() as f64,
        );

        let rand_mass = 1. + rand::random::<f64>() * 9.;

        let radius = rand_mass.sqrt();

        let document = document();
        let circle = document.create_element("div").unwrap();
        circle.set_class_name("circle");
        circle
            .set_attribute(
                "style",
                &format!(
                    "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                    rand_position.1 - 1.,
                    rand_position.0 - 1.,
                    rand_color.0,
                    rand_color.1,
                    rand_color.2,
                    radius * 2.,
                    radius * 2.,
                ),
            )
            .unwrap();
        Self {
            el: circle,
            velocity: (0., 0.),
            color: rand_color,
            mass: rand_mass,
            position: rand_position,
        }
    }

    pub fn reset(&mut self) {
        self.velocity = (0., 0.);
        self.position = (
            rand::random::<f64>() * html().client_width() as f64,
            rand::random::<f64>() * html().client_height() as f64,
        );
    }
    pub fn update_el(&mut self) {
        let radius = self.mass.sqrt();
        self.el
            .set_attribute(
                "style",
                &format!(
                    "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                    self.position.1 - 1.,
                    self.position.0 - 1.,
                    self.color.0,
                    self.color.1,
                    self.color.2,
                    radius * 2.,
                    radius * 2.,
                ),
            )
            .unwrap()
    }
}
