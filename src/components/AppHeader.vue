<template>
  <header class="header">
    <div class="container">
      <h1 class="logo" @click="backToHome">
        <span class="logo-icon" style="margin-right: 10px;">🎮</span>
        Arcade Games
      </h1>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const backToHome = () => {
  router.push('/')
}
</script>
