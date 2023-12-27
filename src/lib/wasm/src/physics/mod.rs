use crate::{graph::Vec2, html};
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
    fn apply_grav_force_for_mass(&self, other: &dyn Matter) -> Interaction;

    fn apply_grav_force(&self, other: &dyn Dynamics) -> Interaction;

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

#[derive(Debug, Clone)]
pub struct Interaction {
    pub collision_occured: bool,
    pub distance: Vec2,
    pub force: Option<Vec2>,
    pub other_mass: Option<Momentum>,
}

#[derive(Debug, Clone, Default)]
pub struct Momentum {
    pub velocity: Vec2,
    pub mass: f64,
}
