const template = `
<header class="header">
    <div class="container">
        <h1 class="logo" @click="showGameList">
            <span class="logo-icon" style="margin-right: 10px;">🎮</span>
            Arcade Games
        </h1>
        <nav class="nav">
            <button 
                @click="showGameList" 
                :class="{ active: currentPage === 'games' }"
                class="nav-btn"
            >
                📚 Games
            </button>
            <button 
                v-if="currentGame" 
                @click="playGame(currentGame)" 
                :class="{ active: currentPage === 'play' }"
                class="nav-btn"
            >
                🎮 Play
            </button>
        </nav>
    </div>
</header>
`;

export default {
    name: 'Header',
    template: template,
};
