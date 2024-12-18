<template>
  <div class="container">
    <Header
      v-if="refresh"
      :music="music"
      title="嘿，你今天笑了么(≖ᴗ≖)✧"
    ></Header>

    <div class="content">
      <h1>[一日之计在于晨]</h1>
      <div class="main">
        <template v-if="resultInfo">
          <div class="is-active" :class="resultInfo.icon">
            <span class="iconfont" :class="'icon-' + resultInfo.icon"></span>
            <p class="email" v-if="resultInfo.email">{{ result.email }}</p>
            <p>{{ result.message }}</p>
            <nuxt-link to="/" v-if="resultInfo.home">去到首页</nuxt-link>
            <a href="/subscribe" v-if="resultInfo.reSubmit">重新提交</a>
          </div>
        </template>

        <template v-else>
          <h2>嘿，欢迎订阅{{ userInfo.webName }} ~~</h2>
          <p>
            愿你雨天有伞，深夜有灯，一生温暖纯良，不舍爱与自由，与尘世的万千美好都能不期而遇。
          </p>
          <div class="input-box">
            <div class="input-item">
              <span class="nullable">*</span>
              <input
                type="text"
                placeholder="Code | 验证码"
                v-model="code['verifyCode']"
              />
            </div>
            <div class="input-item">
              <!-- <Captcha
                ref="captcha"
                class="value"
                v-model="code.captchaId"
                @change="captchaChange"
              /> -->
            </div>
          </div>
          <div class="input-box">
            <div class="input-item">
              <span class="nullable">*</span>
              <input
                type="text"
                placeholder="Your email address"
                v-model="form.email"
              />
            </div>
            <div class="input-item">
              <button type="submit" @click="submit">subscribe</button>
            </div>
          </div>
          <span class="hint" :class="[hintClass, hintResult]">
            <span
              class="iconfont"
              :class="hintResult == 'success' ? 'icon-success' : 'icon-close'"
            ></span
            >{{ text }}
          </span>
        </template>
      </div>
      <div class="waves-area">
        <svg
          class="waves-svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z"
            ></path>
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0"></use>
            <use xlink:href="#gentle-wave" x="48" y="3"></use>
            <use xlink:href="#gentle-wave" x="48" y="5"></use>
            <use xlink:href="#gentle-wave" x="48" y="7"></use>
          </g>
        </svg>
      </div>
    </div>
    <Menu />
    <PuzzleVerification
      @clone="verifyResult"
      :imgRandom="imgRandom"
      :onSuccess="verifyResult"
      :verificationShow="isVerification"
    />
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import Captcha from "@/components/common/captcha";
import PuzzleVerification from "@/components/PuzzleVerification";
import tool from "../utils/tool";
import config from "../config/index"
export default {
  name: "subscribe",
  components: {
    PuzzleVerification,
    Menu,
    Captcha,
  },
  data() {
    return {
      imgRandom: tool.randomImg(),
      isVerification: 0,
      resultList: [
        {
          icon: "success",
          reSubmit: false,
          home: true,
          email: true,
        },
        {
          icon: "error",
          reSubmit: true,
          home: true,
          email: false,
        },
        {
          icon: "error",
          reSubmit: true,
          home: true,
          email: true,
        },
      ],
      music: "",
      refresh: true,
      form: {
        email: "",
        time: null,
        code: Math.random().toString(36).substr(2),
        time: new Date().setDate(new Date().getDate() + 1),
        userId: tool.newGuid(),
      },
      code: {
        captchaId: "",
        verifyCode: "",
      },
      hintClass: "",
      text: "",
      hintResult: "",
      status: null,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    resultInfo() {
      try {
        const status = false;
        if (!status) {
          return null;
        }
        return [1, 2, 3].includes(status) ? this.resultList[status - 1] : null;
      } catch (error) {}
    },
  },
  head() {
    return {
      title: `Subscribe | ${this.userInfo.webName}`,
    };
  },
  mounted() {
    this.gettersUserInfo();
    this.music = "https://oss.wangmiaozero.cn/blogs/qianbaidu.mp3";
    this.refresh = false;
    this.$nextTick(() => (this.refresh = true));
  },
  beforeRouteUpdate(to, from, next) {
    this.result = {};
    next();
  },
  methods: {
    gettersUserInfo() {
      let _userInfo = localStorage.getItem("_userInfo");
      if (_userInfo) {
        _userInfo = JSON.parse(_userInfo);
        this.form = {
          email: _userInfo.email,
          userId: _userInfo.userId,
        };
      }
    },
    hintError() {
      this.hintClass = "";
      this.hintResult = "error";
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          this.hintClass = "animation";
        });
      });
    },
    captchaChange() {
      this.code.verifyCode = "";
    },
    async verifyResult(row) {
      if (row.status) {
        this.isVerification = 2;
        let result = await this.$axios.post("/web/subscribe/add", {
          platformType: "pc",
          ...this.form,
          ...this.code,
          p:config.phone
        });
        if (result.data.code === 1000) {
          this.hintResult = "success";
          this.text = "订阅成功！";
          this.$refs.captcha.refresh();
          this.imgRandom = tool.randomImg();
        } else {
          this.hintError();
          this.text = result.data.message;
          this.$refs.captcha.refresh();
          this.imgRandom = tool.randomImg();
        }
      } else {
        this.isVerification = 0;
      }
    },
    async submit() {
      if (!tool.emailVerification(this.form.email)) {
        this.text = "请输入正确的邮箱地址哦~~";
        this.hintError();
        return;
      }
      if(this.code.verifyCode.length<4){
        this.text = "请输入验证码~~";
        this.hintError();
        return;
      }
      this.isVerification = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(+2px, 0, 0);
  }
  30%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(+4px, 0, 0);
  }
  50% {
    transform: translate3d(-4px, 0, 0);
  }
}
.container ::v-deep .header-content {
  background: rgb(255 255 255 / 13%);
  border-bottom: 1px solid rgba(246, 247, 248, 0.07);
  .icon {
    .iconfont {
      color: var(--color-bg-primary);
      &.logo {
        color: var(--color-bg-primary);
      }
    }
    .logo-img img {
      background: url(/image/logo/logo3.png) no-repeat center;
      filter: drop-shadow(rgb(255, 255, 255) 40px 0px);
      position: relative;
      left: -40px;
      border-right: 0px solid transparent;
      height: 30px;
      width: 30px;
      background-size: cover;
      overflow: hidden;
    }
  }
}

.content {
  width: 100vw;
  height: 100vh;
  background: url("~static/image/other/subscribe.png") no-repeat bottom right;
  background-size: cover;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.15);
  }
  h1 {
    position: absolute;
    top: 120px;
    color: var(--color-bg-primary);
    font-size: 24px;
    letter-spacing: 10px;
  }
  .hint {
    position: absolute;
    bottom: 18px;
    left: 50px;
    font-size: 12px;
    color: red;
    opacity: 0;
    transition: none;
    &.animation {
      animation: shake 800ms ease-in-out;
    }
    .iconfont {
      font-size: 14px;
      transition: none;
      vertical-align: text-top;
      &::before {
        transition: none;
      }
      &.icon-success {
        margin-right: 5px;
      }
    }
    &.success {
      opacity: 1;
      color: var(--color-active);
    }
    &.error {
      opacity: 1;
      color: red;
    }
  }
  .main {
    width: 500px;
    padding: 45px;
    margin-top: -100px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.8);
    position: relative;
    a {
      margin-top: 10px;
      display: inline-block;
      color: #0584ff;
    }
    .is-active {
      text-align: center;
      .iconfont {
        color: var(--color-active);
        font-size: 40px;
      }
      p {
        color: var(--color-active);
        font-size: 16px;
        margin: 10px 0 0;
      }
      &.error .iconfont,
      &.error p {
        color: red;
      }
      .email {
        font-weight: 600;
      }
    }
    h2 {
      font-size: 22px;
      margin-bottom: 20px;
      color: var(--color-active);
    }
    p {
      color: #606060;
      line-height: 26px;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .input-box {
      display: flex;
      margin-top: 20px;
      .input-item {
        position: relative;
        width: 100%;
        margin-right: 20px;
        input {
          border-radius: 50px;
          background: var(--color-bg-primary);
          padding: 0 18px;
          width: 260px;
          height: 36px;
          font-size: 14px;
          padding-top: 1px;
          color: var(--color-text-1);
          border: 1px solid #eaf5ff;
          outline: none;
          &:focus {
            border-color: var(--color-border-3);
          }
          &:last-child {
            margin: 0;
          }
        }
        .nullable {
          position: absolute;
          left: -10px;
          top: 10px;
          color: #ef2f11;
        }
        &:last-of-type {
          margin-right: 0px;
        }
        button {
          background: var(--color-active);
          color: var(--color-bg-primary);
          border: none;
          height: 34px;
          line-height: 36px;
          padding: 0 30px;
          border-radius: 50px;
          font-size: 14px;
          outline: none;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            background: #55adff;
          }
        }
      }
    }
  }
}
.waves-area * {
  transition: none;
}
.waves-area {
  width: 100%;
  position: absolute;
  bottom: -5px;
  left: 0;
  z-index: 0;
  .waves-svg {
    width: 100%;
    height: 10rem;
  }
  .parallax > use {
    transition: none;
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
    &:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
      fill: hsla(0, 0%, 100%, 0.7);
    }
    &:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
      fill: hsla(0, 0%, 100%, 0.5);
    }
    &:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
      fill: rgb(255 255 255 / 30%);
    }
    &:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
      fill: #fff;
    }
  }
}
@keyframes move-forever {
  0% {
    -webkit-transform: translate3d(-90px, 0, 0);
    transform: translate3d(-90px, 0, 0);
  }
  to {
    -webkit-transform: translate3d(85px, 0, 0);
    transform: translate3d(85px, 0, 0);
  }
}
@media screen and (max-width: 768px) {
  .content {
    background-position: center center;
    h1 {
      top: 100px;
      font-size: 20px;
    }
    .main {
      width: 90%;
      margin: 0;
      padding: 30px 20px 22px;
      .input-box {
        display: flex;
        align-items: center;
        .input-item {
          width: 48%;
          input{
            width: 140px;
          }
        }
      }
      button {
        margin: 10px 0;
      }
      p {
        line-height: 22px;
        font-size: 13px;
      }
      h2 {
        font-size: 20px;
      }
      .hint {
        position: static;
        display: block;
        padding: 0 10px;
        height: 0;
        transition: all 0.3s;
        &.show {
          height: auto;
        }
      }
      input {
        width: 100%;
      }
    }
  }
  .waves-area .waves-svg {
    height: 70px;
  }
}
</style>