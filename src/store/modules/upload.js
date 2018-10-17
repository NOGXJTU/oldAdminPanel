import types from '../types'

export default {
  state: {
    token: null
  },
  mutations: {
    [types.SET_TOKEN](state, token) {
      state.token = token
      localStorage.setItem('upload_token', token)
    },
  },
  actions: {
    [types.GET_TOKEN]({ commit }) {
      let token = ''
      try {
        token = localStorage.getItem('upload_token') || ''
      } catch (e) {
        token= ''
      }
      commit(types.SET_TOKEN, token)
    }
  }
}