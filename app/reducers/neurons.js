import { ADD_NEURON } from '../actions'

const neuron = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEURON:
      return {
        id: action.payload.id,
        layer: action.payload.layer,
      }

    default:
      return state
  }
}

const neurons = (state = [], action) => {
  switch (action.type) {
    case ADD_NEURON:
      return [
        ...state,
        neuron(undefined, action)
      ]

    default:
      return state
  }
}

export default neurons
