use crate::{
    graph::Vec2,
    physics::{Dynamics, Kinematics, Matter},
    ENERGY_CONSERVED_ON_COLLISION, GRAV_CONST,
};

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
}

impl Dynamics for Circle {
    fn apply_grav_force(&mut self, other: &impl Matter) -> (f64, f64, bool) {
        //let mut dist = self.position.distance_from(&other.pos());

        /*if dist < (self.radius + other.mass().sqrt()) {
            let radius = self.radius;

            self.mutate_velocity(|mut v| {
                v.x *= -ENERGY_CONSERVED_ON_COLLISION;
                v.y *= -ENERGY_CONSERVED_ON_COLLISION;
                v
            });

            //set the position to be the edge of the other circle
            self.mutate_pos(|p| {
                let normal = p.normal(&other.pos());
                other.pos() + (normal * (radius + other.mass().sqrt()))
            });

            dist = self.position.distance_from(&other.pos());
        }*/

        let distance = self.pos() - other.pos();

        //for this one, distance is squared again
        let force_magnitude = GRAV_CONST * other.mass() * self.mass / distance.magnitude().sqrt();

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
