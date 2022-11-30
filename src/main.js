// objects
import Dino from './objects/Dino.js'
import Bird from './objects/Bird.js'
import Cactus from './objects/Cactus.js'
import Cloud from './objects/Cloud.js'
import GameOverPanel from './objects/GameOverPanel.js'
import Horizon from './objects/Horizon.js'
import Text from './objects/Text.js'

// utils
import { loadImages, loadSounds, randomIntInRange} from './utils/index.js'

// assets
import { imageResources,  soundsResources} from "./assets/index.js"

// params
let score = 0
let bestScore = 0
let obstacles = []
let clouds = []

// global variable
window.gravity = 0.25
window.gameSpeed = 3
window.keys = {} // keyboard mapping   
window.paused = false // is game pasued

// class instance
let scoreText
let bestScoreText
let player
let horizon
let gameOverPanel

// images and sounds
let isHDPI = true
let images = {}
let sounds = {}

// get canvas element
window.canvas = document.getElementById("game")
window.ctx = canvas.getContext("2d")

function addGameEventListener() {
    document.addEventListener('keydown', function (keyboardEvent) {
        if (paused && (keyboardEvent.code === "Space" || keyboardEvent.code === "Enter")) {
            paused = false
            start()
        } else {
            keys[keyboardEvent.code] = true
        }
    })

    document.addEventListener('keyup', function (keyboardEvent) {
        keys[keyboardEvent.code] = false
    })

    document.addEventListener("click", function (MouseEvent) {
        if (paused) {
            paused = false
            start()
        }
    })

    document.addEventListener("resize", function (UIEvent) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight/2;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    })
}

function spawnObstacle() {
    let largeCactusWidth = 100
    let largeCactusHeight = 100
    let smallCactusWidth = 34
    let smallCactusHeight = 70
    let birdWidth = 79
    let birdHeight = 56

    let type = randomIntInRange(1, 3)

    let obstacle
    if (type == 1) {
        obstacle = new Cactus(images['CACTUS_LARGE'], canvas.width + largeCactusWidth, canvas.height - largeCactusHeight, largeCactusWidth, largeCactusHeight, randomIntInRange(0, 2))
    } else if(type == 2) {
        obstacle = new Cactus(images['CACTUS_SMALL'], canvas.width + smallCactusWidth, canvas.height - smallCactusHeight, smallCactusWidth, smallCactusHeight, randomIntInRange(0, 5))
    } else {
        obstacle = new Bird(images["PTERODACTYL"], canvas.width + birdWidth, canvas.height - birdHeight - randomIntInRange(0.7 * birdHeight, 1.6 * birdHeight), birdWidth, birdHeight, 0)
    }

    obstacles.push(obstacle)
}

function spawnCloud() {
    const cloudWidth = 92
    const cloudHeight = 28
    let cloud = new Cloud(canvas.width + cloudWidth, canvas.height / 2 - randomIntInRange(cloudHeight, canvas.height / 2))
    clouds.push(cloud)
}

function start() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight/2

    ctx.font = "20px sans-serif"

    images = loadImages(imageResources, isHDPI)
    sounds = loadSounds(soundsResources)

    player = new Dino(25, canvas.height - 600)
    horizon = new Horizon(0, canvas.height - 24)
    
    if (localStorage.getItem("bestScore")) {
        bestScore = localStorage.getItem("bestScore")
    }

    scoreText = new Text("Score: " + score, 10, 25, "left", "#212121", "20")
    bestScoreText = new Text("Best Score: " + bestScore, canvas.width - 25, 25, "right", "#212121", 20)

    gameOverPanel = new GameOverPanel(canvas.width / 2 - 180, canvas.height - 300)

    requestAnimationFrame(update)
}

let initialSpawnTimer = 200
let spawnTimer = initialSpawnTimer

// update the game's canvas
function update() {
    // clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // spawn obstacles
    spawnTimer = spawnTimer - 0.5
    if (spawnTimer <= 0) {
        spawnObstacle()
        spawnCloud()
        spawnTimer = initialSpawnTimer - gameSpeed * 8

        if (spawnTimer < 60) {
            spawnTimer = 60
        }
    }

    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i]
        if (o.x + o.width < 0) {
            // delete if obstacle is out of screen, otherwise obstacles will have more and more items
            obstacles.splice(i, 1)
        }

        // collision detect
        if (player.x < o.x + o.w && player.x + player.width > o.x && player.y < o.y + o.h && player.y + player.height > o.y) {
            paused = true
            obstacles = []
            score = 0
            spawnTimer = initialSpawnTimer
            gameSpeed = 2
            gameOverPanel.draw()

            player.i = 5 // show died trex
            player.draw()

            sounds["HIT"].play()

            localStorage.setItem("bestScore", bestScore) // store best score to localStorage
            break;
        }

        o.update()
    }

    for (let i = 0; i < clouds.length; i++) {
        let cloud = clouds[i]
        if (cloud.x + cloud.width < 0) {
            clouds.splice(i, 1)
        }

        cloud.update()
    }

    player.animate()

    horizon.draw()

    score += 0.01
    scoreText.text = "Score: " + score
    scoreText.draw()

    if (score != 0 && score % 2000 == 0) {
        sounds["SCORE"].play()
    }

    if (score > bestScore) {
        bestScore = score
        bestScoreText.text = "Best Score: " + bestScore
    }

    bestScoreText.draw()

    gameSpeed += 0.0005

    if (!paused) requestAnimationFrame(update)
}

addGameEventListener()

// start the game
start()
