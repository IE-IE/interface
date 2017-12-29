export default {
  namespaced: true,
  state: {
    game: '',
    files: null
  },
  mutations: {
    files (state, files) {
      state.files = files;
    },

    game (state, name) {
      state.game = name;
    }
  },
  actions: {},
  getters: {}
};