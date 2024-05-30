import { Square, Rectangle, CustomObject } from './shapes.js';

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let square = document.querySelector('.square');
let rect = document.querySelector('.rect');
let custom = document.querySelector('.sides');
square.addEventListener('click', createSquare);
rect.addEventListener('click', createRectangle);
custom.addEventListener('change', createCustomObject);
let objects = [];
let is_moving = false;
let grabbedObject = null;

canvas.style.background = 'rgb(186, 186, 165)';
canvas.width = 500;
canvas.height = 500;
context.fillStyle = 'gray';

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
  for (let object of objects) {
    if (grabbedObject === object) continue;
    stickObjects(grabbedObject, object);
    drawUpdatedShapes();
  }
}

function collisionDetection(newX, newY) {
  if (grabbedObject === null) return;
  for (let object of objects) {
    if (grabbedObject === object) continue;
    if (grabbedObject.isOverlap(object, newX, newY)) {
      return;
    }
  }
  grabbedObject.moveBy(newX, newY);
  drawUpdatedShapes();
  // stickingDetection();
}

function drawUpdatedShapes() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let object of objects) {
    object.draw(context, object.side);
  }
}

let mouseDown = (event) => {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  for (let object of objects) {
    if (object.isClicked(x, y)) {
      grabbedObject = object;
      is_moving = true;
      return;
    }
  }
};

let mouseMove = (event) => {
  if (is_moving) {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const newX = event.clientX - rect.left;
    const newY = event.clientY - rect.top;
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
  console.log(customObj);
  customObj.draw(context);
  drawUpdatedShapes();
}
