<template>
  <div id="app">
    <keep-alive include="Category">
      <router-view />
    </keep-alive>   
    <router-view name="footer-bar" />
  </div>
</template>

<script>
// import FooterBar from '@/components/FooterBar.vue'
export default {
  // components: {
  //   FooterBar
  // }
};
</script>

<style lang="scss">
</style>
