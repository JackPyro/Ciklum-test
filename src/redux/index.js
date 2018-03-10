import { combineReducers } from 'redux'
import { reducer as article } from './article'
import { reducer as results } from './results'

const reducers = combineReducers({
  article,
  results
})

export default reducers
