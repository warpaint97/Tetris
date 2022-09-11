function spawn() {
  if (selected_shape instanceof Shape) {
    other_shapes.push(selected_shape);
  }
  var new_shapes = [new TShape(),
                    new OShape(),
                    new IShape(),
                    new SShape(),
                    new RSShape(),
                    new LShape(),
                    new RLShape()];
  
  selected_shape = random(new_shapes);
}

function gameOver() {
  if (score > highscore) {
    highscore = score;
  }
  score = 0;
  other_shapes = [];
  selected_shape = null;
  spawn();
  if (isStopped) {
      toggleStop();
  }
}

function toggleStop() {
  isStopped = !isStopped;
  if (isStopped) {
    stop_text = "Continue";
  } else {
    stop_text = "Pause";
  }
  button1.html(stop_text);
}

function checkRows() {
  for (var y = Y-1; y >= 0; y--) {
    if (rowIsCompleted(y)) {
      removeCompletedRow(y);
      translateOtherShapes(y, new Point(0,1));
      score += 25;
      if (score > highscore) {
          highscore = score;
      }
      break;
    }
  }
}

function rowIsCompleted(y) {
  for (var x = 0; x < X; x++) {
    // check for occupied tiles
    var found = false;
    for (var os = 0; os < other_shapes.length; os++) {
      for (var ot = 0; ot < other_shapes[os].tiles.length; ot++) {
        if (Point.equals(other_shapes[os].tiles[ot].pos, new Point(x,y))) {
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
}

function removeCompletedRow(y) {
  for (var x = 0; x < X; x++) {
    
    for (var os = 0; os < other_shapes.length; os++) {
      for (var ot = 0; ot < other_shapes[os].tiles.length; ot++) {
        if (Point.equals(other_shapes[os].tiles[ot].pos, new Point(x,y))) {
          other_shapes[os].tiles.splice(ot,1);
        }
      }
    }
  }
}

function translateOtherShapes(y, dir) {
  for (var os = 0; os < other_shapes.length; os++) {
    other_shapes[os].tiles.forEach((x) => {
      if (x.pos.y < y) {
        x.pos.translate(dir)
      }
    });
  }
}

function hasLost() {
  for (var os = 0; os < other_shapes.length; os++) {
    for (var ot = 0; ot < other_shapes[os].tiles.length; ot++) {
      if (other_shapes[os].tiles[ot].pos.y < 0) {
          return true;
      }
    }
  }
  return false;
}

function maxNX(tiles) {
  var max_n = 0;
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].pos.x > max_n) {
        max_n = tiles[i].pos.x;
    }
  }
  return max_n;
}

function minNX(tiles) {
  var min_n = maxNX(tiles);
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].pos.x < min_n) {
        min_n = tiles[i].pos.x;
    }
  }
  return min_n;
}