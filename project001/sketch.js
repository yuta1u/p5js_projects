var system;

function setup() {
	createCanvas(width || 720, height || 400);
	system = new ParticleSystem(createVector(width/2, 50));
}

function draw() {
	background(51);
	system.addParticle();
	system.run();
}

// A Simple Particle class
function Particle(position) {
	this.acceleration = createVector(0, 0.05);
	this.velocity = createVector(random(-1, 1), random(-2, 0));
	this.position = position.copy();
	this.lifespan = 255.0;
}

Particle.prototype.run = function() {
	this.update();
	this.display();
};

Particle.prototype.update = function() {
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	this.lifespan -= 2;
};

Particle.prototype.display = function() {
	stroke(200, this.lifespan);
	strokeWeight(2);
	fill(107, this.lifespan);
	ellipse(this.position.x, this.position.y, 12, 12);
};