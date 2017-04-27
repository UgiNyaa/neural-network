import React from 'react'

import ActionContainer from './containers/ActionContainer'
import CanvasContainer from './containers/CanvasContainer'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <CanvasContainer />
        <ActionContainer />
      </div>
    )
  }
}
