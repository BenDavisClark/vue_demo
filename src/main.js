import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
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
  Pagination
} from 'element-ui'

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
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.use(Loading.directive)
// Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
