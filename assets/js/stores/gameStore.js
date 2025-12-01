export const useGameStore = Pinia.defineStore('game', {
    state: () => ({
        currentGame: null,
        selectedSystem: 'all',
        games: [],
        gameLoaded: false,
        showControlsModal: false,
        currentPage: 'home',
        isLoadingGames: false
    }),
    getters: {
        availableSystems: (state) => {
            const systems = [...new Set(state.games.map(game => game.system))];
            return systems.sort();
        },
        filteredGames: (state) => {
            if (state.selectedSystem === 'all') {
                return state.games;
            }
            return state.games.filter(game => game.system === state.selectedSystem);
        },
        getGameById: (state) => {
            return (id) => state.games.find(game => game.id === id);
        },
        gamesBySystem: (state) => {
            const grouped = {};
            state.games.forEach(game => {
                if (!grouped[game.system]) {
                    grouped[game.system] = [];
                }
                grouped[game.system].push(game);
            });
            return grouped;
        },
        getGamesBySystem: (state) => {
            return (system) => state.games.filter(game => game.system === system);
        }
    },
    actions: {
        async loadGames() {
            if (this.games.length > 0) return; // Already loaded
            
            this.isLoadingGames = true;
            try {
                const response = await fetch('data/games.json');
                const games = await response.json();
                this.games = games;
            } catch (error) {
                console.error('Error loading games:', error);
            } finally {
                this.isLoadingGames = false;
            }
        },
        setCurrentGame(game) {
            this.currentGame = game;
        },
        setSelectedSystem(system) {
            this.selectedSystem = system;
        },
        setGameLoaded(loaded) {
            this.gameLoaded = loaded;
        },
        setShowControlsModal(show) {
            this.showControlsModal = show;
        },
        setCurrentPage(page) {
            this.currentPage = page;
        },
        addGame(game) {
            this.games.push(game);
        },
        removeGame(gameId) {
            const index = this.games.findIndex(game => game.id === gameId);
            if (index > -1) {
                this.games.splice(index, 1);
            }
        }
    }
});
