use std::ops::DerefMut;

use crate::{
    document,
    draw::DrawableElement,
    graph::Vec2,
    log,
    physics::{Interaction, Momentum},
    settings::Settings,
    TICK_COUNT,
};

pub struct World {
    settings: Settings,
    elements: Vec<DrawableElement>,
}

impl World {
    pub fn new(settings: Settings) -> Self {
        let elements = (settings.spawning_fn)(Self::spawn_elements_with_props);
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

    pub fn flatten_interactions_fix_positions(
        &mut self,
        all_interactions: Vec<Vec<Interaction>>,
    ) -> Vec<(Vec2, Momentum)> {
        let mut flattened_interactions = Vec::new();

        all_interactions
            .into_iter()
            .enumerate()
            .for_each(|(i, interactions)| {
                let mut net_force = Vec2::default();
                let mut fake_object_velocity = Vec2::default();
                let mut fake_object_mass = 0.;
                //todo
                let el_pos_to_correct = self.elements.get_mut(i).unwrap();
                let mut pos_adj = Vec2::default();
                interactions.into_iter().enumerate().for_each(
                    |(j, interaction)| match interaction {
                        Interaction::Force(force) => {
                            net_force += force;
                        }
                        Interaction::Collision(colinfo) => {
                            fake_object_velocity += colinfo.velocity;
                            fake_object_mass += colinfo.mass;

                            //Then, give it some slack to move out of the way as to not get stuck, so just on the edge of the other

                            let own_closest_point_to_other_obj = el_pos_to_correct
                                .matter
                                .closest_point_on_edge(colinfo.other_obj_closest_point);
                            pos_adj +=
                                colinfo.other_obj_closest_point - own_closest_point_to_other_obj;
                        }
                    },
                );
                if pos_adj != Vec2::default() {
                    log(&format!("pos_adj: {:?}", pos_adj));
                }
                el_pos_to_correct.matter.apply_pos(pos_adj);

                flattened_interactions.push((
                    net_force,
                    Momentum {
                        velocity: fake_object_velocity,
                        mass: fake_object_mass,
                    },
                ));
            });

        flattened_interactions
    }

    pub fn tick(&mut self) {
        let interactions = self.calc_element_interactions();

        let flat_interactions = self.flatten_interactions_fix_positions(interactions);

        self.apply_interactions(flat_interactions);
    }

    pub fn calc_element_interactions(&self) -> Vec<Vec<Interaction>> {
        let els = self
            .elements
            .iter()
            .map(|el| el.matter.as_ref())
            .collect::<Vec<_>>();
        let mut all_interactions = Vec::with_capacity(els.len());

        for (i, refframe_el) in els.iter().enumerate() {
            let mut interactions = Vec::new();
            for (j, el) in els.iter().enumerate() {
                if i == j {
                    continue;
                }
                interactions.push(refframe_el.interact(*el));
            }
            all_interactions.push(interactions);
        }

        all_interactions
    }
    pub fn apply_interactions(&mut self, flat_interactions: Vec<(Vec2, Momentum)>) {
        for ((_i, el), interactions) in self.elements.iter_mut().enumerate().zip(flat_interactions)
        {
            if unsafe { TICK_COUNT.is_some() } {
                log(&format!("{}: {:?}", el.name, interactions));
            }
            let matter = el.matter.deref_mut();
            matter.set_force(interactions.0);

            if interactions.1.mass > 0. {
                //hacky way to check if it's a double sided collision
                if interactions.1.velocity.magnitude() < 0.000000001 {
                    matter
                        .set_velocity(matter.velocity() * -1. * self.settings.energy_conservation);

                    if matter.velocity().magnitude() < 0.001 {
                        matter.set_velocity(Vec2::default());
                    }

                    //todo: fix
                    matter.reset_forces();

                    matter.tick_forces();
                    if unsafe { TICK_COUNT.is_some() } {
                        log(&format!(
                            "{}: double sided collision\n, new velocity: {:?}",
                            el.name,
                            matter.velocity()
                        ));
                    }
                    continue;
                }
                if unsafe { TICK_COUNT.is_some() } {
                    log(&format!("{}: single sided collision", el.name));
                }
                let el_vel = (matter.velocity() * (matter.mass() - interactions.1.mass)
                    + (2. * interactions.1.mass * interactions.1.velocity))
                    / (matter.mass() + interactions.1.mass);
                matter.apply_velocity(
                    (el_vel - matter.velocity()) * self.settings.energy_conservation,
                );
                if matter.velocity().magnitude() < 0.001 {
                    matter.set_velocity(Vec2::default());
                }
            }

            matter.tick_forces();
            matter.reset_forces();
        }
    }

    pub fn draw(&mut self) {
        self.elements.iter_mut().for_each(|el| el.draw())
    }
}

/*
#[derive(Debug, Clone)]
pub struct Interaction {
    pub distance: Vec2,
    pub force: Option<Vec2>,
    pub other_mass: Option<Momentum>,
}

#[derive(Debug, Clone, Default)]
pub struct Momentum {
    pub velocity: Vec2,
    pub mass: f64,
} */

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

/*
pub fn unfinished_collide(els: Vec<&dyn Dynamics>) -> Vec<Vec2> {
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

        let mut change_in_velocities = vec![Vec2::default(); els.len()];

        for (element_indice, colliding_with) in collision_trees.iter() {
            if colliding_with.is_empty() {
                continue;
            }
            let ref_el = els.get(*element_indice).unwrap();
            let ref_momentum = ref_el.mass() * ref_el.velocity();

            /*
               Going to stop here, but this is the idea.



               Then, you apply that energy to each point of contact. Those contacts will then
               transmit that energy to its children, if there are any and will be left with the rest of the unused energy.

               Send each of those energies to a new vector for each indice, then at the end, sum it all up.
            */

            let mut poc_momentums: Vec<Vec2> = Vec::with_capacity(colliding_with.len());
            for col_i in colliding_with {
                let el_collided_with = els.get(*col_i).unwrap();
                let mass = el_collided_with.mass();
                let velocity = el_collided_with.velocity();
                poc_momentums.push(mass * velocity);
            }
            /*
            let el_vel = (circle.velocity() * (circle.mass() - fake_object_mass)
            + (2. * fake_object_mass * fake_object_velocity))
            / (circle.mass() + fake_object_mass);
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
*/
