const shipSprite = new Image()
shipSprite.src = 'ship.png'
let moveRight = false
let moveLeft = false
let shipsSpeed = 5
let xShip = 260
let yShip = 550
class Ship {
    constructor() {
        this.x = xShip
        this.y = yShip
        this.width = 40
        this.height = 40
    }
    move() {
        if (moveLeft && this.x > 0) {
            this.x -= shipsSpeed
        }
        if (moveRight && this.x < canvas.width - this.width - 10) {
            this.x += shipsSpeed
        }
    }
    draw() {

        ctx.drawImage(shipSprite, this.x, this.y, this.width + 10,
            this.height + 10)
    }
}
let ship = new Ship()



window.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowLeft') {
        moveLeft = true
    }
    if (e.code === 'ArrowRight') {
        moveRight = true
    }
})

window.addEventListener('keyup', function(e) {
    if (e.code === 'ArrowLeft') {
        moveLeft = false
    } else if (e.code === 'ArrowRight') {
        moveRight = false
    }
})