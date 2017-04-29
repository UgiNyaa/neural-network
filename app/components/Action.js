import React from 'react'
import PropTypes from 'prop-types'

import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'

export default class Action extends React.Component {
  static propTypes = {
    highestLayer: PropTypes.number.isRequired,
    connections: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
      })
    ),
    neurons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        layer: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }

  constructor () {
    super()

    this.state = {
      open: false,
      layer: 0,
    }
  }

  getStyles () {
    return {
      position: 'absolute',
      right: 30,
      bottom: 30,
      width: 'auto',
      height: 'auto',
    }
  }

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })
  handleChange = (event, index, value) => this.setState({ layer: value })
  handleSubmit = () => {
    this.setState({ open: false })
    var id = this.props.onAddNeuron(this.state.layer)

    if (this.state.layer !== this.props.highestLayer) {
      for (var i = 0; i < this.props.neurons.length; i++) {
        if (this.props.neurons[i].layer === this.state.layer + 1) {
          this.props.onAddConnection(id, this.props.neurons[i].id, 1)
        }
      }
    }

    if (this.state.layer !== 0) {
      for (var i = 0; i < this.props.neurons.length; i++) {
        if (this.props.neurons[i].layer === this.state.layer - 1) {
          this.props.onAddConnection(this.props.neurons[i].id, id, 1)
        }
      }
    }
  }

  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];
    const validLayer = this.state.layer <= this.props.highestLayer + 1;
    const style = this.getStyles()

    var menuItems = []
    for (var i = 0; i <= this.props.highestLayer + 1; i++) {
      menuItems.push(<MenuItem key={i} value={i} primaryText={String(i)} />)
    }

    return (
      <div>
        <FloatingActionButton
          style={style}
          onTouchTap={this.handleOpen.bind(this)}
        >
          <ContentAdd />
        </FloatingActionButton>

        <Dialog
          title="Add Neuron"
          modal={false}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose.bind(this)}
        >
        <SelectField
          floatingLabelText={'Layer'}
          value={this.state.layer}
          onChange={this.handleChange.bind(this)}
          errorText={!validLayer && 'Layer should be less then ' + this.props.highestLayer + 1}
        >
          {menuItems}
        </SelectField>
        </Dialog>

      </div>
    )
  }
}
