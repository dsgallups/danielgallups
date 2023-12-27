pub mod circle;
pub mod point;
pub mod square;
pub use circle::*;
pub use point::*;
pub use square::*;

pub enum Shape {
    Circle(f64),
    Square(f64, f64),
    Point,
}
