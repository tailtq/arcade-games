const template = `
<!-- Unified Game Footer with Controls -->
<div v-if="currentGame" class="game-footer">
    <button @click="$emit('back-to-home')" class="back-btn">← Back to Games</button>
    
    <div class="game-title-section">
        <h2>{{ currentGame.name }}</h2>
        <div class="game-meta">
            <span class="platform-badge">{{ currentGame.platform.toUpperCase() }}</span>
        </div>
    </div>
    
    <!-- Controls Display (Always Visible) -->
    <div v-if="currentGame.keymap" class="controls-minimal">
        <div class="controls-chips">
            <!-- Player 1 -->
            <div v-if="currentGame.keymap['0']" class="player-chip">
                <span class="player-label">Player 1</span>
                <div class="chip-controls">
                    <div v-for="category in getControlsByCategory(0)" :key="category.name" class="control-category">
                        <span class="category-label">{{ category.name }}:</span>
                        <span v-for="control in category.controls" :key="control.label" class="control-chip">
                            {{ control.label }}: <kbd>{{ control.key }}</kbd>
                        </span>
                    </div>
                </div>
            </div>
            <!-- Player 2 -->
            <div v-if="currentGame.keymap['1']" class="player-chip">
                <span class="player-label">Player 2</span>
                <div class="chip-controls">
                    <div v-for="category in getControlsByCategory(1)" :key="category.name" class="control-category">
                        <span class="category-label">{{ category.name }}:</span>
                        <span v-for="control in category.controls" :key="control.label" class="control-chip">
                            {{ control.label }}: <kbd>{{ control.key }}</kbd>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="game-controls">
        <button @click="$emit('toggle-fullscreen')" class="control-btn">⌞ ⌝ Fullscreen</button>
    </div>
</div>
`;

export default {
    name: 'GameControls',
    template: template,
    props: {
        currentGame: {
            type: Object,
            default: null
        }
    },
    methods: {
        getControlsByCategory(playerIndex) {
            const game = this.currentGame;
            if (!game || !game.keymap || !game.keymap[playerIndex.toString()]) {
                return [];
            }

            const keymap = game.keymap[playerIndex.toString()];
            if (!keymap || typeof keymap !== 'object') {
                return [];
            }
            
            // Define all control indices by category
            const categories = {
                movement: {
                    name: 'Movement',
                    indices: {
                        '4': '↑',
                        '5': '↓', 
                        '6': '←',
                        '7': '→'
                    }
                },
                actions: {
                    name: 'Actions',
                    indices: {
                        '8': 'A',
                        '0': 'B',
                        '9': 'C',
                        '1': 'D'
                    }
                },
                system: {
                    name: 'System',
                    indices: {
                        '3': 'Start',
                        '2': 'Select'
                    }
                },
                shoulder: {
                    name: 'Shoulder',
                    indices: {
                        '10': 'L1',
                        '11': 'R1',
                        '12': 'L2',
                        '13': 'R2'
                    }
                }
            };

            const result = [];

            try {
                Object.keys(categories).forEach(categoryKey => {
                    const category = categories[categoryKey];
                    const controls = [];
                    
                    Object.keys(category.indices).forEach(index => {
                        if (keymap[index] && keymap[index].value) {
                            controls.push({
                                label: category.indices[index],
                                key: this.formatKeyName(keymap[index].value)
                            });
                        }
                    });
                    
                    // Only add category if it has controls
                    if (controls.length > 0) {
                        result.push({
                            name: category.name,
                            controls: controls
                        });
                    }
                });
            } catch (error) {
                console.error('Error getting controls by category:', error);
                return [];
            }

            return result;
        },
        formatKeyName(key) {
            // Format key names for better display
            const keyMap = {
                'up arrow': '↑',
                'down arrow': '↓',
                'left arrow': '←',
                'right arrow': '→',
                'enter': 'Enter',
                'shift': 'Shift',
                'space': 'Space',
                'tab': 'Tab'
            };
            
            return keyMap[key.toLowerCase()] || key.toUpperCase();
        }
    }
};
