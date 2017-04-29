import { connect } from 'react-redux'
import Canvas from '../components/Canvas'

const mapStateToProps = (state) => {
  return {
    highestLayer: state.highestLayer,
    neurons: state.neurons,
    connections: state.connections,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)

export default CanvasContainer
