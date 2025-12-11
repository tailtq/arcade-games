import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentGame: null,
    selectedPlatform: 'all',
    games: [],
    showControlsModal: false,
    isLoadingGames: false
  }),
  
  getters: {
    availablePlatforms: (state) => {
      const platforms = [...new Set(state.games.map(game => game.platform))]
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
      return (platform, popular = null) => {
        let games = state.games.filter(game => game.platform === platform)
        if (popular !== null) {
          games = games.filter(game => game.popular === popular)
        }
        games.sort((a, b) => a.name.localeCompare(b.name))
        return games
      }
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
    
    setShowControlsModal(show) {
      this.showControlsModal = show
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
