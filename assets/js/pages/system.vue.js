const template = `
<!-- System Games Page -->
<div class="page system-page">
    <div class="container">
        <div class="page-header">
            <h2>🎮 {{ systemName }} Games</h2>
            <p>{{ systemGames.length }} games available</p>
        </div>

        <!-- Games Grid -->
        <div class="games-grid">
            <div 
                v-for="game in systemGames" 
                :key="game.id"
                @click="playGame(game)"
                class="game-card"
            >
                <div class="game-image">
                    <img v-if="game.screenshot" :src="game.screenshot" :alt="game.name" />
                    <div v-else class="game-placeholder">🎮</div>
                </div>
                <div class="game-info">
                    <h3 class="game-title">{{ game.name }} <span class="system-inline">({{ game.system.toUpperCase() }})</span></h3>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="systemGames.length === 0" class="empty-state">
            <div class="empty-icon">🎯</div>
            <h3>No games found</h3>
            <p>No games available for this system yet.</p>
        </div>
    </div>
</div>
`;

import { useGameStore } from '../stores/gameStore.js';

export default {
    name: 'System',
    template: template,
    setup() {
        const gameStore = useGameStore();
        
        return {
            gameStore
        };
    },
    computed: {
        systemName() {
            const system = this.$route.params.system;
            return system ? system.toUpperCase() : '';
        },
        systemGames() {
            const system = this.$route.params.system;
            return this.gameStore.getGamesBySystem(system);
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
