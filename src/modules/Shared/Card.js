import React, { Component } from 'react'
import styled from 'styled-components'

class Card extends Component {
  render () {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  border: 1px solid gray; 
  padding: 10px 10px;
  margin: 10px 0px; 
`

export default Card