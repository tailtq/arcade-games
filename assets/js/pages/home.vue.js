const template = `
<!-- Game List Page -->
<div class="page games-page">
    <div class="container">
        <div class="page-header">
            <h2>🎮 Game Library</h2>
            <p>Choose from our collection of classic retro games</p>
        </div>

        <!-- System Sections -->
        <div v-for="system in gameStore.availableSystems" :key="system" class="system-section">
            <div class="section-header">
                <h3 class="section-title">{{ system.toUpperCase() }}</h3>
                <a @click.prevent="viewSystem(system)" class="view-more-link" href="#">
                    View All {{ getSystemGameCount(system) }} Games →
                </a>
            </div>

            <!-- Games Grid -->
            <div class="games-grid">
                <div 
                    v-for="game in getSystemGames(system, 4)" 
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
`;

import { useGameStore } from '../stores/gameStore.js';

export default {
    name: 'Home',
    template: template,
    setup() {
        const gameStore = useGameStore();
        
        return {
            gameStore
        };
    },
    methods: {
        playGame(game) {
            // Navigate to play page
            this.$router.push(`/play/${game.id}`);
        },
        viewSystem(system) {
            this.$router.push(`/system/${system}`);
        },
        getSystemGames(system, limit = null) {
            const games = this.gameStore.getGamesBySystem(system);
            return limit ? games.slice(0, limit) : games;
        },
        getSystemGameCount(system) {
            return this.gameStore.getGamesBySystem(system).length;
        }
    },
    async mounted() {
        await this.gameStore.loadGames();
    }
};
