import Vue from 'vue'
import App from './App.vue'
//引入ElementUI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入router
import router from './router'
import store from './store'

//全局引入
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
// 以80%定义浏览器默认75%的比例缩放
window.onload=function(){
  document.body.style.zoom="75%";
}