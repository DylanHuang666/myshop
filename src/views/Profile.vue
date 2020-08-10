<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="我的" left-text="返回" left-arrow @click-left="$router.go(-1)" />

    <div class="info">
      <div class="info-box">
        <div class="img">
          <!-- <van-icon name="manager" size="70" /> -->
          <!-- v-model="fileList" @click-preview="clickpreview" :after-read="afterRead" :deletable="false" :preview-full-image="false" :max-count="1" -->
          <img :src="userInfo.avatar" alt v-if="isLogin" />
          <img :src="avatar" alt v-else />
        </div>
        <div class="message">
          <p class="name" v-if="isLogin">{{userInfo.userName}}</p>
          <van-uploader :after-read="afterRead" v-if="isLogin">
            <van-button icon="photo" type="primary" size="small">更换头像</van-button>
          </van-uploader>
        </div>
      </div>
      <van-button class="btn" type="info" size="large" v-if="isLogin" @click="loginOutHandle">退出登录</van-button>
      <van-button class="btn" type="info" size="large" to="/login" v-else>去登录</van-button>
    </div>
  </div>
</template>

<script>
import { uploadUserImg } from "@/service/api.js";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      // fileList: [],
      // userInfo: {
      //   avatar: "https://b.yzcdn.cn/vant/icon-demo-1126.png"
      // }
      avatar: "https://b.yzcdn.cn/vant/icon-demo-1126.png"
    };
  },
  created() {
    console.log(111);
    // console.log(this.userInfo.userName)
    // if (!Object.keys(this.$store.state.userInfo).length == 0) {
    //   getUserInfo({
    //     userId: this.$store.state.userInfo._id
    //   })
    //     .then(res => {
    //       console.log(res);
    //       if (res.data.code == 200) {
    //         this.userInfo = res.data.data;
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  },
  computed: {
    ...mapGetters(["isLogin"]),
    ...mapState(["userInfo"])
  },
  methods: {
    afterRead(file) {
      console.log(file);
      this.imgUrl = file.content;
      let imgfile = file.file;
      let formData = new FormData();
      formData.append("avatar", imgfile);
      formData.append("userId", this.$store.state.userInfo._id);
      uploadUserImg(formData)
        .then(res => {
          console.log(res);
          this.userInfo.avatar = res.data.avatar;
        })
        .catch(err => {
          console.log(111);
          console.log(err);
        });
    },
    ...mapActions(["loginAction"]),
    loginOutHandle() {
      this.$dialog.confirm({
        // title: "标题",
        message: "确定要退出登录吗？",
        confirmButtonText: '确定'
      })
        .then(() => {
          // on confirm
          this.loginAction({});
        })
        .catch(() => {
          // on cancel
        });     
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  padding: 10px;
  .info-box {
    display: flex;
    .img {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      // border-radius: 50%;
      img {
        height: 80px;
        border-radius: 10px;
      }
    }
    .message {
      flex: 1;
      // height: 80px;
      .name {
        font-size: 20px;
        margin-bottom: 5px;
      }
    }
  }
  .btn {
    margin-top: 10px;
  }
}
</style>