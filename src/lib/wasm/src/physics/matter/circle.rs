use crate::{
    graph::Vec2,
    physics::{Dynamics, Kinematics, Matter},
    GRAV_CONST,
};
use std::fmt::Debug;

#[derive(Debug)]
pub struct Circle {
    pub mass: f64,
    radius: f64,
    pub force: Vec2,
    pub velocity: Vec2,
    pub position: Vec2,
}

impl Circle {
    pub fn new(mass: f64, position: Vec2) -> Self {
        let radius = mass.sqrt();

        Self {
            mass,
            radius,
            force: (0., 0.).into(),
            velocity: (0., 0.).into(),
            position,
        }
    }

    pub fn radius(&self) -> f64 {
        self.radius
    }

    pub fn reset_forces(&mut self) {
        self.force = (0., 0.).into();
    }
}

impl Kinematics for Circle {
    fn velocity(&self) -> Vec2 {
        self.velocity.clone()
    }
    fn mutate_velocity(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.velocity = f(self.velocity.clone());
    }

    fn force(&self) -> Vec2 {
        self.force.clone()
    }
    fn mutate_force(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.force = f(self.force.clone());
    }
}

impl Matter for Circle {
    fn mass(&self) -> f64 {
        self.mass
    }
    fn mutate_mass(&mut self, f: impl FnOnce(f64) -> f64) {
        self.mass = f(self.mass);
    }
    fn pos(&self) -> Vec2 {
        self.position.clone()
    }
    fn mutate_pos(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.position = f(self.position.clone());
    }
    fn radius(&self) -> f64 {
        self.radius
    }
}

impl Dynamics for Circle {
    fn apply_grav_force_for_mass(&mut self, other: &impl Matter) {
        let distance = self.pos() - other.pos();

        let normal = distance.normalize() * -1.;

        let mut distance_magnitude = distance.magnitude().powi(2);
        if distance_magnitude < other.radius() + 4.0 {
            distance_magnitude = other.radius() + 4.0;
        }

        let force = GRAV_CONST * other.mass() * self.mass / distance_magnitude;
        let force = normal * force;

        self.apply_force(force);
    }

    fn apply_grav_force(&mut self, other: &(impl Dynamics + Debug)) -> (f64, f64, bool) {
        //let mut dist = self.position.distance_from(&other.pos());
        let mut distance = self.pos() - other.pos();

        if distance.magnitude() < (self.radius() + other.radius()) {
            //pretend like they're touching
            distance = distance.normalize() * (self.radius() + other.radius());

            let self_radius: f64 = self.radius();
            let self_velocity: Vec2 = self.velocity();
            let self_mass: f64 = self.mass();

            let other_radius: f64 = other.radius();
            let other_velocity: Vec2 = other.velocity();
            let other_mass: f64 = other.mass();
            //determine the new velocity. Note that the other collider is a circle, so we can calculate the point of intersection
            //and use that to determine the normal
            let collision_distance = distance.magnitude();
            let collision_normal = distance.normalize();

            let relative_velocity = self_velocity.clone() - other_velocity;
            let velocity_normal = relative_velocity.dot(collision_normal.clone());

            let impulse = 2.0 * velocity_normal / (self_mass + other_mass);
            let self_impulse = impulse * other_mass;

            let self_new_velocity = self_velocity - collision_normal.clone() * self_impulse;

            // Update velocities
            self.set_velocity(self_new_velocity);

            // correct the position to be just inside the outer circle for this logic to run again
            let correction =
                collision_normal * (self_radius + other_radius - collision_distance) / 2.;

            self.apply_pos(correction);
        }
        let force_magnitude = GRAV_CONST * other.mass() * self.mass / distance.magnitude().powi(2);

        let normal = distance.normalize() * -1.;
        let force = normal * force_magnitude;

        self.apply_force(force);
        (
            distance.magnitude(),
            force_magnitude,
            distance.magnitude() < (self.radius + other.mass().sqrt()),
        )
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
