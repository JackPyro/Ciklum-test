import React, { Component } from 'react'

export default class WithLoading extends Component {
  render () {
    const {component, loading} = this.props
    return (
      <div>
        {loading ? <span>Loading...</span> : component}
      </div>
    )
  }

}