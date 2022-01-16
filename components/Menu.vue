<template>
  <div>
    <div class="menu" @click="onMenu">
      <span class="iconfont" :class="isNav ? 'icon-close' : 'icon-menu'"></span>
    </div>
    <div class="nav" :style="{ top }">
      <ul class="nav-list">
        <template v-for="(item, index) in menu">
          <li :key="index">
            <Tips>
              <a @click="toPage(item.url)">{{ item.title }}</a>
              <template slot="tips">{{ item.description }}</template>
            </Tips>
          </li>
        </template>
      </ul>
      <div class="input-box" v-if="isKeyword">
        <div class="input-item">
          <input
            type="text"
            @keyup.enter="searchKeyword"
            placeholder="keyword ｜ 关键词"
            v-model="keyword"
          />
          <i
            v-if="keyword"
            class="iconfont icon-close"
            @click="closeKeyword"
          ></i>
        </div>
        <div class="input-item w135">
          <button class="search" type="button" @click="searchKeyword">
            SEARCH ｜ 搜索
          </button>
        </div>
      </div>
      <div class="world">
        <Tips>
          <p>Sometimes you need to applaud yourself.</p>
          <template slot="tips">
            <p>有时候需要为自己鼓掌.</p>
          </template>
        </Tips>
      </div>
    </div>
  </div>
</template>
<script>
import Tips from "@/components/Tips";
export default {
  name: "Menu",
  components: {
    Tips,
  },
  props: {
    isKeyword: {
      type: Boolean,
      default: () => false,
    },
    menu: {
      type: Array,
      default: () => [
        {
          title: "Home",
          description: "首页",
          url: "/",
        },
        {
          title: "Article",
          description: "文章",
          url: "/article",
        },
        {
          title: "Rainy",
          description: "下雨",
          url: "/rain",
        },
        /* {
                            title: 'Envelope',
                            url: '/envelope'
                        }, */
        {
          title: "Subscribe",
          description: "订阅",
          url: "/subscribe",
        },
        /* {
                            title: 'Message',
                            url: '/message',
                        }, */
        {
          title: "About",
          description: "关于",
          url: "/about",
        },
      ],
    },
  },
  watch: {
    isNav: {
      handler: function (newVal) {
        if (newVal) {
          this.top = "0%";
        } else {
          this.top = "-100%";
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      isNav: false,
      top: "-100%",
      keyword: "",
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    /*  viewList() {
            return this.list.filter(item => {
                const type = item.url
                if (['subscribe', 'message'].includes(type)) {
                    
                    if (this.$store.state.userInfo.administrator[type]) {
                        return item
                    }
                } else {
                    return item
                }
            })
        } */
  },
  mounted() {},
  methods: {
    toPage(url) {
      this.$router.push(url);
      this.isNav = false;
    },
    onMenu() {
      this.isNav = !this.isNav;
      this.$emit("click", this.isNav);
    },
    closeKeyword(){
        this.keyword = ""
        this.$emit("searchKeyword", this.keyword);
    },
    searchKeyword() {
      this.$emit("searchKeyword", this.keyword);
      this.isNav = !this.isNav;
    },
  },
};
</script>
<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 70px;
  right: 50px;
  width: 30px;
  height: 30px;
  line-height: 32px;
  border-radius: 2px;
  cursor: pointer;
  color: var(--color-red);
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1000;
  &:active {
    opacity: 0.5;
  }
  span {
    font-size: 20px;
  }
}
.nav {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.86);
  transition: top 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  .input-box {
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
    .input-item {
      position: relative;
      margin-right: 20px;
      width: 50%;
      &.w135 {
        max-width: 135px;
      }
      .icon-close {
        cursor: pointer;
        font-size: 14px;
        color: var(--color-text-1);
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translate(-50%, -50%);
      }
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
        background: transparent;
        border-bottom: 2px dashed var(--color-border-3);

        &:focus {
          border-color: var(--color-border-3);
        }
        &:last-child {
          margin: 0;
        }
      }
      .search {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        height: 34px;
        line-height: 36px;
        width: 135px;
        font-size: 14px;
        color: var(--color-text-5);
        border-radius: 6px;
        background: transparent;
        border: 1px dashed var(--color-border-3);
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
  .world {
    position: absolute;
    bottom: 30px;
    display: block;
    text-align: center;
    color: #666;
    p {
      font-size: 16px;
    }
  }
  .nav-list {
    width: 80%;
    display: block;
    text-align: center;
    margin-top: -120px;
    li {
      margin: 0 20px 20px;
      list-style: none;
      display: inline-block;
      a {
        font-size: 24px;
        cursor: pointer;
        color: #666;
        letter-spacing: 1px;
        &:hover {
          color: #080808;
        }
      }
    }
  }
}
@media screen and (max-width: 780px) {
  .nav .nav-list li a {
    font-size: 18px;
  }
}
@media screen and (max-width: 480px) {
  .nav .world p {
    font-size: 14px;
  }
}
</style>