import React, { Component } from 'react'
import Card from 'src/modules/Shared/Card'

class Home extends Component {
  render () {
    return (
      <div>
        <Card>
          <p> This is suggest changes application for <a href="http://www.dagbladet.no"> www.dagbladet.no </a></p>
          <p>
            Use <code> /fb?articleURL=​url_parameter​ </code> for adding suggestions, where url_parameter is url of
            article you want to edit
          </p>
        </Card>
      </div>
    )
  }
}

export default Home