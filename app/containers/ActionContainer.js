import { connect } from 'react-redux'
import { addNeuron, addConnection } from '../actions'
import Action from '../components/Action'

const mapStateToProps = (state) => {
  return {
    highestLayer: state.highestLayer,
    neurons: state.neurons,
    connections: state.connections,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNeuron: (layer) => {
      var n = addNeuron(layer)
      dispatch(n)
      return n.payload.id
    },
    onAddConnection: (from, to, weight) => {
      dispatch(addConnection(from, to, weight))
    }
  }
}

const ActionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Action)

export default ActionContainer
