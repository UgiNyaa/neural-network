import React from 'react'
import PropTypes from 'prop-types'

export default class Canvas extends React.Component {

  static propTypes = {
    neurons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        layer: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
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
      stride: { x: 50, y: 50 }
    }

    console.log(Canvas.propTypes);
    console.log(JSON.stringify(Canvas.propTypes));

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
        var x = (i-((neurons.length-1)/2))*100
        var y = -(l-(this.props.highestLayer/2))*100

        ctx.beginPath()
        ctx.arc(this.state.origin.x + x, this.state.origin.y + y, 20, 0, 2*Math.PI, false)
        ctx.closePath()
        ctx.lineWidth = 5
        ctx.fillStyle = 'green'
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
    console.log('render');
    console.log(this.props);
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
