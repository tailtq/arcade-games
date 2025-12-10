<template>
  <!-- Platform Games Page -->
  <div class="page platform-page">
    <div class="container">
      <div class="page-header">
        <h2>🎮 {{ platformName }} Games</h2>
        <p>{{ platformGames.length }} games available</p>
      </div>

      <!-- Games Grid -->
      <div class="games-grid">
        <div 
          v-for="game in platformGames" 
          :key="game.id"
          @click="playGame(game)"
          class="game-card"
        >
          <div class="game-image">
            <img v-if="game.screenshot" :src="game.screenshot" :alt="game.name" />
            <div v-else class="game-placeholder">🎮</div>
          </div>
          <div class="game-info">
            <h3 class="game-title">{{ game.name }}</h3>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="platformGames.length === 0" class="empty-state">
        <div class="empty-icon">🎯</div>
        <h3>No games found</h3>
        <p>No games available for this platform yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const route = useRoute()
const router = useRouter()
const gameStore = useGameStore()

const platformName = computed(() => {
  const platform = route.params.platform
  return platform ? platform.toUpperCase() : ''
})

const platformGames = computed(() => {
  const platform = route.params.platform
  return gameStore.getGamesByPlatform(platform)
})

const playGame = (game) => {
  router.push(`/play/${game.id}`)
}

onMounted(async () => {
  await gameStore.loadGames()
})
</script>
