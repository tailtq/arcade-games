# Vue.js Retro Gaming Platform

A retro gaming platform built with Vue.js 3, Vite, Vue Router, Pinia, and EmulatorJS.

## Project Structure

```
fe-games/
├── src/
│   ├── assets/          # Static assets (CSS, data)
│   ├── components/      # Vue components
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── GameControls.vue
│   │   └── ControlModal.vue
│   ├── views/           # Page components
│   │   ├── HomeView.vue
│   │   ├── PlatformView.vue
│   │   └── PlayView.vue
│   ├── stores/          # Pinia stores
│   │   └── gameStore.js
│   ├── router/          # Vue Router configuration
│   │   └── index.js
│   ├── utils/           # Utility functions
│   │   └── file.js
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
├── public/              # Public static assets
├── assets/              # Legacy assets (can be moved to public)
├── index-new.html       # New HTML entry point
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
└── README-VUE.md        # This file
```

## Migration from CDN to Vue SFC

This project has been converted from using Vue via CDN with template strings to a proper Vue.js Single File Component (SFC) structure using Vite as the build tool.

### Key Changes:

1. **Build System**: Switched from Nuxt.js to Vite for faster development
2. **Component Format**: Converted `.vue.js` files with template strings to `.vue` SFC files
3. **State Management**: Properly configured Pinia store with ES modules
4. **Router**: Migrated to Vue Router with proper configuration
5. **Assets**: Organized assets into `src/assets/` for Vite processing

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- 🎮 Browse games by platform
- 🕹️ Play retro games using EmulatorJS
- 💾 Save and load game states
- 🎯 Platform-specific game filtering
- 📱 Responsive design
- ⌨️ Customizable keyboard controls
- 🖥️ Fullscreen support

## Technology Stack

- **Vue 3**: Progressive JavaScript framework
- **Vite**: Next-generation frontend build tool
- **Vue Router**: Official router for Vue.js
- **Pinia**: State management library for Vue
- **EmulatorJS**: Browser-based emulator

## File Organization

### Components
- `AppHeader.vue`: Main navigation header
- `AppFooter.vue`: Footer component
- `GameControls.vue`: Game control display
- `ControlModal.vue`: Modal for displaying controls

### Views (Pages)
- `HomeView.vue`: Home page with game library
- `PlatformView.vue`: Platform-specific game listing
- `PlayView.vue`: Game emulator page

### Store
- `gameStore.js`: Pinia store for game state management

### Router
- `index.js`: Vue Router configuration with route definitions

## Configuration

### Base URL
The application is configured for GitHub Pages deployment with base URL `/arcade-games/`. 
To change this, update:
- `vite.config.js`: `base` property
- `src/router/index.js`: `createWebHistory()` parameter
- `src/main.js`: `window.baseURL`

### EmulatorJS Path
Configured in `src/main.js`:
```javascript
window.emulatorJSPath = 'assets/libraries/emulatorjs/4.2.3'
```

## Next Steps

1. Update `index.html` to use the new entry point (or rename `index-new.html` to `index.html`)
2. Move remaining assets from `assets/` to `public/` directory
3. Remove old `.vue.js` files from `assets/js/`
4. Test all routes and functionality
5. Update deployment scripts if necessary

## Legacy Files

The following files are from the old structure and can be removed after migration:
- `assets/js/app.js`
- `assets/js/components/*.vue.js`
- `assets/js/pages/*.vue.js`
- `assets/js/stores/gameStore.js`
- `nuxt.config.ts`
- Old `index.html`

## Notes

- The `emulator.html` file should remain in the root as it's loaded in an iframe
- Game data is stored in `src/assets/data/games.json`
- EmulatorJS libraries remain in `assets/libraries/` (should be moved to `public/`)
