use crate::{
    document,
    graph::Vec2,
    html,
    physics::{matter::Circle, Dynamics, Shape},
};
use web_sys::Element;

pub struct DrawableElement {
    pub el: Element,
    pub name: String,
    pub color: (f64, f64, f64),
    pub matter: Box<dyn Dynamics>,
}

impl DrawableElement {
    pub fn new_circle(mass: f64, position: Vec2, name: impl Into<String>) -> Self {
        let rand_color = (
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
            128. + rand::random::<f64>() * 127.,
        );

        let matter: Circle = Circle::new(mass, position);

        let radius = matter.radius();
        let name: String = name.into();

        let document = document();
        let circle = document.create_element("div").unwrap();
        circle.set_class_name("circle");
        circle.set_id(&name);
        circle
            .set_attribute(
                "style",
                &format!(
                    "top: {:.0}px; left: {:.0}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.0}px; height: {:.0}px;",
                    position.y,
                    position.x,
                    rand_color.0,
                    rand_color.1,
                    rand_color.2,
                    radius * 2.,
                    radius * 2.,
                ),
            )
            .unwrap();
        circle.set_inner_html(&name);
        Self {
            el: circle,
            color: rand_color,
            name,
            matter: Box::new(matter),
        }
    }
    pub fn new_rand_circle(name: impl Into<String>) -> Self {
        let rand_position = (
            rand::random::<f64>() * html().client_width() as f64,
            rand::random::<f64>() * html().client_height() as f64,
        );

        let rand_mass = 25. + rand::random::<f64>() * 50.;

        Self::new_circle(rand_mass, rand_position.into(), name)
    }
    pub fn draw(&mut self) {
        let position = self.matter.pos();

        match self.matter.shape() {
            Shape::Circle(radius) => {
                self.el
                    .set_attribute(
                        "style",
                        &format!(
                            "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                            position.y - radius,
                            position.x - radius,
                            self.color.0,
                            self.color.1,
                            self.color.2,
                            radius * 2.,
                            radius * 2.,
                        ),
                    )
                    .unwrap()
            }
            Shape::Point => {
                self.el
                    .set_attribute(
                        "style",
                        &format!(
                            "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                            position.y,
                            position.x,
                            self.color.0,
                            self.color.1,
                            self.color.2,
                            1.,
                            1.,
                        ),
                    )
                    .unwrap()
            }
            Shape::Square(width, height ) => {
                self.el
                    .set_attribute(
                        "style",
                        &format!(
                            "top: {:.2}px; left: {:.2}px; background-color: rgb({:.0}, {:.0}, {:.0}); width: {:.2}px; height: {:.2}px;",
                            position.y,
                            position.x,
                            self.color.0,
                            self.color.1,
                            self.color.2,
                            width,
                            height,
                        ),
                    )
                    .unwrap()
            }
        }
    }
}
