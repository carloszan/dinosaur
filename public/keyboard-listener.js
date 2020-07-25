export default function createKeyboardListener() {
  document.addEventListener('keydown', function (key) {
    notifyAll({
      key: key.key,
      player: 'player1'
    })
  })

  const observers = []

  function subscribe(observer) {
    observers.push(observer)
  }

  function notifyAll(command) {
    for(let observer of observers) {
      observer(command)
    }
  }

  return {
    subscribe
  }
}