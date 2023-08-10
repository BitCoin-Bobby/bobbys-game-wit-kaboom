kaboom({
    width: 1280,
    height: 720
})

loadSprite('background-1', './images/background1.jpg')
loadSprite('background-2', './images/background2.jpg')
loadSprite('background-3', './images/background3.jpg')

loadSprite('lamp', './images/Character 03/Png/Lamp_post.png')

loadSprite('portal', './images/1.png')

loadSprite('idle-sprite', './images/Character 03/Png/Character Sprite/spritesheet (3).png', {
    sliceX: 20,
    sliceY: 1,
    anims: { 'idle-anim': { from: 0, to: 19, loop: true }}
})

loadSprite('run-sprite', './images/Character 03/Png/Character Sprite/spritesheet (1).png', {
    sliceX: 8,
    sliceY: 1,
    anims: { 'run-anim': { from: 0, to: 7, loop: true }}
})
loadSprite('jump-sprite', './images/Character 03/Png/Character Sprite/spritesheet (2).png', {
    sliceX: 20,
    sliceY: 1,
    anims: { 'jump-anim': { from: 0, to: 19, loop: true }}
})
loadSprite('fall-sprite', './images/Character 03/Png/Character Sprite/spritesheet (4).png', {
    sliceX: 10,
    sliceY: 1,
    anims: { 'fall-anim': { from: 0, to: 9, loop: true }}
})

loadSprite('coin', './images/spritesheet (5).png', {
    sliceX:8,
    sliceY:1,
    anims: {'coin-anim': { from: 0, to: 7, loop: true}}
})

const fall = 1000
setGravity(1000)

scene("game", ({ score }) => {
add([
    sprite('background-1'),
    fixed(),
    scale(4)
])

loadSpriteAtlas('./images/Tiles.png', {
    'platform-left': {
        x: 440,
        y: 380,
        width: 32,
        height: 32
    },
    'platform-middle': {
        x: 520,
        y: 240,
        width: 32,
        height: 32
    },
})
const map = addLevel([
        '5                                          5',
        '5                      $ $        $        5',
        '5         11111      11111     11111       5',
        '5                                          5',
        '5              $  $          $             5',
        '5              11111       11111           5',
        '5      $  $                                5',
        '5     11111         111111             111 5',
        '5                                          5',
        '5                     $          $ $       5',
        '5         11111      11111     11111       5',
        '5                                          5',
        '5111111        $   $                       5',
        '5              11111       11111           5',
        '5                                       $  5',
        '5     11111         111111             111 5',
        '5                                          5',
        '5 $  $         $   $                    4  5',
        '11111111111111111111111111111111111111111111',
        '5                                          5',
        '5                                          5',
    ],

    {
        tileWidth: 32,
        tileHeight: 32,
        tiles: {
            5: () => [
                rect(32, 32),
                opacity(0),
                area(),
                body({isStatic: true})
            ],
            4: () => [
                sprite('portal'),
                area(),
                body({ isStatic: true }),
                'portal'
                ],
                
            1: () => [
                sprite('platform-middle'),
                area(),
                body({ isStatic: true })
            ],
            '$': () => [
			    sprite("coin"),
			    area(),
			    scale(.5),
			    pos(0, 1),
			    offscreen({ hide: true }),
			    'coin'
			    
		],

        }

    })
    
 map.use(scale(1.5))

const player = add([
    sprite('idle-sprite'),
    scale(2),
    area({shape: new Rect(vec2(0), 16, 16), offset: vec2(0,16)}),
    anchor('center'),
    body(),
    pos(80,210),
    {
        speed: 500,
        previousHeight: null,
        heightDelta: 0,
        direction: 'right'
    }
])

player.play('idle-anim')

onKeyDown('right', () => {
    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('run-sprite'))
        player.play('run-anim')
    }

    if (player.direction !== 'right') player.direction = 'right'

    player.move(player.speed, 0)
})

onKeyRelease('right', () => {
    player.use(sprite('idle-sprite'))
    player.play('idle-anim')
})

onKeyDown('left', () => {
    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('run-sprite'))
        player.play('run-anim')
    }

    if (player.direction !== 'left') player.direction = 'left'

    player.move(-player.speed, 0)
})

onKeyRelease('left', () => {
    player.use(sprite('idle-sprite'))
    player.play('idle-anim')
})

onKeyPress('up', () => {
    if (player.isGrounded()) {
        player.jump()
    }
})


onUpdate(() => {
   if (player.pos.y >= fall) {
     go('game', { score: score.value})
    }
    if (player.previousHeight){
        player.heightDelta = player.previousHeight - player.pos.y
    }
    player.previousHeight = player.pos.y
    
     const cameraLeftBound = 550
    const cameraRightBound = 3000
    const cameraVerticalOffset = player.pos.y - 100
   if (cameraLeftBound > player.pos.x) {
        camPos(cameraLeftBound, cameraVerticalOffset)
    } else if (cameraRightBound < player.pos.x) {
        camPos(cameraRightBound, cameraVerticalOffset)
    } else {
        camPos(player.pos.x, cameraVerticalOffset)
    }
  

    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('idle-sprite'))
        player.play('idle-anim')
    }
     if (player.curAnim() !== 'jump-anim' && !player.isGrounded() && player.heightDelta > 0) {
        player.use(sprite('jump-sprite'))
        player.play('jump-anim')
    }

    if (player.curAnim() !== 'fall-anim' && !player.isGrounded() && player.heightDelta < 0) {
        player.use(sprite('fall-sprite'))
        player.play('fall-anim')
    }

    if (player.direction === 'left'){
        player.flipX = true
    } else {
        player.flipX = false
    }
})
 score = add([
    text("Coins: 0/10"),
     pos(24, 24),
    follow(player, -100),
    { value: 0 },
])
player.onCollide("coin", (c) => {
    destroy(c)
    score.value += 1
    score.text = `Coins: ${score.value}/10`
})

player.onCollide("portal", () => {
		if (score.value >= 10) {
			go("game2", score.value = 0)
		} 
	})	
})

scene("game2", ({ score }) => {
add([
    sprite('background-2'),
    fixed(),
    scale(2.2)
])

loadSpriteAtlas('./images/Tiles.png', {
    'platform-left': {
        x: 440,
        y: 380,
        width: 32,
        height: 32
    },
    'platform-middle': {
        x: 520,
        y: 240,
        width: 32,
        height: 32
    },
})
const map = addLevel([
        '5                                          5',
        '5          $$$         $ $        $        5',
        '5         11111      11111     11111       5',
        '5                                          5',
        '5              $  $          $             5',
        '5              11111       11111           5',
        '5      $  $                                5',
        '5     11111         111111             111 5',
        '5                      1111111             5',
        '5                                  $       5',
        '5          $ $ $ $                 1111    5',
        '5          1111111                         5',
        '5                                          5',
        '5                          111111111111111 5',
        '5                                          5',
        '5                   111111                 5',
        '5           11111                          5',
        '5                                       4  5',
        '11111111111111111111111111111111111111111111',
        '5                                          5',
        '5                                          5',
    ],

    {
        tileWidth: 32,
        tileHeight: 32,
        tiles: {
            5: () => [
                rect(32, 32),
                opacity(0),
                area(),
                body({isStatic: true})
            ],
            4: () => [
                sprite('portal'),
                area(),
                body({ isStatic: true }),
                'portal'
                ],
                
            1: () => [
                sprite('platform-left'),
                area(),
                body({ isStatic: true })
            ],
            '$': () => [
			    sprite("coin"),
			    area(),
			    scale(.5),
			    pos(0, 1),
			    offscreen({ hide: true }),
			    'coin'
			    
		],

        }

    })
    
 map.use(scale(1.5))

const player = add([
    sprite('idle-sprite'),
    scale(2),
    area({shape: new Rect(vec2(0), 16, 16), offset: vec2(0,16)}),
    anchor('center'),
    body(),
    pos(80,210),
    {
        speed: 500,
        previousHeight: null,
        heightDelta: 0,
        direction: 'right'
    }
])

player.play('idle-anim')

onKeyDown('right', () => {
    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('run-sprite'))
        player.play('run-anim')
    }

    if (player.direction !== 'right') player.direction = 'right'

    player.move(player.speed, 0)
})

onKeyRelease('right', () => {
    player.use(sprite('idle-sprite'))
    player.play('idle-anim')
})

onKeyDown('left', () => {
    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('run-sprite'))
        player.play('run-anim')
    }

    if (player.direction !== 'left') player.direction = 'left'

    player.move(-player.speed, 0)
})

onKeyRelease('left', () => {
    player.use(sprite('idle-sprite'))
    player.play('idle-anim')
})

onKeyPress('up', () => {
    if (player.isGrounded()) {
        player.jump()
    }
})


onUpdate(() => {
   if (player.pos.y >= fall) {
     go('game2', { score: score.value})
    }
    if (player.previousHeight){
        player.heightDelta = player.previousHeight - player.pos.y
    }
    player.previousHeight = player.pos.y
    
     const cameraLeftBound = 550
    const cameraRightBound = 3000
    const cameraVerticalOffset = player.pos.y - 100
   if (cameraLeftBound > player.pos.x) {
        camPos(cameraLeftBound, cameraVerticalOffset)
    } else if (cameraRightBound < player.pos.x) {
        camPos(cameraRightBound, cameraVerticalOffset)
    } else {
        camPos(player.pos.x, cameraVerticalOffset)
    }
  

    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('idle-sprite'))
        player.play('idle-anim')
    }
     if (player.curAnim() !== 'jump-anim' && !player.isGrounded() && player.heightDelta > 0) {
        player.use(sprite('jump-sprite'))
        player.play('jump-anim')
    }

    if (player.curAnim() !== 'fall-anim' && !player.isGrounded() && player.heightDelta < 0) {
        player.use(sprite('fall-sprite'))
        player.play('fall-anim')
    }

    if (player.direction === 'left'){
        player.flipX = true
    } else {
        player.flipX = false
    }
})
 score = add([
    text("Coins: 0/10"),
     pos(24, 24),
    follow(player, -100),
    { value: 0 },
])
player.onCollide("coin", (c) => {
    destroy(c)
    score.value += 1
    score.text = `Coins: ${score.value}/10`
})

player.onCollide("portal", () => {
		if (score.value >= 10) {
			go("gameover", score.value)
		} 
	})	
})

scene("gameover", (score) => {
    add([
    sprite('background-3'),
    fixed(),
    scale(2.6)
])
  add([
    text(
      "     Gameover!\n" + 'Space to play again\n',
      {size: 45}
    ),
    pos(width() / 2, height() / 2),
    anchor('center')
  ]);

  onKeyDown("space", () => {
    go("game", { score: 0});
  });
});


go("game", { score: 0})

