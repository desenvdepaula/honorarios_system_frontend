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
      removeHonorario(state, index){
        state.loadedHonorarios.splice(index, 1)
      },
      setEmpresas(state, empresas){
        state.loadedEmpresas = empresas
      },


    },
    actions: {
      nuxtServerInit(vuexContext, context){
        return context.app.$axios.$get('/honorario/')
          .then(data => {
            data.reverse();
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
              vuexContext.commit('removeHonorario', payload.index)
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
