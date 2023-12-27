use crate::{
    graph::Vec2,
    physics::{Dynamics, Interaction, Kinematics, Matter, Momentum},
    CFG,
};
use std::fmt::Debug;

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
    fn mutate_velocity(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.velocity = f(self.velocity);
    }

    fn force(&self) -> Vec2 {
        self.force
    }
    fn mutate_force(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.force = f(self.force);
    }
}

impl Matter for Circle {
    fn mass(&self) -> f64 {
        self.mass
    }
    fn mutate_mass(&mut self, f: impl FnOnce(&mut f64)) {
        f(&mut self.mass);
    }

    fn pos(&self) -> &Vec2 {
        &self.position
    }
    fn mutate_pos(&mut self, f: impl FnOnce(&mut Vec2)) {
        f(&mut self.position);
    }
    fn closest_point_on_edge(&self, other_com: &Vec2) -> Vec2 {
        let center_of_mass_distance = self.position - *other_com;
        let normal = center_of_mass_distance.normalize() * -1.;
        *self.pos() + (normal * self.radius())
    }
}

impl Dynamics for Circle {
    fn apply_grav_force_for_mass(&self, other: &impl Matter) -> Interaction {
        let distance = self.pos() - other.pos();

        let normal = distance.normalize() * -1.;

        //for this one, distance is squared again
        let force = CFG.mouse_grav.0 * other.mass() * self.mass
            / distance.magnitude().powf(CFG.mouse_grav.1);
        let force = normal * force;

        //self.apply_force(force);
        Interaction {
            collision_occured: false,
            distance,
            force: Some(force),
            other_mass: None,
        }
    }

    fn apply_grav_force(&self, other: &(impl Dynamics + Debug)) -> Interaction {
        let distance_from_com = self.pos() - other.pos();
        let other_obj_closest_point = other.closest_point_on_edge(self.pos());
        let distance_from_other_obj_closest_point = other_obj_closest_point - self.position;

        if distance_from_other_obj_closest_point.magnitude() < self.radius() {
            /*log(&format!(
                "collision\nself.radius(): {:?}\ndistance_from_other_obj_closest_point: {:?}",
                self.radius(),
                distance_from_other_obj_closest_point
            ));*/
            Interaction {
                collision_occured: true,
                distance: distance_from_com,
                force: None,
                //velocity: Some(el_vel - self.velocity()),
                other_mass: Some(Momentum {
                    velocity: other.velocity(),
                    mass: other.mass(),
                }),
            }
        } else {
            let force_magnitude = CFG.mass_grav.0 * other.mass() * self.mass
                / distance_from_com.magnitude().powf(CFG.mass_grav.1);
            let normal = distance_from_com.normalize() * -1.;
            let force = normal * force_magnitude;
            //log(&format!("force_magnitude: {:?}", force_magnitude));
            //log(&format!("force: {:?}", force));

            Interaction {
                collision_occured: false,
                distance: distance_from_com,
                force: Some(force),
                other_mass: None,
            }
        }
        /*
        //let mut dist = self.position.distance_from(&other.pos());
        let distance = self.pos() - other.pos();
        if distance.magnitude() < (self.radius() + other.radius()) {
            Interaction {
                distance,
                force: None,
                //velocity: Some(el_vel - self.velocity()),
                other_mass: Some(Momentum {
                    velocity: other.velocity(),
                    mass: other.mass(),
                }),
            }
        } else {
            let force_magnitude = CFG.mass_grav.0 * other.mass() * self.mass
                / distance.magnitude().powf(CFG.mass_grav.1);
            let normal = distance.normalize() * -1.;
            let force = normal * force_magnitude;

            Interaction {
                distance,
                force: Some(force),
                other_mass: None,
            }
        }
        */
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
