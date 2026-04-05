<template>
    <div class="container">
        <Header 
            v-if="refresh" 
            :music="music" 
            :sticky="true" 
            title="予给你一封信"
        />
        <section class="content">
            <div v-if="!list || list.length == 0" class="data-null">
                空无一物，就像你我一样。
            </div>
            <template v-else>
                <div v-for="(item, index) in list" :key="index" class="item">
                    <div class="text" v-html="item.contentHtml"></div>
                    <div class="time">{{ item.time }}</div>
                </div>
                <LoadMore />
            </template>
        </section>
    </div>
</template>

<script>
import scrollMixin from '~/mixin/scroll'
import { useLettersApi } from '@/composables/api'
import { useMainStore } from '@/stores/main'

export default {
    mixins: [scrollMixin],
    setup() {
        definePageMeta({ name: 'envelope' })
        const main = useMainStore()
        const api = useLettersApi()
        const { data: pagePayload } = useAsyncData('envelope-page', async () => {
            const res = await api.getLetters(1, 10)
            return { list: res.data }
        })
        useHead(() => ({
            title: main.siteInfo?.webName ? `Hello ${main.siteInfo.webName}` : 'Libai',
        }))
        return { pagePayload }
    },
    data(){
        return{
            music: '',
            refresh: true,
            list: [],
            pagination: { page: 1, size: 10, total: 0 },
        }
    },
    watch: {
        pagePayload: {
            immediate: true,
            handler(v) {
                if (v?.list) {
                    this.list = v.list.list ?? []
                    this.pagination = v.list.pagination ?? { page: 1, size: 10, total: 0 }
                }
            },
        },
    },
    mounted(){
        this.music = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        this.refresh = false
        this.$nextTick(() => this.refresh = true)
        this.$loadStatus(this.list)
        this.$watch('scroll_isBottom', (val) => {
            val && this.load()
        }, { immediate: true })
    },
    methods: {
        async load() {
            const nextPage = this.pagination.page + 1
            const api = useLettersApi()
            const res = await api.getLetters(nextPage, this.pagination.size)
            if (res.code === 200 && res.data) {
                this.list = this.list.concat(res.data.list)
                this.pagination = res.data.pagination
                if (res.data.list.length === 0 || this.list.length >= res.data.pagination.total) {
                    useMainStore().setStatus('nomore')
                }
            }
        }
    },
    computed: {
        info(){
            const main = useMainStore()
            return main.siteInfo || {}
        }
    },
}
</script>
<style lang="scss" scoped>
.data-null{
    text-align: center;
    font-size: 16px;
    letter-spacing: 4px;
    color: var(--color-text-1);
}
.container{
    min-height: 100vh;
    background: var(--color-bg-primary2);
}
.content{
    width: 700px;
    margin: auto;
    padding: 90px 0 50px;
    .item{
        margin-bottom: 30px;
        background: var(--color-bg-primary);
        padding: 30px 30px 20px;
        border-radius: 6px;
        transition: all .3s;
        &:hover{
            box-shadow: 0 1px 8px rgba(0, 132, 255, 0.3);
        }
        .text{
            color: var(--color-text-1);
            :deep(.hljs-right){
                text-align: right;
            }
        }
        .time{
            font-size: 13px;
            text-align: right;
            margin-top: 14px;
            color: var(--color-text-3);
        }
    }
}
@media screen and (max-width: 700px){
    .content{
        width: 100%;
        padding: 80px 20px 20px;
    }
}
@media screen and (max-width: 500px){
    .content{
        width: 100%;
        padding: 70px 20px 10px;
        .item{
            padding: 20px;
            margin-bottom: 18px;
        }
    }
}
</style>
