export default function createGame() {
  const state = {
    players: {
      player1: {
        x: 1,
        y: 1
      },
      player2: {
        x: 4,
        y: 0
      }
    },
    width: 20,
    height: 10
  }

  function keyboardInput(command) {
    if (command.key != "ArrowUp")
      return

    const player = state.players[command.player]
    player.y += 1
  }

  return {
    state,
    keyboardInput
  }
}