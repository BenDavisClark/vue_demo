const app = {
  state: {
    sidebar: {
      opened: true
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
