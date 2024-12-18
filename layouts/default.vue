<template>
	<div>
		<!-- <div class="btn" @click="btn">换肤</div> -->
		<nuxt class="page" keep-alive :keep-alive-props="{include: includeArr}"/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			includeArr: ['index', 'about'] // 缓存页面
		}
	},
	   computed: {
        dark(){
            return this.$store.getters.dark
        }

    },
	methods: {
		btn(){
			this.$colorMode.preference = this.dark == 'dark' ? '' : 'dark'
		}
	}
}
</script>

<style scoped>
.btn{
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 9999999999999999;
	color: var(--color-text-1);
}
</style>