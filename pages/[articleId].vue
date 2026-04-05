<template>
    <div class="articleld">
        <!-- details 未就绪时禁止访问 details.xxx，否则客户端导航会抛错并阻断渲染 -->
        <template v-if="details">
            <!-- Article Progress -->
            <div class="scrollbar" :style="{ width: postProgress }"></div>

            <Header
                :music="details.music"
                :title="details.title"
                :like="details.id"
                :sticky="true"
                :playMusic="true"
                :articlePage="true"
                :id="details.id"
                class="article-header"
                ref="header"
            />

            <section class="article-shell">
                <div class="article-hero">
                    <p class="article-kicker">Read & Reflect</p>
                    <h1 class="title">{{ details.title }}</h1>
                    <p class="article-summary">{{ details.excerpt || '在安静的页面里，留一点时间给阅读本身。' }}</p>
                </div>
                <div class="stuff">
                    <span>
                        <em>Published</em>
                        <strong>{{ getDate(details.createTime) }}</strong>
                    </span>
                    <span>
                        <em>Comments</em>
                        <strong>{{ commentTotal }}</strong>
                    </span>
                    <span>
                        <em>Views</em>
                        <strong>{{ details.readCounts || 0 }}</strong>
                    </span>
                    <span>
                        <em>Likes</em>
                        <strong>{{ details.likeTotal || 0 }}</strong>
                    </span>
                    <span>
                        <em>Collects</em>
                        <strong>{{ details.collectTotal || 0 }}</strong>
                    </span>
                </div>
                <div class="article-panel">
                    <ArticleContent class="content" :html="details.mdcontent" />
                </div>
                <div class="comment-panel">
                    <Comment :id="details.id" :title="details.title" />
                </div>
            </section>

            <footer :class="{ show: scroll_current >= 100 && scroll_direction == 'bottom' }">
                <div class="foot-box">
                    <h2>{{ details.title }}</h2>
                    <ul class="options">
                        <li
                            v-for="(item, index) in options"
                            :key="index"
                            @click="onOptions(item.type)"
                            :class="{ active: item.type == 'like' && isLike }"
                        >
                            <div v-if="item.type == 'like'" class="like-hint-box" :class="{ likeHint }">
                                <div class="like-hint">只能点赞一次哦</div>
                                <span></span>
                                <span></span>
                            </div>
                            <span
                                class="iconfont"
                                :class="[
                                    item.icon,
                                    item.type == 'like' && isLike ? 'icon-good_filled' : '',
                                ]"
                            ></span>
                            <span :class="{ skin: item.type == 'skin' }">{{ getItemData(item.type) }}</span>
                        </li>
                    </ul>
                </div>
            </footer>
        </template>
        <div v-else class="articleld-placeholder">加载中…</div>
    </div>
</template>

<script>
import Comment from '@/components/Comment'
import scrollMixin from '~/mixin/scroll'
import ArticleContent from '@/components/ArticleContent.vue'
import { useArticlesApi, useCommentsApi } from '@/composables/api'
import { useMainStore } from '@/stores/main'
import { mapState, mapActions } from 'pinia'

export default {
    mixins: [ scrollMixin ],
	components: { Comment,ArticleContent },
    setup() {
        definePageMeta({ name: 'articleId' })
        const route = useRoute()
        const main = useMainStore()
        const articlesApi = useArticlesApi()
        const commentsApi = useCommentsApi()
        const { data: pagePayload } = useAsyncData(
            `article-${String(route.params.articleId)}`,
            async () => {
                const articleId = String(route.params.articleId)
                const [articleRes, commentsRes] = await Promise.all([
                    articlesApi.getArticleById(articleId),
                    commentsApi.getComments(articleId, 1, 15),
                ])
                if (articleRes.code !== 200 || !articleRes.data) {
                    throw createError({ statusCode: 404, statusMessage: '页面未找到～' })
                }
                return {
                    details: articleRes.data,
                    commentTotal: commentsRes.data?.pagination.total ?? 0,
                }
            }
        )
        useHead(() => {
            const d = pagePayload.value?.details
            const u = main.userInfo
            if (!d || !u) {
                return { title: 'Libai' }
            }
            return {
                title: `${d.title} | ${u.webName}`,
                meta: [
                    { name: 'keywords', content: u.webSeo },
                    { name: 'description', content: d.excerpt },
                ],
            }
        })
        return { pagePayload }
    },
    data() {
        return {
            contentHeight: 0,
            clientHeight: 0,
            header: true,
            isLike: false,
            likeHint: false,
            likeTime: null,
            options: [
                 {
                    type: 'comment',
                    icon: 'icon-comment',
                },
                {
                    type: 'readCounts',
                    icon: 'icon-liulan',
                }, {
                    type: 'skin',
                    icon: 'icon-iconset0454'
                }, {
                    type: 'top',
                    icon: 'icon-top',
                }
            ]
        }
    },
    computed: {
        ...mapState(useMainStore, ['userInfo']),
        details() {
            return this.pagePayload?.details
        },
        commentTotal() {
            return this.pagePayload?.commentTotal ?? 0
        },
        postProgress() {
            if (this.contentHeight < this.clientHeight) {
                return '100%'
            }
            if (!this.scroll_current) {
                return
            }
            const h = this.contentHeight - this.clientHeight + 100
            const n = (100 * (this.scroll_current / h)).toFixed(4)
            return n < 100 ? n + '%' : '100%'
        },
    },
    mounted() {
       
    },
    methods: {
        ...mapActions(useMainStore, ['toggleDark']),
        getDate(time) {
			let arr = time.split('-')
			let arr2 = arr[2].split(' ')
			return this.formdataMonthText(arr[1]) + '月 ' + arr2[0] + ', ' + arr[0]
		},
        formdataMonthText(val){
            let text = val;
            switch (val) {
                case '01':
                    text = '一'
                    break
                case '02':
                    text = '二'
                    break
                case '03':
                    text = '三'
                    break
                case '04':
                    text = '四'
                    break
                 case '05':
                    text = '五'
                    break
                 case '06':
                    text = '六'
                    break
                 case '07':
                    text = '七'
                    break
                 case '08':
                    text = '八'
                    break
                 case '09':
                    text = '九'
                    break
                 case '10':
                    text = '十'
                    break
                 case '11':
                    text = '十一'
                    break
                 case '12':
                    text = '十二'
                    break
                default:
                    text = val
                    break;
            }
            return text
        },
        getItemData(type){
            try {
                const o = {
                    comment: () => this.commentTotal,
                    readCounts: () => this.details.readCounts || 0,
                    skin: () => 'skin',
                    top: () => 'top',
                    other: () => this.details[type]
                }
                return o[type] ? o[type]() : o.other()
            } catch (error) {
                return ''
            }
            
        },
        onOptions(type){
            if (type === 'readCounts') {
                return
            }
            const o = {
                'comment': () => {
                    const oCommentTop = document.getElementById('href-comment')
                    if (oCommentTop) {
                        oCommentTop.click()
                        return
                    }
                    const a = document.createElement('a')
                    a.setAttribute('href', '#comment')
                    a.setAttribute('id', 'href-comment')
                    document.body.appendChild(a)
                    a.click()
                },
                'top': () => {
                    this.$setScroll('top', 500)
                },
                'skin': () => {
                    this.toggleDark()
                }
            }
            o[type]()
        },
        getHeight() {
            const domList = ['.content', '.stuff', '.title']
            const height = domList.reduce((t, i) => {
                t += document.querySelector(i).offsetHeight
                return t
            }, 0)
            return height
        },
        liked() {
            this.isLike = true
        }
    },
}
</script>

<style lang="scss" scoped >
@mixin article-dark-theme {
    --article-accent-soft: rgba(80, 188, 182, 0.18);
    --article-accent-strong: rgba(80, 188, 182, 0.28);
    --article-warm-soft: rgba(239, 109, 87, 0.18);
    --article-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
    color-scheme: dark;
    background:
        radial-gradient(circle at 12% 0%, rgba(80, 188, 182, 0.16), transparent 30%),
        radial-gradient(circle at 88% 12%, rgba(239, 109, 87, 0.14), transparent 28%),
        linear-gradient(180deg, #030712 0%, #07111c 24%, var(--color-bg-primary) 100%);

    &::before {
        background: radial-gradient(circle, rgba(80, 188, 182, 0.26), transparent 72%);
    }

    &::after {
        background: radial-gradient(circle, rgba(239, 109, 87, 0.22), transparent 70%);
    }

    .article-hero,
    .article-panel,
    .comment-panel,
    footer {
        border-color: var(--color-border-1);
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(13, 17, 23, 0.98));
    }

    .stuff span {
        border-color: var(--color-border-1);
        background: linear-gradient(180deg, rgba(17, 24, 39, 0.84), rgba(10, 14, 24, 0.96));
        box-shadow: none;
    }

    footer .options li {
        border-color: var(--color-border-1);
        background: linear-gradient(180deg, rgba(17, 24, 39, 0.88), rgba(10, 14, 24, 0.96));
    }

    .article-panel {
        :deep() {
            .article-content,
            p,
            ul,
            ol,
            li,
            blockquote,
            table,
            th,
            td {
                background: transparent;
            }

            pre,
            pre code,
            .hljs {
                background: #0b1220 !important;
                color: #dbeafe !important;
                border-color: rgba(148, 163, 184, 0.2);
            }

            table {
                color: var(--color-text-2);
            }

            table th,
            table td {
                border-color: var(--color-border-1);
            }

            table th {
                color: var(--color-text-1);
                background: rgba(255, 255, 255, 0.04);
            }

            table td {
                background: rgba(255, 255, 255, 0.02);
            }
        }
    }
}

.articleld-placeholder {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 48px 24px;
    text-align: center;
    color: var(--color-text-secondary, #666);
    background:
        radial-gradient(circle at top, rgba(80, 188, 182, 0.14), transparent 36%),
        linear-gradient(180deg, rgba(239, 109, 87, 0.06), transparent 24%);
}

.articleld {
    --article-accent: #50bcb6;
    --article-accent-soft: rgba(80, 188, 182, 0.12);
    --article-accent-strong: rgba(80, 188, 182, 0.2);
    --article-warm-soft: rgba(239, 109, 87, 0.12);
    --article-shadow: 0 24px 80px rgba(22, 32, 72, 0.08);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 140px;
    overflow: hidden;
    color: var(--color-text-1);
    background:
        radial-gradient(circle at 10% 0%, rgba(80, 188, 182, 0.1), transparent 28%),
        radial-gradient(circle at 88% 10%, rgba(239, 109, 87, 0.1), transparent 24%),
        linear-gradient(180deg, var(--article-shell-top, #fbfdff) 0%, var(--article-shell-mid, #f4f8fb) 26%, var(--color-bg-primary) 100%);

    &::before,
    &::after {
        content: '';
        position: fixed;
        border-radius: 999px;
        pointer-events: none;
        filter: blur(10px);
        opacity: 0.9;
        z-index: 0;
    }

    &::before {
        top: 120px;
        left: -120px;
        width: 360px;
        height: 360px;
        background: radial-gradient(circle, rgba(80, 188, 182, 0.15), transparent 72%);
    }

    &::after {
        top: 320px;
        right: -120px;
        width: 320px;
        height: 320px;
        background: radial-gradient(circle, rgba(239, 109, 87, 0.13), transparent 70%);
    }

    &.is-dark {
        @include article-dark-theme;
    }

    .article-shell {
        width: min(100%, 960px);
        margin: 0 auto;
        padding: 108px 24px 0;
        transition: none;
        position: relative;
        z-index: 1;
    }

    .article-header {
        position: relative;
        z-index: 12;
    }

    .scrollbar{
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--article-accent), #7ccad1 48%, #ef6d57);
        transition: width .5s ease;
        z-index: 999999;
        box-shadow: 0 0 16px rgba(80, 188, 182, 0.38);
    }

    .article-hero,
    .article-panel,
    .comment-panel {
        position: relative;
        border: 1px solid var(--color-border-1);
        box-shadow: var(--article-shadow);
        background: var(--article-panel-bg, var(--color-bg-primary));
        backdrop-filter: blur(18px);
    }

    .article-hero {
        padding: 54px 52px 34px;
        border-radius: 36px;
        overflow: hidden;

        &::before,
        &::after {
            content: '';
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
        }

        &::before {
            top: -84px;
            right: -40px;
            width: 220px;
            height: 220px;
            background: radial-gradient(circle, rgba(80, 188, 182, 0.22), transparent 72%);
        }

        &::after {
            bottom: -120px;
            left: 8%;
            width: 280px;
            height: 280px;
            background: radial-gradient(circle, rgba(239, 109, 87, 0.16), transparent 68%);
        }
    }

    .article-kicker {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-height: 38px;
        padding: 0 16px;
        border-radius: 999px;
        margin-bottom: 18px;
        font-size: 12px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--article-accent);
        background: rgba(80, 188, 182, 0.08);
        border: 1px solid rgba(80, 188, 182, 0.18);

        &::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: currentColor;
            box-shadow: 0 0 0 6px rgba(80, 188, 182, 0.12);
        }
    }

    h1.title{
        position: relative;
        z-index: 1;
        max-width: 760px;
        margin: 0;
        padding: 0;
        font-size: clamp(32px, 4.7vw, 54px);
        line-height: 1.14;
        letter-spacing: 1.2px;
        color: var(--color-text-1);
    }

    .article-summary {
        position: relative;
        z-index: 1;
        max-width: 620px;
        margin-top: 18px;
        color: var(--color-text-2);
        font-size: 15px;
        line-height: 30px;
    }

    .stuff{
        position: relative;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 14px;
        margin-top: 18px;
        color: var(--color-text-2);

        span{
            min-height: 104px;
            padding: 18px 18px 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 12px;
            border-radius: 24px;
            border: 1px solid var(--color-border-1);
            background: var(--article-stat-bg, var(--color-bg-primary1));
            box-shadow: none;

            em {
                display: block;
                font-style: normal;
                font-size: 11px;
                line-height: 1.4;
                letter-spacing: 1.4px;
                text-transform: uppercase;
                color: var(--color-text-4);
            }

            strong {
                font-size: 15px;
                line-height: 1.7;
                color: var(--color-text-1);
                word-break: break-word;
            }
        }

        &:after{
            content: '';
            position: absolute;
            inset: auto 0 -18px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(80, 188, 182, 0.28), transparent);
        }
    }

    .article-panel {
        margin-top: 42px;
        padding: 0 56px;
        border-radius: 32px;
        overflow: hidden;

        :deep(.article-content) {
            padding: 78px 0 50px;
        }
    }

    .comment-panel {
        margin-top: 28px;
        padding: 34px 56px 48px;
        border-radius: 32px;

        :deep(.comment) {
            width: 100%;
        }
    }

    .back-top{
        position: fixed;
        bottom: 20px;
        right: 20px;
        height: 20px;
        line-height: 20px;
        background: #50bcb6;
        font-size: 13px;
        z-index: 9999;
        padding: 0 5px;
        color: var(--color-bg-primary);
    }
    footer{
        position: fixed;
        left: 50%;
        bottom: 24px;
        width: min(calc(100% - 32px), 960px);
        transform: translate(-50%, calc(100% + 40px));
        z-index: 100000;
        background: var(--article-float-bg, var(--color-bg-opacity));
        border: 1px solid var(--color-border-1);
        border-radius: 28px;
        box-shadow: var(--article-shadow);
        backdrop-filter: blur(20px);
        transition: all 0.6s;

        &.show{
            transform: translate(-50%, 0);
        }
        .foot-box{
            width: 100%;
            min-height: 78px;
            margin: auto;
            padding: 14px 20px 14px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
        h2{
            flex: 1;
            min-width: 0;
            font-size: 14px;
            line-height: 1.7;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--color-text-2);
        }
        .options{
            display: flex;
            gap: 10px;
            align-items: center;

            li{
                position: relative;
                list-style: none;
                min-width: 82px;
                height: 48px;
                padding: 0 16px;
                line-height: 48px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                border-radius: 18px;
                background: var(--article-stat-bg, var(--color-bg-primary1));
                border: 1px solid var(--color-border-1);

                &:not(:first-child){
                    cursor: pointer;
                    &:hover{
                        transform: translateY(-2px);
                        span, span.icon-top{
                            font-weight: 600;
                        }
                    }
                    &.active span{
                        color: var(--color-pink)
                    }
                }
                span:last-child{
                    font-size: 12px;
                    color: var(--color-text-1);
                    display: inline-block;
                    height: auto;
                    line-height: 1;
                    text-transform: capitalize;
                }
                .iconfont{
                    color: var(--color-text-1);
                    font-size: 20px;
                    cursor: pointer;
                    &:active{
                        opacity: .5;
                    }
                    &.icon-top{
                        font-size: 22px;
                        color: var(--color-text-2);
                    }
                    &.icon-iconset0451{
                        font-size: 22px;
                    }
                }
                & *, & *::before{
                    transition: none;
                }
                .like-hint-box{
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    transition: all .4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
                    transform-origin: right bottom;
                    transform: scale(0);
                    opacity: 0;
                    visibility: hidden;
                    & *{
                        transition: all .3s;
                    }
                    .like-hint{
                        position: absolute;
                        top: -180px;
                        right: 54px;
                        background: var(--color-pink);
                        color: #fff;
                        font-size: 13px;
                        width: 210px;
                        height: 110px;
                        line-height: 114px;
                        text-align: center;
                        border-radius: 220px / 120px;
                    }
                    span{
                        position: absolute;
                        top: -78px;
                        right: 28px;
                        height: 28px;
                        width: 28px;
                        border-radius: 50%;
                        background: var(--color-pink);  
                        &:last-child{
                            width: 14px;
                            height: 14px;
                            right: 12px;
                            top: -34px;
                        }
                    }
                    &.likeHint{
                        opacity: 1;
                        visibility: visible;
                        transform: scale(1);
                    }
                }
            }
        }
    }
}

:global(.dark) .articleld,
:global(.dark-mode) .articleld {
    @include article-dark-theme;
}

@media screen and (max-width: 820px) {
    .articleld{
        padding-bottom: 128px;

        .article-shell{
            width: 100%;
            padding: 92px 18px 0;
        }

        .article-hero {
            padding: 34px 24px 24px;
            border-radius: 28px;
        }

        h1.title{
            font-size: 28px;
        }

        .article-summary {
            margin-top: 12px;
            font-size: 14px;
            line-height: 26px;
        }

        .stuff {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .article-panel,
        .comment-panel {
            padding-left: 28px;
            padding-right: 28px;
            border-radius: 28px;
        }

        .article-panel {
            :deep(.article-content) {
                padding: 56px 0 24px;
            }
        }

        footer{
            width: calc(100% - 24px);
            bottom: 12px;

            &.show{
                transform: translate(-50%, 0);
            }

            .foot-box{
                width: 100%;
                min-height: 72px;
                padding: 12px 16px;

                h2{
                    display: none;
                }
                .options{
                    width: 100%;
                    justify-content: space-between;

                    li{
                        min-width: 0;
                        flex: 1;
                        padding: 0 10px;

                        span:last-child{
                            transform: none;
                            margin-top: 0;
                        }
                        .icon-top{
                            margin-top: 0;
                        }
                        .like-hint-box{
                            top: 8px;
                            right: 10px;
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 600px) {
    .articleld{
        .article-hero {
            padding: 28px 20px 22px;
        }

        .stuff {
            gap: 10px;

            span {
                min-height: 90px;
                padding: 15px 14px;
                border-radius: 20px;
            }
        }

        .article-panel,
        .comment-panel {
            margin-top: 20px;
            padding-left: 18px;
            padding-right: 18px;
            border-radius: 24px;
        }

        .article-panel {
            :deep() {
                .article-content{
                    padding: 44px 0 18px;
                }
                iframe{
                    height: 310px;
                }
            }
        }
    }
}
@media screen and (max-width: 500px) {
    .articleld{
        .article-shell {
            padding-left: 14px;
            padding-right: 14px;
        }

        .stuff {
            grid-template-columns: 1fr;
        }

        .article-panel {
            :deep() {
                iframe{
                    height: 260px;
                }
                blockquote{
                    padding-left: 16px;
                }
                p{
                    font-size: 14px;
                    strong, mark{
                        font-size: 14px;
                    }
                }
            }
        }
        footer .foot-box{
            padding: 10px 12px;
            .options li .like-hint-box{
                right: 14px;
                transform-origin: center bottom;
                span, .like-hint{
                    right: 50% !important;
                    transform: translateX(50%) !important;
                }
                span:nth-of-type(1){
                    top: -65px;
                }
            }
        }
    }
}
@media screen and (max-width: 414px) {
    .articleld .article-panel{
        :deep() {
            iframe{
                height: 220px;
            }
        }
    }
}


</style>
