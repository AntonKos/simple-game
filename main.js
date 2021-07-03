const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const highScoreBoard = document.querySelector('.highScore')
canvas.width = 600
canvas.height = 600
let arrayOfIndexes = []
let gameSpeed = 2
let explosionQuantity = 3
let aX
let aY
let score = 0

let highScore = localStorage.getItem('game1HighScore') || 0
highScoreBoard.textContent = 'HIGH SCORE: ' + highScore
    //let counter = 0
let counterBullets = 0
let n = 9
let originalwidth = 34
let originalHeight = 34
let z = 0
let counterSpace = 3
let levelBullets = 20
intervalBullets = 0.5
let lastFire = Date.now();
const gradient = ctx.createLinearGradient(0, 0, 0, 70)
let button = document.querySelector('.startButton')
let timeOfAnimation = 30

gradient.addColorStop('0.4', 'red')
gradient.addColorStop('0.5', 'yellow')
gradient.addColorStop('0.55', 'blue')
gradient.addColorStop('0.6', 'yellow')
gradient.addColorStop('0.9', 'red')
const explosion = new Image()
explosion.src = 'bang.png'

const bang = new Image()
bang.src = 'bangShip.png'

const background = new Image()
background.src = 'SpaceBackGround.jpg'
const BG = {
    x: 0,
    y1: -1,
    y2: canvas.height,
    width: canvas.width,
    height: canvas.height
}

function checkHighScore() {
    if (score > localStorage.getItem('game1HighScore')) {
        localStorage.setItem('game1HighScore', score)
        highScore = score
        highScoreBoard.textContent = 'HIGH SCORE: ' + highScore
    }
}

function handleBackground() {
    if (BG.y1 >= BG.height - gameSpeed) BG.y1 = -BG.height
    else BG.y1 += gameSpeed - 1
    if (BG.y2 >= BG.height - gameSpeed) BG.y2 = -BG.height
    else BG.y2 += gameSpeed - 1
    ctx.drawImage(background, BG.x, BG.y1, BG.width, BG.height)
    ctx.drawImage(background, BG.x, BG.y2, BG.width, BG.height)
}
function showGameStat(){
    ctx.fillStyle = gradient
    ctx.font = '40px Georgia'
    ctx.strokeText(score, 450, 40)
    ctx.fillText(score, 450, 40)
}

function checkZ(){
    if (z % 7 === 0) {
        if (frameX === 0) {
            frameX = 1
        } else if (frameX === 1) {
            frameX = 2
        } else if (frameX === 2) {
            frameX = 0
        }
    }
    if (z % levelBullets === 0 && !correctA) {
        handleAliensBullets()
    }
}

function animate() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    counterSpace++
    checkHighScore()
    handleBackground()
    showGameStat()
    ship.move()
    ship.draw()
    for (let i = 0; i < bulletsArray.length; i++) {
        bulletsArray[i].move()
        bulletsArray[i].draw()
    }
    checkCollision()
    for (let i = 0; i < aliensArray.length; i++) {
        if (aliensArray[i] !== null) {
            aliensArray[i].draw()
        }
    }
    aliensMove()
    checkIndex()
    if (n < 9) {
        ctx.drawImage(explosion, originalwidth * n, 0, originalwidth, originalHeight,
            aX + 5, aY + 5, originalwidth, originalHeight)
        n++
    }
    z++
    checkZ()
    
    for (let i = 0; i < aliensBulletsArray.length; i++) {
        aliensBulletsArray[i].move()
        aliensBulletsArray[i].draw()
    }
    checkNull()
    checkCollisionWithAliensBullet()
    checkCollisionWithShip()
    let timerId = setTimeout(animate, timeOfAnimation)
}
animate()


/*
function gameOver() {

    ctx.fillStyle = 'white'
    ctx.font = '40px Georgia'
    ctx.strokeText('game over', canvas.width / 2, canvas.height / 2)
    ctx.fillText('game over', canvas.width / 2 - 100, canvas.height / 2)
    ctx.fillStyle = 'white'
    ctx.font = '15px Georgia'
    ctx.strokeText('click start to play again', canvas.width / 2 + 10, canvas.height / 2 + 50)
    ctx.fillText('click start to play again', canvas.width / 2 - 100 + 10, canvas.height / 2 + 50)
    again()
    button.addEventListener('click', animate)
    clearTimeout(timerId)
}
*/

function checkNull() {
    if (aliensArray.every(function(element) {
            return (element === null)
        })) {
        ctx.fillStyle = 'white'
        ctx.font = '40px Georgia'
        ctx.strokeText('you are a winner!', canvas.width / 2, canvas.height / 2)
        ctx.fillText('you are a winner!', canvas.width / 2 - 150, canvas.height / 2)
        correctA = true
    }
}

function checkCollision() {
    for (let i = 0; i < bulletsArray.length; i++) {
        for (let y = 0; y < aliensArray.length; y++) {
            if (aliensArray[y] !== null) {
                if (bulletsArray[i].x > aliensArray[y].x &&
                    bulletsArray[i].x < aliensArray[y].x + aliensArray[y].width &&
                    bulletsArray[i].y > aliensArray[y].y &&
                    bulletsArray[i].y < aliensArray[y].y + aliensArray[y].height
                ) {
                    arrayOfIndexes.push(y)
                    bulletsArray[i].x = 700
                    aX = aliensArray[y].x
                    aY = aliensArray[y].y
                }
            }
        }
    }
}

function checkIndex() {
    for (let i = 0; i < aliensArray.length; i++) {
        for (let y = 0; y < arrayOfIndexes.length; y++) {
            if (i === arrayOfIndexes[y]) {
                arrayOfIndexes.splice(0)
                aliensArray[i] = null
                n = 0
                score++
                levelBullets -= intervalBullets
                horisontalSpeed += 0.09
            }
        }
    }
}

function checkCollisionWithAliensBullet() {
    for (let i = 0; i < aliensBulletsArray.length; i++) {
        if (aliensBulletsArray[i].x > ship.x &&
            aliensBulletsArray[i].x < ship.x + ship.width &&
            aliensBulletsArray[i].y > ship.y &&
            aliensBulletsArray[i].y < ship.y + ship.width
        ) {
            ctx.drawImage(bang, 0, 0, 128, 129,
                aliensBulletsArray[i].x - 15, aliensBulletsArray[i].y - 10, 40, 40)
                gameOverLose()
        }
    }
}

function checkCollisionWithShip() {
    for (let i = 0; i < aliensArray.length; i++) {
        if (aliensArray[i] !== null) {
            checkCollisionWithBottom(aliensArray[i])
        }
        if (aliensArray[i] !== null && aliensArray[i].x + aliensArray[i].width / 2 > ship.x &&
            aliensArray[i].x + aliensArray[i].width / 2 < ship.x + ship.width &&
            aliensArray[i].y + aliensArray[i].height / 2 > ship.y &&
            aliensArray[i].y + aliensArray[i].height / 2 < ship.y + ship.width
        ) {
            ctx.drawImage(bang, 0, 0, 128, 129,
                aliensArray[i].x, aliensArray[i].y, 40, 40)
                gameOverLose()

        }
    }
}

function checkCollisionWithBottom(alien) {
    if (alien.y > canvas.height) {
        gameOverLose()
    }
}

window.addEventListener('keyup', function(e) {
    if (e.code === 'Space' && Date.now() - lastFire > 1000) {
        handleBullets()
        lastFire = Date.now();
    }
})



function gameOverWin() {
    showYouWin()
    cancelAnimationFrame(requestId)
}

function gameOverLose() {
    showYouLose()
    cancelAnimationFrame(requestId)
}
restart.addEventListener('click', function() {
    location.reload()
})
function showYouWin(){
    gameover.style.display = 'block'
    youwon.style.display = 'block'   
}

function showYouLose(){  
    gameover.style.display = 'block'
    youlose.style.display = 'block'
}