let bulletsArray = []
const bulletSprite = new Image()
bulletSprite.src = 'bullet.png'

class Bullet {
    constructor() {
        this.x = ship.x + ship.width / 2 - 6
        this.y = ship.y
        this.width = 50
        this.height = 50
        this.color = 'red'
    }
    move() {
        this.y -= 10
    }
    draw() {
        ctx.drawImage(bulletSprite, this.x, this.y, this.width, this.height)
    }
}

function handleBullets() {
    bulletsArray.unshift(new Bullet)
    if (bulletsArray.length > 80) {
        for (let i = 0; i < 20; i++) {
            bulletsArray.pop(bulletsArray[i])
        }
    }
}