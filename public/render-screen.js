function cleanScreen(ctx) {
  ctx.fillStyle = 'white'
  ctx.clearRect(0, 0, 20, 10);
}

function setCanvasOriginToLowerLeftCorner(ctx, height) {
  ctx.translate(0, height);
  ctx.scale(1, -1);
}

function render(ctx, game, requestAnimationFrame) {
  cleanScreen(ctx)

  for(let playerId in game.state.players) {
    const player = game.state.players[playerId]
    ctx.fillStyle = "#000000"
    ctx.fillRect(player.x, player.y, 1, 1)
  }

  requestAnimationFrame(() => {
    render(ctx, game, requestAnimationFrame)
  })
}

export default function renderScreen(screen, game, requestAnimationFrame) {
  const ctx = screen.getContext("2d")
  setCanvasOriginToLowerLeftCorner(ctx, game.state.height)
  render(ctx, game, requestAnimationFrame)
}