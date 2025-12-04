const template = `
<!-- Game Play Page -->
<div v-if="gameStore.currentPage === 'play'" class="page play-page">
    <div class="container">
        <!-- Emulator Container -->
        <div class="emulator-container">
            <div id="game" class="game-screen">
                <div v-if="!gameStore.gameLoaded" class="loading-screen">
                    <div class="loading-spinner"></div>
                    <div class="loading-text">Loading {{ gameStore.currentGame?.name }}...</div>
                    <div class="loading-progress">Initializing emulator...</div>
                </div>
            </div>
        </div>

        <div class="game-footer" v-if="gameStore.currentGame">
            <button @click="backToHome" class="back-btn">← Back to Games</button>
            <div class="game-title-section">
                <h2>{{ gameStore.currentGame.name }}</h2>
                <div class="game-meta">
                    <span class="platform-badge">{{ gameStore.currentGame.platform.toUpperCase() }}</span>
                </div>
            </div>
            <div class="game-controls">
                <button @click="toggleControls" class="control-btn">⌨️ Controls</button>
                <button @click="toggleFullscreen" class="control-btn">⌞ ⌝ Fullscreen</button>
            </div>
        </div>
    </div>
</div>
`;

import { useGameStore } from '../stores/gameStore.js';
import navigationUtils from '../utils/navigation.js';
import fileUtils from '../utils/file.js';

export default {
    name: 'Detail',
    template: template,
    setup() {
        const gameStore = useGameStore();
        
        return {
            gameStore,
        };
    },
    async mounted() {
        await this.gameStore.loadGames();

        // Check if we have a game ID in the route params
        const gameId = this.$route.params.gameId;

        if (gameId && !this.gameStore.currentGame) {
            const game = this.gameStore.getGameById(gameId);

            if (game) {
                this.gameStore.setCurrentGame(game);
                this.gameStore.setCurrentPage('play');

                // Initialize emulator after a short delay to ensure DOM is ready
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.initializeEmulator(game);
                    }, 100);
                });
            } else {
                // Game not found, redirect to home
                this.$router.push('/');
            }
        }
    },
    methods: {
        ...navigationUtils.methods,
        ...fileUtils.methods,
        initializeEmulator(game) {
            console.log('Initializing emulator for:', game.name);
            
            // Clean up any existing emulator
            this.cleanupEmulator();
            
            // Set EmulatorJS configuration
            window.EJS_player = '#game';
            window.EJS_gameUrl = game.romFile;
            window.EJS_core = game.core;
            window.EJS_gameName = game.name;
            window.EJS_color = game.color || '#0064ff';
            window.EJS_startOnLoaded = true;
            window.EJS_pathtodata = 'data/';
            window.EJS_language = 'en-US';
            window.EJS_DEBUG_XX = true;
            
            // Set up callbacks
            window.EJS_onGameStart = (e) => {
                console.log('Game started', e);
                this.gameStore.setGameLoaded(true);
                this.showNotification(`${game.name} loaded successfully!`, 'success');
            };
            
            window.EJS_onLoadState = (e) => {
                // Trigger file upload dialog
                this.uploadFile('.state', (data) => {
                    try {
                        console.log('State loaded', e, data);
                        window.EJS_emulator.gameManager.loadState(new Uint8Array(data));
                        this.showNotification('State loaded from file', 'success');
                    } catch (error) {
                        console.error('Error loading state:', error);
                        this.showNotification('Failed to load state file', 'error');
                    }
                });
            };
            
            window.EJS_onSaveState = (e) => {
                console.log('State saved', e, window.EJS_core);
                const state = window.EJS_emulator.gameManager.getState();
                const coreName = window.EJS_emulator.coreName;
                this.downloadFile(`${game.name}_${new Date().getTime()}.${coreName}-state`, state, 'application/octet-stream');
            };

            window.EJS_onSaveUpdate = function(e) {
                console.log('The contents of the save file have changed!', e);
            }
            
            window.EJS_onError = (error) => {
                console.error('Emulator error:', error);
                this.showNotification('Failed to load game. Check ROM file and console.', 'error');
            };
            
            // Load EmulatorJS
            this.loadEmulatorJS();
        },
        loadEmulatorJS() {
            // Remove existing loader script if present
            const existingScript = document.querySelector('script[src*="loader.js"]');
            if (existingScript) {
                existingScript.remove();
            }
            
            // Load the EmulatorJS loader
            const script = document.createElement('script');
            script.src = `${window.baseURL}/${window.emulatorJSPath}/loader.js`;
            script.onload = () => {
                console.log('EmulatorJS loader loaded');
            };
            script.onerror = () => {
                console.error('Failed to load EmulatorJS');
                this.showNotification('Failed to load emulator. Check data files.', 'error');
            };
            document.head.appendChild(script);
        },
        cleanupEmulator() {
            // Clear the game container
            const gameContainer = document.getElementById('game');
            if (gameContainer) {
                gameContainer.innerHTML = `
                    <div class="loading-screen">
                        <div class="loading-spinner"></div>
                        <div class="loading-text">Loading ${this.gameStore.currentGame?.name || 'Game'}...</div>
                        <div class="loading-progress">Initializing emulator...</div>
                    </div>
                `;
            }
            
            // Clear EmulatorJS globals
            const ejsVars = Object.keys(window).filter(key => key.startsWith('EJS_'));
            ejsVars.forEach(key => {
                delete window[key];
            });
        },
        toggleFullscreen() {
            const gameElement = document.getElementById('game');
            if (gameElement) {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    gameElement.requestFullscreen().catch(err => {
                        console.log('Error attempting to enable fullscreen:', err);
                        this.showNotification('Fullscreen not supported', 'warning');
                    });
                }
            }
        },
        showNotification(message, type = 'info') {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            
            // Add to page
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Remove after delay
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        },
        toggleControls() {
            this.gameStore.setShowControlsModal(!this.gameStore.showControlsModal);
        },
        handleKeydown(event) {
            // Handle global keyboard shortcuts
            switch(event.key) {
                case 'F1':
                    event.preventDefault();
                    if (this.gameStore.currentPage === 'play') {
                        this.toggleControls();
                    }
                    break;
                case 'F9':
                    event.preventDefault();
                    if (this.gameStore.currentPage === 'play') {
                        this.toggleFullscreen();
                    }
                    break;
                case 'Escape':
                    if (this.gameStore.showControlsModal) {
                        this.toggleControls();
                    }
                    break;
            }
        }
    },
};
