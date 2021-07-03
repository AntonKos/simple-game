let aliensArray = []
let x = 30
let y = 60
let direction = 'left'
let previousDirection = 'left'
let amountOfAliens = 35
let horisontalSpeed = 2
let verticalSpeed = 5
const alienSprite = new Image()
alienSprite.src = 'invaders1.png'
let frameY = 0
let frameX = 0

class Alien {
    constructor() {
        this.space = 10 //расстояние между aliens
        this.x = x
        this.y = y
        this.width = 40
        this.height = 40
        this.originalWidth = 91.75
        this.originalHeight = 66.5
        this.width = this.originalWidth - 51.74
        this.height = this.originalHeight - 26.5
        this.frameY = frameY
    }
    draw() {
        ctx.drawImage(alienSprite, frameX * this.originalWidth, this.frameY * this.originalHeight, this.originalWidth,
            this.originalHeight, this.x, this.y, this.width,
            this.height)
    }
}

function handleAliens() {
    for (let i = 0; i < amountOfAliens; i++) {
        let alien = new Alien()
        x += (alien.space + alien.width)
        if (x > 350) {
            if (frameY > 2) {
                frameY
            } else {
                frameY++
            }
            x = alien.space + 20
            y += alien.space + alien.height
        }
        aliensArray.push(alien)
    }
}

handleAliens()

function aliensMove() {
    if (direction === 'right') {
        for (let i = 0; i < aliensArray.length; i++) {

            if (aliensArray[i] !== null) {
                aliensArray[i].x += horisontalSpeed
            }
        }
    } else if (direction === 'left') {
        for (let i = 0; i < aliensArray.length; i++) {
            if (aliensArray[i] !== null) {
                aliensArray[i].x -= horisontalSpeed
            }
        }
    }
    for (let i = 0; i < aliensArray.length; i++) {
        if (aliensArray[i] !== null) {
            if (aliensArray[i].x < 1) {
                for (let i = 0; i < aliensArray.length; i++) {
                    if (aliensArray[i] !== null) {
                        aliensArray[i].y += verticalSpeed
                    }
                }
                direction = 'right'
            }
            if (aliensArray[i].x > canvas.width - aliensArray[i].width) {
                for (let i = 0; i < aliensArray.length; i++) {
                    if (aliensArray[i] !== null) {
                        aliensArray[i].y += verticalSpeed
                    }
                }
                direction = 'left'
            }
        }
    }
}