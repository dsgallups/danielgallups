use crate::{graph::Vec2, html};
pub mod matter;
pub use matter::*;
/// If an item doesnt have a velocity, then it can't be kinematic
/// as a logical consequence, you cannot apply a force to an item without velocity
pub trait Kinematics {
    fn velocity(&self) -> Vec2;
    fn mutate_velocity(&mut self, f: impl FnOnce(Vec2) -> Vec2);
    fn set_velocity(&mut self, velocity: Vec2) {
        self.mutate_velocity(|_| velocity);
    }
    fn apply_velocity(&mut self, velocity: Vec2) {
        self.mutate_velocity(|v| v + velocity);
    }

    fn force(&self) -> Vec2;
    fn mutate_force(&mut self, f: impl FnOnce(Vec2) -> Vec2);
    fn set_force(&mut self, force: Vec2) {
        self.mutate_force(|_| force);
    }
    fn apply_force(&mut self, force: Vec2) {
        self.mutate_force(|f| f + force);
    }
    fn reset_forces(&mut self) {
        self.set_force((0., 0.).into());
    }
}

/// all matter should have a position
pub trait Matter {
    fn mass(&self) -> f64;
    fn mutate_mass(&mut self, f: impl FnOnce(f64) -> f64);
    fn set_mass(&mut self, mass: f64) {
        self.mutate_mass(|_| mass);
    }

    fn pos(&self) -> Vec2;
    fn mutate_pos(&mut self, f: impl FnOnce(Vec2) -> Vec2);
    fn set_pos(&mut self, pos: Vec2) {
        self.mutate_pos(|_| pos);
    }
    fn apply_pos(&mut self, pos: Vec2) {
        self.mutate_pos(|p| p + pos);
    }
}

pub trait Dynamics: Matter + Kinematics {
    fn apply_grav_force(&mut self, other: &impl Dynamics) -> (f64, f64, bool);

    fn tick_forces(&mut self);

    fn reset(&mut self) {
        self.reset_forces();
        self.set_velocity((0., 0.).into());
        self.set_pos(
            (
                rand::random::<f64>() * html().client_height() as f64,
                rand::random::<f64>() * html().client_height() as f64,
            )
                .into(),
        );
    }
}
