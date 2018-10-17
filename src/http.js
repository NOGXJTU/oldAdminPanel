import Vue from 'vue'
import axios from 'axios'
import store, { types } from './store'
import _ from 'lodash'

// const API_URI = process.env.VUE_APP_API_URL || '/admin/api/'
const API_URI = 'http://45.40.196.220:8080/'
global.API_URI = API_URI
axios.defaults.baseURL = API_URI
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = 'Bearer ' + store.state.auth.token
//   return config
// })
axios.defaults.withCredentials = true

axios.interceptors.response.use(response => {

  return response;
}, ({ response }) => {
  const { data, status, statusText } = response

  switch (status) {
    case 422:

      break;
    case 401:
      // vm.$snotify.error('请先登录')
      store.dispatch(types.GO_LOGIN)
      break
    case 404:
      Vue.prototype.$snotify.error(String(statusText))
      break;
  }
  // path一个对象，可能是message|error.message|0.message
  let msg = _.get(data, 'message', _.get(data, 'error.message', _.get(data, '0.message')))
  if (Array.isArray(msg)) {
    msg = msg[0].message
  }
  if (msg) {
    Vue.prototype.$snotify.error(String(msg))
  } else {
    // console.error(data)
  }
  return Promise.reject(response);
});

// 替换原生的http
Vue.prototype.$http = axios

export default axios