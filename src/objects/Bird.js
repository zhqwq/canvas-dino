export default class Bird {
    constructor(spriteImage, x, y, w, h, i) {
        this.spriteImage = spriteImage
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.i = i

        this.dx = -gameSpeed
    }

    update() {
        this.x += this.dx
        this.draw()
        this.dx = -gameSpeed
    }

    draw() {
        ctx.beginPath()
        // first source rectangle and then destination rectangle
        ctx.drawImage(this.spriteImage, this.i * this.w, 0, this.w, this.h, this.x, this.y, this.w, this.h)
        ctx.closePath()
    }
}