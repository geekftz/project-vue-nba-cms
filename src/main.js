// ############################# 全局引入

// import Vue from 'vue'

// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

// import App from './App'
// import router from './router'

// import '@/styles/index.scss' //全局css

// Vue.config.productionTip = false


// #################################### 按需引入
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { message, Form } from 'ant-design-vue'

import '@/styles/index.scss' //全局css

Vue.config.productionTip = false

Vue.prototype.$message = message
Vue.prototype.$form = Form

// ####################################

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
