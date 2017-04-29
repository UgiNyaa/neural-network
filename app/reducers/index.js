import { combineReducers } from 'redux'
import neurons from './neurons'
import highestLayer from './highestLayer'

const neuronNetworkApp = combineReducers({
  neurons,
  highestLayer,
})

export default neuronNetworkApp
