let aliensBulletsArray = []
let correctA = false

function searchAliens(randomNumber) {

    if (aliensArray[randomNumber] !== null) {
        return true
    } else {
        return false
    }
}

class aliensBullet {
    constructor() {
        this.correct = correctA
        this.x = 0
        this.y = 0
        this.width = 2
        this.height = 5
    }
    search() {
        this.correct = correctA
        let i = 0
        while (this.correct === false) {
            let number = Math.floor(Math.random() * 35)
            let result = searchAliens(number)
            if (result) {
                this.x = aliensArray[number].x + 20
                this.y = aliensArray[number].y + 40
                this.correct = true
            }
            i++
        }
    }
    move() {
        this.y += 10
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function handleAliensBullets() {
    let bullet = new aliensBullet()
    bullet.search()
    aliensBulletsArray.unshift(bullet)
    if (aliensBulletsArray.length > 60) {
        for (let i = 0; i < 10; i++) {
            aliensBulletsArray.pop(aliensBulletsArray[i])
        }
    }
}