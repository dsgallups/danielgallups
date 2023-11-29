use web_sys::Element;

use crate::{document, graph::Vec2, html, GRAV_CONST};

pub struct Circle {
    pub el: Element,
    pub velocity: Vec2,
    color: (f64, f64, f64),
    pub mass: f64,
    radius: f64,
    pub position: Vec2,
    pub acceleration: Vec2,
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
            velocity: (0., 0.).into(),
            color: rand_color,
            mass: rand_mass,
            position: rand_position.into(),
            radius,
            acceleration: (0., 0.).into(),
        }
    }

    pub fn force(&self, other: &Vec2, mass: f64) -> Vec2 {
        let distance = &self.position - other;
        let dist = self.position.distance_from(other);
        let normal = self.position.normal(other);
        let force = GRAV_CONST * mass * self.mass / dist.powf(2.);
        Vec2 {
            x: normal.x * force,
            y: normal.y * force,
        }
    }

    pub fn acceleration(&self, other: &Vec2, mass: f64) -> Vec2 {
        let force = self.force(other, mass);
        Vec2 {
            x: force.x / self.mass,
            y: force.y / self.mass,
        }
    }

    pub fn reset(&mut self) {
        self.velocity = (0., 0.).into();
        self.position = (
            rand::random::<f64>() * html().client_width() as f64,
            rand::random::<f64>() * html().client_height() as f64,
        )
            .into();
    }
    pub fn update_el(&mut self) {
        self.el
            .set_attribute(
                "style",
                &format!(
                    "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                    self.position.y - 1.,
                    self.position.x - 1.,
                    self.color.0,
                    self.color.1,
                    self.color.2,
                    self.radius * 2.,
                    self.radius * 2.,
                ),
            )
            .unwrap()
    }
}
