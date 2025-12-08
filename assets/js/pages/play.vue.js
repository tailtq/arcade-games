const template = `
<!-- Game Play Page -->
<div v-if="gameStore.currentPage === 'play'" class="page play-page">
    <div class="container">
        <!-- Emulator Container -->
        <div class="emulator-container">
            <iframe 
                v-if="iframeSrc"
                id="game-iframe" 
                :src="iframeSrc" 
                class="game-screen"
                frameborder="0"
                allowfullscreen
                allow="autoplay; fullscreen"
            ></iframe>
            <div v-else class="game-screen">
                <div class="loading-screen">
                    <div class="loading-spinner"></div>
                    <div class="loading-text">Loading {{ gameStore.currentGame?.name }}...</div>
                    <div class="loading-progress">Initializing emulator...</div>
                </div>
            </div>
        </div>

        <!-- Game Controls Component (includes footer) -->
        <game-controls 
            :current-game="gameStore.currentGame"
            @back-to-home="backToHome"
            @toggle-fullscreen="toggleFullscreen"
        ></game-controls>
    </div>
</div>
`;

import { useGameStore } from '../stores/gameStore.js';
import navigationUtils from '../utils/navigation.js';
import fileUtils from '../utils/file.js';
import gameControls from '../components/gameControls.vue.js';

export default {
    name: 'Detail',
    components: {
        gameControls,
    },
    template: template,
    data() {
        return {
            iframeSrc: null
        };
    },
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

        // Listen for messages from iframe
        this.setupMessageListener();
    },
    beforeUnmount() {
        // Remove event listener when component is destroyed
        if (this.gameKeyHandler) {
            window.removeEventListener('keydown', this.gameKeyHandler, true);
        }
        if (this.messageHandler) {
            window.removeEventListener('message', this.messageHandler);
        }
    },
    methods: {
        ...navigationUtils.methods,
        ...fileUtils.methods,
        initializeEmulator(game) {
            console.log('Initializing emulator for:', game.name);
            
            // Build iframe URL with game configuration
            const params = new URLSearchParams({
                romFile: game.romFile,
                core: game.core,
                gameName: game.name,
                color: game.color || '#0064ff',
                baseURL: window.baseURL || '',
                emulatorJSPath: window.emulatorJSPath || 'data'
            });
            
            // Add keymap data if available
            if (game.keymap) {
                params.append('keymap', JSON.stringify(game.keymap));
            }
            
            this.iframeSrc = `${window.baseURL}/emulator.html?${params.toString()}`;
            console.log('Iframe URL:', this.iframeSrc);
        },
        setupMessageListener() {
            this.messageHandler = (event) => {
                // Only accept messages from our iframe
                const iframe = document.getElementById('game-iframe');
                console.log('Received message from iframe:', event.data);
                if (!iframe || event.source !== iframe.contentWindow) {
                    return;
                }

                switch (event.data.type) {
                    case 'gameLoaded':
                        this.gameStore.setGameLoaded(true);
                        this.showNotification(`${event.data.gameName} loaded successfully!`, 'success');
                        break;
                    
                    case 'error':
                        this.showNotification(event.data.message, 'error');
                        break;
                    
                    case 'loadStateRequested':
                        this.handleLoadStateRequest();
                        break;
                    
                    case 'stateSaved':
                        this.handleStateSaved(event.data);
                        break;
                    
                    case 'stateLoaded':
                        this.showNotification('State loaded from file', 'success');
                        break;
                }
            };

            window.addEventListener('message', this.messageHandler);
        },
        handleLoadStateRequest() {
            // Trigger file upload dialog
            this.uploadFile('.state', (data) => {
                try {
                    const iframe = document.getElementById('game-iframe');
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage({
                            type: 'loadState',
                            stateData: Array.from(new Uint8Array(data))
                        }, '*');
                    }
                } catch (error) {
                    console.error('Error loading state:', error);
                    this.showNotification('Failed to load state file', 'error');
                }
            });
        },
        handleStateSaved(data) {
            try {
                const stateArray = new Uint8Array(data.state);
                const fileName = `${data.gameName}_${new Date().getTime()}_${data.coreName}.state`;
                this.downloadFile(fileName, stateArray, 'application/octet-stream');
            } catch (error) {
                console.error('Error saving state:', error);
                this.showNotification('Failed to save state', 'error');
            }
        },
        toggleFullscreen() {
            const iframe = document.getElementById('game-iframe');
            if (iframe) {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    iframe.requestFullscreen().catch(err => {
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
    },
};
