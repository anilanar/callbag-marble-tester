import { FRAME_SIZE } from './constants'
import { parse } from './marbles'

const listenable = (marble, values = {}) => (start, sink) => {
  if (start !== 0) return
  const { frames, size } = parse(marble, values)
  let timeoutId = null

  const emit = frame => {
    if (frames.has(frame)) {
      frames.get(frame).forEach(emitter => emitter(sink))
    }

    if (frame < size) {
      timeoutId = setTimeout(emit, FRAME_SIZE, frame + 1)
    }
  }

  sink(0, t => {
    if (t === 2) {
      timeoutId !== null && clearTimeout(timeoutId)
    }
  })

  emit(0)
}

export default listenable
