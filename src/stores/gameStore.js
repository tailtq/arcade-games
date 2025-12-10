import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentGame: null,
    selectedPlatform: 'all',
    games: [],
    gameLoaded: false,
    showControlsModal: false,
    currentPage: 'home',
    isLoadingGames: false
  }),
  
  getters: {
    availablePlatforms: (state) => {
      const platforms = [...new Set(state.games.map(game => game.platform))]
      console.log(platforms.sort())
      return platforms.sort()
    },
    
    filteredGames: (state) => {
      if (state.selectedPlatform === 'all') {
        return state.games
      }
      return state.games.filter(game => game.platform === state.selectedPlatform)
    },
    
    getGameById: (state) => {
      return (id) => state.games.find(game => game.id === id)
    },
    
    gamesByPlatform: (state) => {
      const grouped = {}
      state.games.forEach(game => {
        if (!grouped[game.platform]) {
          grouped[game.platform] = []
        }
        grouped[game.platform].push(game)
      })
      return grouped
    },
    
    getGamesByPlatform: (state) => {
      return (platform) => state.games.filter(game => game.platform === platform)
    }
  },
  
  actions: {
    async loadGames() {
      if (this.games.length > 0) return // Already loaded
      
      this.isLoadingGames = true
      try {
        const baseURL = import.meta.env.BASE_URL || '/arcade-games/'
        const response = await fetch(`${baseURL}data/games.json`)
        const games = await response.json()
        this.games = games
      } catch (error) {
        console.error('Error loading games:', error)
      } finally {
        this.isLoadingGames = false
      }
    },
    
    setCurrentGame(game) {
      this.currentGame = game
    },
    
    setSelectedPlatform(platform) {
      this.selectedPlatform = platform
    },
    
    setGameLoaded(loaded) {
      this.gameLoaded = loaded
    },
    
    setShowControlsModal(show) {
      this.showControlsModal = show
    },
    
    setCurrentPage(page) {
      this.currentPage = page
    },
    
    addGame(game) {
      this.games.push(game)
    },
    
    removeGame(gameId) {
      const index = this.games.findIndex(game => game.id === gameId)
      if (index > -1) {
        this.games.splice(index, 1)
      }
    }
  }
})
