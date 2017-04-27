export const ADD_NEURON = 'ADD_NEURON'

let nextNeuronID = 0
export let minLayer = 0

export const addNeuron = (layer) => {
  console.log('constructing action')
  return {
    type: ADD_NEURON,
    payload: {
      id: nextNeuronID++,
      layer,
    },
    meta: {
      validator: {
      }
    }
  }
}
