import React from 'react'

import { minLayer } from '../actions'

import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'

export default class Action extends React.Component {
  constructor () {
    super()

    this.state = {
      open: false,
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
  handleSubmit = () => {
    this.setState({ open: false })
    this.props.onAddNeuron(this.layer)
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
    var style = this.getStyles()

    var menuItems = []
    for (var i = 0; i <= minLayer; i++) {
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
          ref={(field) => this.layer = field}
          floatingLabelText={'Layer'}
          value={minLayer}
        >
          {menuItems}
        </SelectField>
        </Dialog>

      </div>
    )
  }
}
