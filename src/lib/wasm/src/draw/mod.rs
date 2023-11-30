use crate::{
    document,
    graph::Vec2,
    html,
    physics::{matter::Circle, Dynamics, Kinematics, Matter},
};
use std::fmt::Debug;
use web_sys::Element;
pub struct DynamicElement<T> {
    pub el: Element,
    pub color: (f64, f64, f64),
    pub matter: T,
}

impl Default for DynamicElement<Circle> {
    fn default() -> Self {
        Self::new_rand()
    }
}

impl DynamicElement<Circle> {
    pub fn new(radius: f64, position: Vec2) -> Self {
        let rand_color = (
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
        );

        let mass = radius * radius;
        let matter: Circle = Circle::new(mass, position.clone());

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
            matter,
        }
    }
    pub fn new_rand() -> Self {
        let rand_color = (
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
        );

        let rand_position = (
            rand::random::<f64>() * html().client_width() as f64,
            rand::random::<f64>() * html().client_height() as f64,
        );

        let rand_mass = 25. + rand::random::<f64>() * 100.;

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
            matter,
        }
    }

    pub fn draw(&mut self) {
        let position = self.matter.pos();
        let radius = self.matter.radius();

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
}

impl<T> Kinematics for DynamicElement<T>
where
    T: Kinematics,
{
    fn velocity(&self) -> Vec2 {
        self.matter.velocity()
    }
    fn mutate_velocity(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.matter.mutate_velocity(f);
    }

    fn force(&self) -> Vec2 {
        self.matter.force()
    }
    fn mutate_force(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.matter.mutate_force(f);
    }
}

impl<T> Matter for DynamicElement<T>
where
    T: Matter,
{
    fn mass(&self) -> f64 {
        self.matter.mass()
    }
    fn mutate_mass(&mut self, f: impl FnOnce(f64) -> f64) {
        self.matter.mutate_mass(f);
    }
    fn pos(&self) -> Vec2 {
        self.matter.pos()
    }
    fn mutate_pos(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.matter.mutate_pos(f);
    }
    fn radius(&self) -> f64 {
        self.matter.radius()
    }
}

impl<T> Dynamics for DynamicElement<T>
where
    T: Dynamics,
{
    fn apply_grav_force_for_mass(&mut self, other: &impl Matter) {
        self.matter.apply_grav_force_for_mass(other);
    }

    fn apply_grav_force(&mut self, other: &(impl Dynamics + Debug)) -> (f64, f64, bool) {
        self.matter.apply_grav_force(other)
    }

    fn tick_forces(&mut self) {
        self.matter.tick_forces();
    }
}
