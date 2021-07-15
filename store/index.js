import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedHonorarios: [],
      loadedEmpresas: [],
    },
    mutations: {
      setHonorarios(state, honorarios){
        state.loadedHonorarios = honorarios
      },
      addHonorario(state, honorario){
        state.loadedHonorarios.unshift(honorario)
      },
      setEmpresas(state, empresas){
        state.loadedEmpresas = empresas
      },


    },
    actions: {
      nuxtServerInit(vuexContext, context){
        return context.app.$axios.$get('/honorario/')
          .then(data => {
            vuexContext.commit('setHonorarios', data)
          })
          .catch(e => context.error(e));
      },

      addHonorario(vuexContext, honorario){
        console.log(honorario)
        return this.$axios.$post('/honorario/', honorario)
          .then(data => {
              vuexContext.commit('addHonorario', data)
            })
          .catch(e => console.log(e))
      },

      removeHonorario(vuexContext, payload){
        return this.$axios.$delete('/honorario/' + payload.honorario.id)
          .then(() => {
              const loaded = vuexContext.state.loadedHonorarios
              loaded.splice(payload.index, 1)
              vuexContext.commit('setHonorarios', loaded)
              // eslint-disable-next-line no-console
              console.log(loaded)
              // eslint-disable-next-line no-console
              console.log('Removido com sucesso no Vuex')
            })
      },

    },
    getters: {
      loadedHonorarios(state){
        return state.loadedHonorarios
      },
      loadedEmpresas(state){
        return state.loadedEmpresas
      },

    }
  })
}

export default createStore
