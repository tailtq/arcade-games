import ControlModal from './components/controlModal.vue.js';
import Header from './components/header.vue.js';
import Footer from './components/footer.vue.js';
import HomePage from './pages/home.vue.js';
import PlayPage from './pages/play.vue.js';
import PlatformPage from './pages/platform.vue.js';
// import { createPinia } from 'pinia';
// import { useGameStore } from './stores/gameStore.js';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory('/arcade-games/'),
    routes: [
        { path: '/', component: HomePage },
        { path: '/play/:gameId', component: PlayPage },
        { path: '/platform/:platform', component: PlatformPage },
    ]
});

// Create Pinia instance
const pinia = Pinia.createPinia();

const app = Vue.createApp({});

// Use Pinia
app.use(pinia);
app.use(router);
app.component('control-modal', ControlModal);
app.component('app-header', Header);
app.component('app-footer', Footer);
app.mount('#app');
