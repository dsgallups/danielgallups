pub fn run() -> Result<(), JsValue> {
    let mouse_pos = hook_mouse_pos()?;
    let window_size = hook_window_size()?;
    let mut circles = spawn_circles();

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        tick(&mut circles, *mouse_pos.borrow(), *window_size.borrow());
        request_animation_frame(f.borrow().as_ref().unwrap());
    }) as Box<dyn FnMut()>));

    request_animation_frame(g.borrow().as_ref().unwrap());
    Ok(())
}

fn tick(circles: &mut [Circle], mouse_pos: Vec2, window_size: (f64, f64)) {
    let mouse_mass = -400.;

    let mouse_matter = Point::new(mouse_mass, mouse_pos);

    for index in 0..circles.len() {
        let mut refframe_circle: Circle = unsafe {
            std::mem::replace(
                &mut circles[index],
                std::mem::MaybeUninit::zeroed().assume_init(),
            )
        };

        refframe_cirle.reset_forces();

        for (i, circle) in circles.iter().enumerate() {
            if i == index {
                continue;
            }

            refframe_circle.apply_grav_force(circle);
        }

        refframe_circle.apply_grav_force(&mouse_matter);

        let _ = std::mem::replace(&mut circles[index], refframe_circle);
    }

    for circle in circles.iter_mut() {
        circle.tick_forces();
        circle.update_el();
        circle.reset_forces();
    }
}
