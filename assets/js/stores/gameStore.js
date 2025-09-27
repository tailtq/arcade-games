export const useGameStore = Pinia.defineStore('game', {
    state: () => ({
        currentGame: null,
        selectedSystem: 'all',
        games: [
            {
                id: 'mslug2',
                name: 'Metal Slug 2',
                system: 'neogeo',
                year: 1998,
                core: 'fbneo',
                romFile: 'mslug2.zip',
                screenshot: 'assets/images/mslug2.jpg',
                genre: ['Action'],
                color: '#74390A'
            },
            {
                id: 'mslug3',
                name: 'Metal Slug 3',
                system: 'neogeo',
                year: 1999,
                core: 'fbneo',
                romFile: 'mslug3.zip',
                genre: ['Action'],
                screenshot: 'assets/images/mslug3.jpg',
                color: '#74390A'
            },
            {
                id: 'mslug5',
                name: 'Metal Slug 5',
                system: 'neogeo',
                year: 2000,
                core: 'fbneo',
                romFile: 'mslug5.zip',
                genre: ['Action'],
                screenshot: 'assets/images/mslug5.jpg',
                color: '#74390A'
            },
            {
                id: 'double-dragon',
                name: 'Double Dragon',
                system: 'neogeo',
                year: 2000,
                core: 'fbneo',
                romFile: 'doubledr.zip',
                genre: ['Action'],
                screenshot: 'assets/images/double-dragon.jpg',
                color: '#74390A'
            },
        ],
        gameLoaded: false,
        showControlsModal: false,
        currentPage: 'home'
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
        }
    },
    actions: {
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
