const template = `
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
                    v-for="game in getPlatformGames(platform, 4)" 
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
        viewPlatform(platform) {
            this.$router.push(`/platform/${platform}`);
        },
        getPlatformGames(platform, limit = null) {
            const games = this.gameStore.getGamesByPlatform(platform);
            return limit ? games.slice(0, limit) : games;
        },
        getPlatformGameCount(platform) {
            return this.gameStore.getGamesByPlatform(platform).length;
        }
    },
    async mounted() {
        await this.gameStore.loadGames();
    }
};
