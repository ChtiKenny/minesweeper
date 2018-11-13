/*jshint esversion: 6 */

class Cell {
  constructor(a,b) {
    this.self = [a,b];
    this.bomb = false;
    this.revealed = false;
    this.flagged = false;
    this.neihbours = 0;
  }
  reveal(){
    this.revealed = true;
    if (!this.neihbours) {
      var n = grid.getNeihbours(this.self[0], this.self[1]);
      for (var i = 0; i < n.length; i++) {
        var x = n[i][0], y = n[i][1];
        grid.cells[x][y].click();
      }
    }
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
  constructor(cols, rows, bomb) {
    this.cols = cols ? cols : 10;
    this.rows = rows ? rows : 10;
    this.bomb = bomb ? bomb : 10;
    this.cells = [];
    this.size = Math.floor(canvas.width / this.cols);

    for (var i = 0; i < this.cols; i++) {
      this.cells[i] = [];
      for (var j = 0; j < this.rows; j++) {
        this.cells[i][j] = new Cell(i,j);
      }
    }

    this.setBombs(this.bomb);
    this.count();

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
    ctx.font = s+"px sans-serif";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    // erase everything
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0,0,width,height);

    // loop to draw each cell
    ctx.strokeStyle ='#000';
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        var cell = this.cells[i][j];
        if (cell.revealed) {
          ctx.fillStyle = '#CCC';
          ctx.fillRect(i*s, j*s, s, s);
          if (cell.bomb) {
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(i*s + s/2, j*s + s/2, s/3, 0, Math.PI * 2);
            ctx.fill();
          }
          if (cell.neihbours) {
            ctx.fillStyle = '#000';
            ctx.fillText(cell.neihbours,i*s + s/2, j*s + s/2);
          }
        } else {
          ctx.fillStyle = '#AAA';
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
    var x = Math.floor(a/this.size),
        y = Math.floor(b/this.size);

    return this.cells[x][y];
  }
  getNeihbours(a, b){
    var array = [];
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
          var x = a + xoff,
              y = b + yoff;
          if (
            (x > -1) && (x < this.cols) && (y > -1) && (y < this.rows) &&
            (!(a==x && b==y))
          ) {
            array.push([x,y]);
          }
        }
    }
    return array;
  }
  setBombs(bombs){
    var option = [];
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        if (!this.cells[i][j].bomb) option.push([i,j]);
      }
    }

    for (var n = 0; n < bombs; n++) {
      var index = Math.floor(Math.random() * option.length);
      var x = option[index][0],
          y = option[index][1];
      option.splice(index, 1);
      this.cells[x][y].bomb = true;
    }
  }
  count(){
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        var n = this.getNeihbours(i,j);
        for (var k = 0; k < n.length; k++) {
          var a = n[k][0], b = n[k][1];
          if (this.cells[a][b].bomb && !this.cells[i][j].bomb) {
            this.cells[i][j].neihbours++;
          }
        }
      }
    }
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
