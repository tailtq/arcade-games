# File Conversion Reference

## Complete mapping of old files to new Vue SFC structure

### Components
| Old File | New File | Status |
|----------|----------|--------|
| `assets/js/components/header.vue.js` | `src/components/AppHeader.vue` | ✅ Converted |
| `assets/js/components/footer.vue.js` | `src/components/AppFooter.vue` | ✅ Converted |
| `assets/js/components/gameControls.vue.js` | `src/components/GameControls.vue` | ✅ Converted |

### Pages/Views
| Old File | New File | Status |
|----------|----------|--------|
| `assets/js/pages/home.vue.js` | `src/views/HomeView.vue` | ✅ Converted |
| `assets/js/pages/platform.vue.js` | `src/views/PlatformView.vue` | ✅ Converted |
| `assets/js/pages/play.vue.js` | `src/views/PlayView.vue` | ✅ Converted |

### Store
| Old File | New File | Status |
|----------|----------|--------|
| `assets/js/stores/gameStore.js` | `src/stores/gameStore.js` | ✅ Converted to Pinia ES module |

### Utils
| Old File | New File | Status |
|----------|----------|--------|
| `assets/js/utils/file.js` | `src/utils/file.js` | ✅ Converted to ES module exports |
| `assets/js/utils/navigation.js` | *(Integrated into components)* | ✅ Removed (functionality in router) |

### App Entry
| Old File | New File | Status |
|----------|----------|--------|
| `assets/js/app.js` | `src/main.js` + `src/router/index.js` | ✅ Split into proper structure |
| `index.html` (CDN-based) | `index.html` (Vite entry) + `src/App.vue` | ✅ Converted |

### Configuration
| Old File | New File | Status |
|----------|----------|--------|
| `nuxt.config.ts` | `vite.config.js` | ✅ Replaced |
| `package.json` (Nuxt) | `package.json` (Vite) | ✅ Updated |
| *(none)* | `jsconfig.json` | ✅ Created for IDE support |

### Assets
| Old Location | New Location | Status |
|--------------|--------------|--------|
| `assets/css/` | `src/assets/css/` | ✅ Copied |
| `assets/data/` | `src/assets/data/` | ✅ Copied |
| `assets/images/` | `assets/images/` | ⚠️ Kept in place (referenced by data) |
| `assets/libraries/` | `assets/libraries/` | ⚠️ Kept in place (EmulatorJS) |

### Backups Created
| Backup File | Original |
|-------------|----------|
| `index-old.html` | Original CDN-based index.html |

## Key Architecture Changes

### 1. Component Definition

**Old Style (Options API with template strings):**
```javascript
const template = `<div>...</div>`
export default {
    name: 'Component',
    template: template,
    data() { return {} },
    methods: {}
}
```

**New Style (Composition API with SFC):**
```vue
<template>
  <div>...</div>
</template>

<script setup>
import { ref } from 'vue'
// Reactive data and functions
</script>
```

### 2. Imports

**Old:**
```javascript
import Component from './components/header.vue.js'
const gameStore = useGameStore() // Pinia from CDN
```

**New:**
```javascript
import Component from '@/components/AppHeader.vue'
import { useGameStore } from '@/stores/gameStore'
```

### 3. Router

**Old:**
```javascript
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(window.baseURL),
    routes: [...]
})
```

**New:**
```javascript
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory('/arcade-games'),
    routes: [...]
})
```

### 4. App Initialization

**Old (index.html):**
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/vue-router@4"></script>
<script src="https://unpkg.com/pinia@2"></script>
<script type="module" src="/arcade-games/assets/js/app.js"></script>
```

**New (index.html):**
```html
<div id="app"></div>
<script type="module" src="/src/main.js"></script>
```

**New (src/main.js):**
```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

## Files Safe to Remove (After Testing)

Once you've verified everything works, you can remove:

```
assets/js/app.js
assets/js/components/*.vue.js
assets/js/pages/*.vue.js
assets/js/stores/gameStore.js
assets/js/utils/navigation.js
nuxt.config.ts
index-old.html
.nuxt/ (if exists)
```

## Files to Keep

```
assets/libraries/          # EmulatorJS
assets/images/            # Game screenshots
assets/data/faulty-games.json  # If still needed
emulator.html             # Loaded in iframe
404.html                  # For GitHub Pages
server.py                 # Python dev server
```

## New Files Created

```
src/
  ├── components/         # All new .vue components
  ├── views/             # All new .vue views
  ├── stores/            # Converted store
  ├── router/            # New router config
  ├── utils/             # Converted utils
  ├── App.vue            # Root component
  └── main.js            # Entry point
vite.config.js           # Build config
jsconfig.json            # IDE config
index.html               # New entry
README-VUE.md            # Documentation
MIGRATION-GUIDE.md       # This guide
FILE-MAPPING.md          # Reference
```

---

✅ **All files successfully converted to proper Vue.js SFC structure!**
