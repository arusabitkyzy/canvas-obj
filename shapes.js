export class Square {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = width;
  }
  draw(context) {
    context.fillStyle = 'gray';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  move(x, y) {}
  isClicked(x, y) {
    if (
      this.x < x &&
      this.x + this.width > x &&
      this.y < y &&
      this.y + this.height > y
    ) {
      return true;
    }
    return false;
  }
}

export class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw(context) {
    context.fillStyle = 'gray';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  isClicked(x, y) {
    if (
      this.x < x &&
      this.x + this.width > x &&
      this.y < y &&
      this.y + this.height > y
    ) {
      return true;
    }
    return false;
  }
}

export class CustomObject {
  constructor(side) {
    this.side = side;
    this.size = 25;
    this.x = 25;
    this.y = 25;
    this.vertices = [];
  }
  draw(context) {
    switch (this.side) {
      case 3:
        this.drawTriangle(context);
        break;
      case 5:
        this.drawMultiSide(context, 5);
        break;
      case 6:
        this.drawMultiSide(context, 6);
        break;
      case 7:
        this.drawMultiSide(context, 7);
        break;
      case 8:
        this.drawMultiSide(context, 8);
        break;
      case 9:
        this.drawMultiSide(context, 9);
        break;
      case 10:
        this.drawMultiSide(context, 10);
    }
  }
  drawTriangle(context) {
    context.beginPath();
    context.moveTo(this.x + 25, 10);
    context.lineTo(this.x + 10, 40);
    context.lineTo(this.x + 50, 40);
    context.lineTo(this.x + 25, 10);
    context.closePath();
    context.fill();
  }
  drawMultiSide(context, side) {
    context.beginPath();
    let a = (2 * Math.PI) / side;
    for (let i = 0; i < side; i++) {
      let verticeX = this.x + this.size * Math.cos(a * i);
      let verticeY = this.y + this.size * Math.sin(a * i);
      context.lineTo(verticeX, verticeY);
      this.vertices.push({ x: verticeX, y: verticeY });
    }
    context.closePath();
    context.fill();
  }
  move(newX, newY) {
    this.vertices.forEach((vertex) => {
      vertex.x += newX;
      vertex.y += newY;
    });
  }
  isClicked(x, y) {
    let cnt = 0;
    for (let i = 0; i < this.vertices.length; i++) {
      let j = (i + 1) % this.vertices.length;
      console.log(this.vertices[i], ';', this.vertices[j]);
      const xi = this.vertices[i].x,
        yi = this.vertices[i].y;
      const xj = this.vertices[j].x,
        yj = this.vertices[j].y;
      if (yi > y != yj > y && x < (xj - xi) * ((y - yi) / (yj - yi)) + xi) {
        cnt++;
      }
    }
    console.log(cnt);
    return cnt % 2 === 1;
  }
}
