import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/reset.css'
import '@/assets/js/rem.js'

Vue.config.productionTip = false

import '@/mock/mock.js'
// import {
//   SubmitBar,
//   Card,
//   GoodsAction,
//   GoodsActionBigBtn,
//   GoodsActionMiniBtn,
//   PullRefresh,
//   List,
//   Row,
//   Col,
//   Toast,
//   CellGroup,
//   Field,
//   Tab,
//   Tabs,
//   Button,
//   Icon,
//   NavBar,
//   Tabbar,
//   TabbarItem,
//   Swipe,
//   SwipeItem,
//   Lazyload
// } from 'vant'
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Field,
  Cell,
  CellGroup,
  Button,
  Toast,
  NavBar,
  Col,
  Row,
  PullRefresh,
  List,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Card,
  Icon,
  Uploader,
  Dialog
} from 'vant'
Vue.use(Swipe).use(SwipeItem).use(Lazyload).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Field).use(Cell).use(CellGroup).use(Button).use(Toast).use(NavBar).use(Col).use(Row).use(PullRefresh).use(List).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Card).use(Icon).use(Uploader).use(Dialog)
// Vue.use(SubmitBar).use(Card).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(PullRefresh).use(List).use(Row).use(Col).use(Toast).use(CellGroup).use(Field).use(Tab).use(Tabs).use(Button).use(Icon).use(NavBar).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')