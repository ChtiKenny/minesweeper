class Cell {
  constructor(a, b, isTrap) {
    this.x = a;
    this.y = b;
    this.bomb = isTrap ? true : false;
    this.revealed = false;
  }
  reveal(){
    this.revealed = true;
  }
}

class Grid {
  constructor(rows, cols, bombs, size) {
    this.cells = new Array(rows).fill(new Array(cols));
  }
}
