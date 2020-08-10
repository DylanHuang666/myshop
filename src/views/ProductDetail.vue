<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="产品详情"
      left-text="返回"
      :right-text="JSON.stringify(userInfo) === '{}' ? '登录' : userInfo.userName"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 详情 -->
    <img :src="detail.img" alt class="detail-img" />
    <div class="detail">
      <p class="detail-name">{{detail.name}}</p>
      <p class="detail-price">￥{{detail.price}}</p>
      <p>公司：{{detail.company}}</p>
      <p>产地：{{detail.city}}</p>
    </div>

    <!-- 底部按钮 -->
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addCartHandle" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { getDetail, addCart } from "@/service/api.js";
import { mapState } from "vuex";
export default {
  name: "ProductDetail",
  data() {
    return {
      detail: {}
    };
  },
  created() {
    getDetail({
      id: this.$route.query.id
    }).then(res => {
      console.log(res);
      this.detail = res.data;
    });
  },
  methods: {
    //点击加入购物车
    addCartHandle() {
      //判断用户是否登录
      if (JSON.stringify(this.userInfo) === "{}") {
        //没登录，提示
        this.$toast.fail("请先登录");
      } else {
        //已登录
        addCart({
          userId: this.userInfo._id,
          productId: this.$route.query.id
        })
          .then(res => {
            if (res.data.code == 200) {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.fail(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 0.1rem;
  &-img {
    width: 100%;
    height: 2.5rem;
  }
  &-name {
    color: #333;
    font-weight: bolder;
  }
  &-price {
    color: #ff7300;
    font-size: 0.2rem;
  }
}
</style>