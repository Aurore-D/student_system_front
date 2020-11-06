import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user.js'
import common from './module/common.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    common
  }
})
export default store
