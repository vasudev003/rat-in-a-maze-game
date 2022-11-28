let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let tileSize = 50;
let moves = 0;
let username='';

let map = [
  [0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2],
];

let collBox = [];
let mapLenght = map[0].length;
let mapHeight = map.length;

let brick = new Image();
brick.src = '/image/brick.jpg';

let background = new Image();
background.src = '/image/canvas-bg.jpg';

let flag = new Image();
flag.src = '/image/flag.jpg';

let ratImage = new Image();
ratImage.src = '/image/rat.png';

function getPlayerName(){
  username = prompt("Enter Your Name:");
}

function drawMap(m) {
  for (i = 0; i < m.length; i++) {
    collBox.push([]);
    for (j = 0; j < m[i].length; j++) {
      if (m[i][j] === 1) {
        ctx.beginPath();
        ctx.drawImage(brick, j*tileSize, i*tileSize, tileSize, tileSize);
      } else if (m[i][j] === 2) {
        ctx.beginPath();
        ctx.drawImage(flag, j*tileSize, i*tileSize, tileSize, tileSize);
      }
      else {
        ctx.beginPath();
        ctx.drawImage(background, j*tileSize, i*tileSize, tileSize, tileSize);
      }
      collBox[i].push({
        x: j * tileSize,
        y: i * tileSize,
        status: m[i][j] === 1 ? 1 : (m[i][j] === 2 ? 2 : 0)
      });
    }
  }
}
function drawRat(x, y) {
  ctx.beginPath();
  ctx.drawImage(ratImage, x, y, tileSize, tileSize);
}

function move(x, y) {
  ctx.clearRect(0, 0, mapLenght*tileSize, mapHeight*tileSize);
  drawMap(map);
  drawRat(x, y);
  rat.x = rat.newX;
  rat.y = rat.newY;

  moves = moves + 1;
  document.querySelector(".gameScore span").innerHTML = moves;
}

let rat = {
  x: 0,
  y: 0,
  newX: 0,
  newY: 0,
};

function checkColl() {
  for (i = 0; i < mapHeight; i++) {
    for (j = 0; j < mapLenght; j++) {
      let b = collBox[i][j];

      if (rat.newX === b.x && rat.newY === b.y) {
        if (b.status === 1) {
          console.log("Hit Rock");
        } else if (b.status === 2) {
          console.log("Win");
          move(rat.newX, rat.newY);
          document.querySelector(".gameMessage").style.display = "block";
        } else {
          move(rat.newX, rat.newY);
        }
      } else if (
        rat.newX < 0 || rat.newX >= mapLenght*tileSize || rat.newY < 0 || rat.newY >= mapHeight*tileSize) {
        console.log("hit wall");
      }
    }
  }
}

window.onkeydown = function (e) {
  if (e.keyCode === 37) {
    rat.newX = rat.x - tileSize;
    rat.newY = rat.y;
  }
  if (e.keyCode === 38) {
    rat.newY = rat.y - tileSize;
    rat.newX = rat.x;
  }
  if (e.keyCode === 39) {
    rat.newX = rat.x + tileSize;
    rat.newY = rat.y;
  }
  if (e.keyCode === 40) {
    rat.newY = rat.y + tileSize;
    rat.newX = rat.x;
  }
  checkColl();
};

window.onload = function () {
  drawMap(map);
  drawRat(0, 0);
  getPlayerName();
};
