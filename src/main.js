import Vue from 'vue'
import router from './router'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import Vuex from 'vuex'
import store from './store/index'
import 'es6-promise/auto'
import AWS from 'aws-sdk'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faLongArrowAltRight)
library.add(faSearch)
library.add(faHome)

Vue.config.productionTip = false
Vue.use(AWS)
Vue.use(Vuex)

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
