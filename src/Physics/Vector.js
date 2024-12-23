export class Vector {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    addScalar(scalar) {
        return new Vector(this.x + scalar, this.y + scalar, this.z + scalar);
    }

    multiply(vector) {
        return new Vector(this.x * vector.x, this.y * vector.y, this.z * vector.z);
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    divideVector(vector) {
        return new Vector(this.x / vector.x, this.y / vector.y, this.z / vector.z);
    }

    scale(scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    divide(scalar) {
        return new Vector(this.x / scalar, this.y / scalar, this.z / scalar);
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    squareMagnitude() {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }

    normalize() {
        const mag = this.magnitude();
        if (mag === 0) return new Vector(0, 0, 0);
        return this.scale(1 / mag);
    }
}