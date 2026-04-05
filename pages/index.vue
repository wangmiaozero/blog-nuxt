<template>
    <div class="container index" v-if="userInfo" :class="{ 'is-dark': dark }">
        <div class="cover">
            <div id="scene" :style="{ height: boxH }">
                <div class="layer" data-depth="0.4" :style="layerStyle">
                    <img id="image" :style="imgStyle" :src="image" width="1920" height="1080">
                </div>
            </div>
            <div class="head">
                <div class="logo-img">
                    <img :src="currentLogo" />
                </div>
            </div>
            <div class="misk"></div>
            
            <div class="post">
                <div class="time">{{ infoData.createTime }}</div>
                <div class="title">
                    <NuxtLink :to="'/' + infoData.id">{{ infoData.title }}</NuxtLink>
                </div>
                <div class="describe">{{ infoData.excerpt }}</div>
            </div>
            <Menu />
        </div>

        <template v-if="list.length > 0">
            <div class="content">
                <div class="post" v-for="(item, index) in list" :key="index">
                    <div class="info">
                        <div class="time">{{ item.createTime }}</div>
                        <div class="title">
                            <a @click="toArticle(item.id)">{{ item.title }}</a>
                        </div>
                        <div class="describe">{{ item.excerpt }}</div>
                        <div class="stuff">
                            <div v-for="(v, i) in infoIcon" :key="i" class="stat-chip"
                                :style="{ '--stat-accent': v.color }">
                                <i class="iconfont" :class="v.icon" aria-hidden="true" />
                                <span class="stat-num">{{ item[v.name] ?? 0 }}</span>
                                <span class="stat-unit">{{ v.text }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="img-box" @click="toArticle(item.id)">
                        <img v-lazy="item.listPic" :src="placeholderCover" />
                    </div>
                </div>
                <div @click="loadMoreData" class="more">
                    <LoadMore />
                </div>
            </div>
        </template>
        <template v-else>
            <div class="content-null">
                主人太懒了，还没发表任何文章！！
            </div>
        </template>
        <Footer />
        <BackTop />
        <Loading v-if="loading" />
    </div>
    <div v-else class="empty-data">
        请到管理员后台填写完整信息！
    </div>
</template>

<script>
import Parallax from 'parallax-js'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
import tool from "@/utils/tool"
import { MOCK_REMOTE_PLACEHOLDER_COVER } from "@/utils/image"
import { LOCAL_HOME_COVER_URLS, LOCAL_LOGO_URLS, pickRandomHomeCover, pickRandomLogo } from "@/utils/assets"
import { useArticlesApi } from '@/composables/api'
import { useMainStore } from '@/stores/main'
import { mapState, mapActions } from 'pinia'

export default {
    name: 'index',
    components: { Menu, Footer },
    setup() {
        definePageMeta({ name: 'index' })
        const mainStore = useMainStore()
        const api = useArticlesApi()
        const { data: pagePayload } = useAsyncData('index-home', async () => {
            const [featuredRes, listRes] = await Promise.all([
                api.getArticleById('3'),
                api.getArticles({ page: 1, size: 20, sort: 'desc', order: 'createTime' }),
            ])
            return {
                list: listRes.data?.list ?? [],
                infoData: featuredRes.data ?? {},
            }
        })
        useHead(() => ({
            title: mainStore.userInfo?.webName,
            meta: [
                { name: 'keywords', content: mainStore.userInfo?.webSeo },
                { name: 'description', content: mainStore.userInfo?.webDescribe },
            ],
        }))
        return { pagePayload }
    },
    data() {
        return {
            listMore: [],
            layerStyle: {},
            imgStyle: {},
            boxH: '100vh',
            boxW: '100%',
            isNav: false,
            loading: true,
            image: LOCAL_HOME_COVER_URLS[0],
            currentLogo: LOCAL_LOGO_URLS[0],
            coverRotateTimer: null,
            logoRotateTimer: null,
            placeholderCover: MOCK_REMOTE_PLACEHOLDER_COVER,
            infoIcon: [
                { icon: 'icon-icon3', name: 'likeTotal', text: '点赞', color: '#EF6D57' },
                { icon: 'icon-liulan', name: 'readCounts', text: '浏览', color: '#50bcb6' },
                { icon: 'icon-shoucang2', name: 'collectTotal', text: '收藏', color: '#ffa800' }
            ]
        }
    },
    computed: {
        ...mapState(useMainStore, ['userInfo', 'dark']),
        infoData() { return this.pagePayload?.infoData ?? {} },
        list() {
            const base = Array.isArray(this.pagePayload?.list) ? this.pagePayload.list : []
            return base.concat(this.listMore)
        },
    },
    watch: {
        pagePayload() { this.listMore = [] },
    },
    mounted() {
        this.gettersUserInfo()
        if (!this.userInfo) return
        this.update()
        this.loadImage()
        this.isIndex()
        this.$loadStatus(this.list)
        window.addEventListener('resize', this.update)
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.update)
        if (this.coverRotateTimer) clearInterval(this.coverRotateTimer)
        if (this.logoRotateTimer) clearInterval(this.logoRotateTimer)
    },
    methods: {
        ...mapActions(useMainStore, ['isIndex']),
        randomCoverImg() {
            return pickRandomHomeCover(this.image)
        },
        randomLogoImg() {
            return pickRandomLogo(this.currentLogo)
        },
        gettersUserInfo() {
            let _userInfo = localStorage.getItem("_userInfo");
            if (!_userInfo) tool.initUserInfo()
        },
        update() {
            this.boxH = document.documentElement.clientHeight + 'px';
            this.boxW = document.documentElement.clientWidth + 'px';
            this.coverLayer()
        },
        loadImage() {
            const src = this.randomCoverImg()
            const time = new Date().getTime()
            let img = new Image()
            img.src = src
            img.onload = () => {
                let timer = Math.max(0, 500 - (new Date().getTime() - time))
                setTimeout(() => {
                    this.image = src
                    this.loading = false
                }, timer)
            }
            img.onerror = () => {
                this.image = '/image/home/home.png'
                this.loading = false
            }
            const scene = document.getElementById('scene')
            if (scene) new Parallax(scene, { relativeInput: true, clipRelativeInput: true })
            // Rotate cover every 15 seconds
            this.coverRotateTimer = setInterval(() => {
                this.image = this.randomCoverImg()
            }, 15000)
            this.logoRotateTimer = setInterval(() => {
                this.currentLogo = this.randomLogoImg()
            }, 15000)
        },
        coverLayer() {
            let _w = parseInt(this.boxW), _h = parseInt(this.boxH), x, y, i,
                e = (_w >= 1000 || _h >= 1000) ? 1000 : 500;
            if (_w >= _h) { i = _w / e * 50; y = i; x = i * _w / _h; } 
            else { i = _h / e * 50; x = i; y = i * _h / _w; }
            this.layerStyle = {
                width: _w + x + 'px',
                height: _h + y + 'px',
                marginLeft: -0.5 * x + 'px',
                marginTop: -0.5 * y + 'px'
            }
            this.coverImg()
        },
        coverImg() {
            const width = parseInt(this.layerStyle.width), height = parseInt(this.layerStyle.height),
                ratio = 1080 / 1920, compute = height / width > ratio;
            const style = {
                width: compute ? (height / ratio + 'px') : `${width}px`,
                height: compute ? `${height}px` : (width * ratio + 'px')
            }
            style['left'] = (width - parseInt(style.width)) / 2 + 'px'
            style['top'] = (height - parseInt(style.height)) / 2 + 'px'
            this.imgStyle = style
        },
        loadMoreData() {
            this.$loadMore({
                url: "/api/v1/articles",
                paramsData: { sort: "desc", order: "createTime", size: 20 }
            }, (res) => {
                const next = res?.data?.list
                if (Array.isArray(next) && next.length) this.listMore = this.listMore.concat(next)
            })
        },
        toArticle(id) { this.$router.push(`/${id}`) }
    },
}
</script>

<style lang="scss" scoped>
// 变量定义
:root {
    --accent-red: rgba(176, 14, 37, 0.7);
    --glass-bg: rgba(255, 255, 255, 0.85);
    --card-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
    --card-hover-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.index.is-dark {
    --glass-bg: rgba(30, 41, 59, 0.85);
    --card-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.empty-data {
    position: absolute;
    top: 40%; left: 50%;
    font-size: 20px; font-weight: 600; color: var(--color-red);
    transform: translateX(-50%);
}

.index {
    position: relative;
    width: 100%;
    
    // 封面样式
    .cover {
        width: 100%; height: 100vh;
        position: relative; z-index: 99; overflow: hidden;

        #scene { width: 100%; overflow: hidden; }

        .misk {
            position: absolute; top: 0; left: 0;
            width: 100%; height: 100%;
            background: linear-gradient(135deg, var(--accent-red) 0%, rgba(176, 14, 37, 0.3) 100%);
            clip-path: polygon(0 0, 32% 0, 65% 100%, 0% 100%);
            backdrop-filter: blur(2px);
        }

        .head {
            position: absolute; top: 60px; left: 40px;
            z-index: 100;
            .logo-img { width: 110px; img { width: 100%; transition: opacity 0.3s; } }
        }

        .post {
            position: absolute; top: 50%; left: 10%;
            transform: translateY(-50%);
            color: #fff; width: 35%;
            text-shadow: 0 2px 15px rgba(0,0,0,0.2);

            .time { font-size: 14px; opacity: 0.9; margin-bottom: 10px; }
            .title a {
                font-size: 36px; font-weight: 700; color: #fff;
                text-decoration: none; transition: all 0.3s;
                &:hover { opacity: 0.8; letter-spacing: 1px; }
            }
            .describe { margin-top: 20px; line-height: 1.8; font-size: 16px; opacity: 0.9; }
        }
    }

    // 内容列表区域
    .content {
        max-width: 1200px; margin: 0 auto;
        padding: 0 20px 100px; position: relative;

        &::after {
            content: ''; position: absolute; top: 0; left: 50%;
            width: 1px; height: 100%;
            background: linear-gradient(to bottom, transparent 0%, var(--color-border-1) 20%, var(--color-border-1) 80%, transparent 100%);
            opacity: 0.6;
            pointer-events: none;
            @media screen and (max-width: 900px) { display: none; }
        }

        .post {
            display: flex; align-items: center; justify-content: space-between;
            margin-top: 120px; gap: 40px;
            
            &:nth-child(odd) { flex-direction: row-reverse; }

            // 图片容器
            .img-box {
                width: 600px; height: 380px;
                border-radius: 20px; overflow: hidden;
                box-shadow: var(--card-shadow);
                transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                cursor: pointer;
                position: relative;
                z-index: 1;
                
                img { 
                    width: 100%; height: 100%; object-fit: cover; 
                    transition: transform 0.6s ease;
                }
                &:hover {
                    box-shadow: var(--card-hover-shadow);
                    transform: translateY(-5px);
                    img { transform: scale(1.08); }
                }
            }

            // 文字信息卡片
            .info {
                width: 520px; padding: 45px;
                background: var(--glass-bg);
                backdrop-filter: blur(12px);
                border-radius: 24px;
                border: 1px solid var(--color-border-1);
                box-shadow: var(--card-shadow);
                transition: all 0.4s ease;

                &:hover { transform: translateY(-8px); box-shadow: var(--card-hover-shadow); }

                .time { color: var(--color-text-4); font-size: 13px; }
                .title {
                    margin: 15px 0;
                    cursor: pointer;
                    a {
                        font-size: 26px; font-weight: 700; color: var(--color-text-1);
                        transition: color 0.3s;
                        &:hover { color: var(--color-active); }
                    }
                }
                .describe { 
                    color: var(--color-text-2); font-size: 15px; line-height: 1.8;
                    margin-bottom: 30px;
                }

                // 统计标签
                .stuff {
                    display: flex; gap: 12px; flex-wrap: wrap;
                    .stat-chip {
                        display: flex; align-items: center; gap: 6px;
                        padding: 6px 14px; border-radius: 10px;
                        background: var(--color-bg-primary1);
                        font-size: 13px;
                        .iconfont { color: var(--stat-accent); }
                        .stat-num { font-weight: 600; color: var(--color-text-1); }
                        .stat-unit { color: var(--color-text-4); font-size: 12px; }
                    }
                }
            }
        }

        .more {
            margin-top: 56px;
            padding-top: 40px;
            text-align: center;
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: min(320px, 70%);
                height: 1px;
                background: linear-gradient(90deg, transparent, var(--color-border-1), transparent);
            }

            :deep(.bottom-loading) {
                display: inline-block;
            }

            :deep(.btn) {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-height: 48px;
                padding: 0 44px;
                font-size: 14px;
                font-weight: 600;
                letter-spacing: 0.06em;
                color: var(--color-text-2);
                background: var(--glass-bg);
                backdrop-filter: blur(10px);
                border: 1px solid var(--color-border-1);
                border-radius: 999px;
                box-shadow: var(--card-shadow);
                transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, color 0.22s ease, background 0.22s ease;
            }

            :deep(.btn.more) {
                cursor: pointer;
                &:hover {
                    color: #fff;
                    background: var(--color-active);
                    border-color: var(--color-active);
                    box-shadow: 0 14px 32px rgba(0, 132, 255, 0.32);
                    transform: translateY(-2px);
                }
                &:active {
                    transform: translateY(0);
                }
            }

            :deep(.btn:not(.more)) {
                cursor: default;
            }

            :deep(.loader) {
                height: 44px;
                width: 140px;
                margin: 0 auto;
                justify-content: center;
                gap: 10px;
            }

            :deep(.dot) {
                width: 8px;
                height: 8px;
            }
        }
    }

    // 响应式优化
    @media screen and (max-width: 1100px) {
        .content .post {
            gap: 20px;
            .img-box { width: 50%; height: 300px; }
            .info { width: 50%; padding: 30px; }
        }
    }

    @media screen and (max-width: 900px) {
        .cover .misk { clip-path: none; }
        .cover .post { width: 80%; left: 10%; }
        
        .content .post {
            flex-direction: column !important;
            .img-box { width: 100%; height: auto; aspect-ratio: 16/9; border-radius: 20px 20px 0 0; }
            .info { 
                width: 100%; border-radius: 0 0 20px 20px; 
                margin-top: -20px; z-index: 2;
                box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            }
        }

        .content .more {
            margin-top: 40px;
            padding-top: 32px;
            :deep(.btn) {
                min-height: 46px;
                padding: 0 32px;
                font-size: 13px;
            }
        }
    }
}

// 懒加载淡入
img[v-lazy="loaded"] {
    animation: fadeIn 0.6s ease;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
