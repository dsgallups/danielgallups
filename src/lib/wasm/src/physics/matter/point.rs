pub struct Point {
    pub mass: f64,
    pub position: Vec2,
}

impl Point {
    pub fn new(mass: f64, position: Vec2) -> Self {
        Self { mass, position }
    }
}
