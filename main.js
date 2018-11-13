/*jshint esversion: 6 */

class Cell {
  constructor(isBomb) {
    this.bomb = isBomb ? true : false;
    this.revealed = false;
    this.flagged = false;
  }
  reveal(){
    this.revealed = true;
  }
  click(rightClick){
    if (rightClick) {
      if (!this.revealed) {
        this.flag();
      }
    } else {
      if (!this.revealed && !this.flagged) {
        this.reveal();
        if (this.bomb) {
          console.log('GAME OVER');
        }
      }
    }
  }
  flag(){
    this.flagged = !this.flagged;
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
        var cell = this.cells[i][j];
        if (cell.revealed) {
          ctx.fillStyle = '#CCCCCC';
          ctx.fillRect(i*s, j*s, s, s);
        } else {
          ctx.fillStyle = '#AAAAAA';
          ctx.fillRect(i*s, j*s, s, s);
          if (cell.flagged) {
            ctx.fillStyle = '#F00';
            ctx.beginPath();
            ctx.moveTo((i*s + s/2), (j*s + s/2));
            ctx.lineTo((i*s + s/2), (j*s + s/5));
            ctx.lineTo((i*s + s/4), (j*s + s/3));
            ctx.lineTo((i*s + s/2), (j*s + s/2));
            ctx.fill();
            ctx.moveTo((i*s + s/2), (j*s + s/2));
            ctx.lineTo((i*s + s/2), (j*s + s*2/3));
            ctx.stroke();
          }
        }
      ctx.strokeRect(i*s, j*s, s, s);
      }
    }

  }
  getCell(a, b){
    var i = Math.floor(a/this.size),
        j = Math.floor(b/this.size);

    return this.cells[i][j];
  }
}

var width = 400,
    height = 400;

var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

canvas.addEventListener('click', function(e) {
  grid.getCell(e.offsetX, e.offsetY).click(false);
  grid.draw();
});
canvas.addEventListener('contextmenu', function(e) {
  grid.getCell(e.offsetX, e.offsetY).click(true);
  grid.draw();

  e.preventDefault();
});

document.body.appendChild(canvas);


var grid = new Grid(null, null, null);

grid.draw();
