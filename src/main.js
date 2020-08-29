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
import Router from 'vue-router';
import store from './store'

// require('./mock')

// import Mock from './mock/index'
// Mock.init()
// import AsyncComputed from 'vue-async-computed'
// Vue.use(AsyncComputed)

Vue.use(Router)

// 添加这下面一段代码，就可以解决报错 

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

import { message, Form } from 'ant-design-vue'

import '@/styles/base.scss' //全局css

Vue.config.productionTip = false

// 挂在全局变量
Vue.prototype.$message = message
Vue.prototype.$form = Form

// 路由导航
router.beforeEach((to, from, next) => {
    if (localStorage.getItem('userToken')) { // 如果已经登录的话
        next();
    } else {
        if (to.path === '/login' || to.path === '/test') { // 如果是登录页面的话，直接next()
            next();
        } else { // 否则 跳转到登录页面
            next({
                path: '/login'
            });
        }
    }
})
  
// ####################################
  
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
