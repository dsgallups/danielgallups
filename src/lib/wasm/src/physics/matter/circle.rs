use crate::{
    graph::Vec2,
    log,
    physics::{Dynamics, Interaction, Kinematics, Matter, Momentum},
    GRAV_CONST, LOG,
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
        let radius = mass.sqrt() * 1.;

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
    fn apply_grav_force_for_mass(&self, other: &impl Matter) -> Interaction {
        let distance = self.pos() - other.pos();

        let normal = distance.normalize() * -1.;

        //for this one, distance is squared again
        let force = GRAV_CONST * other.mass() * self.mass / distance.magnitude().sqrt();
        let force = normal * force;

        //self.apply_force(force);
        Interaction {
            distance,
            force: Some(force),
            other_mass: None,
        }
    }

    fn apply_grav_force(&self, other: &(impl Dynamics + Debug)) -> Interaction {
        //let mut dist = self.position.distance_from(&other.pos());
        let distance = self.pos() - other.pos();

        if distance.magnitude() < (self.radius() + other.radius()) {
            let self_velocity: Vec2 = self.velocity();
            let self_mass: f64 = self.mass();

            let other_velocity: Vec2 = other.velocity();
            let other_mass: f64 = other.mass();
            //determine the new velocity. Note that the other collider is a circle, so we can calculate the point of intersection
            //and use that to determine the normal

            /*let el_vel = (self_velocity * (self_mass - other_mass)
            + (2. * other_mass * other_velocity))
            / (self_mass + other_mass);*/

            //since they've collided, the force magnitude for these two masses are zero, and no force should be applied.
            if LOG {
                log("Collision has occured! Calculated values from collision:");
                log(&format!(
                    "\n\nself: {:?}\nother: {:?}\n\ncur v: {:?}\nela v: \n",
                    self,
                    other,
                    self.velocity(),
                    //el_vel
                ));
            }

            Interaction {
                distance,
                force: None,
                //velocity: Some(el_vel - self.velocity()),
                other_mass: Some(Momentum {
                    velocity: other_velocity,
                    mass: other_mass,
                }),
            }
        } else {
            let force_magnitude =
                GRAV_CONST * other.mass() * self.mass / distance.magnitude().powi(2);
            let normal = distance.normalize() * -1.;
            let force = normal * force_magnitude;

            Interaction {
                distance,
                force: Some(force),
                other_mass: None,
            }
        }
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

/*
impl Matter for Circle {
    fn reset_forces(&mut self) {
        self.force = (0., 0.).into();
    }

    fn pos(&self) -> Vec2 {
        self.position
    }

    fn force(&self) -> Vec2 {
        self.force
    }

    fn apply_force(&mut self, force: Vec2) {
        self.force += force;
    }

    fn apply_grav_force(&mut self, other: impl Matter) {
        let distance = self.pos() - other.pos();
        let dist = self.position.distance_from(other.pos());

        let normal = (distance.0 / dist, distance.1 / dist);

        //for this one, distance is squared again
        let force = GRAV_CONST * other.mass() * self.mass / dist.powf(2.);
        let force = (normal.0 * force, normal.1 * force);
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
*/
