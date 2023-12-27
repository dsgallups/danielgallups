use crate::{graph::Vec2, html};
pub mod matter;
pub use matter::*;
use std::fmt::Debug;
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
    fn mutate_mass(&mut self, f: impl FnOnce(&mut f64));
    fn set_mass(&mut self, mass: f64) {
        self.mutate_mass(|mass_to_set| *mass_to_set = mass);
    }

    fn pos(&self) -> &Vec2;
    fn mutate_pos(&mut self, f: impl FnOnce(&mut Vec2));
    fn set_pos(&mut self, pos: Vec2) {
        self.mutate_pos(|pos_to_set| *pos_to_set = pos);
    }
    fn apply_pos(&mut self, pos: Vec2) {
        self.mutate_pos(|p| *p += pos);
    }
    fn closest_point_on_edge(&self, other_point: &Vec2) -> Vec2;
}

pub trait Dynamics: Matter + Kinematics {
    fn apply_grav_force_for_mass(&self, other: &impl Matter) -> Interaction;

    fn apply_grav_force(&self, other: &(impl Dynamics + Debug)) -> Interaction;

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
