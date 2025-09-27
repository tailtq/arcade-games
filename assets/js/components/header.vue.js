const template = `
<header class="header">
    <div class="container">
        <h1 class="logo" @click="backToHome">
            <span class="logo-icon" style="margin-right: 10px;">🎮</span>
            Arcade Games
        </h1>
    </div>
</header>
`;

import navigation from '../utils/navigation.js';

export default {
    name: 'Header',
    template: template,
    methods: {
        ...navigation.methods,
    },
};
