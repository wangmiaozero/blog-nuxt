import config from "../config/index"
import { Mock } from "../utils/mock"
export const state = () => ({
    userInfo: null,
    blogrollList:[],
    index: false,
    status: 'more',
    dark:false,
    keyWord:""
})

export const mutations = {
    setUserInfo (state, val) {
        state.userInfo = val
    },
    setBlogrollList (state, val) {
        state.blogrollList = val
    },
    isIndex (state,val) {
        if(val){
            state.index = val
        }else{
            state.index = true
        }
    },
    setStatus (state, val) {
        state.status = val
    },
    setDark(state){
        state.dark = !state.dark;
        if(state.dark){
            this.$colorMode.preference = 'dark'
        }else{
            this.$colorMode.preference = ''
        }
        
    },
    setKeyWord(state,val){
        state.keyWord = val;
    }
}

export const getters = {
    userInfo:state => state.userInfo,
    blogrollList:state => state.blogrollList,
    dark:state => state.dark,
    status: state => state.status,
    keyWord: state => state.keyWord
}
export const actions = {
    async nuxtServerInit({ commit }, { req }) {
        const res =  Mock().get("/web/user/info")
        // const res = await this.$axios.get('/web/user/info',{
        //     params:{
        //         p:config.phone
        //     }
        // })
        commit('setUserInfo', res.data)
        const resultBlogroll =  Mock().get("/web/blogroll/list")
        // const resultBlogroll = await this.$axios.get('/web/blogroll/list',{
        //     params:{
        //         p:config.phone
        //     }
        // })
        commit('setBlogrollList',resultBlogroll.data)
    },
}

export default {
    state,
    actions,
    getters,
    mutations
};