import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/chatddddd',
    component: () => import('@/views/chat/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard/',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/editor/indexdash'),
        name: 'indexdash',
        meta: { title: 'داشبورد', icon: 'fa-solid fa-chart-pie' }
      }
    ]
  },
  {
    path: '/person/person',
    component: Layout,
    redirect: '/person/person',
    children: [
      {
        path: '/person/person',
        component: () => import('@/views/person/person'),
        name: 'person',
        meta: { title: 'پرسنل', icon: 'user' }
      }
    ]
  },

  {
    path: '/access/access',
    component: Layout,
    redirect: '/access/access',
    children: [
      {
        path: '/access/access',
        component: () => import('@/views/access/access'),
        name: 'access',
        meta: { title: ' دسترسی', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
