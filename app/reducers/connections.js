import { ADD_CONNECTION } from '../actions'

const connection = (state = {}, action) => {
  switch (action.type) {
    case ADD_CONNECTION:
      return {
        from: action.payload.from,
        to: action.payload.to,
        weight: action.payload.weight,
      }

    default:
      return state
  }
}

const connections = (state = [], action) => {
  switch (action.type) {
    case ADD_CONNECTION:
      return [
        ...state,
        connection(undefined, action)
      ]

    default:
      return state

  }
}

export default connections
