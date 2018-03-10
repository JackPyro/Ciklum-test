import React, { Component } from 'react'
import SearchBar from './SearchBar'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { withColorTheme } from 'src/theme'

@withRouter
class Header extends Component {

  render () {
    return (
      <Wrapper>
        <SearchBar/>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  ${withColorTheme};
  padding: 10px 15px;
`

export default Header