import Vue from 'vue'
import Cookies from 'js-cookie'
import moment from 'vue-jalali-moment'
Vue.use(moment)
import PersianCalendar from 'vue-persian-calendar'
Vue.use(PersianCalendar)
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/fa'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
import './icons'
import './permission'
import * as filters from './filters'
import VueSwal from 'vue-swal'
Vue.use(VueSwal)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  locale: enLang
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.config.devtools = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
