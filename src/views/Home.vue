<template>
  <div class="home">
    <!-- 头部 :right-text="JSON.stringify(userInfo) === '{}' ? '登录' : userInfo.userName" -->
    <van-nav-bar title="首页"  class="nav-title" @click-right="onClickRight">
      <img class="avatar" :src="$store.state.userInfo.avatar" alt="" v-if="$store.getters.isLogin" slot="right">
      <p class="userName" v-if="$store.getters.isLogin" slot="right">{{$store.state.userInfo.userName}}</p>
      <van-icon class="userIcon" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" slot="right" v-else />
    </van-nav-bar>

    <!-- 轮播图 -->
    <div class="carousel">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1918fa">
        <van-swipe-item class="carousel-item" v-for="item in carouselItem" :key="item.imgId">
          <img v-lazy="item.imgSrc" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 热门产品 -->
    <div class="hot">
      <p class="hot-title">热门产品</p>
      <swiper class="hot-swiper" :options="swiperOption">
        <swiper-slide v-for="(item, index) in hotProducts" :key="index">
          <div class="hot-swiper-content">
            <img :src="item.img" alt />
            <div class="item-name">{{ item.name }}</div>
            <div>￥{{ item.price }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- 推荐产品 -->
    <div class="recommend">
      <p class="recommend-title">推荐产品</p>
      <ul>
        <li class="recommend-item" v-for="item in recommendProducts" :key="item.id">
          <img :src="item.img" alt />
          <p class="name">{{item.name}}</p>
          <p>￥{{item.price}}</p>
        </li>
      </ul>
      <div class="nomore">没有更多内容了~</div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getRecommendProducts } from "@/service/api.js";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      carouselItem: [
        // 轮播图
        {
          imgId: 1,
          name: "img1",
          imgSrc:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1041994715,1243354266&fm=26&gp=0.jpg"
        },
        {
          imgId: 2,
          name: "img2",
          imgSrc:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=116744544,2055858210&fm=26&gp=0.jpg"
        },
        {
          imgId: 3,
          name: "img3",
          imgSrc:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1490457979,856070595&fm=200&gp=0.jpg"
        }
      ],
      hotProducts: [
        // 热门商品
        {
          name: "   汽油动力手推割杆机 养殖场专用青储割晒机",
          img:
            "http://img47.nongjx.com/2/20180628/636657846366213316507_198_170_5.jpg",
          price: "3260",
          company: "  曲阜市润众机械制造有限",
          city: "曲阜市"
        },
        {
          name: "   手扶带牧草收割机 青储高杆作物割晒机价格",
          img:
            "http://img47.nongjx.com/2/20180628/636657846396789904965_198_170_5.jpg",
          price: "3260",
          company: "  曲阜市润众机械制造有限",
          city: "曲阜市"
        },
        {
          name: "   不缠秧的花生果子收割机 手扶马铃薯收获机",
          img:
            "http://img48.nongjx.com/2/20180628/636657836692623289517_198_170_5.jpg",
          price: "2800",
          company: "  曲阜市润众机械制造有限",
          city: "曲阜市"
        },
        {
          name: "   高港区手扶车带动土豆收获机收山芋机器",
          img:
            "http://img49.nongjx.com/2/20180511/636616318740584319169_198_170_5.jpg",
          price: "1900",
          company: "  山东曲阜宏燊工贸有限公",
          city: "曲阜市"
        },
        {
          name: "   拖拉机带多功能割晒机 玉米高粱杆子收割机",
          img:
            "http://img50.nongjx.com/2/20180628/636657846333452686281_198_170_5.jpg",
          price: "3260",
          company: "  曲阜市润众机械制造有限",
          city: "曲阜市"
        },
        {
          name: "   厂家直销大型花生收获机 地下薯类挖收机",
          img:
            "http://img48.nongjx.com/2/20180628/636657834205779466463_198_170_5.jpg",
          price: "2800",
          company: "  曲阜市润众机械制造有限",
          city: "曲阜市"
        },
        {
          name: "   地瓜土豆杀秧机",
          img:
            "http://img49.nongjx.com/2/20180906/636718188965915110193_198_170_5.jpg",
          price: "2380",
          company: "  曲阜市汇林机械有限公司",
          city: "曲阜市"
        },
        {
          name: "   地瓜杀秧机",
          img:
            "http://img49.nongjx.com/2/20180906/636718188987287247797_198_170_5.jpg",
          price: "2380",
          company: "  曲阜市汇林机械有限公司",
          city: "曲阜市"
        },
        {
          name: "   自走式大型花生去秧机 花生除秧自动装袋机",
          img:
            "http://img48.nongjx.com/2/20180715/636672620827383254579_198_170_5.jpg",
          price: "2582",
          company: "  曲阜金源机械设备有限公",
          city: "济宁市"
        },
        {
          name: "   高效省人工花生摘果机 全新多功能去秧机",
          img:
            "http://img48.nongjx.com/2/20180715/636672620827383254579_198_170_5.jpg",
          price: "2581",
          company: "  曲阜金源机械设备有限公",
          city: "济宁市"
        },
        {
          name: "   河北邢台花生摘果机 自动装袋脱果机图片",
          img:
            "http://img48.nongjx.com/2/20180715/636672620803202789496_198_170_5.jpg",
          price: "2580",
          company: "  曲阜金源机械设备有限公",
          city: "济宁市"
        },
        {
          name: "   大型花生收获机规格 链条式方便花生挖果机",
          img:
            "http://img47.nongjx.com/2/20180926/636735768787313154613_198_170_5.jpg",
          price: "3260",
          company: "  曲阜浩发机械有限公司",
          city: "济宁市"
        },
        {
          name: "   家用节能花生摘果机 自动装袋花生分离机",
          img:
            "http://img50.nongjx.com/2/20180926/636735749293114513986_198_170_5.jpg",
          price: "3460",
          company: "  曲阜浩发机械有限公司",
          city: "济宁市"
        },
        {
          name: "   牵引式苞米杆打包机生产定制",
          img:
            "http://img67.nongjx.com/2/20170627/636341765014077992756_198_170_5.jpg",
          price: "面议",
          company: "  曲阜四达机械设备有限公",
          city: "济宁市"
        }
      ],
      swiperOption: { slidesPerView: 3 },
      recommendProducts: []
    };
  },
  created() {
    getRecommendProducts().then(res => {
      console.log(res);
      this.recommendProducts = res.data;
    });
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    onClickRight() {
      this.$router.push('/profile')
    }
  }
};
</script>
<style lang="scss" scoped>
//头部
.nav-title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  /deep/.van-nav-bar__right {
    height: 46px;
    // line-height: 46px;
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .userName {
    margin-left: 4px;
    font-size: 12px;
  }
  .userIcon {
    font-size: 30px;
  }
}

//轮播图
.carousel {
  margin-top: 46px;
  &-item {
    img {
      width: 100%;
      height: 1.5rem;
    }
  }
}

// 热门商品
.hot {
  // margin-top: 0.1rem;
  background-color: #fff;
  &-title {
    width: 100%;
    text-align: center;
    height: 0.25rem;
    // padding-left: 0.1rem;
    line-height: 0.25rem;
    // box-sizing: border-box;
    padding: 8px 0;
  }
  &-swiper {
    &-content {
      // width: 1rem;
      text-align: center;
      img {
        width: 1rem;
        height: 0.8rem;
      }
      .item-name {
        //多行省略
        padding: 0 10px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.recommend {
  // margin-top: 0.1rem;
  background-color: #fff;
  text-align: center;
  margin-bottom: 0.5rem;
  .recommend-title {
    padding: 8px 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  &-item {
    flex-basis: 45%;
    img {
      margin-bottom: 6px;
      // width: 1rem;
      // height: 1rem;
    }
    .name {
      padding: 0 10px;
      line-height: 20px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .nomore {
    text-align: center;
    padding: 20px 0;
    color: #888;
  }
}
</style>
