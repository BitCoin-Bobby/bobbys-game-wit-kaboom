kaboom({
    width:1280,
    height:720
})

loadSprite('background-1','./images/background1.jpg')
loadSprite('lamp', './images/Character 03/Png/Lamp_post.png')

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
    
    // loadSpriteAtlas()
    
    