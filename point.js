class Point {
  // overloaded constructor
  constructor () {
    switch (arguments.length) {
      case 1:
        this.x = arguments[0].x;
        this.y = arguments[0].y;
        break;
      case 2:
        this.x = arguments[0];
        this.y = arguments[1];
        break;
      default:
        this.x = 0;
        this.y = 0;
    }
  }
  
  translate(dir) {
    this.x += dir.x;
    this.y += dir.y;
  }
  
  rotate(pivot, phi) {
    var x0 = this.x-pivot.x;
    var y0 = this.y-pivot.y;
    var x1 = x0*cos(phi)-y0*sin(phi);
    var y1 = x0*sin(phi)+y0*cos(phi);
    this.x = round(x1+pivot.x);
    this.y = round(y1+pivot.y);
  }
  
  static rotateVector(vec, pivot, phi) {
    var x0 = vec.x-pivot.x;
    var y0 = vec.y-pivot.y;
    var x1 = x0*cos(phi)-y0*sin(phi);
    var y1 = x0*sin(phi)+y0*cos(phi);
    return new Point(round(x1+pivot.x), round(y1+pivot.y));
  }
  
  static scale(v,s) {
    return new Point(v.x*s, v.y*s);
  }
  
  static add(a, b) {
    return new Point(b.x+a.x, b.y+a.y);
  }
  
  static equals(a,b) {
    if (a.x == b.x && a.y == b.y) {
        return true;
    } else {
      return false;
    }
  }
}