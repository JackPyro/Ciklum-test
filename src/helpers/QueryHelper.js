import qs from 'qs'

export default class QueryHelper {
  static getParams = (query) => qs.parse(query, {ignoreQueryPrefix: true})

  static getParam = (query, param) => {
    const params = qs.parse(query, {ignoreQueryPrefix: true})
    return params[param] || null
  }

  static hasParam = (query, param) => {
    const params = qs.parse(query, {ignoreQueryPrefix: true})
    return !!params[param]
  }
}
