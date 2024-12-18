import Vue from 'vue'

var common = {

    install(Vue, option){        
        function getWin(type) {
            return document.documentElement[type] || document.body[type]
        }
        const Tween = {
            linear : function(t, b, c, d) {   //匀速
                return c * t / d + b;
            },
            easeIn : function(t, b, c, d) {   //加速
                return c * (t /= d) * t + b;
            },
            easeOut : function(t, b, c, d) {  //减速
                return -c * (t /= d) * (t - 2) + b;
            },
            easeBoth : function(t, b, c, d) { //加速减速
                if((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            easeInStrong : function(t, b, c, d) {  //加加速
                return c * (t /= d) * t * t * t + b;
            }
        }
        /**
         * 设置滚动条位置
         * @param {String} type  => 类型
         * @param {Number} speed => 速度
         */
        let timerScroll = null
        Vue.prototype.$setScroll = (type, times = 1000) => {
            const startTime = new Date().getTime()
            const typeList = {
                index: () => {
                    return getWin('scrollTop') + getWin('clientHeight') / 2
                },
                article: '',
                envelope: '',
                message: '',
                comment: () => {
                    const form = document.querySelector('.comment-form'),
                          h = form.offsetHeight,
                          t = form.offsetTop;
                    return t + h + 20 - getWin('clientHeight')
                },
                viewComment: () => {

                    const comment = document.getElementById('comment')
                    const top = comment.offsetTop
                    return top
                },
                top: () => 0
            }

            let target = typeList[type]()
            let beforeScroll = 0

      

			timerScroll = setInterval(() => {
                let curScroll = getWin('scrollTop')
                let curTime = new Date().getTime()
                const t = times - Math.max(0, startTime - curTime + times)
                const value = Tween['linear'](t, curScroll, target - curScroll, times)

                curScroll = document.body.scrollTop = document.documentElement.scrollTop = value
                                
                /**
                 * 终点 & 边界处理
                 */
                let result = null
                if (type === 'comment' || type === 'viewComment') {
                    result = (beforeScroll && curScroll > beforeScroll) || curScroll <= target || curScroll === 0
                } else if (type == 'top') {
                    result = curScroll == target || (beforeScroll && curScroll > beforeScroll)
                } else {
                    result = curScroll <= beforeScroll || curScroll == target
                }

                result && clearInterval(timerScroll)

                beforeScroll = curScroll
			}, 25)
        }

        

        // Load More
        let [page, loadType, time] = [1, 'more', null]
        Vue.prototype.$loadMore = ({ url,paramsData },callback) => {
            if (Vue.prototype.$store.getters.status == 'reset') {
                page = 1
                loadType = 'more'
            }else{
                page++
            }

            if (loadType == 'loading' || loadType == 'nomore') {
                return
            }
            
            const axios = Vue.prototype.$store.$axios;
            setLoadType('loading')

            time = new Date().getTime();
           
           if(page<1){
            page = 1;
           }
            const params = { page, ...paramsData }            
            axios.get(url, { params }).then(res => {
                let { pagination,list } = res.data.data;
                let a = Math.ceil(pagination.total / paramsData.size)
                const result = page <= a ? 'more' : 'nomore';
                console.log(result,'result')
                // let a = res.data.data.list
                // const result = a.length ? 'more' : 'nomore'
                // loading 效果最少 500ms
                let timer = 500 - new Date().getTime() + time
                timer = timer < 0 ? 0 : timer;
                
                if(!list.length){
                    console.log(list,'list')
                    setLoadType("nomore")
                }
                setTimeout(() => {
                    callback&&callback(res.data)
                    setLoadType(result)
                    Vue.prototype.$setScroll('index')
                }, timer)

            }).catch(err => {
                page--
                setLoadType('more')
                callback&&callback(err)
            })
        }
        function setLoadType(type){
            const store = Vue.prototype.$store
            store.commit('setStatus', type)
            loadType = type
            time = null
        }

        Vue.prototype.$loadStatus = (data) => {
            if (!data.length) {
                setLoadType('nomore')
            }
        }

        /**
         * 首页图片懒加载 start
         */
        let listenList = []
        Vue.directive('lazy', {
            inserted: (el, binding) => {
                const src = binding.value
                if (src) {
                    listenList.push({ el, src })
                    window.addEventListener('scroll', watch)
                    lazyLoad({ el, src })      // 首屏初始化
                }
            }
        })
        function watch(){
            Vue.prototype.$throttle(() => listenList.map(i => lazyLoad(i)) , 100)()
        }
        // 加载图片
        const lazyLoad = (item) => {
            const { el, src } = item
            const info = el.getBoundingClientRect()
            const show = info.bottom + 100 > 0 && info.top - getWin('clientHeight') < 0
            if (src && show) {
                let img = new Image()
                img.src = src
                img.onload = () =>{
                    el.src = src
                    const index = listenList.indexOf(item)
                    index > -1 && listenList.splice(index, 1)
                    if (listenList.length === 0) {
                        window.removeEventListener('scroll', watch)
                    }
                }
            }
        }
        /**
         * 首页图片懒加载 end
         */

        Vue.prototype.$throttle = (fn, interval) => {
            let flag = true;
            return function(...args) {
                if (flag){
                    flag = false;
                    setTimeout(() => {
                        fn.apply(this, args);
                        flag = true;
                    }, interval);
                }
            }
        }
        Vue.prototype.$debounce = (fn, interval) => {
            let timer = null;
            return function (...args) {
                if(timer) clearTimeout(timer);
                    timer = setTimeout(() => {
                    fn.apply(this, args);
                }, interval);
            }
        }
    }
}

Vue.use(common)