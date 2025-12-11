<template>
  <div id="app" v-cloak>
    <!-- Navigation Header -->
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style>
@import '/css/style.css';
</style>
