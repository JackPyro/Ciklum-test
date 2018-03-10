import React, { Component } from 'react'
import styled from 'styled-components'
import Header from 'src/modules/App/Header'
import Routes from '../routes'

export default class App extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <Layout>
        {/*<Header/>*/}
        <Container>
          <Routes/>
        </Container>
      </Layout>
    )
  }
}
const Layout = styled.div`

`

const Container = styled.div`
  margin: 0px 150px;
`





