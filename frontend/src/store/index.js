import Vue from 'vue'
import Vuex from 'vuex'

import stages from "@/store/modules/stages";
import user from "@/store/modules/user";
import websql from "@/store/modules/websql";

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {stages, user, websql},
  plugins: [
  ]
})

