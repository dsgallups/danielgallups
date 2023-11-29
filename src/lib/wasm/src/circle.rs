use web_sys::Element;

use crate::{document, graph::Vec2, html};

#[derive(Clone, Debug, Default)]
pub struct Kinematics {
    pub position: Vec2,
    pub velocity: Vec2,
}

impl Kinematics {
    pub fn new(position: Vec2) -> Self {
        Self {
            position,
            velocity: Vec2::default(),
        }
    }

    pub fn pos(&self) -> Vec2 {
        self.position.clone()
    }
}

pub struct Circle {
    pub el: Element,
    pub cur_kinematics: Kinematics,
    pub buf_kinematics: Option<Kinematics>,
    color: (f64, f64, f64),
    pub mass: f64,
    radius: f64,
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

        let kinematics = Kinematics::new(rand_position.into());

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
            cur_kinematics: kinematics,
            buf_kinematics: None,
            color: rand_color,
            mass: rand_mass,
            radius,
        }
    }

    pub fn reset(&mut self) {
        let position = (
            rand::random::<f64>() * html().client_width() as f64,
            rand::random::<f64>() * html().client_height() as f64,
        );

        self.buf_kinematics = None;
        self.cur_kinematics = Kinematics::new(position.into());
    }
    pub fn update_el(&mut self) {
        let position = self.cur_kinematics.pos();
        self.el
            .set_attribute(
                "style",
                &format!(
                    "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                    position.y - 1.,
                    position.x - 1.,
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
