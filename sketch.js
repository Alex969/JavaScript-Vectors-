var dots = [];

function setup() {
  createCanvas(900, 600);
  dots.push(new Dot(1));
  dots.push(new Dot(5));
}

function draw() {
  background(0);

  for (var i=0; i<dots.length; i++){
    if (mouseIsPressed){
      var wind = createVector(0.1,0);
      dots[i].applyForce(wind);
    }

    var gravity = createVector(0, 0.1);
    gravity.mult(dots[i].mass);
    var friction = dots[i].speed.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.01);
    dots[i].applyForce(friction);
    dots[i].applyForce(gravity);

    dots[i].run();
  }
}

function Dot(_m) {
  this.speed = createVector(0,0);//createVector(1, -3);
  this.loc = createVector(random(width), height / 2);
  this.acceleration = createVector(0, 0);
  this.diam = 10;
  this.mass = _m || 4;

  this.run = function() {
    this.draw();
    this.move();
    this.borders();
  }

  this.draw = function() {
    fill(125);
    ellipse(this.loc.x, this.loc.y, this.diam*this.mass, this.diam*this.mass);
  }

  this.move = function() {
    this.speed.add(this.acceleration);
    this.loc.add(this.speed);
    this.acceleration.mult(0);
  }
  
  this.borders = function() {
    if (this.loc.x > width) {
      this.loc.x = width;
      this.speed.x *= -1;
    } else if (this.loc.x < 0) {
      this.speed.x *= -1;
      this.loc.x = 0;
    }
    if (this.loc.y > height) {
      this.speed.y *= -1;
      this.loc.y = height;
    }
     else if (this.loc.y < 0) {
      this.speed.y *= -1;
      this.loc.y = 0;
    }
  }

  this.applyForce = function(f) {
    var adjustedForce = f.copy();
    adjustedForce.div(this.mass);
    this.acceleration.add(adjustedForce);
  }
}
