// import Vuex from 'vuex';

// const createStore = () => {
//   return new Vuex.Store({
//     state: {

//     },
//     mutations: {

//     },
//     actions: {
//       nuxtServerInit(vuexContext, context){
//         return context.app.$axios.$get('/posts.json')
//           .then(data => {
//             const postArray = []
//             for (const key in data){
//               postArray.push({ ...data[key], id: key })
//             }
//             vuexContext.commit('setPosts', postArray)
//           })
//           .catch(e => context.error(e));
//       },
//     },
//     getters: {

//     }
//   })
// }

// export default createStore
