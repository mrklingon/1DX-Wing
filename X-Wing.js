function showBigSky () {
    for (let index = 0; index <= 19; index++) {
        strip.setPixelColor(10 + index, stars[cosmos[index]])
    }
    for (let index = 0; index <= 9; index++) {
        strip.setPixelColor(index, stars[cosmos[89 + index]])
    }
    if (dir == 1) {
        strip.setPixelColor(13, 0x00ff00)
    } else {
        strip.setPixelColor(14, 0x00ff00)
    }
}
function showSky () {
    for (let index = 0; index <= 9; index++) {
        light.setPixelColor(index, stars[cosmos[index]])
    }
    if (dir == 1) {
        light.setPixelColor(4, 0x00ff00)
        if (3 == cosmos[4]) {
            music.baDing.play()
            lives += -1
            cosmos[4] = 0
        }
    } else {
        light.setPixelColor(5, 0x00ff00)
        if (3 == cosmos[5]) {
            music.baDing.play()
            lives += -1
            cosmos[5] = 0
        }
    }
}
function mkStars (stars: number) {
    cosmos = []
    for (let i = 0; i < stars; i++) {
        if (4 > Math.randomRange(0, 10)) {
            cosmos.push(Math.randomRange(1, 3))
        } else {
            cosmos.push(0)
        }
    }
}
function restart () {
    score = 0
    lives = 5
    nothing = light.rgb(0, 0, 0)
    Tie = light.rgb(72, 0, 72)
    bstar = light.rgb(0, 0, 25)
    wstar = light.rgb(25, 25, 25)
    stars = [nothing, bstar, wstar, Tie]
    dir = 1
    ffire = [5, 6, 7]
    rfire = [4, 3, 2]
    mkStars(100)
}
input.buttonA.onEvent(ButtonEvent.Click, function () {
    music.pewPew.play()
    if (dir == 1) {
        for (let value of ffire) {
            light.setPixelColor(value, 0xffff00)
            strip.setPixelColor(10 + value, 0xffff00)
            if (3 == cosmos[value]) {
                music.playTone(175, music.beat(BeatFraction.Half))
                cosmos[value] = 0
                score += 1
            }
            pause(50)
        }
        for (let value of ffire) {
            light.setPixelColor(value, 0x000000)
            strip.setPixelColor(10 + value, 0x000000)
            pause(50)
        }
    } else {
        for (let value of rfire) {
            light.setPixelColor(value, 0xffff00)
            strip.setPixelColor(10 + value, 0xffff00)
            if (3 == cosmos[value]) {
                music.playTone(175, music.beat(BeatFraction.Half))
                cosmos[value] = 0
                score += 1
            }
            pause(50)
        }
        for (let value of rfire) {
            light.setPixelColor(value, 0x000000)
            strip.setPixelColor(10 + value, 0x000000)
            pause(50)
        }
    }
})
input.onSwitchMoved(SwitchDirection.Right, function () {
    music.setVolume(0)
})
input.onSwitchMoved(SwitchDirection.Left, function () {
    music.setVolume(140)
})
input.touchA4.onEvent(ButtonEvent.Click, function () {
    light.showAnimation(light.sparkleAnimation, 500)
    strip.showAnimation(light.sparkleAnimation, 500)
    nothing = light.rgb(0, 0, 0)
    Tie = light.rgb(72, 0, 72)
    bstar = light.rgb(0, 0, 25)
    wstar = light.rgb(25, 25, 25)
    stars = [nothing, bstar, wstar, Tie]
    dir = 1
    ffire = [5, 6, 7]
    rfire = [4, 3, 2]
    mkStars(100)
})
input.buttonB.onEvent(ButtonEvent.Click, function () {
    dir = dir * -1
})
input.touchA3.onEvent(ButtonEvent.Click, function () {
    restart()
})
let mv = 0
let cosmos: number[] = []
let rfire: number[] = []
let ffire: number[] = []
let dir = 0
let stars: number[] = []
let wstar = 0
let bstar = 0
let Tie = 0
let nothing = 0
let lives = 0
let score = 0
let strip: light.NeoPixelStrip = null
strip = light.createStrip(pins.A1, 30)
score = 0
lives = 5
nothing = light.rgb(0, 0, 0)
Tie = light.rgb(72, 0, 72)
bstar = light.rgb(0, 0, 25)
wstar = light.rgb(25, 25, 25)
stars = [nothing, bstar, wstar, Tie]
dir = 1
ffire = [5, 6, 7]
rfire = [4, 3, 2]
mkStars(100)
forever(function () {
    if (lives > 0) {
        showSky()
        showBigSky()
        if (dir == 1) {
            mv = cosmos.shift()
            cosmos.push(mv)
        } else {
            mv = cosmos.pop()
            cosmos.insertAt(0, mv)
        }
        pause(200)
    } else {
        if (score >= 10) {
            music.magicWand.play()
            light.setAll(0xff0000)
            pause(3000)
            restart()
        }
        for (let index = 0; index <= score - 1; index++) {
            light.setPixelColor(index, 0xff0000)
        }
        light.setAll(0x000000)
    }
})
