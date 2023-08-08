kaboom({
    width:1280,
    height:720
})

loadSprite('background-1','/BitcoinBobby/gaming/images/background1.jpg')

add([
    sprite('background-1'),
    fixed(),
    scale(4)
    ])
    
add([
    sprite('background-1'),
    fixed(),
    position(1000, 0),
    scale(4)
    ]).flipX = true
    
    loadSpriteAtlas()