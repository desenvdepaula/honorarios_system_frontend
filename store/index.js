export const state = () => ({
  loadedHonorarios: [],
  loadedEmpresas: [],
})

export const mutations = {
  setHonorarios(state, honorarios){
    state.loadedHonorarios = honorarios
  },
  addHonorario(state, honorario){
    state.loadedHonorarios.unshift(honorario)
  },
  editHonorario(state, editedHonorario){
    const honorarioIndex = state.loadedHonorarios.findIndex(honorario => honorario.id === editedHonorario.id)
    state.loadedHonorarios.splice(honorarioIndex, 1, editedHonorario)
  },
  removeHonorario(state, index){
    state.loadedHonorarios.splice(index, 1)
  },
  setEmpresas(state, empresas){
    state.loadedEmpresas = empresas
  },
}

export const actions = {
  nuxtServerInit(vuexContext, context){
    return context.app.$axios.$get('/honorario/')
      .then(data => {
        data.reverse();
        vuexContext.commit('setHonorarios', data)
      })
      .catch(e => context.error(e));
  },

  addHonorario(vuexContext, honorario){
    return this.$axios.$post('/honorario/', honorario)
      .then(data => {
          vuexContext.commit('addHonorario', data)
          this.$toast.success('Cadastro Efetuado com Sucesso')
        })
      .catch(e => this.$toast.error(`Error ${e}`))
  },

  editHonorario(vuexContext, editedhonorario){
    return this.$axios.$put('/honorario/' + editedhonorario.id + '/', editedhonorario.honorario)
      .then(data => {
          vuexContext.commit('editHonorario', data)
          this.$toast.success('Editado com Sucesso')
        })
      .catch(e => this.$toast.error(`Error ${e}`))
  },

  removeHonorario(vuexContext, payload){
    return this.$axios.$delete('/honorario/' + payload.honorario.id)
      .then(() => {
          vuexContext.commit('removeHonorario', payload.index)
          this.$toast.success('Removido com Sucesso')
        }).catch(e => this.$toast.error(`Error ${e}`))
  },

}

export const getters = {
  loadedHonorarios(state){
    return state.loadedHonorarios
  },
  loadedEmpresas(state){
    return state.loadedEmpresas
  },

}
