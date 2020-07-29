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
  const ObstacleSpeedTime = 100
  const InitialObstaclePosition = { x: 39, y: 0 }
  let Collisions = 0

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
      maybeTryAddObstacle()
      for(let obstacleId in state.obstacles) {
        const obstacle = state.obstacles[obstacleId]

        obstacle.x -= 1
        if (obstacle.x < 0) {
          removeObstacle(obstacleId)
          continue
        }

        checkCollision(obstacleId)
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

  function checkCollision(obstacleId) {
    const obstacle = state.obstacles[obstacleId]

    for(let playerId in state.players) {
      const player = state.players[playerId]
      if (obstacle.x == player.x && player.y == obstacle.y)
        console.log(Collisions++)
    }
  }

  function removeObstacle(obstacleId) {
    delete state.obstacles[obstacleId]
  }

  // 12.5% to add a obstacle. 1/8
  function maybeTryAddObstacle() {
    var percentage = Math.floor(Math.random() * 8 + 1)
    if (percentage == 1) {
      addObstacle(InitialObstaclePosition)
    }
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