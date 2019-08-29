const state = {
  name: '',
  password: '',
  userInfo: null,
  userToken: null,
  spinning: false
}

const getters = {

}

const mutations = {
  SAVE_USERNAME(state, payload) {
    state.name = payload
  },

  SAVE_USERPASSWORD(state, payload) {
    state.password = payload
  },

  SAVE_USERINFO(state, payload) {
    state.userInfo = payload
  },

  SAVE_USERTOKEN(state, payload) {
    state.userToken = payload
  },

  CHANGE_SPINNING(state, payload) {
    state.spinning = payload
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
