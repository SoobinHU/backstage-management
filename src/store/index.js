import Vue from "vue";
import Vuex from "vuex";
import asideStore from "./asideStore";
Vue.use(Vuex)

//创建vuex的实例store
export default new Vuex.Store({
    modules:{
        asideStore
    }
})