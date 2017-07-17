// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/font/iconfont.css'
import router from './router/index.js'
import store from './store/store'
import Vuex from 'vuex'

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(Vuex)
    /* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    render: h => h(App)
})