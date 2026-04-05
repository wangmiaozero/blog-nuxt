<template>
    <div class="bottom-loading">
        <div class="loader" v-if="status == 'loading'">
            <div class="dot" v-for="i in 5" :key="i"></div>
        </div>
        <div class="btn" v-else-if="status == 'nomore'">呜呜，没有更多了~~</div>
        <div class="btn more" v-else @click="hanledMore">加载更多</div>
    </div>
</template>

<script>
import { mapState } from "pinia"
import { useMainStore } from "@/stores/main"

export default {
	computed: {
		...mapState(useMainStore, ["status"]),
	},
	methods: {
		hanledMore(){
			this.$emit("more")
		}
	}
}
</script>

<style lang='scss' scoped>
.bottom-loading{
    text-align: center;
    .btn{
        height: 34px;
        line-height: 36px;
        padding: 0 36px;
        color: var(--color-text-3);
        background: var(--color-bg-primary);
        z-index: 9;
        letter-spacing: 2px;
        border-radius: 4px;
        &.more{
            cursor: pointer;
            &:hover{
                color: #fff;
                background: var(--color-active);
                border-color: var(--color-active);
            }
        }
    }
}
.loader {
    height: 34px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    z-index: 99;
}
.dot {
	width: 15px;
	height: 15px;
	background: var(--color-bar);
	border-radius: 100%;
	display: inline-block;
	animation: slide 1s infinite;
}
.dot:nth-child(1) {
	animation-delay: 0.1s;
	background: var(--color-bar);
}
.dot:nth-child(2) {
	animation-delay: 0.2s;
	background: var(--color-active);
}
.dot:nth-child(3) {
	animation-delay: 0.3s;
	background: var(--color-bar);
}
.dot:nth-child(4) {
	animation-delay: 0.4s;
	background: var(--color-active);
}
.dot:nth-child(5) {
	animation-delay: 0.5s;
	background: var(--color-bar);
}
@-moz-keyframes slide {
	0% {
		transform: scale(1);
	}
	50% {
		opacity: 0.3;
		transform: scale(2);
	}
	100% {
		transform: scale(1);
	}
}
@-webkit-keyframes slide {
	0% {
		transform: scale(1);
	}
	50% {
		opacity: 0.3;
		transform: scale(2);
	}
	100% {
		transform: scale(1);
	}
}
@-o-keyframes slide {
	0% {
		transform: scale(1);
	}
	50% {
		opacity: 0.3;
		transform: scale(2);
	}
	100% {
		transform: scale(1);
	}
}
@keyframes slide {
	0% {
		transform: scale(1);
	}
	50% {
		opacity: 0.3;
		transform: scale(2);
	}
	100% {
		transform: scale(1);
	}
}
</style>