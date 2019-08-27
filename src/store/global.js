const state = {
  name: '',
  password: '',
  userInfo: null
}

const getters = {

}

const mutations = {
  SAVE_USERNAME(state, payload) {
    state.name = payload.name
  },

  SAVE_USERPASSWORD(state, payload) {
    state.password = payload.password
  },

  SAVE_USERINFO(state, payload) {
    state.userInfo = payload.userInfo
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
