export class Figure {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.AUTOSTICKING_DISTANCE = 10;
  }
  draw(context) {
    context.fillStyle = 'gray';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  isClicked(x, y) {
    return (
      this.x < x &&
      this.x + this.width > x &&
      this.y < y &&
      this.y + this.height > y
    );
  }
  isOverlap(object2, newX, newY) {
    return (
      newX + this.width > object2.x &&
      newX < object2.x + object2.width &&
      newY + this.height > object2.y &&
      newY < object2.y + object2.height
    );
  }
  moveBy(x, y) {
    this.x = x;
    this.y = y;
  }
  stickObjects(object) {
    const distanceToRight = object.x - (this.x + this.width);
    const distanceToBottom = object.y - (this.y + this.height);
    const distanceToTop = this.y - (object.y + object.height);
    const distanceToLeft = this.x - (object.x + object.width);

    if (Math.abs(distanceToRight) <= AUTOSTICKING_DISTANCE) {
      this.x += distanceToRight;
    } else if (Math.abs(distanceToBottom) <= AUTOSTICKING_DISTANCE) {
      this.y += distanceToBottom;
    } else if (Math.abs(distanceToLeft) <= AUTOSTICKING_DISTANCE) {
      this.x -= distanceToLeft;
    } else if (Math.abs(distanceToTop) <= AUTOSTICKING_DISTANCE) {
      this.y -= distanceToTop;
    }
  }
}
export class Square extends Figure {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }
}

export class Rectangle extends Figure {
  constructor(x, y, width, height) {
    super(x, y, width, height);
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
    const a = (2 * Math.PI) / this.side;

    for (let i = 0; i < this.side; i++) {
      const verticeX = this.x + this.size * Math.cos(a * i);
      const verticeY = this.y + this.size * Math.sin(a * i);
      context.lineTo(verticeX, verticeY);
      this.vertices.push({ x: verticeX, y: verticeY });
    }

    context.closePath();
    context.fill();
  }

  buildEdges() {
    if (this.edges.length > 0) {
      this.edges = [];
    }

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
    let count = 0;
    for (let i = 0; i < this.vertices.length; i++) {
      let j = (i + 1) % this.vertices.length;
      const xi = this.vertices[i].x;
      const yi = this.vertices[i].y;
      const xj = this.vertices[j].x;
      const yj = this.vertices[j].y;
      const checkClickingOnY = yi > y != yj > y;
      const checkClickingOnX = (xj - xi) * ((y - yi) / (yj - yi)) + xi;
      if (checkClickingOnY && x < checkClickingOnX) {
        count++;
      }
    }
    return count % 2 === 1;
  }

  projectInAxis(x, y) {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;

    for (let i = 0; i < this.vertices.length; i++) {
      const px = this.vertices[i].x;
      const py = this.vertices[i].y;
      let projection = (px * x + py * y) / Math.sqrt(x * x + y * y);

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
    const dx = x - this.x;
    const dy = y - this.y;
    this.x = x;
    this.y = y;
    this.vertices = this.vertices.map((vertex) => ({
      x: vertex.x + dx,
      y: vertex.y + dy,
    }));
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
    const totalEdges = [];

    this.moveBy(newX, newY);
    this.buildEdges();
    object2.buildEdges();

    for (let i = 0; i < this.edges.length; i++) {
      totalEdges.push(this.edges[i]);
    }

    for (let i = 0; i < object2.edges.length; i++) {
      totalEdges.push(object2.edges[i]);
    }

    for (let i = 0; i < totalEdges.length; i++) {
      const lengthEdgeVector = Math.sqrt(
        totalEdges[i].y * totalEdges[i].y + totalEdges[i].x * totalEdges[i].x
      ); //chto za length
      const axis = {
        x: -totalEdges[i].y / lengthEdgeVector,
        y: totalEdges[i].x / lengthEdgeVector,
      };

      const { min: minA, max: maxA } = this.projectInAxis(axis.x, axis.y);
      const { min: minB, max: maxB } = object2.projectInAxis(axis.x, axis.y);
      const distance = this.intervalDistance(minA, maxA, minB, maxB);

      if (distance > 0) {
        this.moveBy(originX, originY);
        return false;
      }
    }
    return true;
  }
}
