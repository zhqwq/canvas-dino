export default class Horizon {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    draw() {
        ctx.beginPath()
        ctx.drawImage(images['HORIZON'], this.x, this.y)
        ctx.closePath()
    }
}