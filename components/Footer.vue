<template>
  <div class="tzl-footer">
    <div class="tzl-layout">
      <div class="footer__body">
        <dl class="footer__item">
          <dt class="footer__itemtitle">友情链接</dt>
          <div class="footer__col2">
            <dd class="footer__itemtext">
              <a
                href="https://www.cnblogs.com/tuziling/"
                target="_blank"
                class=""
                >博客园</a
              >
            </dd>
            <dd class="footer__itemtext">
              <a
                href="https://blog.csdn.net/weixin_43764814"
                target="_blank"
                class=""
                >csdn</a
              >
            </dd>
            <dd class="footer__itemtext">
              <a
                href="https://juejin.im/user/3843548381185624"
                target="_blank"
                class=""
                >掘金</a
              >
            </dd>
            <dd class="footer__itemtext">
              <a
                href="https://oss.wangmiaozero.cn/html/index.html"
                target="_blank"
                class=""
                >全栈修炼</a
              >
            </dd>
            <dd class="footer__itemtext">
              <a href="https://ruby-china.org" target="_blank" class=""
                >ruby-china</a
              >
            </dd>
            <dd class="footer__itemtext">
              <a href="https://golangtc.com" target="_blank" class=""
                >golangtc中国</a
              >
            </dd>
            <dd class="footer__itemtext">
              <a href="https://learnku.com/laravel" target="_blank" class=""
                >Laravel China 社区</a
              >
            </dd>
            <dd class="footer__itemtext">
              <a href="https://cnodejs.org" target="_blank" class=""
                >cnodejs 社区</a
              >
            </dd>
            <dd class="footer__itemtext" v-for="(item,index) in blogrollList" :key="index" >
                <a :href="item.url" target="_blank" class="">{{item.title}}</a>
            </dd>
          </div>
        </dl>

        <dl class="footer__item">
          <dt class="footer__itemtitle">了解我</dt>
          <div class="footer__col2">
            <dd class="footer__itemtext">
              <a
                href="http://oss.wangmiaozero.cn/html/index.html"
                target="_blank"
                class=""
                >关于我</a
              >
            </dd>
          </div>
        </dl>

        <dl class="footer__item">
          <dt class="footer__itemtitle">相关信息</dt>
          <div class="footer__col2">
            <dd class="footer__itemtext">
              <a href="/" target="_blank" class="">隐私政策</a>
            </dd>
            <dd class="footer__itemtext">
              <a href="/" target="_blank" class=""
                >兔子零全栈修炼社区用户服务协议</a
              >
            </dd>
            <dd class="footer__itemtext">
              <a href="/" target="_blank" class=""
                >兔子零全栈修炼用户服务协议</a
              >
            </dd>
          </div>
        </dl>

        <dl class="footer__item">
          <dt class="footer__itemtitle">联系我们</dt>
          <div>
            <dd class="footer__itemtext"><span>QQ：1061214467</span></dd>
            <dd class="footer__itemtext">
              <span>QQ邮箱：1061214467@qq.com</span>
            </dd>
          </div>
        </dl>

        <dl class="footer__item">
          <a href="https://www.wangmiaozero.cn" target="_blank">
            <div class="tzl-qrcode tzl-qrcode-vertical">
              <div class="tzl-qrcode__code">
                <img
                  class="tzl-qrcode__img"
                  src="https://oss.wangmiaozero.cn/blogs/wechat.jpg"
                />
              </div>
              <div class="tzl-qrcode__text">
                <p class="tzl-qrcode__title">扫码进入小程序博客</p>
                <p class="tzl-qrcode__subtitle">和小伙伴一起团聚吧</p>
              </div>
            </div>
          </a>
        </dl>
      </div>
      <div class="footer__bottom">
        <div class="footer__copyright">
          <p v-if="userInfo && userInfo.icpTxt" >
            ©2018-2029 汪苗个人博客 版权所有｜
            <a :href="userInfo&&userInfo.icpLink" target="_blank"
              >{{ userInfo.icpTxt }}</a
            >
          </p>
          <p>
            互联网违法不良信息举报电话：010-12321
            ｜互联网违法不良信息举报邮箱：abuse@12321.cn
          </p>
          <p>
            亲爱的市民朋友，上海警方反诈劝阻电话“962110”系专门针对避免您财产被骗受损而设，请您一旦收到来电，立即接听。
          </p>
        </div>
        <div class="footer__licence">
          <a href="http://www.shjbzx.cn" target="_blank"
            ><img
              src="data:image/png;base64,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"
          /></a>
          <a href="https://www.12377.cn/" target="_blank"
            ><img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAuCAYAAAD5jz22AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplMTYzMzAyZi01OTE0LTRiZDEtODhmMC1kZGJhYmVmM2E2NDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzFDMTlEMkQ5OEQzMTFFQThCODA5MzJDRTIxMTk5RUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzFDMTlEMkM5OEQzMTFFQThCODA5MzJDRTIxMTk5RUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MDc2ZmNkZS1hNWRlLTg1NGMtOTAyOC04YTg5YjU3YWNhZjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZTE2MzMwMmYtNTkxNC00YmQxLTg4ZjAtZGRiYWJlZjNhNjQ3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"
          /></a>

          <a
            ><img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAAAvCAYAAAA4o4IEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFCMDRCNTEwQkNBRTExRTk5OUU4REM0ODBCOTlFN0E2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFCMDRCNTExQkNBRTExRTk5OUU4REM0ODBCOTlFN0E2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUIwNEI1MEVCQ0FFMTFFOTk5RThEQzQ4MEI5OUU3QTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUIwNEI1MEZCQ0FFMTFFOTk5RThEQzQ4MEI5OUU3QTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7wDd1QAAAOFElEQVR42uxd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"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mixins: [],
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    blogrollList(){
      return this.$store.getters.blogrollList;
    }
  },
  created(){

  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
.tzl-footer {
  width: 100%;
  text-align: center;
  background: var(--color-bg-primary);
  padding: 40px 0;
}
.tzl-layout {
  max-width: 1280px;
  margin: 0 auto;
}
.footer__body {
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  padding-bottom: 40px;
  margin-right: auto!important;
  margin-left: auto!important;
  max-width: 1280px;
  padding: 30px 46px 20px;
  
}
.footer__bottom {
  text-align: left;
  padding-top: 40px;
  border-top: 1px solid var(--color-border-1);
}
.footer__item {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.footer__itemtitle {
  margin-bottom: 30px;
  color: var(--color-text-1);
  font-weight: 600;
}
.footer__col2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  min-width: 120px;
  margin-right: -20px;
}
.footer__col2 .footer__itemtext {
  margin-right: 20px;
}
.footer__itemtext {
  line-height: 26px;
  white-space: nowrap;
  a {
    color: var(--color-text-2);
  }
  span {
    color: var(--color-text-2);
  }
}

.footer__item:nth-child(4) {
  width: auto;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}
.footer__item:nth-child(5) {
  width: auto;
}
.tzl-qrcode.tzl-qrcode-vertical {
  display: block;
  width: 130px;
}
.tzl-qrcode {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.tzl-qrcode.tzl-qrcode-vertical .tzl-qrcode__code {
  margin: 0 auto;
}
.tzl-qrcode__code {
  width: 120px;
  height: 120px;
  margin-right: 8px;
  position: relative;
}
.tzl-qrcode__img {
  height: 100%;
}
.tzl-qrcode.tzl-qrcode-vertical .tzl-qrcode__text {
  text-align: center;
  margin-top: 20px;
}
.tzl-qrcode__text {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  white-space: nowrap;
}
.tzl-qrcode__title {
  font-size: 16px;
  color: var(--color-active);
}
.tzl-qrcode__subtitle {
  font-size: 16px;
  margin-top: 8px;
  color: var(--color-text-2);
}

/* 底部 */
.footer__copyright {
  font-size: 14px;
  line-height: 24px;
  color: var(--color-text-2) !important;
  text-align: center;
}
.footer__licence {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 15px;
}
.footer__bottom a {
  color: inherit;
}
.footer__licence a + a {
  margin-left: 10px !important;
}

@media screen and (max-width: 1200) {
  .tzl-layout {
    width: 1280px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 768px) {
  .tzl-footer {
   .tzl-layout{
      flex: 1 1 auto;
      max-width: 100%;
      position: relative;
      .footer__body{
        flex-direction: column;
        .footer__item{
          .footer__itemtitle{
            margin-bottom: 15px;
            margin-top: 15px;
          }
        }
      }
      .footer__bottom{
          padding: 40px 15px 20px;
          .footer__licence{
            // display: flex;
            // flex-direction: column;
            // justify-content: center;
            // align-items: center;
            a{
              img{
                width: 108.8px;
                height: 37.6px;
              }
            }
          }
      }
   }
  }
}
</style>