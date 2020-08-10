<template>
  <div class="category">
    <van-nav-bar title="产品类型" left-text="返回" :right-text="JSON.stringify(userInfo) === '{}' ? '登录' : userInfo.userName" @click-left="$router.go(-1)" left-arrow />
    <div>
      <van-row>
        <van-col span="6" class="nav">
          <ul>
            <li
              v-for="(item, index) in typeList"
              :key="item.typeId"
              :class="{active:active == index}"
              @click="selectCategory(item.typeId, index)"
            >{{item.typeName}}</li>
          </ul>
        </van-col>
        <van-col span="18" class="container">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" finished-text="没有更多了" @load="onLoad" :finished="finished">
              <div class="content-item" v-for="(item, index) in productList" :key="index" @click="goDetail(item._id)">
                <img :src="item.img" alt />
                <p class="content-item-name">{{item.name}}</p>
                <p>￥{{item.price}}</p>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getProductType, getProductsByType } from "@/service/api.js";
import { mapState } from "vuex";
export default {
  name: "Category",
  data() {
    return {
      typeList: [],
      active: 0,
      typeId: 3, //1~8
      start: 0,
      limit: 10,
      productList: [],
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  created() {
    console.log("created");
    //获取产品类型
    getProductType()
      .then(res => {
        console.log(res);
        this.typeList = res.data;
        this.typeId = res.data[0].typeId;
        console.log('第一次10条')
        // this.getProducts();
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    //点击分类触发
    selectCategory(typeId, index) {
      if (!(this.typeId == typeId)) {
        this.active = index;
        this.typeId = typeId;
        this.productList = [];
        this.start = 0;
        // this.getProducts();
        getProductsByType({
          typeId: this.typeId,
          start: 0,
          limit: this.limit
        })
          .then(res => {
            this.productList = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //获取某类型产品
    getProducts() {
      getProductsByType({
        typeId: this.typeId,
        start: this.start,
        limit: this.limit
      })
        .then(res => {
          console.log(res, "111111");
          if (res.data.length) {
            this.productList = this.productList.concat(res.data);
            this.start = this.productList.length;
            this.loading = false;
          }else{
            this.finished = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //当组件滚动到底部时触发，组件刚加载时也会触发
    onLoad() {
      console.log("onLoad");
      this.loading = true;
      this.getProducts();
    },
    //下拉刷新，重新加载前10条
    onRefresh() {
      console.log("onRefresh");
      this.loading = true;
      getProductsByType({
        typeId: this.typeId,
        start: 0,
        limit: this.limit
      }).then(res => {
        this.productList = res.data;
        this.loading = false;
        this.refreshing = false;
      });
      // this.productList = []
      // this.start = 0
      // this.getProducts()
    },
    goDetail(id) {
      this.$router.push({
        name: 'productDetail',
        query: {
          id
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
}
.nav {
  background-color: #eee;
  margin-top: 46px;
  li {
    height: 0.3rem;
    line-height: 0.3rem;
    border-bottom: 1px solid #fff;
    padding: 3px;
    text-align: center;
  }
  li.active {
    background-color: #ffffff;
  }
}
.container {
  position: fixed;
  top: 46px;
  bottom: 0.5rem;
  right: 0;
  overflow: auto;
  // overflow-y: scroll;
  // overflow-y:auto;
  .van-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .content-item {
      width: 45%;
      text-align: center;
      img {
        height: 0.8rem;
        width: 1.08rem;
      }
      &-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>