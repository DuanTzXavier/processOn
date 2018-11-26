export class Point{
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    toString() {
        return this.x + this.y
    }
}

var point = new Point(1, 2)
console.log(point.toString())