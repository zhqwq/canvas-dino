export default class Cloud {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 92
        this.height = 28

        this.dx = -0.3 * gameSpeed
    }

    draw() {
        ctx.beginPath()
        ctx.drawImage(images['CLOUD'], this.x, this.y, this.width, this.height)
        ctx.closePath()
    }

    update() {
        this.x += this.dx
        this.draw()
        this.dx = -0.3 * gameSpeed
    }
}