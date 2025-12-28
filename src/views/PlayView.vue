<template>
  <!-- Game Play Page -->
  <div class="page play-page">
    <div class="container">
      <!-- Emulator Container -->
      <div class="emulator-container">
        <iframe 
          v-if="iframeSrc"
          id="game-iframe" 
          :src="iframeSrc" 
          class="game-screen"
          frameborder="0"
          allowfullscreen
          allow="autoplay; fullscreen"
        ></iframe>
        <div v-else class="game-screen">
          <div class="loading-screen">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading {{ gameStore.currentGame?.name }}...</div>
            <div class="loading-progress">Initializing emulator...</div>
          </div>
        </div>
      </div>

      <!-- Game Controls Component (includes footer) -->
      <GameControls 
        :current-game="gameStore.currentGame"
        @back-to-home="backToHome"
        @toggle-fullscreen="toggleFullscreen"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import GameControls from '@/components/GameControls.vue'
import { uploadFile, downloadFile } from '@/utils/file'

const route = useRoute()
const router = useRouter()
const gameStore = useGameStore()

const iframeSrc = ref(null)
let messageHandler = null
let gameKeyHandler = null
let keymapsData = null

const loadKeymaps = async () => {
  if (keymapsData) return keymapsData
  
  try {
    const baseURL = import.meta.env.BASE_URL || '/arcade-games/'
    const response = await fetch(`${baseURL}data/keymaps.json`)
    
    if (response.ok) {
      keymapsData = await response.json()
      return keymapsData
    }
    console.warn('Keymaps file not found')
    return null
  } catch (error) {
    console.error('Error loading keymaps:', error)
    return null
  }
}

const loadKeymap = async (platform) => {
  try {
    const keymaps = await loadKeymaps()
    if (!keymaps) return null
    
    const platformKey = platform.toLowerCase().replace(/\s+/g, '-')
    
    if (keymaps[platformKey]) {
      return keymaps[platformKey]
    }
    console.warn(`Keymap not found for platform: ${platform}`)
    return null
  } catch (error) {
    console.error('Error loading keymap:', error)
    return null
  }
}

const initializeEmulator = (game) => {
  // Check if this is a Windows/DOS game (ISO file)
  const isWindowsDOS = game.platform?.toLowerCase() === 'windows' || 
                       game.romFile?.toLowerCase().endsWith('.iso')
  
  if (isWindowsDOS) {
    // Use DOS emulator for Windows/ISO files
    const params = new URLSearchParams({
      isoFile: game.romFile,
      gameName: game.name,
      baseURL: window.baseURL || ''
    })
    
    iframeSrc.value = `${window.baseURL}/dos-emulator.html?${params.toString()}`
  } else {
    // Use regular EmulatorJS for other platforms
    const params = new URLSearchParams({
      romFile: game.romFile,
      core: game.core,
      gameName: game.name,
      color: game.color || '#0064ff',
      baseURL: window.baseURL || '',
      emulatorJSPath: window.emulatorJSPath || 'data'
    })
    
    // Add keymap data if available
    if (game.keymap) {
      params.append('keymap', JSON.stringify(game.keymap))
    }
    
    iframeSrc.value = `${window.baseURL}/emulator.html?${params.toString()}`
  }
}

const setupMessageListener = () => {
  messageHandler = (event) => {
    // Only accept messages from our iframe
    const iframe = document.getElementById('game-iframe')
    console.log('Received message from iframe:', event.data)
    if (!iframe || event.source !== iframe.contentWindow) {
      return
    }

    switch (event.data.type) {
      case 'gameLoaded':
        showNotification(`${event.data.gameName} loaded successfully!`, 'success')
        break
      
      case 'dosReady':
        showNotification(`${event.data.gameName} - DOS emulator ready`, 'success')
        break
      
      case 'error':
        showNotification(event.data.message, 'error')
        break
      
      case 'loadStateRequested':
        handleLoadStateRequest()
        break
      
      case 'stateSaved':
        handleStateSaved(event.data)
        break
      
      case 'stateLoaded':
        showNotification('State loaded from file', 'success')
        break
    }
  }

  window.addEventListener('message', messageHandler)
}

const handleLoadStateRequest = () => {
  // Trigger file upload dialog
  uploadFile('.state', (data) => {
    try {
      const iframe = document.getElementById('game-iframe')
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'loadState',
          stateData: Array.from(new Uint8Array(data))
        }, '*')
      }
    } catch (error) {
      console.error('Error loading state:', error)
      showNotification('Failed to load state file', 'error')
    }
  })
}

const handleStateSaved = (data) => {
  try {
    const stateArray = new Uint8Array(data.state)
    const fileName = `${data.gameName}_${new Date().getTime()}_${data.coreName}.state`
    downloadFile(fileName, stateArray, 'application/octet-stream')
  } catch (error) {
    console.error('Error saving state:', error)
    showNotification('Failed to save state', 'error')
  }
}

const toggleFullscreen = () => {
  const iframe = document.getElementById('game-iframe')
  if (iframe) {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      iframe.requestFullscreen().catch(err => {
        console.log('Error attempting to enable fullscreen:', err)
        showNotification('Fullscreen not supported', 'warning')
      })
    }
  }
}

const showNotification = (message, type = 'info') => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = `notification notification-${type}`
  notification.textContent = message
  
  // Add to page
  document.body.appendChild(notification)
  
  // Animate in
  setTimeout(() => {
    notification.classList.add('show')
  }, 10)
  
  // Remove after delay
  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

const backToHome = () => {
  router.push('/')
}

onMounted(async () => {
  // Scroll to top of page
  window.scrollTo(0, 0)
  
  await gameStore.loadGames()

  // Check if we have a game ID in the route params
  const gameId = route.params.gameId

  if (gameId && !gameStore.currentGame) {
    const game = gameStore.getGameById(gameId)

    if (game) {
      // Load keymap for the game's platform
      game.keymap = await loadKeymap(game.platform)
      gameStore.setCurrentGame(game)
      await initializeEmulator(game)
    } else {
      // Game not found, redirect to home
      router.push('/')
    }
  }

  // Listen for messages from iframe
  setupMessageListener()
})

onBeforeUnmount(() => {
  // Remove event listener when component is destroyed
  if (gameKeyHandler) {
    window.removeEventListener('keydown', gameKeyHandler, true)
  }
  if (messageHandler) {
    window.removeEventListener('message', messageHandler)
  }
  gameStore.setCurrentGame(null)
})
</script>
