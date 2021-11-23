const state = {
  nickname: '',
}

const getters = {

}

const mutations = {
  SET_NICKNAME(state, nickname) {
    state.nickname = nickname
  }
}

const actions = {
  setNickname({commit}, nickname) {
    commit('SET_NICKNAME', nickname)
  }
}

export default {
  state, getters, mutations, actions
}