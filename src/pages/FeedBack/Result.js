import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getLoading,
  loadResults,
  getResults,
  approveSuggestion,
  removeSuggestion,
  addSuggestion
} from 'src/redux/results'
import WithLoading from 'src/modules/Shared/WithLoading'
import Results from 'src/modules/Result/Results'

@connect(state => ({
  results: getResults(state),
  loading: getLoading(state)
}), {loadResults, approveSuggestion, addSuggestion, removeSuggestion})
class Result extends Component {
  componentDidMount () {
    const {loadResults} = this.props
    loadResults()
  }

  send = (suggestion) => {
    const {addSuggestion} = this.props
    addSuggestion(suggestion)
  }

  approve = (id) => {
    const {approveSuggestion} = this.props
    approveSuggestion(id)
  }

  remove = (originalText) => {
    const {removeSuggestion} = this.props
    removeSuggestion(originalText)
  }

  render () {
    const {loading, results} = this.props
    return (
      <div>
        <WithLoading
          loading={loading}
          component={
            <Results
              results={results}
              approve={this.approve}
              remove={this.remove}
              send={this.send}
            />
          }/>
      </div>
    )
  }
}

export default Result