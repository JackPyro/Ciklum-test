import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
    const {loadResults, location} = this.props
    loadResults(location.search)
  }

  componentDidUpdate (prevProps) {
    const {location, loadResults} = this.props
    if (prevProps.location.search !== location.search) {
      loadResults(location.search)
    }
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
        <NavBar>
          <QueryLink to="/fb/results?showApproved=true"> Show Completed </QueryLink>
          <QueryLink to="/fb/results"> Show All </QueryLink>
        </NavBar>
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
const NavBar = styled.div`
  display: flex;
`
const QueryLink = styled(Link)`
  background-color: ${props => props.theme.colors.default};
  text-decoration: none;
  padding: 10px 15px;
  margin: 5px;
  display: block;
  color: ${props => props.theme.colors.light}
    
`
export default Result