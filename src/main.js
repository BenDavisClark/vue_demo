import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/permission' // 权限
import 'babel-polyfill'
import $ from 'jquery'
import i18n from './lang' // Internationalization
import './icons' // icon
import './styles/common.scss' // icon
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import fullCalendar from 'vue-fullcalendar'
import * as d3 from "d3";
import axios from 'axios'
// jsplumb
import jsplumb from 'jsplumb'
import 'jsplumb/css/jsplumbtoolkit-defaults.css';

//jquery ui
import 'jquery-ui-dist/jquery-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import _ from 'lodash'
Object.defineProperty(Vue.prototype, '_', { value: _ })

Vue.use(ElementUI);
Vue.use(preview)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

//按钮级权限控制
Vue.directive('has',{
  bind: function (el, binding) {
    if (binding.value === 'del') {
      el.parentNode.removeChild(el);
    }
    Vue.prototype.$auth()
  }
})

Vue.prototype.$auth = function(value) {
  console.log()
}

Vue.prototype.$d3 = d3;
Vue.prototype.jsplumb = jsplumb;
window.d3 = d3;

Vue.component('full-calendar', fullCalendar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  i18n,
  $
})
