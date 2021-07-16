export const state = () => ({
  loadedHonorarios: [],
})

export const mutations = {
  setHonorarios(state, honorarios){
    state.loadedHonorarios = honorarios
  },
  addHonorario(state, honorario){
    state.loadedHonorarios.unshift(honorario)
  },
  removeHonorario(state, index){
    state.loadedHonorarios.splice(index, 1)
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
          this.$toast.show('Cadastrando...')
          this.$toast.success('Cadastro Efetuado com Sucesso')
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
};
