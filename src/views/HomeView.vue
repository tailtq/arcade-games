<template>
  <!-- Game List Page -->
  <div class="page games-page">
    <div class="container">
      <div class="page-header">
        <h2>🎮 Game Library</h2>
        <p>Choose from our collection of classic retro games</p>
      </div>

      <!-- Platform Sections -->
      <div v-for="platform in gameStore.availablePlatforms" :key="platform" class="platform-section">
        <div class="section-header">
          <h3 class="section-title">{{ platform.toUpperCase() }}</h3>
          <a @click.prevent="viewPlatform(platform)" class="view-more-link" href="#">
            View All {{ getPlatformGameCount(platform) }} Games →
          </a>
        </div>

        <!-- Games Grid -->
        <div class="games-grid">
          <div 
            v-for="game in getPlatformGames(platform)" 
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
      </div>

      <!-- Empty State -->
      <div v-if="gameStore.games.length === 0 && !gameStore.isLoadingGames" class="empty-state">
        <div class="empty-icon">🎯</div>
        <h3>No games found</h3>
        <p>Check back later for more games.</p>
      </div>

      <!-- Loading State -->
      <div v-if="gameStore.isLoadingGames" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading games...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const router = useRouter()
const gameStore = useGameStore()

const playGame = (game) => {
  router.push(`/play/${game.id}`)
}

const viewPlatform = (platform) => {
  router.push(`/platform/${platform}`)
}

const getPlatformGames = (platform, limit = null) => {
  const games = gameStore.getGamesByPlatform(platform)
  return limit ? games.slice(0, limit) : games
}

const getPlatformGameCount = (platform) => {
  return gameStore.getGamesByPlatform(platform).length
}

onMounted(async () => {
  await gameStore.loadGames()
})
</script>
