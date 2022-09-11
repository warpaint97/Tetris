class Shape {
  constructor() {
    this.tiles = [];
    this.pivot = new Point();
    this.color = "";
  }
  
  move(dir) {
    // look ahead
    var new_pos = [];
    this.tiles.forEach((x) => {new_pos.push(Point.add(x.pos, dir));});
    
    if (!this.shapeIsOutOfBounds(new_pos) && !this.shapeHitsOtherShapes(new_pos)) {
      this.tiles.forEach((x) => {x.pos.translate(dir);});
      this.pivot.translate(dir);
    } else {
      if (dir.y == 1) {
          spawn();
      }
    }
  }
  
  rotate(phi) {
    // look ahead
    var new_pos = [];
    this.tiles.forEach((x) => {new_pos.push(Point.rotateVector(x.pos, this.pivot, phi));});
    
    if (!this.shapeIsOutOfBounds(new_pos) && !this.shapeHitsOtherShapes(new_pos)) {
      this.tiles.forEach((x) => {x.pos.rotate(this.pivot, phi);});
    }
  }
  
  draw() {
    push();
    this.tiles.forEach((x) => {x.color=this.color; x.draw();});
    pop();
  }
  
  shapeIsOutOfBounds(new_positions) {
    for (var i = 0; i < new_positions.length; i++) {
      // x-axis
      if (new_positions[i].x < 0 || new_positions[i].x >= X) {
        // shape is out of horizontal bounds
        return true;
      }
      if (new_positions[i].y > Y-1) {
        // shape is out of vertical bounds
        return true;
      }
    }
    return false;
  }
  
  shapeHitsOtherShapes(new_positions) {
    for (var tt = 0; tt < new_positions.length; tt++) {
      for (var os = 0; os < other_shapes.length; os++) {
        for (var ot = 0; ot < other_shapes[os].tiles.length; ot++) {
          if (Point.equals(new_positions[tt], other_shapes[os].tiles[ot].pos)) {
              return true;
          }
        }
      }
    }
    return false;
  }
  
  moveToRandomX() {
    var max_n = maxNX(this.tiles);
    var min_n = minNX(this.tiles);
    var random_x = round(random(-min_n, X-max_n-1));
    var offset = new Point(random_x,0);
    this.tiles.forEach((x) => {x.pos.translate(offset);});
    this.pivot.translate(offset);
  }
}


class TShape extends Shape {
  constructor() {
    super();
    this.color = "magenta";
    this.tiles = [new Tile(0,0),new Tile(-1,0),new Tile(1,0),new Tile(0,-1)];
    this.pivot = new Point(this.tiles[0].pos);
    this.moveToRandomX();
  }
}

class OShape extends Shape {
  constructor() {
    super();
    this.color = "yellow";
    this.tiles = [new Tile(0,0),new Tile(1,0),new Tile(0,-1),new Tile(1,-1)];
    this.pivot = Point.add(this.tiles[0].pos, new Point(0.5,-0.5));
    this.moveToRandomX();
  }
}

class IShape extends Shape {
  constructor() {
    super();
    this.color = "cyan";
    this.tiles = [new Tile(0,0),new Tile(1,0),new Tile(2,0),new Tile(3,0)];
    this.pivot = Point.add(this.tiles[1].pos, new Point(0.5,0.5));
    this.moveToRandomX();
  }
}

class SShape extends Shape {
  constructor() {
    super();
    this.color = "green";
    this.tiles = [new Tile(0,0),new Tile(-1,0),new Tile(0,-1),new Tile(1,-1)];
    this.pivot = new Point(this.tiles[0].pos);
    this.moveToRandomX();
  }
}

class RSShape extends Shape {
  constructor() {
    super();
    this.color = "red";
    this.tiles = [new Tile(0,0),new Tile(0,-1),new Tile(-1,-1),new Tile(1,0)];
    this.pivot = new Point(this.tiles[0].pos);
    this.moveToRandomX();
  }
}

class LShape extends Shape {
  constructor() {
    super();
    this.color = "orange";
    this.tiles = [new Tile(0,0),new Tile(-1,0),new Tile(1,0),new Tile(1,-1)];
    this.pivot = new Point(this.tiles[0].pos);
    this.moveToRandomX();
  }
}

class RLShape extends Shape {
  constructor() {
    super();
    this.color = "blue";
    this.tiles = [new Tile(0,0),new Tile(-1,0),new Tile(1,0),new Tile(-1,-1)];
    this.pivot = new Point(this.tiles[0].pos);
    this.moveToRandomX();
  }
}


class Tile {
  constructor(x,y) {
    this.pos = new Point(x,y);
    this.color = "purple";
  }
  
  draw() {
    push();
    rectMode(CENTER);
    stroke("black");
    fill(this.color);
    rect(this.pos.x*unit+0.5*unit,this.pos.y*unit+0.5*unit,unit,-unit);
    pop();
  }
}


