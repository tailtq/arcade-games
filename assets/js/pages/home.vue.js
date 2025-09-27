const template = `
<!-- Game List Page -->
<div class="page games-page">
    <div class="container">
        <div class="page-header">
            <h2>🎮 Game Library</h2>
            <p>Choose from our collection of classic retro games</p>
        </div>

        <!-- System Filter -->
        <div class="filters">
            <button 
                @click="gameStore.setSelectedSystem('all')" 
                :class="{ active: gameStore.selectedSystem === 'all' }"
                class="filter-btn"
            >
                All Systems
            </button>
            <button 
                v-for="system in gameStore.availableSystems" 
                :key="system"
                @click="gameStore.setSelectedSystem(system)" 
                :class="{ active: gameStore.selectedSystem === system }"
                class="filter-btn"
            >
                {{ system.toUpperCase() }}
            </button>
        </div>

        <!-- Games Grid -->
        <div class="games-grid">
            <div 
                v-for="game in gameStore.filteredGames" 
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
                    <div class="game-meta">
                        <span class="game-system">{{ game.system.toUpperCase() }}</span>
                        <span v-if="game.year" class="game-year">{{ game.year }}</span>
                        <span v-for="genre in game.genre" :key="genre" class="game-genre">
                            {{ genre }}
                        </span>
                    </div>
                    <div class="game-actions">
                        <button class="play-btn">▶️ Play Now</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="gameStore.filteredGames.length === 0" class="empty-state">
            <div class="empty-icon">🎯</div>
            <h3>No games found</h3>
            <p>Try selecting a different system or check back later for more games.</p>
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
    }
};
