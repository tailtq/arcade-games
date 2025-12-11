# Vue.js Migration Guide

## ✅ Conversion Complete!

Your project has been successfully converted from a CDN-based Vue.js app to a proper Vue.js Single File Component (SFC) application using Vite.

## 📁 New Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── AppHeader.vue   # Main header (converted from header.vue.js)
│   ├── AppFooter.vue   # Footer (converted from footer.vue.js)
│   └── GameControls.vue # Game controls (converted from gameControls.vue.js)
├── views/              # Page components (routes)
│   ├── HomeView.vue    # Home page (converted from home.vue.js)
│   ├── PlatformView.vue # Platform page (converted from platform.vue.js)
│   └── PlayView.vue    # Play page (converted from play.vue.js)
├── stores/
│   └── gameStore.js    # Pinia store (converted from assets/js/stores)
├── router/
│   └── index.js        # Vue Router config (converted from app.js)
├── utils/
│   └── file.js         # Utility functions (converted from assets/js/utils)
├── assets/
│   ├── css/           # Styles
│   └── data/          # Game data
├── App.vue            # Root component (NEW)
└── main.js            # Entry point (NEW)
```

## 🚀 Getting Started

### 1. Install Dependencies (Already Done)
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Your app will run at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

## 🔄 What Changed?

### Before (CDN-based)
- Vue loaded from CDN (`<script src="https://unpkg.com/vue@3/dist/vue.global.js">`)
- Template strings in `.vue.js` files
- Components defined with object syntax
- No build step

### After (SFC-based)
- Vue installed as npm dependency
- Proper `.vue` Single File Components
- Composition API with `<script setup>`
- Vite build system for optimal performance

## 📝 Key Code Changes

### Component Syntax

**Before (header.vue.js):**
```javascript
const template = `<header>...</header>`

export default {
    name: 'Header',
    template: template,
    methods: { ... }
}
```

**After (AppHeader.vue):**
```vue
<template>
  <header>...</header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
// methods as functions
</script>
```

### Store Usage

**Before:**
```javascript
import { useGameStore } from '../stores/gameStore.js'
// Uses Pinia from CDN
```

**After:**
```javascript
import { useGameStore } from '@/stores/gameStore'
// Uses installed Pinia with @ alias
```

### Router

**Before:**
```javascript
const router = VueRouter.createRouter({ ... })
```

**After:**
```javascript
import { createRouter } from 'vue-router'
const router = createRouter({ ... })
```

## 🎯 Benefits of This Migration

1. **Better Performance**: Vite's HMR (Hot Module Replacement) for instant updates
2. **Type Safety**: Can now add TypeScript easily
3. **Better IDE Support**: Full IntelliSense and autocomplete
4. **Optimized Builds**: Tree-shaking and code splitting
5. **Modern Workflow**: ES modules, imports, and proper bundling
6. **Component Isolation**: Scoped styles and better organization

## 📦 Assets & Public Files

- **EmulatorJS libraries** remain in `assets/libraries/` (accessed directly)
- **Game images** remain in `assets/images/`
- **Game data** copied to `src/assets/data/`
- **CSS** copied to `src/assets/css/`

## 🔧 Configuration Files

- **vite.config.js**: Build configuration
- **package.json**: Dependencies and scripts
- **index.html**: Entry HTML (now minimal, no CDN scripts)

## ⚠️ Important Notes

### Base URL
The app is configured for GitHub Pages deployment with base `/arcade-games/`. 

To run locally without the base path, update:
1. `vite.config.js` - change `base: '/arcade-games/'` to `base: '/'`
2. `src/router/index.js` - change `createWebHistory('/arcade-games')` to `createWebHistory('/')`
3. `src/main.js` - change `window.baseURL` accordingly

### EmulatorJS Path
The emulator files are still loaded from the original location. No changes needed unless you move them.

## 🧹 Cleanup (Optional)

After confirming everything works, you can remove:

```bash
# Old files
rm -rf assets/js/
rm nuxt.config.ts
rm index-old.html
```

## 🐛 Troubleshooting

### If you see import errors:
- Make sure you're using `@/` for imports from `src/`
- Check that all `.vue` files are in the correct directories

### If assets don't load:
- Check that `assets/` paths are correct in `public/` or referenced properly
- For static assets, use `/assets/...` paths in templates

### If router doesn't work:
- Ensure base URL matches your deployment path
- Check that routes are defined correctly in `src/router/index.js`

## 📚 Next Steps

1. ✅ Start dev server and test all pages
2. ✅ Test game loading and controls
3. ✅ Build for production and test the build
4. ✅ Update deployment scripts if needed
5. Consider adding:
   - ESLint for code quality
   - Prettier for formatting
   - TypeScript for type safety
   - Vitest for unit testing

## 🎮 Testing Checklist

- [ ] Home page loads with game library
- [ ] Platform filtering works
- [ ] Clicking a game navigates to play page
- [ ] Game emulator initializes
- [ ] Controls display correctly
- [ ] Fullscreen works
- [ ] Save/load state functions work
- [ ] Navigation between pages works
- [ ] Production build works

## 📖 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)

---

**Migration completed successfully!** 🎉

Your Vue.js application is now using modern best practices with Single File Components, Vite build system, and proper project structure.
