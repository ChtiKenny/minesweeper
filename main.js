/*jshint esversion: 6 */

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
  constructor(cols, rows, bombs) {
    this.cols = cols ? cols : 10;
    this.rows = rows ? rows : 10;
    this.cells = [];
    this.size = Math.floor(canvas.width / this.cols);

    for (var i = 0; i < this.cols; i++) {
      this.cells[i] = [];
      for (var j = 0; j < this.rows; j++) {
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

  draw(){
    let s = this.size;
    // erase everything
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,width,height);

    // loop to draw each cell
    ctx.strokeStyle ='#000000';
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        if (this.cells[i][j].revealed) {
          ctx.fillStyle = '#CCCCCC';
          ctx.fillRect(i*s, j*s, s, s);
        } else {
          ctx.fillStyle = '#AAAAAA';
          ctx.fillRect(i*s, j*s, s, s);
        }
      ctx.strokeRect(i*s, j*s, s, s);
      }
    }

  }
}

var width = 200,
    height = 200;

var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);


var grid = new Grid(null, null, null);

grid.draw();
