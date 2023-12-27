use crate::{document, draw::DynamicElement, physics::Circle};

pub type GravitySettings = (f64, f64);

pub type CircleVal = (f64, (f64, f64));

#[derive(Copy, Clone)]
#[allow(clippy::type_complexity)]
pub struct Settings {
    pub mouse_grav: GravitySettings,
    pub mouse_mass: f64,
    pub mass_grav: GravitySettings,
    pub energy_conservation: f64,
    pub log: Option<(i32, i32)>,
    pub spawning_fn:
        fn(fn(Vec<CircleVal>) -> Vec<DynamicElement<Circle>>) -> Vec<DynamicElement<Circle>>,
}

const SLOW_FIREWORKS_WITH_SMALL_BALLS: Settings = Settings {
    mouse_grav: (0.008, 2.),
    mouse_mass: 10.,
    mass_grav: (0.008, 2.),
    energy_conservation: 1.,
    log: None,
    spawning_fn: |f| {
        let circle_mass = 16.;
        let mut vals = Vec::new();

        for i in 0..16 {
            for j in 0..16 {
                vals.push((
                    circle_mass,
                    (((i as f64 * 32.) + 1200.), ((j as f64 * 32.) + 400.)),
                ));
            }
        }

        f(vals)
    },
};

const RANDOM_BALLS_INVERSE_GRAV: Settings = Settings {
    mouse_grav: (0.00005, 0.5),
    mouse_mass: 4000.,
    mass_grav: (0.00005, 0.5),
    energy_conservation: 1.0,
    //log: Some((60, 0)),
    log: None,
    spawning_fn: |_| {
        let bg_el = document().get_element_by_id("background").unwrap();

        (0..220)
            .map(|_| {
                let circle = DynamicElement::new_rand();
                bg_el.append_child(&circle.el).unwrap();
                circle
            })
            .collect::<Vec<_>>()
    },
};

pub const CONFIGS: [Settings; 2] = [SLOW_FIREWORKS_WITH_SMALL_BALLS, RANDOM_BALLS_INVERSE_GRAV];

#[allow(dead_code)]
fn spawn_parallel_circles() -> Vec<DynamicElement<Circle>> {
    let bg_el = document().get_element_by_id("background").unwrap();

    let circle_one = DynamicElement::new(5., (200., 200.).into());
    bg_el.append_child(&circle_one.el).unwrap();
    let circle_two = DynamicElement::new(3., (800., 200.).into());
    bg_el.append_child(&circle_two.el).unwrap();
    let circle_three = DynamicElement::new(20., (1600., 200.).into());
    bg_el.append_child(&circle_three.el).unwrap();
    vec![circle_one, circle_two, circle_three]
}

#[allow(dead_code)]
fn spawn_circles() -> Vec<DynamicElement<Circle>> {
    let bg_el = document().get_element_by_id("background").unwrap();

    (0..100)
        .map(|_| {
            let circle = DynamicElement::default();
            bg_el.append_child(&circle.el).unwrap();
            circle
        })
        .collect::<Vec<_>>()
}
