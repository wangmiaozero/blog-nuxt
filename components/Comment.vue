<template>
  <div class="comment">
    <section class="comment-section">
      <div class="comment-form">
        <div class="input-box">
          <div class="input-item">
            <span class="nullable">*</span>
            <input
              type="text"
              placeholder="Name ｜ 姓名"
              v-model="form['name']"
            />
          </div>
          <div class="input-item">
            <span class="nullable">*</span>
            <input
              type="text"
              placeholder="Email ｜ 邮箱"
              v-model="form['email']"
            />
          </div>
          <div class="input-item">
            <input
              type="text"
              placeholder="Tel ｜ 手机号码"
              v-model="form['phone']"
            />
          </div>
        </div>
        <div class="input-box">
          <div class="input-item">
            <input
              type="text"
              placeholder="Address ｜ 网址"
              v-model="form['address']"
            />
          </div>
          <div class="input-item">
            <input
              type="text"
              placeholder="Wechat ｜ 微信"
              v-model="form['wechat']"
            />
          </div>
          <div class="input-item">
            <input
              type="text"
              placeholder="QQ ｜ 腾讯qq"
              v-model="form['qq']"
            />
          </div>
        </div>
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
        <div class="reply-name" v-if="isReply">
          <span class="">@{{ replyObj.name }}</span>
          <span class="iconfont icon-close" @click="cancel"></span>
        </div>

        <textarea
          class="textarea"
          placeholder="What do you want to say..."
          v-model="form.content"
        ></textarea>

        <!-- submit button and loading -->
        <div class="bottom">
          <button id="comment" type="button" @click="submitVerify">
            SUBMIT ｜ 提交
          </button>

          <template v-if="status == 6">
            <div class="hint loading">
              <div class="fix-mask"></div>
              <div class="sk-circle selected">
                <div
                  v-for="item in 12"
                  class="sk-child"
                  :class="'sk-circle' + item"
                  :key="item"
                ></div>
              </div>
              <span class="loading-text">Submitting...</span>
            </div>
          </template>

          <template v-else-if="status == 7">
            <div class="hint success">
              <span class="iconfont icon-success"></span>
              <span>提交成功, Nice.</span>
            </div>
          </template>

          <template v-else-if="status != 6 && status != 7 && status != -1">
            <div class="hint red">
              <span class="iconfont icon-error"></span>
              <span>{{ hint[status] }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- comment box -->
      <template v-if="pagination.total">
        <h2>
          <Tips>
            <span>Comment List</span>
            <span>({{ pagination.total }})</span>
            <template slot="tips">
              <p>评论列表</p>
            </template>
          </Tips>
        </h2>
        <div class="comment-list">
          <transition-group name="comment-item">
            <div
              class="comment-item"
              v-for="item in commentList"
              :key="item.id"
              :data-id="item.id"
            >
              <div class="comment-item-box">
                <div class="head">
                  <div class="img">
                    <img :src="'/image/comment/' + item.avatarUrl" />
                  </div>
                  <div class="name">
                    <a class="admin-mark">{{ item.name }}</a>

                    <div class="r">
                      <div class="reply" @click="reply(item)">
                        reply ｜ 回复
                      </div>
                      <span class="time">{{ item.createTime }}</span>
                    </div>
                  </div>
                </div>
                <div class="comment-content">{{ item.content }}</div>
              </div>

              <div
                class="comment-child-list"
                v-if="item.children && item.children.length"
              >
                <CommentTree :treeData="item.children" @click="reply" />
              </div>
            </div>
          </transition-group>
        </div>
      </template>
    </section>

    <div>
      <PuzzleVerification
        @clone="verifyResult"
        :imgRandom="imgRandom"
        :onSuccess="verifyResult"
        :verificationShow="isVerification"
      />
    </div>

    <!-- <div class="admin-popup" :class="'show'">
      <span
        class="iconfont icon-close2"
        @click="verifyPopup('admin', false)"
      ></span>
      <img :src="userInfo.headImg" />
      <div>哇哦～恭喜你，发现了一个小彩蛋～～</div>
      <input
        type="text"
        placeholder="请输入管理员身份标识码"
        v-model="adminCode"
      />
      <p class="hint" v-if="status == 3">
        <span class="iconfont icon-error"></span>
        <span>{{ hint[status] }}</span>
      </p>
      <button >确定</button>
    </div> -->
  </div>
</template>

<script>
import PuzzleVerification from "@/components/PuzzleVerification";
import CommentTree from "@/components/CommentTree";
import Captcha from "@/components/common/captcha";
import Tips from "@/components/Tips";
import tool from "../utils/tool";
import { alert } from "../utils/tips";
import { Mock } from "@/utils/mock"
export default {
  props: ["id", "title"],
  components: {
    PuzzleVerification,
    CommentTree,
    Captcha,
    Tips,
  },
  data() {
    return {
      imgRandom: tool.randomImg(),
      form: {
        name: "",
        email: "",
        phone: "",
        address: "",
        wechat: "",
        qq: "",
        content: "",
        userId: tool.newGuid(),
        avatarUrl: tool.randomNun(1, 10) + ".jpg",
      },
      code: {
        captchaId: "",
        verifyCode: "",
      },
      status: -1,
      hint: [
        "您的名字是第一印象哦～",
        "请输入正确的邮箱，期待回信～",
        "偷偷告诉我，你作文是不是0分～",
        "多说一点儿吧，至少能成一句诗～",
        "完成验证码才可以提交哦～",
        "哇哦！遇到错误，要不再试试",
      ],
      isVerification: 0,
      commentList: [],
      pagination: {
        page: 1,
        size: 20,
        total: 0,
      },
      isReply: false,
      replyObj: null,
      adminCode: "",
    };
  },
  mounted() {
    // get localStorage comment info
    this.gettersUserInfo();
    this.gettersComment();
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    // get comment data
    gettersComment() {
      const res = Mock().get("/web/comment/page")
      // this.$axios
      //   .post(`/web/comment/page`, {
      //     targetId: this.id,
      //     platformType: "pc",
      //   })
      //   .then((res) => {
          let { list, pagination } = res.data;
          let result = tool.deepTree(list);
          this.commentList = result;
          this.pagination = pagination;
        // });
    },
    gettersUserInfo() {
      let _userInfo = localStorage.getItem("_userInfo");
      if (_userInfo) {
        _userInfo = JSON.parse(_userInfo);
        this.form = {
          name: _userInfo.name,
          email: _userInfo.email,
          phone: _userInfo.phone,
          address: _userInfo.address,
          wechat: _userInfo.wechat,
          qq: _userInfo.qq,
          content: "",
          avatarUrl: _userInfo.avatarUrl,
          userId: _userInfo.userId,
        };
      }
    },
    initUserInfo(userInfo) {
      let _userInfo = {
        name: "",
        email: "",
        phone: "",
        address: "",
        wechat: "",
        qq: "",
        content: "",
        userId: tool.newGuid(),
        avatarUrl: tool.randomNun(1, 10) + ".jpg",
      };
      try {
        if (userInfo) {
          userInfo.content = "";
          localStorage.setItem("_userInfo", JSON.stringify(userInfo));
        } else {
          localStorage.setItem("_userInfo", JSON.stringify(_userInfo));
        }
      } catch (error) {
        localStorage.setItem("_userInfo", JSON.stringify(_userInfo));
      }
    },
    captchaChange() {
      this.code.verifyCode = "";
    },
    // 1. Verification
    submitVerify() {
      let list = [
        tool.stringVerification(this.form.name),
        tool.emailVerification(this.form.email),
        this.form.content ? true : false,
        // tool.phoneCodeVerification(this.form.phone),
        // tool.checkURL(this.form.address)
      ];
      this.form.content = this.form.content
        .trim()
        .replace(/<script.*?>.*?<\/script>/gi, "");
      if (!tool.stringVerification(this.form.name)) {
        return (this.status = 0);
      } else if (!tool.emailVerification(this.form.email)) {
        return (this.status = 1);
      } else if (!this.form.content) {
        return (this.status = 2);
      } else if (this.form.content.length < 10) {
        return (this.status = 3);
      } else if (!this.code.verifyCode) {
        this.$refs.captcha.refresh();
        return (this.status = 4);
      }

      let everyResult = list.every((currentValue) => currentValue);
      if (everyResult) {
        this.isVerification = 1;
      } else {
        this.isVerification = 0;
        this.status = 5;
      }
    },
    verifyResult(row) {
      this.imgRandom = tool.randomImg();
      if (row.status) {
        this.status = 6;
        this.isVerification = 2;
        let params = this.form;
        let parentId = null;
        if (this.replyObj) {
          parentId = this.replyObj.parentId;
        }
        this.$axios
          .post("/web/comment/add", {
            ...params,
            ...this.code,
            commentName: this.title,
            targetId: this.id,
            parentId,
            platformType: "pc",
          })
          .then((res) => {
            if (res.data.code == 1000) {
              this.initUserInfo(params);
              this.isVerification = 0;
              this.status = 7;
              alert({
                content: "评论成功，等待管理员审核~",
                duration: 3000,
                type: "zero",
              });
              this.$refs.captcha.refresh();
              setTimeout(() => {
                this.status = -1;
                this.gettersComment();
              }, 1000);
            } else {
              this.isVerification = 0;
              setTimeout(() => {
                this.status = -1;
              }, 1000);
              alert({
                content: res.data.message,
                duration: 2500,
                type: "zero",
              });
              this.$refs.captcha.refresh();
            }
          });
      } else {
        this.isVerification = 0;
        this.status = -1;
        this.$refs.captcha.refresh();
      }
    },
    // Cancel reply
    cancel() {
      this.replyObj = null;
      this.isReply = false;
    },

    // Reply Mode
    reply(item) {
      this.isReply = true;
      this.replyObj = {
        parentId: item.id,
        name: item.name,
        avatarUrl: item.avatarUrl,
      };
      this.$nextTick(() => this.$setScroll("comment"));
    },
  },
};
</script>


<style lang="scss" scoped>
/**
 * 新增评论 过渡效果
 */
.comment-item-enter,
.comment-item-leave-to {
  opacity: 0;
  margin-top: -118px;
}
.comment-child-enter,
.comment-child-leave-to {
  opacity: 0;
}

@keyframes fadeInTop {
  from {
    opacity: 0;
    visibility: hidden;
    margin-top: 80px;
  }
  to {
    opacity: 1;
    visibility: visible;
    margin-top: 0;
  }
}
@keyframes fadeInDown {
  from {
    opacity: 1;
    visibility: visible;
    margin-top: 0;
  }
  to {
    opacity: 0;
    visibility: hidden;
    margin-top: -80px;
  }
}
.comment {
  width: 800px;
  margin: auto;
  .comment-section {
    transition: none;
  }
  .admin-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 310px;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px #dbdbdb;
    padding: 40px 30px 30px;
    border-radius: 6px;
    background: rgb(255, 255, 255);
    z-index: 999999;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    &.show {
      animation: fadeInTop 0.6s both;
    }
    &.exit {
      animation: fadeInDown 0.6s both;
    }
    .icon-close2 {
      position: absolute;
      right: 15px;
      top: 15px;
      color: var(--color-text-4);
      cursor: pointer;
      &:hover {
        color: var(--colorComment);
      }
    }
    input {
      height: 34px;
      border: 1px solid var(--color-border-1);
      border-radius: 6px;
      padding: 2px 10px 0;
      text-align: left;
      outline: none;
      font-size: 12px;
      display: block;
      width: 100%;
      text-align: center;
      transition: all 0.3s;
      &::-webkit-input-placeholder {
        color: var(--color-text-4);
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: var(--color-text-4);
      }
      　　 &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: var(--color-text-4);
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10-1*/
        color: var(--color-text-4);
      }
      &:hover {
        border-color: rgb(210, 210, 210);
      }
    }
    button {
      height: 34px;
      line-height: 36px;
      width: 100px;
      font-size: 14px;
      color: var(--color-bg-primary);
      border-radius: 6px;
      background: var(--color-active);
      cursor: pointer;
      outline: none;
      border: none;
      margin: 12px 0 0;
      transition: all 0.3s;
      border: none;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: auto;
      display: inline-block;
      margin-bottom: 15px;
    }
    div {
      font-size: 14px;
      color: var(--color-text-1);
      margin-bottom: 14px;
    }
    p {
      color: var(--color-red);
      font-size: 12px;
      margin: 10px 0 0;
      span {
        font-size: 12px;
      }
    }
  }
  h2 {
    color: var(--color-text-1);
    font-weight: 400;
    margin-bottom: 20px;
    display: inline-block;
    span {
      &:first-child {
        font-size: 18px;
        margin-right: 8px;
        border-bottom: 1px solid var(--color-text-2);
      }
    }
  }
  .comment-form {
    border: 1px solid var(--color-border-1);
    margin-bottom: 100px;
    border-radius: 6px;
    padding: 15px 12px;
    transition: all 0.3s;
    .input-box {
      display: flex;
      .input-item {
        position: relative;
        width: 50%;
        margin-right: 20px;
        input {
          width: 100%;
          height: 38px;
          font-size: 14px;
          padding-left: 10px;
          margin-right: 12px;
          transition: border 0.3s;
          border: none;
          outline: none;
          color: var(--color-text-1);
          background: var(--color-bg-primary);
          border-bottom: 1px dashed var(--color-border-1);

          &:focus {
            border-color: var(--color-border-3);
          }
          &:last-child {
            margin: 0;
          }
        }
        .nullable {
          position: absolute;
          left: 0px;
          top: 10px;
          color: #ef2f11;
        }
        &:last-of-type {
          margin-right: 0px;
        }
      }
    }
    .reply-name {
      color: var(--color-bg-primary);
      display: inline-block;
      background: var(--color-active);
      border-radius: 21px;
      padding: 0 10px;
      height: 24px;
      line-height: 23px;
      margin-top: 10px;
      span {
        font-size: 13px;
        &.iconfont {
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
    textarea {
      width: 100%;
      height: 200px;
      margin: 10px 0;
      color: var(--color-text-1);
      border: 1px dashed var(--color-border-1);
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      border-radius: 4px;
      font-size: 14px;
      padding: 15px;
      outline: none;
      resize: none;
      background: url("~static/image/comment/plbj.png") no-repeat bottom right;
      &:focus {
        border-color: var(--color-border-3);
      }
    }
  }
  .comment-list {
    padding: 0 0 80px;
    overflow: hidden;
    .comment-item {
      border: 1px solid var(--color-border-2);
      margin-bottom: 15px;
      transition: margin 1s, opacity 2s;
      .comment-item-box {
        padding: 15px 15px;
        &:hover .head .name .r .reply {
          opacity: 1;
        }
      }
      .head {
        display: flex;
        position: relative;
        .img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 12px;
          overflow: hidden;
          border: 1px solid #f1f1f1;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          a {
            font-weight: 400;
            color: #ef6d57;
            font-size: 16px;
            height: 20px;
            -webkit-transition: all 0.3s;
            transition: all 0.3s;
            text-decoration: none;
            position: relative;
            &:hover {
              color: #ef2f11;
              text-decoration: underline;
            }
            &.admin-mark {
            }
          }
          .r {
            display: flex;
            .time {
              color: var(--color-text-4);
              font-size: 13px;
              letter-spacing: 0;
            }
            .reply {
              opacity: 0;
              font-size: 12px;
              color: #ef6d57;
              margin-right: 12px;
              cursor: pointer;
              transition: all 0.2s;
              text-decoration: underline;
              text-transform: capitalize;
              &:hover {
                font-weight: bold;
              }
            }
          }
        }
      }
      .comment-content {
        color: var(--color-text-1);
        line-height: 22px;
        padding: 0 0 0 58px;
        white-space: pre-wrap;
      }
    }
    .comment-child-list {
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 15px;
    }
  }
}

.bottom {
  display: flex;
  align-items: center;
  button {
    height: 34px;
    line-height: 36px;
    width: 135px;
    font-size: 14px;
    color: var(--color-text-5);
    border-radius: 6px;
    background: var(--color-border-1);
    cursor: pointer;
    outline: none;
    border: none;
    margin-right: 12px;
    transition: all 0.3s;
    &:hover,
    &.active {
      color: #fff;
      background: var(--color-active);
    }
    &:active {
      opacity: 0.5;
    }
  }
  .hint {
    display: flex;
    align-items: center;
    &.loading {
      display: flex;
      align-items: center;
      .fix-mask {
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        background: rgba(0, 0, 0, 0);
        z-index: 99;
      }
      .loading-text {
        color: var(--color-active);
        padding-top: 3px;
      }
    }
    &.red span {
      color: var(--color-red);
      font-size: 13px;
      margin-right: -2px;
      display: inline-block;
      &:first-child {
        margin-right: 4px;
      }
    }
    &.success span {
      color: #2fc700;
      font-size: 13px;
      margin-right: 2px;
    }
  }
}

.sk-circle {
  height: 20px;
  width: 20px;
  z-index: 10;
  margin-right: 8px;
  display: inline-block;
  position: relative;
  -webkit-transition: all 0.3s ease-in-out 0;
  transition: all 0.3s ease-in-out 0;
}
.sk-circle .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle .sk-child:before {
  content: "";
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: var(--color-active);
  border-radius: 100%;
  -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
  animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
}
.sk-circle .sk-circle2 {
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
}
.sk-circle .sk-circle3 {
  -webkit-transform: rotate(60deg);
  -ms-transform: rotate(60deg);
  transform: rotate(60deg);
}
.sk-circle .sk-circle4 {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.sk-circle .sk-circle5 {
  -webkit-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  transform: rotate(120deg);
}
.sk-circle .sk-circle6 {
  -webkit-transform: rotate(150deg);
  -ms-transform: rotate(150deg);
  transform: rotate(150deg);
}
.sk-circle .sk-circle7 {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.sk-circle .sk-circle8 {
  -webkit-transform: rotate(210deg);
  -ms-transform: rotate(210deg);
  transform: rotate(210deg);
}
.sk-circle .sk-circle9 {
  -webkit-transform: rotate(240deg);
  -ms-transform: rotate(240deg);
  transform: rotate(240deg);
}
.sk-circle .sk-circle10 {
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}
.sk-circle .sk-circle11 {
  -webkit-transform: rotate(300deg);
  -ms-transform: rotate(300deg);
  transform: rotate(300deg);
}
.sk-circle .sk-circle12 {
  -webkit-transform: rotate(330deg);
  -ms-transform: rotate(330deg);
  transform: rotate(330deg);
}
.sk-circle .sk-circle2:before {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.sk-circle .sk-circle3:before {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.sk-circle .sk-circle4:before {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.sk-circle .sk-circle5:before {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.sk-circle .sk-circle6:before {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
.sk-circle .sk-circle7:before {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.sk-circle .sk-circle8:before {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.sk-circle .sk-circle9:before {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.sk-circle .sk-circle10:before {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.sk-circle .sk-circle11:before {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.sk-circle .sk-circle12:before {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
@-webkit-keyframes sk-circleBounceDelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes sk-circleBounceDelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@media screen and (max-width: 820px) {
  .comment {
    width: 86%;
    .comment-list {
      padding-bottom: 100px;
    }
  }
}
@media screen and (max-width: 768px) {
  .comment {
    .comment-form {
      padding: 10px;
      textarea,
      .input-box {
        display: flex;
        flex-direction: column;
        .input-item {
          width: 100%;
          input {
            font-size: 13px;
          }
        }
      }
      textarea {
        padding: 12px;
      }
    }
    .comment-list {
      .comment-item {
        .head {
          .img {
            width: 40px;
            height: 40px;
            margin-right: 12px;
          }
          .name {
            flex-direction: column;
            align-items: baseline;
            justify-content: space-evenly;
            margin-top: 2px;
            a {
              font-size: 13px;
              span {
                margin-top: -2px;
              }
            }
            .r {
              margin-top: 2px;
              .time {
                font-size: 12px;
              }
              .reply {
                opacity: 1;
                font-size: 12px;
                color: #ef6d57;
                position: absolute;
                right: 0;
                top: 13px;
                cursor: pointer;
                text-decoration: underline;
                text-transform: capitalize;
              }
            }
          }
        }
        .comment-content {
          padding: 0;
          margin-top: 12px;
        }
        .comment-child-list {
          padding-left: 24px;
        }
      }
    }
  }
}
</style>