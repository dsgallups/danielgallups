use crate::graph::Vec2;

#[derive(Debug, Clone)]
pub struct Square {
    mass: f64,
    width: f64,
    height: f64,
    force: Vec2,
    velocity: Vec2,
    position: Vec2,
}

impl Square {
    pub fn new(mass: f64, position: Vec2, width: f64, height: f64) -> Self {
        Self {
            mass,
            width,
            height,
            force: (0., 0.).into(),
            velocity: (0., 0.).into(),
            position,
        }
    }
}
