import { createActions, handleActions, createAction } from 'redux-actions'
import { createSelector } from 'reselect'
import axios from 'axios'

const GET_RESULTS = '/api/article/'
const APPROVE = (id) => `/api/article/${id}/approved`
const DELETE = '/api/article/delete'
const ADD_SUGGEST = '/api/article'

const defaultState = {
  loading: false,
  list: [],
}

const {results} = createActions({
  RESULTS: {
    LOAD: {
      REQUEST: () => ({}),
      SUCCESS: (list) => ({list}),
      FAILED: (error) => ({error})
    },
    APPROVE: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
      FAILED: (error) => ({error})
    },
    DELETE: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
      FAILED: () => ({}),
    },
    ADD: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
      FAILED: (error) => ({error})
    }
  }
})

export const loadResults = (query = '') => {
  return (dispatch) => {
    dispatch(results.load.request())
    axios.get(`${GET_RESULTS}${query}`)
      .then(res => dispatch(results.load.success(res.data)))
      .catch(error => dispatch(results.load.failed(error)))
  }
}

export const approveSuggestion = (id) => {
  return (dispatch) => {
    dispatch(results.approve.request())
    axios.put(APPROVE(id))
      .then(res => {
        dispatch(results.approve.success())
        dispatch(loadResults())
      })
      .catch(error => dispatch(results.approve.failed(error)))
  }
}

export const addSuggestion = (suggestion) => {
  return (dispatch) => {
    dispatch(results.add.request())
    axios.post(`${ADD_SUGGEST}`, {...suggestion})
      .then(res => {
        dispatch(results.add.success())
        dispatch(loadResults())
      })
      .catch(error => dispatch(results.add.failed(error)))
  }
}

export const removeSuggestion = (originalText) => {
  return (dispatch) => {
    dispatch(results.delete.request())
    axios.post(DELETE, {originalText})
      .then(res => {
        dispatch(results.delete.success())
        dispatch(loadResults())
      })
      .catch(error => {
        dispatch(results.delete.failed(error))
      })
  }
}

export const reducer = handleActions({
  RESULTS: {
    LOAD: {
      REQUEST: (state, action) => ({...state, loading: true}),
      SUCCESS: (state, action) => ({...state, list: action.payload.list, loading: false}),
      FAILED: (state, action) => ({...state, error: action.payload.error, loading: false})
    },
    EDIT: {
      REQUEST: (state, action) => ({...state}),
      SUCCESS: (state, action) => ({...state}),
      FAILED: (state, action) => ({...state, error: action.payload.error})
    },
    DELETE: {
      REQUEST: (state, action) => ({...state}),
      SUCCESS: (state, action) => ({...state}),
      FAILED: (state, action) => ({...state, error: action.payload.error})
    },
    ADD: {
      REQUEST: (state, action) => ({...state}),
      SUCCESS: (state, action) => ({...state}),
      FAILED: (state, action) => ({...state, error: action.payload.error})
    }
  }
}, defaultState)

export const getResults = (state) => state.results.list
export const getLoading = (state) => state.results.loading