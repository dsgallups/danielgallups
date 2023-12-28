use crate::{graph::Vec2, html, CFG};
pub mod matter;
pub use matter::*;
use std::fmt::Debug;
/// If an item doesnt have a velocity, then it can't be kinematic
/// as a logical consequence, you cannot apply a force to an item without velocity
pub trait Kinematics {
    fn velocity(&self) -> Vec2;
    fn set_velocity(&mut self, velocity: Vec2);
    fn apply_velocity(&mut self, velocity: Vec2) {
        self.set_velocity(self.velocity() + velocity);
    }

    fn force(&self) -> Vec2;
    fn set_force(&mut self, force: Vec2);

    fn apply_force(&mut self, force: Vec2) {
        self.set_force(self.force() + force);
    }
    fn reset_forces(&mut self) {
        self.set_force((0., 0.).into());
    }
}

/// all matter should have a position
pub trait Matter {
    fn mass(&self) -> f64;
    fn set_mass(&mut self, mass: f64);

    fn pos(&self) -> Vec2;
    fn set_pos(&mut self, pos: Vec2);
    fn apply_pos(&mut self, pos: Vec2) {
        self.set_pos(self.pos() + pos);
    }
    fn closest_point_on_edge(&self, other_point: Vec2) -> Vec2;

    fn shape(&self) -> Shape;
}

pub trait Dynamics: Matter + Kinematics {
    fn interact(&self, other: &dyn Dynamics) -> Interaction {
        if self.collision_occured(other) {
            return Interaction::Collision(Momentum {
                velocity: other.velocity(),
                mass: other.mass(),
            });
        }
        let force = self.force_due_to_gravity(other);
        Interaction::Force(force)
    }
    fn force_due_to_gravity(&self, other: &dyn Matter) -> Vec2 {
        let distance_from_com = self.pos() - other.pos();
        let force_magnitude = CFG.mass_grav.0 * other.mass() * self.mass()
            / distance_from_com.magnitude().powf(CFG.mass_grav.1);
        let normal = distance_from_com.normalize() * -1.;
        normal * force_magnitude
    }
    fn collision_occured(&self, other: &dyn Matter) -> bool;

    fn tick_forces(&mut self);

    fn reset(&mut self) {
        self.reset_forces();
        self.set_velocity((0., 0.).into());
        self.set_pos(
            (
                rand::random::<f64>() * html().client_width() as f64,
                rand::random::<f64>() * html().client_height() as f64,
            )
                .into(),
        );
    }
}

// Obviously shortcutting here, which is that
//if two objects have collided, they don't exert a force on each other.
pub enum Interaction {
    Force(Vec2),
    Collision(Momentum),
}

#[derive(Debug, Clone, Default)]
pub struct Momentum {
    pub velocity: Vec2,
    pub mass: f64,
}
