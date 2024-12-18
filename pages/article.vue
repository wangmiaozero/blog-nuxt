<template>
    <div class="container article-list">
        <Header 
            :music="infoData.music"
            :title="infoData.title"
            sticky
        />
        <section class="list">
            <div class="year-list" v-if="list.length == 0">
                空无一物，就像你我一样。
            </div>
            <template v-else>
                <div 
                    class="year-list" 
                    v-for="(item, index) in list" 
                    :key="index" 
                >
                    <ul 
                        class="month-list" 
                    >
                       <li class="month">{{ formdataEnMon(item.createTime) }}</li>
                        <ul class="day-list" v-for="(v,i) in item.list" :key="i">
                            <li>
                                <div class="item-l">
                                    <div class="img" @click="viewArticle(v.id)">
                                        <img :src="v.listPic || '/image/other/default.jpg'">
                                    </div>
                                    <div class="tit">
                                        <span @click="viewArticle(v.id)">{{ v.title }}</span>
                                        <span>{{ v.likeTotal||0 }} LIKE / {{ v.read_counts }} READ</span>
                                    </div>
                                </div>
                                <span class="item-r" @click="hanledTypeName(v)">{{ v.typeName }}</span>
                            </li>
                        </ul>
                    </ul>
                </div>
                <LoadMore @more="more" />
            </template>
        </section>
        <BackTop />   
        <Menu isKeyword @searchKeyword="searchKeyword" />
    </div>
</template>

<script>
import scrollMixin from '~/mixin/scroll.js'
import config from "../config/index"
import tool from "../utils/tool"
import Menu from '@/components/Menu'
import { Mock } from "@/utils/mock"
export default {
    //mixins: [scrollMixin],
    components: {
		Menu
	},
    data(){
        return{
            enMon: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            params:{
                typeID:"",
                typeName:"",
                keyWorld:""
            },
            keyword:""
        }
    },
    head () {
        return {
            title: `Article | ${this.userInfo.webName}`
        }
    },
    computed: {
        userInfo() {
			return this.$store.getters.userInfo
		},
        status() {
            return this.$store.getters.status
        },
        keyWord() {
            return this.$store.getters.keyWord
        }
    },
    mounted(){
        this.$store.commit("setStatus","more")
        this.$loadStatus(this.list)
        this.$watch('scroll_isBottom', (val) => {
            if(this.status==='more'){
                val && this.more({})
            }
        }, { immediate: true })
    },
    methods: {
        more(){
            this.load({})
        },
        searchKeyword(keyword){
            this.$store.commit("setKeyWord",keyword)
            this.load({type:'reset'})
        },
        formdataEnMon(time){
            let arr = time.split('-')
            let m = arr[1];
            let val = this.enMon[parseInt(m)-1]
            return`${val}, ${arr[0]}`
        },
        hanledTypeName(row){
            this.params.typeID = row.typeID
            this.params.typeName = row.typeName
            row && this.load({typeID:row.typeID})
        },
        load({
            typeID="",type=""
        }){
            console.log(typeID,'typeID')
            if(typeID||type=="reset"){
                this.$store.commit("setStatus","reset")
                this.list = []
            }else{
                this.$store.commit("setStatus","more")
            }
            this.$loadMore({
			   url:"/web/article/page",
				paramsData:{
					p:config.phone,
					sort:"desc",
					order:"createTime",
					size:50,
                    typeID:this.params.typeID||"",
                    keyWord:this.keyWord
				}
			}, (res) => {
                 let entity = tool.groupBy(res ? res.data.list : null, function (item) { return item.createTime; });
                 let list = [];
                    entity.forEach((item)=>{
                        let _data = {
                            createTime:item[0].createTime,
                            list:item
                        }
                        list.push(_data)
                    })

                this.list = this.list.concat(list)
			})
        },
        viewArticle(id){
            this.$router.push(`/${id}`)
        }
    },
    async asyncData(context){
        const { data } = Mock().get("/web/article/page")
        // const { data } = await context.$axios.get('/web/article/page', {
		// 	 params:{
        //         p:config.phone,
		// 		sort:"desc",
		// 		order:"createTime",
		// 		page:1,
		// 		size:50
        //     }
		// })
        let infoData = ""
        if(data&&data.list&&data.list.length){
           infoData = data.list[0]
       }
       let entity = tool.groupBy(data ? data.list : null, function (item) { return item.createTime; });
       let list = [];
       entity.forEach((item)=>{
           let _data = {
               createTime:item[0].createTime,
               list:item
           }
           list.push(_data)
       })
       return { list,infoData }
	}
}
</script>
<style lang="scss" scoped>
.article-list{
    .bottom-loading .btn.more:hover{
        background: none;
        color: #909090;
    }
    .list{
        width: 640px;
        padding: 80px 0 40px;
        margin: auto;
        .year-list{
            padding: 10px 20px;
        }
        .month-list{
            .month{
                color: #6e7ab5;
                font-weight: 400;
                font-size: 18px;
                margin: 30px 0 10px;
                list-style: none;
                position: relative;
                &:before{
                    content: "";
                    width: 12px;
                    height: 12px;
                    display: inline-block;
                    background-color: #DCE8EC;
                    border: 3px solid #AFCFFF;
                    margin-right: 22px;
                    border-radius: 50%;
                    box-sizing: border-box;
                }
                span{
                    color: var(--color-text-4);
                    font-size: 13px;
                    font-style: oblique;
                }
            }
            .day-list{
                padding-left: 30px;
                border-left: 1px solid var(--color-border-4);
                margin-left: 6px;
                li{
                    padding: 25px 0;
                    border-bottom: 1px solid var(--color-border-4);
                    display: flex;
                    justify-content: space-between;
                    .item-l{
                        display: flex;
                        .img{
                            width: 45px;
                            height: 45px;
                            border-radius: 4px;
                            margin-right: 15px;
                            overflow: hidden;
                            cursor: pointer;
                            display: flex;
                            justify-content: center;
                            border: 1px solid var(--color-border-4);
                        }
                        .tit{
                            flex: 1;
                            display: flex;
                            flex-flow: column;
                            align-items: flex-start;
                            justify-content: space-around;
                            span:first-child{
                                color: var(--color-text-6);
                                cursor: pointer;
                                font-size: 15px;
                                padding-bottom: 5px;
                                transition: backgroundColor .3s, backgroundPosition 0s;
                                &:hover, &:focus{
                                    color: var(--color-text-7);
                                    background: radial-gradient(circle at 10px -7px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x,
                                    radial-gradient(circle at 10px 27px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x;
                                    background-size: 20px 20px;
                                    background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
                                    animation: waveFlow 1s infinite linear;
                                }
                                @keyframes waveFlow {
                                    from { background-position-x: -10px, 0; }
                                    to { background-position-x: -30px, -20px; }
                                }
                            }
                            span:last-child{
                                color: #a1a0d6;
                                font-size: 13px;
                                letter-spacing: 0;
                            }
                        }
                    }
                    .item-r{
                        color: #d2c6a3;
                        font-size: 13px;
                        cursor: pointer;
                        &:active{
                            opacity: .5;
                        }
                    }
                }
            }
        }
    }
} 
@media screen and (max-width: 700px){
    .article-list .list{
        width: 100%;
        padding: 80px 20px 20px;
    }
}
@media screen and (max-width: 500px){
    .article-list .list{
        padding: 60px 10px 20px;
        .year-list{
            padding: 10px 10px 10px 6px;
        }
        .mon-list {
            .month:before{
                margin-right: 10px;
            }
            .day-list{
                padding-left: 18px;
                li{
                    padding: 18px 0;
                    .item-l {
                        .img{
                            margin-right: 12px;
                        }
                        .tit span{
                            margin-bottom: 6px;
                        }
                    }
                    .item-r{
                        white-space: nowrap;
                        margin: 2px 0 0 10px;
                    }
                }
            } 
        }
        
    }
}
</style>