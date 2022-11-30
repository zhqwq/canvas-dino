export default class GameOverPanel {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 382
        this.height = 24
    }

    draw() {
        ctx.beginPath()
        ctx.drawImage(images["TEXT_SPRITE"], 0, this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        ctx.drawImage(images["RESTART"], this.x + 150, this.y + 64, 72, 64)
        ctx.closePath()
    }
}