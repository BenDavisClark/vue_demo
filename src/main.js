import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/permission' // 权限
import 'babel-polyfill'

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
  Checkbox,
  CheckboxGroup,
  Input,
  Button,
  Dialog,
  Upload,
  Switch,
  TimePicker,
  Option,
  DatePicker,
  RadioGroup,
  Select,
  Table,
  TableColumn,
  Loading,
  Pagination,
  Cascader,
  Tree,
  MessageBox,
  Message
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
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(TimePicker)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Table)
Vue.use(Tree)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Cascader)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

Vue.config.productionTip = false

// 按钮级权限控制
// Vue.directive('has',{
//   bind: function (el, binding) {
//     console.log(binding.value)
//     if (binding.value === 'del') {
//       el.parentNode.removeChild(el);
//     }
//     Vue.prototype.$auth()
//   }
// })

// Vue.prototype.$auth = function(value) {
//   console.log()
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
