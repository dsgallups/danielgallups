use crate::{graph::Vec2, physics::Matter};

use super::Shape;

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
    pub fn some(&self) -> &Vec2 {
        &self.position
    }
    pub fn baz(&mut self, f: impl FnOnce(&mut Vec2)) {
        f(&mut self.position)
    }
}

impl Matter for Square {
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
    //GPT generated, unknown if this working
    fn closest_point_on_edge(&self, other_point: Vec2) -> Vec2 {
        let mut closest_point = self.position;
        let mut closest_distance = f64::MAX;

        let top_left = self.position;
        let top_right = (self.position.x + self.width, self.position.y).into();
        let bottom_left = (self.position.x, self.position.y + self.height).into();
        let bottom_right = (self.position.x + self.width, self.position.y + self.height).into();

        let top_edge = (top_left, top_right);
        let right_edge = (top_right, bottom_right);
        let bottom_edge = (bottom_left, bottom_right);
        let left_edge = (top_left, bottom_left);

        let edges = vec![top_edge, right_edge, bottom_edge, left_edge];

        for edge in edges {
            let (edge_start, edge_end) = edge;
            let distance = distance_to_line_segment(&edge_start, &edge_end, &other_point);

            if distance < closest_distance {
                closest_distance = distance;
                closest_point = closest_point_on_line_segment(&edge_start, &edge_end, &other_point);
            }
        }

        closest_point
    }
    fn shape(&self) -> Shape {
        Shape::Square(self.width, self.height)
    }
}

fn distance_to_line_segment(start: &Vec2, end: &Vec2, point: &Vec2) -> f64 {
    let line_segment_length = (end - start).magnitude();
    let start_to_point = point - start;
    let end_to_point = point - end;

    let dot_product = start_to_point.dot(end_to_point);

    if dot_product <= 0. {
        return start_to_point.magnitude();
    }

    if dot_product >= line_segment_length.powi(2) {
        return end_to_point.magnitude();
    }

    //perpendicular distance
    start_to_point.cross(end_to_point).abs().sqrt() / line_segment_length
}

fn closest_point_on_line_segment(start: &Vec2, end: &Vec2, point: &Vec2) -> Vec2 {
    let line_segment_length = (end - start).magnitude();
    let start_to_point = point - start;
    let end_to_point = point - end;

    let dot_product = start_to_point.dot(end_to_point);

    if dot_product <= 0. {
        return *start;
    }

    if dot_product >= line_segment_length.powi(2) {
        return *end;
    }

    //projection
    *start + (end - start) * (dot_product / line_segment_length.powi(2))
}
