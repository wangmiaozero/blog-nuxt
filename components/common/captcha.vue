<!--
 * @Description: coede
 * @Version: 2.0
 * @Autor: wangmiao
 * @Date: 2020-03-19 20:49:28
 * @LastEditors: wangmiao
 * @LastEditTime: 2020-03-20 11:26:59
 -->
<template>
  <div class="common-captcha" @click="refresh">
    <div class="svg" v-html="svg" v-if="svg"></div>

    <img class="base64" :src="base64" alt="" v-else />
  </div>
</template>

<script>
import { useHttp } from '@/composables/http'
import { alert } from '../../utils/tips'
export default {
  data() {
    return {
      svg: "",
      base64: "",
    };
  },

  mounted() {
    this.refresh();
  },

  methods: {
    async refresh() {
      const http = useHttp()
      const res = await http.get('/api/v1/captcha', { height: 38, width: 120 }).catch((err) => {
        alert({ content: String(err), duration: 2500, type: 'zero' })
        return null
      })
      if (!res) return
      const data = res.data?.data
      const captchaId = res.data?.captchaId
      if (data?.includes('data:image/png;base64,')) {
        this.base64 = data
      } else {
        this.svg = data
      }
      this.$emit('input', captchaId)
      this.$emit('change', { base64: this.base64, svg: this.svg, captchaId })
    },
  },
};
</script>

<style lang="scss" scoped>
.common-captcha {
  height: 36px;
  cursor: pointer;

  .svg {
    height: 100%;
  }

  .base64 {
    height: 100%;
  }
}
</style>
