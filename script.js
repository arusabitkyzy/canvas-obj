import { Square, Rectangle, CustomObject } from './shapes.js';
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let buttons = document.querySelector('.buttons');
let square = document.querySelector('.square');
let rect = document.querySelector('.rect');
let custom = document.querySelector('.sides');
square.addEventListener('click', createSquare);
rect.addEventListener('click', createRectangle);
custom.addEventListener('change', createCustomObject);
let computedStyle = getComputedStyle(buttons, null);
let objects = [];
let is_moving = false;
let grabbedObject = null;
canvas.style.background = 'rgb(186, 186, 165)';
canvas.width = 950;
canvas.height = 300;
context.fillStyle = 'gray';

function isOverlap(object1, object2, newX, newY) {
  if (
    newX + object1.width > object2.x &&
    newX < object2.x + object2.width &&
    newY + object1.height > object2.y &&
    newY < object2.y + object2.height
  ) {
    return true;
  }
  return false;
}
function stickObjects(object1, object2) {
  let distanceToRight = object2.x - (object1.x + object1.width);
  let distanceToBottom = object2.y - (object1.y + object1.height);
  let distanceToTop = object1.y - (object2.y + object2.height);
  let distanceToLeft = object1.x - (object2.x + object2.width);

  if (Math.abs(distanceToRight) <= 10) {
    object1.x += distanceToRight;
  } else if (Math.abs(distanceToBottom) <= 10) {
    object1.y += distanceToBottom;
  } else if (Math.abs(distanceToLeft) <= 10) {
    object1.x -= distanceToLeft;
  } else if (Math.abs(distanceToTop) <= 10) {
    object1.y -= distanceToTop;
  }
}

function stickingDetection() {
  if (grabbedObject === null) return;
  for (let i = 0; i < objects.length; i++) {
    if (grabbedObject == i) continue;
    stickObjects(objects[grabbedObject], objects[i]);
    drawUpdatedShapes();
  }
}
function collisionDetection(newX, newY) {
  for (let i = 0; i < objects.length; i++) {
    if (grabbedObject == i) continue;
    if (isOverlap(objects[grabbedObject], objects[i], newX, newY)) {
      return;
    }
  }
  objects[grabbedObject].x = newX;
  objects[grabbedObject].y = newY;
  drawUpdatedShapes();
  stickingDetection();
}
function drawUpdatedShapes() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let object of objects) {
    object.draw(context);
  }
}
function isClickedOnObject(x, y, object) {
  if (
    object.x < x &&
    object.x + object.width > x &&
    object.y < y &&
    object.y + object.height > y
  ) {
    return true;
  }
  return false;
}

function formatSidebarWidth() {
  let sidebarWidth = computedStyle.width;
  let sidebarWidthFormatted = Math.round(
    Number(sidebarWidth.substring(0, sidebarWidth.length - 2))
  );
  return sidebarWidthFormatted;
}

let mouseDown = (event) => {
  event.preventDefault();
  let x = event.clientX - formatSidebarWidth();
  let y = event.clientY;
  for (let i = 0; i < objects.length; i++) {
    if (isClickedOnObject(x, y, objects[i])) {
      grabbedObject = i;
      is_moving = true;
      return;
    } else {
      grabbedObject = null;
      is_moving = false;
    }
  }
};
let mouseMove = (event) => {
  if (is_moving) {
    event.preventDefault();
    let newX = event.clientX - formatSidebarWidth();
    let newY = event.clientY - 50;
    collisionDetection(newX, newY);
  }
};
let mouseUp = (event) => {
  if (!is_moving) {
    return;
  }
  event.preventDefault();
  is_moving = false;
};
canvas.onmousedown = mouseDown;
canvas.onmousemove = mouseMove;
canvas.onmouseup = mouseUp;

function createSquare() {
  let square = new Square(0, 0, 50);
  for (let i = 0; i < objects.length; i++) {
    objects[i].x += 100;
  }
  objects.push(square);
  square.draw(context);
  drawUpdatedShapes();
}

function createRectangle() {
  let rectangle = new Rectangle(0, 0, 50, 100);
  for (let i = 0; i < objects.length; i++) {
    objects[i].x += 100;
  }
  objects.push(rectangle);
  rectangle.draw(context);
  drawUpdatedShapes();
}
function createCustomObject() {
  let sides = document.querySelector('.sides').value;
  let customObj = new CustomObject(+sides);
  for (let i = 0; i < objects.length; i++) {
    objects[i].x += 100;
  }
  objects.push(customObj);
  customObj.draw(context);
  drawUpdatedShapes();
}
