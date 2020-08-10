<template>
  <div class="footerbar">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {
      active: 0
    }
  },
  watch: {
    $route: {
      handler() {
        console.log('watch')
        this.active = this.$route.name == 'home' ? 0 : this.$route.name == 'category' ? 1 : this.$route.name == 'cart' ? 2 : 3
      },
      immediate: true
    }
  }
  // watch: {
  //   $route(to){
  //     console.log('watch')
  //     this.active = to.name == 'home' ? 0 : to.name == 'category' ? 1 : to.name == 'cart' ? 2 : 3
  //   }
  // }
};
</script>

<style lang="scss" scoped>
</style>