import { requseLogin } from "@/axios/api";

const state = {
  name: '',
  password: '',
  userInfo: null
}

const getters = {

}

const mutations = {
  SAVE_USERNAME (state, payload) {
    state.name = payload.name
  },

  SAVE_USERPASSWORD (state, payload) {
    state.password = payload.password
  },

  SAVE_USERINFO (state, payload) {
    state.userInfo = payload.userInfo
  }
}

const actions = {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      requseLogin(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject()
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}