import React, { Component } from 'react'
import styled from 'styled-components'

class Suggestion extends Component {
  approve = () => {
    const {approve, suggestion} = this.props
    approve(suggestion._id)
  }

  render () {
    const {suggestion} = this.props
    return (
      <Wrapper>
        <Text> {suggestion.userText} </Text>
        {suggestion.isApproved ? <div> Approved </div> : <Approve onClick={this.approve}> Approve </Approve> }
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #363636;
  padding: 5px 0px;
`

const Text = styled.div`
  margin-right: 5%;
  font-size: 0.8em;
  color: #363636;

`

const Approve = styled.button`
  background-color: #4ba74b;
  border: none;
  padding: 5px 15px;
  color: white;
`

const Approved = styled.div`
 padding: 5px 15px;
 color: #4ba74b;
`

export default Suggestion