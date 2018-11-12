class Cell {
  constructor(isBomb) {
    this.bomb = isBomb ? true : false;
    this.revealed = false;
  }
  reveal(){
    this.revealed = true;
  }
}

class Grid {
  constructor(cols, rows, bombs, size) {
    this.cols = cols ? cols : 10;
    this.rows = rows ? rows : 10;
    this.cells = [];
    this.size = size ? size : 10;

    for (var i = 0; i < cols; i++) {
      this.cells[i] = [];
      for (var j = 0; j < rows; j++) {
        this.cells[i][j] = new Cell();
      }
    }

  }
  log(){
    var text = '';
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.cells[j][i].revealed) {
          if (this.cells[j][i].bomb) {
            text += '|B|';
          } else {
            text += '|0|';
          }
        } else {
          text += '|_|';
        }
      }
      text += '\n';
    }
    console.log(text);
  }
}
