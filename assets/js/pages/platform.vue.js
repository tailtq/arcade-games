const template = `
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
`;

import { useGameStore } from '../stores/gameStore.js';

export default {
    name: 'Platform',
    template: template,
    setup() {
        const gameStore = useGameStore();
        
        return {
            gameStore
        };
    },
    computed: {
        platformName() {
            const platform = this.$route.params.platform;
            return platform ? platform.toUpperCase() : '';
        },
        platformGames() {
            const platform = this.$route.params.platform;
            return this.gameStore.getGamesByPlatform(platform);
        }
    },
    methods: {
        playGame(game) {
            this.$router.push(`/play/${game.id}`);
        }
    },
    async mounted() {
        await this.gameStore.loadGames();
    }
};
