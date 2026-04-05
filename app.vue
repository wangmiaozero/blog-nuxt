<template>
  <NuxtLayout>
    <LoadingTab />
    <NuxtPage keepalive :keepalive-include="['index', 'about']" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import LoadingTab from '~/components/LoadingTab.vue'
</script>
