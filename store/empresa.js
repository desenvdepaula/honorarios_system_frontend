export const state = () => ({
  loadedEmpresas: [],
})

export const mutations = {
  setEmpresas(state, empresas){
    state.loadedEmpresas = empresas
  },
}

export const getters = {
  loadedEmpresas(state){
    return state.loadedEmpresas
  },
};
