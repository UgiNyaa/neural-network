import { combineReducers } from 'redux'
import neurons from './neurons'
import connections from './connections'
import highestLayer from './highestLayer'

const neuronNetworkApp = combineReducers({
  neurons,
  connections,
  highestLayer,
})

export default neuronNetworkApp
