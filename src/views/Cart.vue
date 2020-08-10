<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="购物车"
      left-text="返回"
      :right-text="JSON.stringify(userInfo) === '{}' ? '登录' : userInfo.userName"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 购物车列表 -->
    <div>
      <van-card
        v-for="item in cartList" :key="item._id"
        num="1"
        :price="item.productId.price"
        :desc="'公司：'+item.productId.company"
        :title="item.productId.name"
        :thumb="item.productId.img"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCart } from "@/service/api.js";
export default {
  name: "Cart",
  data() {
    return {
      cartList: []
    };
  },
  created() {
    if (JSON.stringify(this.userInfo) === "{}") {
      //没登录，提示
      this.$toast.fail("请先登录");
    } else {
      getCart({
        userId: this.userInfo._id
      })
        .then(res => {
          console.log(res);
          this.cartList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style lang="scss" scoped>
.van-card__title {
  font-size: 16px;
  font-weight: bolder;
  line-height: 22px;
  max-height: unset;
}
</style>