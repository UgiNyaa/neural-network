import { ADD_NEURON } from '../actions'

const highestLayer = (state = -1, action) => {
  switch (action.type) {
    case ADD_NEURON:
      if (action.payload.layer > state) {
        return action.payload.layer
      }

    default:
      return state;
  }
}

export default highestLayer
