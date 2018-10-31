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

import {
  Menu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  MenuItem,
  Submenu,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  Button,
  Dialog,
  Upload,
  Switch,
  Option,
  DatePicker,
  TimeSelect,
  TimePicker,
  Select,
  Table,
  TableColumn,
  Loading,
  Pagination,
  Cascader,
  Tree,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Tag,
  Card,
  Progress,
  Tooltip,
  Transfer
} from 'element-ui'

import _ from 'lodash'
Object.defineProperty(Vue.prototype, '_', { value: _ })

Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Icon)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(TimeSelect)
Vue.use(Option)
Vue.use(Select)
Vue.use(Table)
Vue.use(Tree)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Cascader)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tag)
Vue.use(Card)
Vue.use(Progress)
Vue.use(Tooltip)
Vue.use(Transfer)

Vue.use(Loading.directive)
Vue.use({
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(preview)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

Vue.config.productionTip = false

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
