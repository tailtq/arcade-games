<template>
  <div id="app" v-cloak>
    <!-- Navigation Header -->
    <AppHeader />
    <RouterView />
    <AppFooter />
    <ControlModal />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ControlModal from '@/components/ControlModal.vue'
</script>

<style>
@import '/css/styles.css';
</style>
