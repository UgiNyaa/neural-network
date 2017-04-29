export const ADD_NEURON = 'ADD_NEURON'
export const ADD_CONNECTION = 'ADD_CONNECTION'

let nextNeuronID = 0

export const addNeuron = (layer) => {
  return {
    type: ADD_NEURON,
    payload: {
      id: nextNeuronID++,
      layer,
    }
  }
}

export const addConnection = (from, to, weight) => {
  return {
    type: ADD_CONNECTION,
    payload: {
      from,
      to,
      weight,
    }
  }
}
