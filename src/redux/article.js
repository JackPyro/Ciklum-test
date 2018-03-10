import { createActions, handleActions, createAction } from 'redux-actions'
import { createSelector } from 'reselect'
import axios from 'axios'

const GET_ARTICLE = '/api/article/parse?url='
const POST_SUGGEST = '/api/article'

const defaultState = {
  item: {
    title: null,
    paragraphs: []
  },
  articleLoading: false,
  editLoading: false,
  url: null
}

const {articles} = createActions({
  ARTICLES: {
    LOAD: {
      REQUEST: (url) => ({url}),
      SUCCESS: (article) => ({article}),
      FAILED: (error) => ({error})
    },
    EDIT: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
      FAILED: (error) => ({error})
    }
  }
})

export const loadArticle = (articleUrl) => {
  return (dispatch) => {
    dispatch(articles.load.request(articleUrl))
    axios.get(`${GET_ARTICLE}${articleUrl}`)
      .then(res => dispatch(articles.load.success(res.data)))
      .catch(error => dispatch(articles.load.failed(error)))
  }
}

export const sendSuggestion = (suggestion) => {
  return (dispatch) => {
    dispatch(articles.edit.request())
    axios.post(`${POST_SUGGEST}`, {...suggestion})
      .then(res => dispatch(articles.edit.success(res.data)))
      .catch(error => dispatch(articles.edit.failed(error)))
  }
}

export const reducer = handleActions({
  ARTICLES: {
    LOAD: {
      REQUEST: (state, action) => ({...state, url: action.payload.url, articleLoading: true}),
      SUCCESS: (state, action) => ({...state, item: action.payload.article, articleLoading: false}),
      FAILED: (state, action) => ({...state, error: action.payload.error, articleLoading: false})
    },
    EDIT: {
      REQUEST: (state, action) => ({...state, editLoading: true}),
      SUCCESS: (state, action) => ({...state, editLoading: false}),
      FAILED: (state, action) => ({...state, error: action.payload.error, editLoading: false})
    }
  }
}, defaultState)

export const getArticle = (state) => state.article.item
export const getURL = (state) => state.article.url
export const getLoading = (state) => state.article.articleLoading