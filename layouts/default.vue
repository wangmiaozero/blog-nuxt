<template>
	<div class="page">
		<slot />
	</div>
</template>

<script>
import { watch } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useMainStore } from '@/stores/main'

export default {
	setup() {
		const mainStore = useMainStore()
		const colorMode = useColorMode()
		mainStore.setDark(colorMode.value === 'dark')
		if (import.meta.client) {
			watch(
				() => colorMode.value,
				(value) => {
					mainStore.setDark(value === 'dark')
				},
				{ immediate: true },
			)
		}
	},
	data() {
		return {
			includeArr: ['index', 'about']
		}
	},
	computed: {
		...mapState(useMainStore, ['dark']),
	},
	methods: {
		...mapActions(useMainStore, ['toggleDark']),
		btn() {
			this.toggleDark()
		},
	},
}
</script>

<style scoped>
.page {
	min-height: 100vh;
	background: var(--color-bg-primary);
}

.btn {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 9999999999999999;
	color: var(--color-text-1);
}
</style>
