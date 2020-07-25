export default function createGame(configuration = {}) {
  const state = {
    players: {},
    obstacles: {},
    width: 40,
    height: 20,
    gravity: 0.3,
    renderScreen: configuration.renderScreen
  }

  let Time = 0
  const JumpSpeed = 2.5
  const ObstacleSpeedTime = 200

  function update(timestamp) {
    for(let playerId in state.players) {
      const player = state.players[playerId]
        
      player.speed -= state.gravity
      player.y += player.speed
      player.isJumping = true

      if (player.y < 0) {
        player.y = 0
        player.speed = 0
        player.isJumping = false
      }
    }

    if (timestamp - Time > ObstacleSpeedTime) {
      for(let obstacleId in state.obstacles) {
        const obstacle = state.obstacles[obstacleId]

        obstacle.x -= 1
        if (obstacle.x < 0) {
          removeObstacle(obstacleId)
          continue
        }

        checkColision(obstacleId)
      }

      Time = timestamp
    }
  }
  
  function draw(screen) {
    state.renderScreen(screen, this, requestAnimationFrame)
  }

  function jump(command) {
    const player = state.players[command.playerId]
    if (player.isJumping)
      return

    player.speed += JumpSpeed
    console.log(player.speed)
  }

  function keyboardInput(command) {
    if (command.key != "ArrowUp")
      return

    jump({playerId: 'player1'})
  }
  
  function addPlayer(command) {
    const playerId = command.playerId || Math.floor(Math.random() * 100)

    state.players[playerId] = {
      x: command.x,
      y: command.y,
      speed: 0,
      isJumping: false
    }
  }

  function addObstacle(command) {
    const obstacleId = command.obstacleId || Math.floor(Math.random() * 100)
    state.obstacles[obstacleId] = {
      x: command.x,
      y: command.y
    }
  }

  function checkColision(obstacleId) {
    const obstacle = state.obstacles[obstacleId]

    for(let playerId in state.players) {
      const player = state.players[playerId]
      if (obstacle.x == player.x && player.y == obstacle.y)
        console.log('collision')
    }
  }

  function removeObstacle(obstacleId) {
    delete state.obstacles[obstacleId]
  }

  return {
    state,
    jump,
    addPlayer,
    addObstacle,
    keyboardInput,
    update,
    draw
  }
}