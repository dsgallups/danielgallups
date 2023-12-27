use std::{collections::HashMap, ops::Deref};

use web_sys::Element;

use crate::{document, draw::DrawableElement, graph::Vec2, physics::Dynamics, settings::Settings};

pub struct World {
    settings: Settings,
    elements: Vec<DrawableElement>,
}

impl World {
    pub fn new(settings: Settings) -> Self {
        let mut elements = (settings.spawning_fn)(Self::spawn_elements_with_props);
        Self { settings, elements }
    }
    pub fn elements(self, elements: Vec<DrawableElement>) -> Self {
        Self { elements, ..self }
    }

    fn spawn_elements_with_props(circle_vals: Vec<(f64, (f64, f64))>) -> Vec<DrawableElement> {
        let bg_el = document().get_element_by_id("background").unwrap();

        circle_vals
            .into_iter()
            .enumerate()
            .map(|(i, val)| {
                let circle = DrawableElement::new_circle(val.0, val.1.into(), i.to_string());
                bg_el.append_child(&circle.el).unwrap();
                circle
            })
            .collect::<Vec<_>>()
    }

    pub fn tick(&mut self) {
        let dyn_els = self
            .elements
            .iter_mut()
            .map(|el| el.matter.as_ref())
            .collect::<Vec<_>>();
    }
    pub fn build_collision_trees(els: Vec<&dyn Dynamics>) -> Vec<Vec2> {
        let mut collision_trees: HashMap<ElementIndice, Vec<ElementIndice>> =
            HashMap::with_capacity(els.len());

        for (i, refframe_el) in els.iter().enumerate() {
            let mut collision_tree = Vec::new();
            for (j, el) in els.iter().enumerate() {
                if i == j {
                    continue;
                }
                if refframe_el.collision_occured(*el) {
                    collision_tree.push(j);
                }
            }
            collision_trees.insert(i, collision_tree);
        }

        for (element_indice, colliding_with) in collision_trees.iter() {
            if colliding_with.is_empty() {
                continue;
            }
            let ref_el = els.get(*element_indice).unwrap();
            let ref_momentum = ref_el.mass() * ref_el.velocity();

            /*
               Going to stop here, but this is the idea.
               Recursively determine, from each points of contact,
               the total mass + net velocity based on those contacts' chains
               (like if 1 is touching 3 and 2, and 3 touches 4, there'd be two results, where point 1 is (3+2 momentums) and point 2 is (4's momentum)

               based on this, you can determine as 1 how to divvy up your energy between the two chains.


               Then, you apply that energy to each point of contact. Those contacts will then
               transmit that energy to its children, if there are any and will be left with the rest of the unused energy.

               Send each of those energies to a new vector for each indice, then at the end, sum it all up.



            */

            for el_collided_i in colliding_with {
                let el_collided_with = els.get(*el_collided_i).unwrap();
                //let their_chain = collision_trees.get(indice_collided_with);

                /*if their_chain.is_none() || !their_chain.is_some_and(|c| c.is_empty()) {
                    panic!(
                        "their chain doesn't exist for indice {}, ref: {}",
                        indice_collided_with, element_indice
                    )
                }*/
                //let their_chain = their_chain.unwrap();
            }
        }

        todo!();
    }

    pub fn draw(&mut self) {}
}

pub type ElementIndice = usize;
/*
/*let dyn_els = elements
            .iter_mut()
            .map(|el| el.matter.as_mut())
            .collect::<Vec<_>>();

        //calculate
        tick(dyn_els, mouse_pos.as_ref(), window_size);

        elements.iter_mut().for_each(|el| {
            let position = el.matter.pos();
            let radius = el.matter.mass().sqrt();

            if position.x + (radius + radius) < 0.
                || position.x > window_size.0
                || position.y + (radius + radius) < 0.
                || position.y > window_size.1
            {
                //circle.reset();
            }
            el.draw()
        });*/


*/
