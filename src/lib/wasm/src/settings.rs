use crate::{document, draw::DrawableElement};

pub type GravitySettings = (f64, f64);

pub type CircleVal = (f64, (f64, f64));

#[derive(Clone, Copy)]
pub struct LogParams {
    pub stop_tick_after: Option<i32>,
    pub energy: bool,
    pub collision: bool,
}

#[derive(Clone, Copy)]
#[allow(clippy::type_complexity)]
pub struct Settings {
    pub mouse_grav: GravitySettings,
    pub mouse_mass: f64,
    pub mass_grav: GravitySettings,
    pub energy_conservation: f64,
    pub log: Option<LogParams>,
    pub spawning_fn: fn(fn(Vec<CircleVal>) -> Vec<DrawableElement>) -> Vec<DrawableElement>,
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
                let circle = DrawableElement::new_rand_circle();
                bg_el.append_child(&circle.el).unwrap();
                circle
            })
            .collect::<Vec<_>>()
    },
};

const EXP_TWO_INVERSE_GRAV: Settings = Settings {
    mouse_grav: (0.00005, 0.5),
    mouse_mass: 0.,
    mass_grav: (0.00005, 0.5),
    energy_conservation: 1.,
    //log: Some((60, 0)),
    log: Some(LogParams {
        stop_tick_after: Some(2),
        energy: false,
        collision: true,
    }),
    spawning_fn: |_| {
        let bg_el = document().get_element_by_id("background").unwrap();

        let circle_presets = [
            //top
            (400., (1000., 300.)),
            //left
            (400., (800., 500.)),
            //(400., (700., 500.)),
            //bottom
            (400., (1000., 700.)),
            //right
            (400., (1200., 500.)),
            //(400., (1300., 500.)),
            //center
            (400., (1000., 500.)),
        ];

        circle_presets
            .iter()
            .map(|(mass, pos)| {
                let circle = DrawableElement::new_circle(*mass, (*pos).into());
                bg_el.append_child(&circle.el).unwrap();
                circle
            })
            .collect::<Vec<_>>()
    },
};

const EXP_RANDOM_BALLS_INVERSE_GRAV: Settings = Settings {
    mouse_grav: (0.0005, 0.5),
    mouse_mass: 4000.,
    mass_grav: (0.0005, 0.5),
    energy_conservation: 0.8,
    //log: Some((60, 0)),
    log: None,
    spawning_fn: |_| {
        let bg_el = document().get_element_by_id("background").unwrap();

        (0..220)
            .map(|_| {
                let circle = DrawableElement::new_rand_circle();
                bg_el.append_child(&circle.el).unwrap();
                circle
            })
            .collect::<Vec<_>>()
    },
};

pub const CONFIGS: [Settings; 4] = [
    SLOW_FIREWORKS_WITH_SMALL_BALLS,
    RANDOM_BALLS_INVERSE_GRAV,
    EXP_TWO_INVERSE_GRAV,
    EXP_RANDOM_BALLS_INVERSE_GRAV,
];

#[allow(dead_code)]
fn spawn_parallel_circles() -> Vec<DrawableElement> {
    let bg_el = document().get_element_by_id("background").unwrap();

    let circle_one = DrawableElement::new_circle(5., (200., 200.).into());
    bg_el.append_child(&circle_one.el).unwrap();
    let circle_two = DrawableElement::new_circle(3., (800., 200.).into());
    bg_el.append_child(&circle_two.el).unwrap();
    let circle_three = DrawableElement::new_circle(20., (1600., 200.).into());
    bg_el.append_child(&circle_three.el).unwrap();
    vec![circle_one, circle_two, circle_three]
}

#[allow(dead_code)]
fn spawn_circles() -> Vec<DrawableElement> {
    let bg_el = document().get_element_by_id("background").unwrap();

    (0..100)
        .map(|_| {
            let circle = DrawableElement::new_rand_circle();
            bg_el.append_child(&circle.el).unwrap();
            circle
        })
        .collect::<Vec<_>>()
}
