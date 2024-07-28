from adafruit_circuitplayground import cp
import time
import random

#Define colors
pink = (12,10,12)
gold = (50, 40, 5)
blue = (0,0,8)
orange = (25, 10, 0)
blank = (0,0,0)
grn = (0,20,0)
green  = (0,40,10)
red = (20,0,0)
white = (20,20,20)

Tie = (40,0,50)
Ship = green

stars = [blank,blue,white,Tie]
color = [red,orange,gold,green,blue,white,pink]

ffire = [5, 6, 7]
rfire = [4, 3, 2]
cosmos = []
def mkstars(num):
    kosmos = []
    for i in range(num):
        if (4 > random.randrange(10)) :
            kosmos.append(random.randrange(3)+1)
        else:
            kosmos.append(0)
    return(kosmos)

def cycle(x):
    for i in range(x*10):
        cp.pixels[i%10] = random.choice(color)
        time.sleep(.1)


def blinknum(num,color):
    if num != 0:
        for i in range(num):
            cp.pixels.fill(color)
            time.sleep(.25)
            cp.pixels.fill(blank)
            time.sleep(.10)
    else:
        for i in range(10):
            cp.pixels[i] = color
            cp.pixels.show()
            time.sleep(.14)

        cp.pixels.fill(blank)

dir = 1
global score
score = 0
cosmos = mkstars(100)

def fire(dir):
    hit = 0
    if dir == 1:
        for i in ffire:
            cp.pixels[i] = gold
            time.sleep(.1)
            if cosmos[i] == 3:
                hit = 1
                cosmos[i] = 0
        for i in ffire:
            cp.pixels[i]=blank
    else:
        for i in rfire:
            cp.pixels[i] = gold
            time.sleep(.1)
            if cosmos[i] == 3:
                hit = 1
                cosmos[i] = 0
        for i in rfire:
            cp.pixels[i]=blank
    return hit

def showsky():
    ouch = 0
    cp.pixels.fill(blank)
    for i in range(10):
        cp.pixels[i]= stars[cosmos[i]]

    #display x-wing
    if dir == 1:
        cp.pixels[4] = green
        if cosmos[4] == 3:
            cp.pixels.fill(red)
            ouch = 1
            cosmos[4] = 0
    else:
        cp.pixels[5] = green
        if cosmos[5] == 3:
            cp.pixels.fill(red)
            ouch = 1
            cosmos[5] = 0
    time.sleep(.2)
    return ouch

def mvsky(dir,uni):
    if dir == 1:
        mvstar = uni[0]
        uni.pop(0)
        uni.append(mvstar)
    else:
        mvstar = uni[-1]
        uni.pop(-1)
        uni = [mvstar]+uni


    return uni

lives = 5


while True:
    if lives > 0:
        lives = lives - showsky()
        cosmos = mvsky(dir,cosmos)


    else:
        print("restart")
        score = 0
        lives = 5
        cycle(2)
        cosmos = mkstars(100)
        dir = 1
        blinknum(score,red)
        time.sleep(3)

    if cp.button_a:
        #fire
        print("fire")
        score = score + fire(dir)
        print ("score: " + str(score))

    if cp.button_b:
        #reverse course
        dir = dir * -1
        print("reverse")

    if cp.touch_A3:
        #restart
        print("restart")
        score = 0
        lives = 5
        cycle(2)
        cosmos = mkstars(100)
        dir = 1


    if cp.touch_A4:
        #hyperspace
        cycle(1)
        cosmos = mkstars(100)
        print("hyperspace")
