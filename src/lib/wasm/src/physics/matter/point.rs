use crate::{graph::Vec2, physics::Matter};

#[derive(Clone, Debug)]
pub struct Point {
    pub mass: f64,
    pub position: Vec2,
}

impl Point {
    pub fn new(mass: f64, position: Vec2) -> Self {
        Self { mass, position }
    }
}

impl Matter for Point {
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
        0.
    }
}
