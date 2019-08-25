import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

// const _import = path => import(path)

// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来

const Layout = () => import('@/components/layout/index.vue')

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。

// constant routes
export const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error404/index.vue')
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: '/',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: 'Home',
          icon: 'home'
        }
      }
    ]
  },
  {
    path: '/nba',
    component: Layout,
    name: 'NBA',
    children: [
      {
        path: 'team',
        component: () => import('@/views/nba/team/index.vue'),
        name: 'Team',
        meta: {
          title: 'Team',
          icon: 'team'
        }
      },
      {
        path: 'player',
        component: () => import('@/views/nba/player/index.vue'),
        name: 'Player',
        meta: {
          title: 'Player',
          icon: 'player'
        }
      }
    ]
  },
  {
    path: '/history',
    component: Layout,
    name: 'History',
    children: [
      {
        path: 'allstar',
        component: () => import('@/views/history/allstar/index.vue'),
        name: 'All Star',
        meta: {
          title: 'All Star',
          icon: 'allstar'
        }
      },
      {
        path: 'halloffame',
        component: () => import('@/views/history/halloffame/index.vue'),
        name: 'Hall Of Fame',
        meta: {
          title: 'Hall Of Fame',
          icon: 'halloffame'
        }
      }
    ]
  },
  {
    path: '/equipment',
    component: Layout,
    children: [
      {
        path: 'shoes',
        component: () => import('@/views/equipment/shoes/index.vue'),
        name: 'Shoes',
        meta: {
          title: 'Shoes',
          icon: 'shoes'
        }
      },
      {
        path: 'uniforms',
        component: () => import('@/views/equipment/uniform/index.vue'),
        name: 'Uniforms',
        meta: {
          title: 'Uniforms',
          icon: 'uniforms'
        }
      }
    ]
  },

]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})

export default router