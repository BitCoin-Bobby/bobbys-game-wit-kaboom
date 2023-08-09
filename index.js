kaboom({
    width: 1280,
    height: 720
})

loadSprite('background-1', './images/background1.jpg')


loadSprite('lamp', './images/Character 03/Png/Lamp_post.png')

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

setGravity(1000)

scene("game", ({ score }) => {
    
add([
    sprite('background-1'),
    fixed(),
    scale(4)
])

add([
    sprite('lamp'),
    fixed(),
    scale(4),
    pos(50, 210)
])

add([
    sprite('lamp'),
    fixed(),
    scale(4),
    pos(1000, 210)
]).flipX = true

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
        '5                                      5',
        '5    1111                              5',
        '5                                      5',
        '5                                      5',
        '5                                      5',
        '5                                      5',
        '5                                      5',
        '5                                      5',
        '5                                      5',
        '5                                      5',
        '5                                      5',
        '5                                      5',
        '5                 111                  5',
        '5   111    111                         5',
        '5                                      5',
        '5   111           1            1       5',
        '5                                      5',
        '1111111111111111111111111111111111111111',
        '5                                      5',
        '5                                      5',
        '5                                      5',
        '5                                      5',
        '5                                      5',


    ],

    {
        tileWidth: 32,
        tileHeight: 32,
        tiles: {
            5: () => [
                 rect(16, 16),
            opacity(0),
            area(),
            body({isStatic: true})
            ],

            1: () => [
                sprite('platform-middle'),
                area(),
                body({ isStatic: true })
            ],


        }

    })
// map.use(scale(4))

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

// camScale(1.5)

onUpdate(() => {
    
    if (player.previousHeight){
        player.heightDelta = player.previousHeight - player.pos.y
    }
    player.previousHeight = player.pos.y
    
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
})
scene("gameover", (score) => {
 
  add([
    text(
      "gameover!\n"
      + "score: " + score
      + "\nhigh score: " + highScore,
      {size: 45}
    )
  ]);

  keyPress("space", () => {
    go("game");
  });
});


go("game", { score: 0})

// // reset cursor to default at frame start for easier cursor management
// onUpdate(() => cursor("default"))

