pub struct Circle {
    pub mass: f64,
    radius: f64,
    pub force: Vec2,
    pub velocity: Vec2,
    pub position: Vec2,
}

impl Circle {
    pub fn new(mass: Vec2, position: Vec2) -> Self {
        let radius = mass.sqrt();

        Self {
            mass,
            radius,
            force: (0., 0.).into(),
            velocity: (0., 0.).into(),
            position,
        }
    }

    pub fn radius(&self) -> f64 {
        self.radius
    }

    pub fn reset_forces(&mut self) {
        self.force = (0., 0.).into();
    }
}

impl Kinematics for Circle {
    fn velocity(&self) -> Vec2 {
        self.velocity
    }
    fn mutate_velocity(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.velocity = f(self.velocity);
    }

    fn force(&self) -> Vec2 {
        self.force
    }
    fn mutate_force(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.force = f(self.force);
    }

    fn pos(&self) -> Vec2 {
        self.position
    }
    fn mutate_pos(&mut self, f: impl FnOnce(Vec2) -> Vec2) {
        self.position = f(self.position);
    }
}

impl Matter for Circle {
    fn mass(&self) -> f64 {
        self.mass
    }
    fn mutate_mass(&mut self, f: impl FnOnce(f64) -> f64) {
        self.mass = f(self.mass);
    }
}

impl Dynamics for Circle {
    fn apply_grav_force(&mut self, other: impl Matter) {
        let distance = self.pos() - other.pos();
        let dist = self.position.distance_from(other.pos());

        let normal = (distance.0 / dist, distance.1 / dist);

        //for this one, distance is squared again
        let force = GRAV_CONST * other.mass() * self.mass / dist.powf(2.);
        let force = (normal.0 * force, normal.1 * force);

        self.apply_force(force);
    }

    fn tick_forces(&mut self) {
        //calculate the acceleration vector
        let force = self.force();
        let mass = self.mass();

        let acceleration: Vec2 = (force.x / mass, force.y / mass).into();

        self.apply_velocity(acceleration);
        let velocity = self.velocity();
        self.apply_pos(velocity);
    }
}

/*
impl Matter for Circle {
    fn reset_forces(&mut self) {
        self.force = (0., 0.).into();
    }

    fn pos(&self) -> Vec2 {
        self.position
    }

    fn force(&self) -> Vec2 {
        self.force
    }

    fn apply_force(&mut self, force: Vec2) {
        self.force += force;
    }

    fn apply_grav_force(&mut self, other: impl Matter) {
        let distance = self.pos() - other.pos();
        let dist = self.position.distance_from(other.pos());

        let normal = (distance.0 / dist, distance.1 / dist);

        //for this one, distance is squared again
        let force = GRAV_CONST * other.mass() * self.mass / dist.powf(2.);
        let force = (normal.0 * force, normal.1 * force);
    }

    fn tick_forces(&mut self) {
        //calculate the acceleration vector
        let force = self.force();
        let mass = self.mass();

        let acceleration: Vec2 = (force.x / mass, force.y / mass).into();

        self.apply_velocity(acceleration);
        let velocity = self.velocity();
        self.apply_pos(velocity);


    }
}
*/
