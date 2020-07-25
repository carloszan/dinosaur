export default function createGame() {
  const state = {
    players: {
      player1: {
        x: 1,
        y: 10,
        speed: 0,
        isJumping: false
      },
      player2: {
        x: 4,
        y: 9,
        speed: 0,
        isJumping: false
      }
    },
    width: 40,
    height: 20,
    gravity: 0.3
  }

  const JumpSpeed = 1.8

  function update() {
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
  }

  function jump(command) {
    const player = state.players[command.playerId]
    if (player.isJumping)
      return

    player.speed += JumpSpeed
    console.log(player.speed)
  }

  function draw() {

  }

  function keyboardInput(command) {
    if (command.key != "ArrowUp")
      return

    jump({playerId: 'player1'})
  }

  return {
    state,
    jump,
    keyboardInput,
    update,
    draw
  }
}