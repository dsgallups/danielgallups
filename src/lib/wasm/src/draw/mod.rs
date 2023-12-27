use crate::{
    document,
    graph::Vec2,
    html,
    physics::{matter::Circle, Dynamics, Interaction, Kinematics, Matter, Shape},
};
use web_sys::Element;

pub struct DrawableElement {
    pub el: Element,
    pub color: (f64, f64, f64),
    pub matter: Box<dyn Dynamics>,
}

impl DrawableElement {
    pub fn new_circle(mass: f64, position: Vec2) -> Self {
        let rand_color = (
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
        );

        let matter: Circle = Circle::new(mass, position);

        let radius = matter.radius();

        let document = document();
        let circle = document.create_element("div").unwrap();
        circle.set_class_name("circle");
        circle
            .set_attribute(
                "style",
                &format!(
                    "top: {:.0}px; left: {:.0}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.0}px; height: {:.0}px;",
                    position.y,
                    position.x,
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
            color: rand_color,
            matter: Box::new(matter),
        }
    }
    pub fn new_rand_circle() -> Self {
        let rand_color = (
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
        );

        let rand_position = (
            rand::random::<f64>() * html().client_width() as f64,
            rand::random::<f64>() * html().client_height() as f64,
        );

        let rand_mass = 25. + rand::random::<f64>() * 50.;

        let matter: Circle = Circle::new(rand_mass, rand_position.into());

        let radius = matter.radius();

        let document = document();
        let circle = document.create_element("div").unwrap();
        circle.set_class_name("circle");
        circle
            .set_attribute(
                "style",
                &format!(
                    "top: {:.0}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                    rand_position.1 - radius,
                    rand_position.0 - radius,
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
            color: rand_color,
            matter: Box::new(matter),
        }
    }
    pub fn draw(&mut self) {
        let position = self.matter.pos();

        match self.shape() {
            Shape::Circle(radius) => {
                self.el
                    .set_attribute(
                        "style",
                        &format!(
                            "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                            position.y - radius,
                            position.x - radius,
                            self.color.0,
                            self.color.1,
                            self.color.2,
                            radius * 2.,
                            radius * 2.,
                        ),
                    )
                    .unwrap()
            }
            Shape::Point => {
                self.el
                    .set_attribute(
                        "style",
                        &format!(
                            "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                            position.y,
                            position.x,
                            self.color.0,
                            self.color.1,
                            self.color.2,
                            1.,
                            1.,
                        ),
                    )
                    .unwrap()
            }
            Shape::Square(width, height ) => {
                self.el
                    .set_attribute(
                        "style",
                        &format!(
                            "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                            position.y,
                            position.x,
                            self.color.0,
                            self.color.1,
                            self.color.2,
                            width,
                            height,
                        ),
                    )
                    .unwrap()
            }
        }
    }
}

impl Kinematics for DrawableElement {
    fn velocity(&self) -> Vec2 {
        self.matter.velocity()
    }

    fn set_velocity(&mut self, velocity: Vec2) {
        self.matter.set_velocity(velocity);
    }
    fn force(&self) -> Vec2 {
        self.matter.force()
    }
    fn set_force(&mut self, force: Vec2) {
        self.matter.set_force(force);
    }
}

impl Matter for DrawableElement {
    fn mass(&self) -> f64 {
        self.matter.mass()
    }
    fn set_mass(&mut self, mass: f64) {
        self.matter.set_mass(mass);
    }

    fn pos(&self) -> Vec2 {
        self.matter.pos()
    }

    fn closest_point_on_edge(&self, other_point: Vec2) -> Vec2 {
        self.matter.closest_point_on_edge(other_point)
    }
    fn set_pos(&mut self, pos: Vec2) {
        self.matter.set_pos(pos);
    }

    fn shape(&self) -> Shape {
        self.matter.shape()
    }
}

impl Dynamics for DrawableElement {
    fn apply_grav_force_for_mass(&self, other: &dyn Matter) -> Interaction {
        self.matter.apply_grav_force_for_mass(other)
    }

    fn apply_grav_force(&self, other: &dyn Dynamics) -> Interaction {
        self.matter.apply_grav_force(other)
    }

    fn tick_forces(&mut self) {
        self.matter.tick_forces();
    }
}
