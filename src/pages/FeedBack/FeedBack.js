import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadArticle, getArticle, getURL, getLoading } from 'src/redux/article'
import WithLoading from 'src/modules/Shared/WithLoading'
import QueryHelper from 'src/helpers/QueryHelper'
import Article from 'src/modules/Feedback/Article'

@connect(
  state => ({
    article: getArticle(state),
    url: getURL(state),
    loading: getLoading(state)
  })
  , {loadArticle})
class FeedBack extends Component {

  componentDidMount () {
    const {url, article, location, loadArticle} = this.props
    if (!url && !!article && QueryHelper.hasParam(location.search, 'articleURL')) {
      const articleURL = QueryHelper.getParam(location.search, 'articleURL')
      if (articleURL && url !== articleURL) {
        loadArticle(articleURL)
      }
    }
  }

  render () {
    const {article, url, loading} = this.props

    return (
      <WithLoading
        loading={loading}
        component={
          <Article
            article={article}
            url={url}
          />
        }/>
    )
  }
}

export default FeedBack
