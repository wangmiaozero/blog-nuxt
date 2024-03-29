<template>
	<div class="container index" v-if="userInfo">
		<div class="cover">
			<div id="scene" :style="{ height:boxH }">
				<div class="layer" data-depth="0.4" :style="layerStyle">
					<img id="image" :style="imgStyle" :src="infoData.listPic||image" width="1920" height="1080">
				</div>
			</div>
			<div class="head">
				<div class="logo-img">
					<img  :src="dark?'/image/logo/logo2.png':'/image/logo/logo1.png'" />
				</div>	
			</div>
			<div class="misk" :style="{ backgroundColor: 'rgba(176, 14, 37, 0.7)' }"></div>
			<div class="post">
				<div class="time">{{infoData.createTime}}</div>
				<div class="title">
					<nuxt-link :to="'/'+infoData.id">{{infoData.title}}</nuxt-link>
				</div>
				<div class="describe">{{infoData.excerpt}}</div>
			</div>
			<Menu />
		</div>

		<template v-if="list.length > 0">
			<div class="content">
				<div class="post" 
					v-for="(item, index) in list" 
					:key="index"
				>
					<div class="img-box" @click="toArticle(item.id)">
						<img 
							v-lazy="item.listPic" 
							src="/image/other/default.jpg" 
						/>
					</div>
					<div class="info">
						<div class="time">{{ item.createTime }}</div>
						<div class="title">
							<a @click="toArticle(item.id)">{{ item.title }}</a>
						</div>
						<div class="describe">{{ item.excerpt }}</div>
						<div class="stuff">
							<div v-for="(v, i) in infoIcon" :key="i">
								<i class="iconfont" :class="v.icon" ></i><span>{{ item[v.name]||0 }}</span>
								<span class="hint" :style="{ backgroundColor: v.color }">{{ v.text }}
								<i :style="{ borderTopColor: v.color }"></i></span>
							</div>
						</div>
					</div>
				</div>
				<div @click="loadMoreData" class="more">
					<LoadMore />
				</div>
			</div>
		</template>
		<template v-else>
			<div  class="content-null">
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
import config from "../config/index"
import tool from "@/utils/tool"
import { Mock } from "@/utils/mock"
export default {
	name: 'index',
	components: {
		Menu,
		Footer
	},
	data() {
		return {
			layerStyle: {},
			imgStyle: {},
			boxH: '100%',
			boxW: '100%',
			isNav: false,
			loading: true,
			serverImg:"/image/home/home.png",
			image: null,
            windowChange: () => {},

			infoIcon: [{
				icon: 'icon-icon3',
				name: 'likeTotal',
				text: '点赞',
				color: '#EF6D57'
			}, {
				icon: 'icon-liulan',
				name: 'read_counts',
				text: '浏览',
				color: '#50bcb6'
			}, {
				icon: 'icon-shoucang2',
				name: 'collectTotal',
				text: '收藏',
				color: '#ffa800'
			}]
		}
	},
    head () {
        return {
			title: this.userInfo?.webName,
			meta: [
                { hid: 'keywords', name: 'keywords', content: this.userInfo?.webSeo },
                { hid: 'description', name: 'description', content: this.userInfo?.webDescribe },
            ]
		}
	},
	computed: {
		userInfo() {
			return this.$store.getters.userInfo
		},
		dark(){
            return this.$store.getters.dark
        }
	},
	mounted(){
		this.gettersUserInfo()
		if (!this.userInfo) {
			return
		}
		
		this.update()
		this.loadImage()
		// Homepage info
		this.$store.commit('isIndex')
		this.$loadStatus(this.list)
	},
	beforeRouteEnter(to, from, next){
		next(vm => {
			vm.windowChange = vm.$debounce(vm.update, 100)
			window.onresize = () => vm.windowChange()
		})
	},
	beforeRouteLeave(to, from, next){
		window.onresize = null
		setTimeout(() => {
			this.isNav = false
			document.body.style.overflowY = ''
		}, 800)
        next()
    },
	methods: {
		gettersUserInfo(){
            let _userInfo = localStorage.getItem("_userInfo");
            if(!_userInfo){
                tool.initUserInfo()
            }
        },
		// Cover image init
		update(){
			this.boxH = document.documentElement.clientHeight + 'px';
			this.boxW = document.documentElement.clientWidth + 'px';
			this.coverLayer()
		},
		// Load Image
		loadImage() {
			const time = new Date().getTime()

			// Cover image loading is complete
			let img = new Image()
			img.src = this.serverImg
			
			img.onload = () => {
				// loading 效果最少 500ms
				let timer = 500 - new Date().getTime() + time
				timer = timer < 0 ? 0 : timer;
				setTimeout(() => {
					this.image = this.serverImg
					this.loading = false
				}, timer)
			}

			// Cover image init
			const scene = document.getElementById('scene')
			new Parallax(scene, {
				relativeInput: true,
				clipRelativeInput: true,
			})
		},
		// Cover image box calculation
		coverLayer(){
			let _w = parseInt(this.boxW), 
                _h = parseInt(this.boxH), 
				x, y, i,
				e = (_w >= 1000 || _h >= 1000) ? 1000 : 500;

            if (_w >= _h) {
                i = _w / e * 50;
                y = i;
                x = i * _w / _h;
            } else {
                i = _h / e * 50;
                x = i;
                y = i * _h / _w;
            }
			const style = {
                width: _w + x + 'px',
                height: _h + y + 'px',
                marginLeft: -0.5 * x + 'px',
                marginTop: -0.5 * y + 'px'
			}
			this.layerStyle = Object.assign({}, this.layerStyle, style);
            this.coverImg()
		},
		// Cover image size calculation
		coverImg(){
			const width = parseInt(this.layerStyle.width),
                  height = parseInt(this.layerStyle.height),
				  ratio = 1080 / 1920,
				  compute = height / width > ratio;

			const style = {
				width: compute ? (height / ratio + 'px') : `${width}px`,
				height: compute ? `${height}px` : (width * ratio + 'px')
			}
			style['left'] = (width - parseInt(style.width)) / 2 +'px'
			style['top'] = (height - parseInt(style.height)) / 2 +'px'

			this.imgStyle = Object.assign({}, this.imgStyle, style)
		},
		loadMoreData(){
			this.$loadMore({
			   url:"/web/article/page",
				paramsData:{
					p:config.phone,
					sort:"desc",
					order:"createTime",
					size:20
				}
			}, (res) => {
					this.list = this.list.concat(res.data.list)
			})
		},
		toArticle(id){
			this.$router.push(`/${id}`)
		},
		getDate(time) {
			let arr = time.split('-')
			let arr2 = arr[2].split(' ')
			return arr[1] + '月 ' + arr2[0] + ', ' + arr2[1]
		}
	},
	async asyncData(context){
		if (context.store.state.index) { // 防止重复加载 
			return
		}
		// const infoData = await context.$axios.get('/web/article/info',{
        //     params:{
        //         id:3,
        //         p:config.phone
        //     }
        // })
		const infoData =  Mock().get("/web/article/info")
		const { data } = Mock().get("/web/article/page")
		// const { data } = await context.$axios.get('/web/article/page',
		// {
		// 	 params:{
        //         p:config.phone,
		// 		sort:"desc",
		// 		order:"createTime",
		// 		page:1,
		// 		size:50
        //     }
		// }
		// )
		return { list: data ? data.list : null,infoData:infoData.data?infoData.data:{} }
	}
}
</script>
<style lang="scss" scoped>
.empty-data{
	position: absolute;
    top: 40%;
    left: 50%;
    font-size: 20px;
    letter-spacing: 4px;
	transform: translate(-50%);
	font-weight: 600;
    color: red;
}
.index{
	position: absolute;
	width: 100%;
	#scene{
		height: 100%;
		position: relative;
		overflow: hidden;
		#image{
			position: absolute;
			max-width: none;
			display: block;
		}
	}
	.cover{
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 99;
		overflow: hidden;
		.head{
			position: absolute;
			top: 70px;
			width: 50%;
			color: var(--color-bg-primary);
			z-index: 99999;
			padding: 0 40px 0 40px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.logo{
				.iconfont{
					font-size: 36px;
					cursor: pointer;
				}
			}
			.logo-img{
				width: 100px;
				height: 44px;
				position: relative;
				img{
					opacity: 1;
					width: 100%;
					position: absolute;
					cursor: pointer;
				}
			}
		}
		.cover-bg{
			width: 100%;
			height: 100%;
			img{
				position: absolute;
			}
		}
		.misk{
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background-color: rgba(176, 14, 37, 0.7);
			clip-path: polygon(0 0, 25% 0, 60% 100%, 0% 100%);
		}
		.post{
			position: absolute;
			top: 54%;
			left: 10%;
			color: #fff;
			width: 30%;
			transform: translateY(-50%);
			.time{
				font-size: 14px;
			}
			.title{
				margin: 15px 0 30px;
				a{
					font-size: 28px;
					color: #fff;
					text-decoration: none;
					cursor: pointer;
					&:hover{
						text-decoration: underline;
					}
				}
			}
			.describe{
				line-height: 22px;
			}
		}
	}
	.content{
		width: 1200px;
		margin: auto;
		position: relative;
		padding-bottom: 80px;
		text-align: center;
		&::after{
			content: '';
			width: 1px;
			height: calc(100% + 100px);
			position: absolute;
			top: -100px;
			left: 50%;
			background: var(--color-border-1);
			z-index: 0;
		}
		.more{
			margin-top: 90px;
			display: inline-block;
		}
		::v-deep .bottom-loading{
			position: relative;
			z-index: 999;
			.btn{
				border-radius: 0;
				display: inline-block;
				border: 1px solid var(--color-border-1);
				border-radius: 4px;
			}
		}
		
		.post{
			position: relative;
			margin-top: 100px;
			z-index: 1;
			.img-box{
				width: 680px;
				height: 440px;
				font-size: 0;
				display: inline-block;
				position: relative;
				cursor: pointer;
				z-index: 3;
				overflow: hidden;
				border-radius: 6px;
				border: 1px solid var(--color-border-2);
				img{
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
				&:hover img{
					opacity: 0.95;
				}
			}
			.info{
				width: 500px;
				height: 400px;
				position: absolute;
				top: 20px;
				padding: 80px 100px 0 80px;
				border: 1px solid var(--color-border-1);
				border-radius: 6px;
				.time{
					color: #999;
					font-size: 12px;
				}
				.title{
					margin-top: 8px;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
					transition: none;
					a{
						font-size: 24px;
						line-height: 30px;
						cursor: pointer;
						color: var(--color-text-1);
						transition: backgroundPosition 0s, color .3s;
						&:hover{
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
				}
				.describe{
					color: var(--color-text-2);
					font-size: 14px;
					line-height: 22px;
					margin-top: 10px;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden; 
				}
				.stuff{
					font-size: 12px;
					color: #999;
					position: absolute;
					bottom: 80px;
					left: 80px;
					display: flex;
					div{
						padding: 6px;
						font-size: 12px;
						display: flex;
						align-items: center;
						position: relative;
						transition: none;
						&:nth-of-type(1):hover{
							color: #EF6D57;
						}
						&:nth-of-type(2):hover{
							color: #50bcb6;
						}
						&:nth-of-type(3):hover{
							color: #ffa800;
						}
						.iconfont{
							margin-right: 4px;
							margin-top: 0px;
							display: inline-block;
							transition: none;
							&.icon-like{
								font-size: 14px;
								margin-top: -1px;
							}
							&.icon-text{
								font-size: 17px;
								margin-top: -2px;
							}
						}
						.hint{
							position: absolute;
							bottom: 100%;
							left: 50%;
							transform: translate(-50%, -5px);
							color: #fff;
							font-size: 12px;
							border-radius: 10px;
							padding: 5px 14px;
							white-space: nowrap;
							opacity: 0;
							visibility: hidden;
							i{
								border: 5px solid transparent;
								position: absolute;
								left: 50%;
								bottom: -10px;
								transform: translateX(-50%);
							}
						}
						&:hover .hint{
							opacity: 1;
							visibility: visible;
						}
					}
				}
			}
			&:nth-child(odd){
				text-align: left;
				.info{
					left: 660px;
				}
			}
			&:nth-child(even){
				text-align: right;
				.info{
					text-align: left;
					right: 660px;
				}
			}
		}
	}
	.content-null {
		text-align: center;
		padding: 40px;
		font-size: 16px;
		color: #464646;
		font-weight: 600;
		letter-spacing: 4px;
	}
	.foot{
		text-align: center;
		a{
			margin: 0 auto;
			font-size: 13px;
			color: var(--color-text-2);
			text-decoration: none;
			display: inline-block;
			padding: 1px 0 2px;
		}
	}
	
	@media screen and (max-width: 1200px){
		.content{
			width: 900px;
			.post{
				.img-box{
					width: 480px;
					height: 310px;
				}
				.info{
					top: 10px;
					width: 420px;
					height: 290px;
					padding: 50px 60px 0 60px;
					.stuff{
						bottom: 50px;
						left: 60px;
					}
					.title{
						margin-top: 10px;
						line-height: 25px;
					}
					.describe{
						-webkit-line-clamp: 2;
					}
				}
				&:nth-child(odd) .info{
					left: 450px;
				}
				&:nth-child(even) .info{
					right: 450px;
				}
			}
		}
	}
	@media screen and (max-width: 900px){
		.cover{
			.misk{
				clip-path: polygon(0 0, 220px 0, 700px 100%, 0% 100%);
			}
			.post{
				width: 40%;
				.title a{
					font-size: 22px;
				}
			}
		}
		.content{
			width: 100%;
			.post{
				margin-top: 60px;
				background: var(--color-bg-primary);
				border-bottom: 1px solid var(--color-border-1);
				.img-box{
					width: 100%;
					height: auto;
					display: block;
					text-align: center;
					border: none;
					img{
						width: 680px;
						max-width: 100%;
					}
				}
				.info{
					position: static;
					width: 96%;
					padding: 40px 20px 40px;
					margin: auto;
					border: none;
					background: var(--color-bg-primary);
					height: auto;
					.stuff{
						position: static;
						margin: 20px 0 0 -6px;
					}
				}
			}
		}
	}
	@media screen and (max-width: 780px){
		.cover{
			.head{
				top: 40px;
			}
			.misk{
				clip-path: none;
			}
			.post{
				bottom: 8%;
				left: 5%;
				top: auto;
				width: 70%;
				transform: none;
			}
			.cover-bg{
				img{
					position: absolute;
					left: 50%;
					top: 0;
					height: 100%;
					width: auto;
					transform: translateX(-50%);
				}
			}
		}
		.content{
			width: 100%;
			.post{
				.img-box{
					width: 100%;
					height: auto;
					border-radius: 0;
				}
			}
		}
	}
	@media screen and (max-width: 480px){
		.cover{
			.head{
				padding: 0 24px 0 20px;
				.logo-img{
					width: 80px;
					img{
						top: 6px
					}
				}
			}
			.post {
				.time{
					display: none;
				}
				.title{
					margin-bottom: 10px;
				}
				.describe{
					font-size: 13px;
					line-height: 20px;
				}
			}
		}
	}
}
.container.navActive{
	.logo{
		color: #333;
	}
	.cover .head .logo-img img{
		opacity: 0;
		&:last-child{
			opacity: 1;
		}
	}
	.nav{
		top: 0;
	}
}
</style>