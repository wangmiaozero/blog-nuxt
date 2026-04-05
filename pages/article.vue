<template>
    <div class="container article-list" :class="{ 'is-dark': dark }">
        <Header 
            :music="infoData.music"
            :title="infoData.title"
            sticky
            class="header-glass"
        />
        
        <section class="list-wrapper">
            <div class="empty-state" v-if="list.length == 0">
                <i class="iconfont icon-empty" />
                <p>空无一物，就像你我一样。</p>
            </div>

            <template v-else>
                <div 
                    class="year-group" 
                    v-for="(item, index) in list" 
                    :key="index" 
                >
                    <ul class="month-container">
                        <li class="month-label">
                            <span class="dot-pulse"></span>
                            {{ formdataEnMon(item.createTime) }}
                        </li>

                        <ul class="day-list">
                            <li v-for="(v, i) in item.list" :key="i" class="article-item">
                                <div class="item-main">
                                    <div class="item-cover" @click="viewArticle(v.id)">
                                        <img :src="v.listPic || placeholderCover" loading="lazy">
                                    </div>
                                    <div class="item-info">
                                        <h3 class="title" @click="viewArticle(v.id)">{{ v.title }}</h3>
                                        <div class="meta">
                                            <span class="stat">
                                                <i class="iconfont icon-icon3" /> {{ v.likeTotal || 0 }}
                                            </span>
                                            <span class="divider">/</span>
                                            <span class="stat">
                                                <i class="iconfont icon-liulan" /> {{ v.readCounts }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-category" @click="hanledTypeName(v)">
                                    <span class="tag"># {{ v.typeName }}</span>
                                </div>
                            </li>
                        </ul>
                    </ul>
                </div>
                
                <div class="load-more-container">
                    <LoadMore @more="more" />
                </div>
            </template>
        </section>

        <BackTop />   
        <Menu isKeyword @searchKeyword="searchKeyword" />
    </div>
</template>

<script>
import tool from "../utils/tool"
import Menu from '@/components/Menu'
import { MOCK_REMOTE_PLACEHOLDER_COVER } from '@/utils/image'
import { useArticlesApi } from '@/composables/api'
import { useMainStore } from '@/stores/main'
import { mapState, mapActions } from 'pinia'

export default {
    name: 'ArticleList',
    components: { Menu },
    setup() {
        definePageMeta({ name: 'article' })
        const api = useArticlesApi()
        const { data: pagePayload } = useAsyncData('article-list', async () => {
            const res = await api.getArticles({ page: 1, size: 50, sort: 'desc', order: 'createTime' })
            const data = res.data
            let infoData = data?.list?.length ? data.list[0] : ''

            const entity = tool.groupBy(data ? data.list : [], (item) => item.createTime)
            const list = []
            entity.forEach((item) => {
                list.push({ createTime: item[0].createTime, list: item })
            })
            return { list, infoData }
        })

        const main = useMainStore()
        useHead(() => ({
            title: main.userInfo?.webName ? `Archive | ${main.userInfo.webName}` : 'Archive',
        }))

        return { pagePayload }
    },
    data() {
        return {
            list: [],
            infoData: '',
            enMon: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            params: { typeId: "", typeName: "", keyWorld: "" },
            placeholderCover: MOCK_REMOTE_PLACEHOLDER_COVER,
        }
    },
    watch: {
        pagePayload: {
            immediate: true,
            handler(v) {
                if (!v) return
                this.list = v.list
                this.infoData = v.infoData
            },
        },
    },
    computed: {
        ...mapState(useMainStore, ['userInfo', 'status', 'keyWord', 'dark']),
    },
    mounted() {
        this.setStatus('more')
        this.$loadStatus(this.list)
        // 监听滚动底部的逻辑
        this.$watch('scroll_isBottom', (val) => {
            if (this.status === 'more' && val) this.more()
        }, { immediate: true })
    },
    methods: {
        ...mapActions(useMainStore, ['setStatus', 'setKeyWord']),
        more() { this.load({}) },
        searchKeyword(keyword) {
            this.setKeyWord(keyword)
            this.load({ type: 'reset' })
        },
        formdataEnMon(time) {
            const arr = time.split('-')
            const month = this.enMon[parseInt(arr[1]) - 1]
            return `${month} ${arr[0]}`
        },
        hanledTypeName(row) {
            this.params.typeId = row.typeId
            this.params.typeName = row.typeName
            this.load({ typeId: row.typeId })
        },
        load({ typeId = "", type = "" }) {
            if (typeId || type === "reset") {
                this.setStatus('reset')
                this.list = []
            } else {
                this.setStatus('more')
            }
            this.$loadMore({
                url: "/api/v1/articles",
                paramsData: {
                    sort: "desc",
                    order: "createTime",
                    size: 50,
                    typeId: this.params.typeId || "",
                    keyword: this.keyWord
                }
            }, (res) => {
                let entity = tool.groupBy(res?.data?.list, (item) => item.createTime);
                let newList = [];
                entity.forEach((item) => {
                    newList.push({ createTime: item[0].createTime, list: item })
                })
                this.list = this.list.concat(newList)
            })
        },
        viewArticle(id) { this.$router.push(`/${id}`) }
    },
}
</script>

<style lang="scss" scoped>
// 基础变量
:root {
    --timeline-color: rgba(110, 122, 181, 0.2);
    --accent-color: #6e7ab5;
    --text-main: #2d3436;
    --text-dim: #a1a0d6;
    --card-hover-bg: rgba(240, 244, 248, 0.5);
}

.article-list {
    min-height: 100vh;
    background-color: var(--color-bg-primary);

    .header-glass {
        backdrop-filter: blur(20px);
        background: var(--color-bg-opacity);
        border-bottom: 1px solid var(--color-border-1);
        z-index: 100;
    }

    .list-wrapper {
        width: 100%;
        max-width: 720px;
        margin: 0 auto;
        padding: 100px 20px 60px;
    }

    // 空状态
    .empty-state {
        text-align: center;
        padding: 100px 0;
        color: var(--color-text-4);
        font-style: italic;
        i { font-size: 48px; display: block; margin-bottom: 15px; opacity: 0.5; }
    }

    .year-group {
        position: relative;
        
        .month-container {
            list-style: none;
            padding: 0;

            .month-label {
                display: flex;
                align-items: center;
                font-size: 20px;
                font-weight: 600;
                color: var(--accent-color);
                margin: 40px 0 20px;
                letter-spacing: 1px;

                .dot-pulse {
                    width: 12px;
                    height: 12px;
                    background: var(--accent-color);
                    border-radius: 50%;
                    margin-right: 18px;
                    position: relative;
                    box-shadow: 0 0 0 4px rgba(110, 122, 181, 0.1);

                    &::after {
                        content: '';
                        position: absolute;
                        top: 0; left: 0;
                        width: 100%; height: 100%;
                        border-radius: 50%;
                        background: var(--accent-color);
                        animation: pulse 2s infinite;
                    }
                }
            }

            .day-list {
                margin-left: 5px;
                padding-left: 24px;
                border-left: 2px solid var(--timeline-color);
                list-style: none;

                .article-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 25px 15px;
                    border-radius: 12px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-bottom: 10px;

                    &:hover {
                        background: var(--card-hover-bg);
                        transform: translateX(8px);
                        
                        .item-cover img { transform: scale(1.1); }
                        .title { color: var(--color-active); }
                    }

                    .item-main {
                        display: flex;
                        align-items: center;
                        gap: 20px;
                        flex: 1;

                        .item-cover {
                            width: 56px;
                            height: 56px;
                            border-radius: 10px;
                            overflow: hidden;
                            flex-shrink: 0;
                            border: 1px solid var(--color-border-4);
                            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                            cursor: pointer;

                            img {
                                width: 100%; height: 100%;
                                object-fit: cover;
                                transition: transform 0.5s ease;
                            }
                        }

                        .item-info {
                            .title {
                                font-size: 16px;
                                font-weight: 500;
                                color: var(--color-text-1);
                                margin-bottom: 6px;
                                cursor: pointer;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                            }

                            .meta {
                                display: flex;
                                align-items: center;
                                gap: 10px;
                                color: var(--text-dim);
                                font-size: 12px;
                                font-family: 'Inter', sans-serif;

                                .stat i { font-size: 12px; margin-right: 3px; }
                                .divider { opacity: 0.3; }
                            }
                        }
                    }

                    .item-category {
                        .tag {
                            font-size: 12px;
                            color: #d2c6a3;
                            background: rgba(210, 198, 163, 0.1);
                            padding: 4px 10px;
                            border-radius: 6px;
                            cursor: pointer;
                            transition: all 0.3s;
                            white-space: nowrap;

                            &:hover {
                                background: #d2c6a3;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }

    .load-more-container {
        margin-top: 60px;
        text-align: center;
    }
}

// 脉冲动画
@keyframes pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(2.5); opacity: 0; }
}

// 响应式微调
@media screen and (max-width: 768px) {
    .article-list .list-wrapper {
        padding: 80px 15px 40px;
        
        .article-item {
            padding: 15px 10px;
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
            
            &:hover { transform: translateX(5px); }
            
            .item-category { align-self: flex-end; }
        }
    }
}

@media screen and (max-width: 480px) {
    .article-list .year-group .month-container {
        .month-label { font-size: 18px; }
        .day-list { padding-left: 18px; }
    }
}

// 暗色模式补丁
.is-dark {
    --card-hover-bg: rgba(255, 255, 255, 0.05);
    --timeline-color: rgba(255, 255, 255, 0.1);
    --accent-color: #8b96cc;
    --text-dim: #8b8ac0;
    .header-glass {
        background: var(--color-bg-opacity);
        border-bottom: 1px solid var(--color-border-1);
    }
}
</style>