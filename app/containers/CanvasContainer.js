import { connect } from 'react-redux'
import Canvas from '../components/Canvas'

const mapStateToProps = (state) => {
  return {
    neurons: state.neurons
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