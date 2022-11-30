export default class Text {
    constructor(text, x, y, alignment, color, size) {
        this.text = text
        this.x = x
        this.y = y
        this.alignment = alignment
        this.color = color
        this.size = size
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.font = this.size + "px sans-serif"
        ctx.textAlign = this.alignment
        ctx.fillText(this.text, this.x, this.y)
        ctx.closePath()
    }
}