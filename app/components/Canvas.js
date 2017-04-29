import React from 'react'
import PropTypes from 'prop-types'

export default class Canvas extends React.Component {

  static propTypes = {
    neurons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        layer: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
    connections: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
      })
    ),
    highestLayer: PropTypes.number.isRequired,
  }

  constructor () {
    super()
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      origin: { x: window.innerWidth / 2, y: window.innerHeight / 2},
      move: false,
      oldMouse: { x: 0, y: 0 },
      radius: 30,
      stride: 150,
    }

    window.onresize = this.onResize.bind(this)
  }

  componentDidMount () {
    this.updateCanvas()
  }

  componentDidUpdate () {
    this.updateCanvas()
  }

  updateCanvas () {
    const ctx = this.refs.canvas.getContext('2d')
    ctx.fillStyle = '#eceff1'
    ctx.fillRect(0, 0, this.state.width, this.state.height)

    // draw connections
    for (var i = 0; i < this.props.connections.length; i++) {
      var fromLayer = this.props.neurons.find((n) => this.props.connections[i].from === n.id).layer
      var toLayer = this.props.neurons.find((n) => this.props.connections[i].to == n.id).layer

      var fromLayerNeurons = []
      var toLayerNeurons = []
      for (var j = 0; j < this.props.neurons.length; j++) {
        if (this.props.neurons[j].layer === fromLayer) {
          fromLayerNeurons.push(this.props.neurons[j])
        }
        if (this.props.neurons[j].layer === toLayer) {
          toLayerNeurons.push(this.props.neurons[j])
        }
      }

      var fromi = 0;
      var toi = 0;
      for (fromi = 0; fromi < fromLayerNeurons.length; fromi++) {
        if (fromLayerNeurons[fromi].id === this.props.connections[i].from)
          break
      }
      for (toi = 0; toi < toLayerNeurons.length; toi++) {
        if (toLayerNeurons[toi].id === this.props.connections[i].to)
          break;
      }

      var fromx = (fromi-((fromLayerNeurons.length-1)/2))*this.state.stride
      var fromy = -(fromLayer-(this.props.highestLayer/2))*this.state.stride
      var tox = (toi-((toLayerNeurons.length-1)/2))*this.state.stride
      var toy = -(toLayer-(this.props.highestLayer/2))*this.state.stride

      ctx.beginPath()
      ctx.moveTo(this.state.origin.x + fromx, this.state.origin.y + fromy)
      ctx.lineTo(this.state.origin.x + tox, this.state.origin.y + toy)
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // draw neurons
    for (var l = 0; true; l++) {
      var neurons = []
      for (var i = 0; i < this.props.neurons.length; i++) {
        if (this.props.neurons[i].layer === l) {
          neurons.push(this.props.neurons[i])
        }
      }
      if (neurons.length === 0) {
        break;
      }

      for (var i = 0; i < neurons.length; i++) {
        var x = (i-((neurons.length-1)/2))*this.state.stride
        var y = -(l-(this.props.highestLayer/2))*this.state.stride

        ctx.beginPath()
        ctx.arc(this.state.origin.x + x, this.state.origin.y + y, this.state.radius, 0, 2*Math.PI, false)
        ctx.closePath()
        ctx.lineWidth = 5
        ctx.fillStyle = '#2196f3'
        ctx.fill()
      }
    }
  }

  getStyles () {
    var cursor = !this.state.move ? 'auto' : 'move'

    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      cursor,
    }
  }

  onResize = (e) => {
    this.setState({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    })
  }

  onMouseDown = (e) => {
    if (!this.state.move){
      this.setState({ move: true, oldMouse: { x: e.pageX, y: e.pageY } })
    }
  }

  onMouseUp = (e) => {
    if (this.state.move) {
      this.setState({ move: false })
    }
  }

  onMouseMove = (e) => {
    if (this.state.move) {
      var relative = {
        x: this.state.oldMouse.x - e.pageX,
        y: this.state.oldMouse.y - e.pageY
      }
      var oldOrigin = this.state.origin
      this.setState({
        origin: {
          x: this.state.origin.x - relative.x,
          y: this.state.origin.y - relative.y
        },
        oldMouse: {
          x: e.pageX,
          y: e.pageY
        }
      })
    }
  }

  render () {
    var styles = this.getStyles()

    return (
      <div
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}

        style={styles}
      >
        <canvas
          ref='canvas'
          width={this.state.width}
          height={this.state.height}
        >
          Canvas is not supported
        </canvas>
      </div>
    )
  }
}
