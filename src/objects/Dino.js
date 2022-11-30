export default class Dino {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 88
        this.height = 94

        this.dy = 0
        this.jumpForce = 10
        this.originalHeight = this.height
        this.grounded = false
        this.i = 0
        
        // dino walk
        setInterval(() => {
            this.i = (this.i + 1) % 4
            if (this.i == 1) {
                this.i++
            }
        }, 60)
    }

    jump() {
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1
            this.dy = -this.jumpForce
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++
            this.dy = -this.jumpForce - (this.jumpTimer / 50)
        }
    }

    draw() {
        ctx.beginPath()
        ctx.drawImage(images["TREX"], this.i * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
        ctx.closePath()
    }

    animate() {
        // jump
        if (keys['Space'] || keys["KeyW"] || keys["ArrowUp"]) {
            this.jump()
            if(this.grounded)
                sounds["BUTTON_PRESS"].play()
        } else {
            this.jumpTimer = 0
        }

        if (keys['ControlLeft'] || keys["KeyS"] || keys["ArrowDown"]) {
            this.h = this.originalHeight / 2
        } else {
            this.h = this.originalHeight
        }

        this.y += this.dy

        // gravity
        if (this.y + this.h < canvas.height) {
            this.grounded = false
            this.dy += gravity
        } else {
            this.grounded = true
            this.dy = 0
            this.y = canvas.height - this.h
        }

        this.draw()
    }
}