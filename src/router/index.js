import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/',
    component: () => import('../components/Home.vue'),
    children: [{
      path: '/index',
      name: 'index',
      meta: { title: '系统首页' },
      component: () => import('../views/Index/Index.vue')
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
    }]
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录界面' },
    component: () => import('../views/Login/Login.vue')
  },
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
  next();
  //判断用户是否登录，如果没登录则进入登录页
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('user_token');
    console.log(token);
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
})

export default router
