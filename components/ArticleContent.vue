<template>
  <div class="article-content" v-html="markHtml" />
</template>

<script lang="ts">
import Vue from "vue";
import marked from "marked";
import hljs from "highlight.js";
import "../assets/css/highlight.js/styles/github.css";
//import 'highlight.js/styles/github-dark.css';
// import 'highlight.js/styles/xcode.css';

import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";

export default Vue.extend({
  props: {
    html: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {
      markHtml: "",
    };
  },

  mounted() {
    this.initMarked();
    this.$nextTick(() => {
      // eslint-disable-next-line no-new
      new Viewer(document.querySelector(".article-content"), {
        title: false,
        zIndex: 999999,
      });
    });
  },
  methods: {
    async initMarked() {
      await marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang) {
          return hljs.highlightAuto(code).value;
        },
      });
      this.markHtml = await marked(this.html);
      /*  padding: 12px 16px;
    margin: 0;
    border-radius: 8px;
    background: #f6f8fa;
    border: 1px solid #eee; */
    },
  },
});
</script>
<style>
.codeWhite {
  padding: 12px 16px;
  margin: 0;
  border-radius: 8px;
  background: #f6f8fa;
  border: 1px solid #eee;
}
.codeDark {
}
</style>
<style lang="scss" scoped >
.article-content {
  padding: 100px 0;
  color: var(--color-text-1);
  /*  word-break: break-word;
  line-height: 1.75;
  font-weight: 400;
  font-size: 15px;
  overflow-x: hidden;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica Neue,
    PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  background-image: linear-gradient(90deg,rgba(159, 219, 252, 0.15) 3%,transparent 0),linear-gradient(1turn, rgba(159, 219, 252, 0.15) 3%, transparent 0);  
  background-size: 20px 20px;
  background-position: 50%; */
  ::v-deep {
    background: var(--color-bg-primary);
    color: var(--color-text-1);
    p {
      line-height: 36px;
      margin: 0 0 22px;
      font-size: 16px;
      mark {
        padding: 4px 4px 0;
        line-height: 22px;
        display: inline-block;
        font-size: 16px;
      }
      strong {
        font-weight: bold;
        font-size: 16px;
      }
      ins {
        font-size: 16px;
      }
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
      border: 0;
      padding: 0;
      margin: 0 0 22px;
      line-height: 28px;
      font-size: revert;
    }
    img {
      max-width: 100%;
      border-radius: 4px;
      &:hover {
        box-shadow: 0 0 10px #999;
      }
    }

    ul,
    ol {
      margin: 0 0 20px;
      li {
        margin: 10px 0;
        line-height: 28px;
      }
    }
    ul li {
      list-style: none;
      position: relative;
      &:after {
        content: "☼";
        font-size: 8px;
        position: absolute;
        top: 0px;
        left: -16px;
      }
    }
    iframe {
      width: 100%;
      height: 450px;
      margin-bottom: 20px;
    }
    blockquote {
      padding-left: 22px;
      margin-bottom: 20px;
      padding: 0.5em;
      background: var(--color-bg-primary1);
      color: var(--color-text-6);
      border-left: 4px solid var(--color-border-1);
      overflow: hidden;
      p {
        margin: 10px 0;
        code {
          background: var(--color-bg-primary2);
          color: var(--color-text-8);
          border: 1px solid var(--color-text-8);
          border-radius: 4px;
          padding: 4px;
          box-sizing: border-box;
          font-size: 0.875rem;
        }
      }
      ul,
      ol {
        margin: 0 0 20px;
        li {
          margin: 10px 0;
          line-height: 28px;
        }
      }
      ul li {
        list-style: none;
        position: relative;
        &:after {
          content: "☼";
          font-size: 8px;
          position: absolute;
          top: 0px;
          left: -16px;
        }
      }
    }
    table {
      margin: 2px 0 14px;
      color: #555;
      width: 100%;
      border-collapse: collapse;
      overflow: auto;

      th,
      td {
        height: 32px;
        padding: 8px 14px;
        border: 1px solid #dfe2e5;
      }

      th {
        font-weight: 500;
        color: #555;
        background: #f6f8fa;
      }
    }
    p {
      code {
        background: var(--color-bg-primary1);
        color: var(--color-text-8);
        border-radius: 4px;
        padding: 4px;
        box-sizing: border-box;
        font-size: 0.875rem;
      }
    }
    pre {
      overflow: auto;
      overflow-y: hidden;
    }
    pre:before {
      content: "";
      display: block;
      height: 30px;
      width: 100%;
      margin-bottom: 2px;
      background: url(data:image/png;base64,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)
        10px 10px no-repeat;
      background-size: 40px;
    }
  }
}
</style>
