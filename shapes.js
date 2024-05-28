export class Square {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = width;
  }
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
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
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class CustomObject {
  constructor(side) {
    this.side = side;
    this.size = 25;
  }
  draw(context) {
    switch (this.side) {
      case 3:
        this.drawTriangle(context);
        break;
      case 4:
        this.drawSquare(context);
        break;
      case 5:
        this.drawPentagon(context);
        break;
      case 6:
        this.drawHexagon(context);
        break;
      case 7:
        this.drawHeptagon(context);
        break;
      case 8:
        this.drawOctagon(context);
        break;
      case 9:
        this.drawNonagon(context);
        break;
      case 10:
        this.drawDecagon(context);
    }
  }
  drawTriangle(context) {
    context.beginPath();
    context.moveTo(40, 10);
    context.lineTo(10, 40);
    context.lineTo(80, 40);
    context.lineTo(40, 10);
    context.closePath();
    context.fill();
  }
  drawSquare(context) {
    let rectangle = new Rectangle(0, 0, 50, 100);
    rectangle.draw(context);
  }
  drawPentagon(context) {
    context.beginPath();
    let xCenter = 25;
    let yCenter = 25;
    let step = (2 * Math.PI) / 5;
    let shift = (Math.PI / 180.0) * -18;
    for (let i = 0; i <= 5; i++) {
      let curStep = i * step + shift;
      context.lineTo(
        xCenter + this.size * Math.cos(curStep),
        yCenter + this.size * Math.sin(curStep)
      );
    }
    context.closePath();
    context.fill();
  }
  drawHexagon(context) {
    context.beginPath();
    let a = (2 * Math.PI) / 6;
    let x = 25;
    let y = 25;
    for (let i = 0; i < 6; i++) {
      context.lineTo(
        x + this.size * Math.cos(a * i),
        y + this.size * Math.sin(a * i)
      );
    }
    context.closePath();
    context.fill();
  }
  drawHeptagon(context) {
    context.beginPath();
    let a = (2 * Math.PI) / 7;
    for (let i = 0; i < 7; i++) {
      context.lineTo(
        25 + this.size * Math.cos(a * i),
        25 + this.size * Math.sin(a * i)
      );
    }
    context.closePath();
    context.fill();
  }
  drawOctagon(context) {
    context.beginPath();
    let a = (2 * Math.PI) / 8;
    for (let i = 0; i < 8; i++) {
      context.lineTo(
        25 + this.size * Math.cos(a * i),
        25 + this.size * Math.sin(a * i)
      );
    }
    context.closePath();
    context.fill();
  }
  drawNonagon(context) {
    context.beginPath();
    let a = (2 * Math.PI) / 9;
    for (let i = 0; i < 9; i++) {
      context.lineTo(
        25 + this.size * Math.cos(a * i),
        25 + this.size * Math.sin(a * i)
      );
    }
    context.closePath();
    context.fill();
  }
  drawDecagon(context) {
    context.beginPath();
    let a = (2 * Math.PI) / 10;
    for (let i = 0; i < 10; i++) {
      context.lineTo(
        25 + this.size * Math.cos(a * i),
        25 + this.size * Math.sin(a * i)
      );
    }
    context.closePath();
    context.fill();
  }
}
