import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import { Toast } from 'vant'
// import Home from '../views/Home.vue'
// import Profile from '../views/Profile.vue'
// import Category from '../views/Category.vue'
// import ProductDetail from '../views/ProductDetail.vue'
// import Cart from '../views/Cart.vue'
// import FooterBar from '@/components/FooterBar.vue'

let Home = () => import('../views/Home.vue')
let Login = () => import('../views/Login.vue')
let Category = () => import('../views/Category.vue')
let ProductDetail = () => import('../views/ProductDetail.vue')
let Cart = () => import('../views/Cart.vue')
let FooterBar = () => import('@/components/FooterBar.vue')
let Profile = () => import('../views/Profile.vue')



Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    title: '首页',
    // component: Home
    components: {
      default: Home,
      'footer-bar': FooterBar
    }
  },
  {
    path: '/login',
    name: 'login',
    title: '登录与注册',
    components: {
      default: Login
      // 'footer-bar': FooterBar
    }
  },
  {
    path: '/category',
    name: 'category',
    title: '产品分类',
    // component: Category
    components: {
      default: Category,
      'footer-bar': FooterBar
    }
  },
  {
    path: '/cart',
    name: 'cart',
    title: '购物车',
    // component: Cart
    components: {
      default: Cart
      // 'footer-bar': FooterBar
    },
    meta: {
      login: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    title: '我的页面',
    components: {
      default: Profile,
      'footer-bar': FooterBar
    }
  },
  {
    path: '/productDetail',
    name: 'productDetail',
    title: '产品详情',
    components: {
      default: ProductDetail
    }
    // component: ProductDetail
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('each')
  console.log('from',from)
  console.log('to',to)
  let isLogin
  if(Object.keys(Store.state.userInfo).length == 0) {
    isLogin = false
  }else{
    isLogin = true
  }
  if(to.matched.some( item => item.meta.login)){
    if(isLogin){
      next()
    }else if(to.name == 'cart'){
      Toast.fail('请先登录')
      setTimeout(function(){
        next({name: 'login'})
      },1000)    
    }   
  }else{
    next()
  }
})


export default router