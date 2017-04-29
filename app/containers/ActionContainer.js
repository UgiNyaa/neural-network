import { connect } from 'react-redux'
import { addNeuron } from '../actions'
import Action from '../components/Action'

const mapStateToProps = (state) => {
  console.log('highestLayer: ' + state.highestLayer);
  return {
    highestLayer: state.highestLayer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNeuron: (layer) => {
      console.log('dispatching on add neuron');
      dispatch(addNeuron(layer))
    }
  }
}

const ActionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Action)

export default ActionContainer
