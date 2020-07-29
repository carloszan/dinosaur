function cleanScreen(ctx, width, height) {
  ctx.fillStyle = 'white'
  ctx.clearRect(0, 0, width, height);
}

function setCanvasOriginToLowerLeftCorner(ctx, height) {
  ctx.translate(0, height);
  ctx.scale(1, -1);
}

function render(ctx, game, requestAnimationFrame, timestamp) {
  game.update(timestamp)
  cleanScreen(ctx, game.state.width, game.state.height)

  for(let playerId in game.state.players) {
    const player = game.state.players[playerId]
    ctx.fillStyle = "#000000"
    ctx.fillRect(player.x, player.y + 1, 1, 1)
    ctx.fillRect(player.x, player.y, 1, 1)
  }

  for(let obstacleId in game.state.obstacles) {
    const obstacle = game.state.obstacles[obstacleId]
    ctx.fillStyle = "#FFFF00"
    ctx.fillRect(obstacle.x, obstacle.y, 1, 1)
  }

  requestAnimationFrame((timestamp) => {
    render(ctx, game, requestAnimationFrame, timestamp)
  })
}

export default function renderScreen(screen, game, requestAnimationFrame) {
  const ctx = screen.getContext("2d")
  setCanvasOriginToLowerLeftCorner(ctx, game.state.height)
  render(ctx, game, requestAnimationFrame, 0)
}