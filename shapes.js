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
  isOverlap(object2, newX, newY) {
    if (
      newX + this.width > object2.x &&
      newX < object2.x + object2.width &&
      newY + this.height > object2.y &&
      newY < object2.y + object2.height
    ) {
      return true;
    }
    return false;
  }
  moveBy(x, y) {
    this.x = x;
    this.y = y;
  }
}
export class Figure {
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
  isOverlap(object2, newX, newY) {
    if (
      newX + this.width > object2.x &&
      newX < object2.x + object2.width &&
      newY + this.height > object2.y &&
      newY < object2.y + object2.height
    ) {
      return true;
    }
    return false;
  }
  moveBy(x, y) {
    this.x = x;
    this.y = y;
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
  isOverlap(object2, newX, newY) {
    if (
      newX + this.width > object2.x &&
      newX < object2.x + object2.width &&
      newY + this.height > object2.y &&
      newY < object2.y + object2.height
    ) {
      return true;
    }
    return false;
  }
  moveBy(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class CustomObject {
  constructor(side) {
    this.side = side;
    this.size = 25;
    this.x = 25;
    this.y = 25;
    this.vertices = [];
    this.edges = [];
  }
  draw(context) {
    if (this.vertices.length > 0) {
      this.vertices = [];
    }
    context.beginPath();
    let a = (2 * Math.PI) / this.side;
    for (let i = 0; i < this.side; i++) {
      let verticeX = this.x + this.size * Math.cos(a * i);
      let verticeY = this.y + this.size * Math.sin(a * i);
      context.lineTo(verticeX, verticeY);
      this.vertices.push({ x: verticeX, y: verticeY });
    }
    context.closePath();
    context.fill();
  }
  buildEdges() {
    if (this.edges.length > 0) this.edges = [];
    for (let i = 0; i < this.vertices.length; i++) {
      const a = this.vertices[i];
      let b = this.vertices[0];
      if (i + 1 < this.vertices.length) {
        b = this.vertices[i + 1];
      }
      this.edges.push({
        x: b.x - a.x,
        y: b.y - a.y,
      });
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
  isClicked(x, y) {
    let cnt = 0;
    for (let i = 0; i < this.vertices.length; i++) {
      let j = (i + 1) % this.vertices.length;
      const xi = this.vertices[i].x,
        yi = this.vertices[i].y;
      const xj = this.vertices[j].x,
        yj = this.vertices[j].y;
      if (yi > y != yj > y && x < (xj - xi) * ((y - yi) / (yj - yi)) + xi) {
        cnt++;
      }
    }
    return cnt % 2 === 1;
  }
  projectInAxis(x, y, newX, newY) {
    let min = 10000000000;
    let max = -10000000000;
    for (let i = 0; i < this.vertices.length; i++) {
      let px = this.vertices[i].x;
      let py = this.vertices[i].y;
      var projection = (px * x + py * y) / Math.sqrt(x * x + y * y);
      if (projection > max) {
        max = projection;
      }
      if (projection < min) {
        min = projection;
      }
    }
    return { min, max };
  }
  moveBy(x, y) {
    this.x = x;
    this.y = y;
  }
  intervalDistance(minA, maxA, minB, maxB) {
    if (minA < minB) {
      return minB - maxA;
    }
    return minA - maxB;
  }
  isOverlap(object2, newX, newY) {
    const originX = this.x;
    const originY = this.y;
    this.moveBy(newX, newY);
    this.buildEdges();
    object2.buildEdges();
    const totalEdges = [];
    for (let i = 0; i < this.edges.length; i++) {
      totalEdges.push(this.edges[i]);
    }
    for (let i = 0; i < object2.edges.length; i++) {
      totalEdges.push(object2.edges[i]);
    }
    for (let i = 0; i < totalEdges.length; i++) {
      const length = Math.sqrt(
        totalEdges[i].y * totalEdges[i].y + totalEdges[i].x * totalEdges[i].x
      );
      const axis = {
        x: -totalEdges[i].y / length,
        y: totalEdges[i].x / length,
      };
      const { min: minA, max: maxA } = this.projectInAxis(
        axis.x,
        axis.y,
        newX,
        newY
      );
      const { min: minB, max: maxB } = object2.projectInAxis(
        axis.x,
        axis.y,
        0,
        0
      );
      console.log(minA, maxA, minB, maxB);
      if (this.intervalDistance(minA, maxA, minB, maxB) > 0) {
        this.moveBy(originX, originY);
        return false;
      }
    }
    return true;
  }
}
