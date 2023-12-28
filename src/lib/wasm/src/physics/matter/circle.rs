use crate::{
    graph::Vec2,
    physics::{Dynamics, Kinematics, Matter},
};
use std::fmt::Debug;

use super::Shape;

#[derive(Debug, Clone)]
pub struct Circle {
    mass: f64,
    radius: f64,
    force: Vec2,
    velocity: Vec2,
    position: Vec2,
}

impl Circle {
    pub fn new(mass: f64, position: Vec2) -> Self {
        let radius = mass.sqrt() * 1.;

        Self {
            mass,
            radius,
            force: (0., 0.).into(),
            velocity: (0., 0.).into(),
            position,
        }
    }

    pub fn reset_forces(&mut self) {
        self.force = (0., 0.).into();
    }

    pub fn radius(&self) -> f64 {
        self.radius
    }
}

impl Kinematics for Circle {
    fn velocity(&self) -> Vec2 {
        self.velocity
    }
    fn set_velocity(&mut self, velocity: Vec2) {
        self.velocity = velocity;
    }

    fn force(&self) -> Vec2 {
        self.force
    }
    fn set_force(&mut self, force: Vec2) {
        self.force = force;
    }
}

impl Matter for Circle {
    fn mass(&self) -> f64 {
        self.mass
    }
    fn set_mass(&mut self, mass: f64) {
        self.mass = mass;
    }

    fn pos(&self) -> Vec2 {
        self.position
    }
    fn set_pos(&mut self, pos: Vec2) {
        self.position = pos;
    }
    fn closest_point_on_edge(&self, other_com: Vec2) -> Vec2 {
        let center_of_mass_distance = self.position - other_com;
        let normal = center_of_mass_distance.normalize() * -1.;
        self.pos() + (normal * self.radius())
    }

    fn shape(&self) -> Shape {
        Shape::Circle(self.radius)
    }
}

impl Dynamics for Circle {
    fn collision_occured(&self, other: &dyn Matter) -> bool {
        let other_obj_closest_point = other.closest_point_on_edge(self.pos());
        let distance_from_other_obj_closest_point = other_obj_closest_point - self.position;
        distance_from_other_obj_closest_point.magnitude() < self.radius()
    }

    fn tick_forces(&mut self) {
        //calculate the acceleration vector
        let force = self.force();
        let mass = self.mass();

        let acceleration: Vec2 = (force.x / mass, force.y / mass).into();

        self.apply_velocity(acceleration);
        let velocity = self.velocity();
        self.apply_pos(velocity);
    }
}
