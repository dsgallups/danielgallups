use crate::{graph::Vec2, physics::Matter};

use super::Shape;

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
    fn set_mass(&mut self, mass: f64) {
        self.mass = mass;
    }

    fn pos(&self) -> Vec2 {
        self.position
    }
    fn set_pos(&mut self, pos: Vec2) {
        self.position = pos;
    }
    fn closest_point_on_edge(&self, _other_point: Vec2) -> Vec2 {
        self.position
    }
    fn shape(&self) -> Shape {
        Shape::Point
    }
}
