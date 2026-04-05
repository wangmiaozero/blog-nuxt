<template>
    <div class="container">
        <Header 
            v-if="refresh" 
            :music="infoData.music"
            :sticky="true"
            :playMusic="true"
            title="嘿，你今天笑了么(≖ᴗ≖)✧"
        ></Header>
        <!-- <div class="content" v-html="infoData.content"></div> -->
         <ArticleContent class="content" :html="infoData.mdcontent ?? ''" />
        <Menu />
        <Footer/>
    </div>
</template>

<script>
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
import ArticleContent from '@/components/ArticleContent.vue'
import { computed } from 'vue'
import { useArticlesApi } from '@/composables/api'
import { useMainStore } from '@/stores/main'

export default {
    name: 'about',
     components: {
		Menu,
        ArticleContent,
        Footer
	},
    setup() {
        definePageMeta({ name: 'about' })
        const api = useArticlesApi()
        const { data: pagePayload } = useAsyncData('about-page', async () => {
            const res = await api.getArticleAbout()
            return { infoData: res.data }
        })
        const infoData = computed(() => pagePayload.value?.infoData ?? {})
        const main = useMainStore()
        useHead(() => ({
            title: main.siteInfo?.webName ? `Hello ${main.siteInfo.webName}` : 'Libai',
        }))
        return { infoData }
    },
    data(){
        return{
            title: false,
            refresh: true
        }
    },
    mounted(){
            this.refresh = false
            this.$nextTick(() => this.refresh = true )
    },
}
</script>

<style lang="scss" scoped>
.container{
    .content{
        width: 100%;
        max-width: 800px;
        margin: auto;
        padding: 100px 20px 50px;
        box-shadow: none !important;
        min-height: auto;
        transition: none;
        :deep() {
            h1, h2, h3, h4, h5{
                border: 0;
                padding: 0;
                margin: 0 0 18px;
                line-height: 28px;
                transition: none;
                font-size: revert;
            }
            h1{
                font-size: 32px;
                line-height: initial;
                margin-bottom: 22px;
            }
            p{
                line-height: 30px;
                margin: 0 0 18px;
                font-size: 16px;
                transition: none;
                *{
                    font-size: 16px;
                }
                mark{
                    padding: 0 4px;
                    line-height: 22px;
                    display: inline-block;
                }
            }
            blockquote{
                background: var(--color-bg-primary1);
                border-radius: 10px;
                padding-left: 22px;
                margin-bottom: 20px;
                p{
                    margin: 10px 0;
                }
            }
            ul, ol{
                margin: 0 0 18px;
                padding-left: 20px;
                li{
                    font-size: 16px;
                    margin: 0 0 8px;
                    line-height: 28px;
                    list-style: none;
                    position: relative;
                    &:last-child{
                        margin: 0;
                    }
                    &::before{
                        content: '☼';
                        font-size: 8px;
                        position: absolute;
                        top: 0px;
                        left: -16px;
                    }
                }
                ul{
                    margin: 8px 0;
                    li{
                        margin: 0;
                        font-size: 14px;
                        color: var(--color-text-2);
                    }
                }
            }
            img{
                border-radius: 8px;
                transition: all .3s;
                &:hover{
                    box-shadow: 0 2px 10px var(--color-border-1);
                }
            }
            iframe{
                width: 100%;
                height: 450px;
                margin-bottom: 20px;
            }
            pre{
                padding: 0;
                font-size: 16px;
                max-height: 500px;
                overflow: hidden;
                border-radius: 4px;
            }
        }
    }
    @media screen and (max-width: 600px) {
        .content{
            :deep() {
                iframe{
                    height: 310px;
                }
                blockquote{
                    padding-left: 16px;
                }
                ol li, ul li, p, p *{
                    font-size: 14px;
                    line-height: 26px;
                }
                h1{
                    font-size: 24px;
                }
                ol, ul{
                    padding-left: 16px;
                    li, li{
                        line-height: 22px;
                        margin-bottom: 10px;
                        &:after{
                            transform: scale(0.9);
                        }
                    }
                }
                img{
                    max-width: 100%;
                }
            }
        }
    }
}
</style>