import React, { Component } from 'react'
import Card from 'src/modules/Shared/Card'
import Paragraph from 'src/modules/Feedback/Paragraph'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class Article extends Component {
  render () {
    const {article, url} = this.props
    return (
      <div>
        <Card>
          <ArticleURL>
            Original URL: <a href={url}>{url}</a>
          </ArticleURL>
          <Approve to={`/fb/results?articleURL=${url}`}> Show Results </Approve>

        </Card>
        <h2 dangerouslySetInnerHTML={{__html: article.title}}/>
        <div>
          {article.paragraphs.map((text, index) => <Paragraph key={'p-' + index} text={text} url={url}/>)}
        </div>
      </div>
    )
  }
}

const ArticleURL = styled.div`
  margin-right: 40px;
`

const Approve = styled(Link)`
  background-color: #4ba74b;
  border: none;
  padding: 5px 15px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  margin-top: 20px;
`

const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export default Article