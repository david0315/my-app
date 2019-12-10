import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '系统首页' },
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: '/weatherstation',
    name: 'weatherstation',
    meta: { title: '气象站' },
    component: () => import('../views/WeatherStation/WeatherStation.vue')
  },
  {
    path: '/soilindex',
    name: 'soilindex',
    meta: { title: '土壤指标' },
    component: () => import('../views/SoilIndex/SoilIndex.vue')
  },
  {
    path: '/remotecontrol',
    name: 'remotecontrol',
    meta: { title: '远程控制台' },
    component: () => import('../views/RemoteControl/RemoteControl.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//beforeEach是router的钩子函数，在进入路由前执行
router.beforeEach((to, from, next) => {
  //判断是否有标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  //执行进入路由，如果不写就不会进入目标页
  next()
})

export default router
