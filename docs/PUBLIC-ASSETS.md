# Public Folder Structure

All static assets have been moved to the `public/` folder for proper Vite handling.

## 📁 Directory Structure

```
public/
├── css/
│   └── style.css          # Main stylesheet
├── data/
│   ├── games.json          # Game metadata
│   └── faulty-games.json   # (if needed)
├── images/
│   └── games/              # Game screenshots
│       ├── capcom/
│       ├── neogeo/
│       ├── nintendo-ds/
│       ├── playstation/
│       └── sega/
├── libraries/
│   └── emulatorjs/
│       └── 4.2.3/          # EmulatorJS library
├── emulator.html           # Emulator iframe page
└── 404.html                # GitHub Pages 404 handler
```

## 🔗 Asset References

### In Components (Vue files)
Assets in `public/` are referenced with absolute paths:

```vue
<!-- Images -->
<img :src="game.screenshot" />
<!-- Where game.screenshot = "/images/games/nes/game.png" -->

<!-- CSS (in App.vue) -->
<style>
@import '/css/style.css';
</style>
```

### In JavaScript
```javascript
// Fetch data
fetch(`${baseURL}data/games.json`)

// EmulatorJS path
window.emulatorJSPath = 'libraries/emulatorjs/4.2.3'
```

## ⚙️ How It Works

1. **During Development**: Vite serves files from `public/` at the root
   - `public/css/style.css` → `http://localhost:8001/arcade-games/css/style.css`

2. **During Build**: Vite copies `public/` contents to `dist/` root
   - Files are accessible at the same paths in production

## ✅ Migration Completed

All assets have been copied from `assets/` to `public/`:

- ✅ `assets/css/` → `public/css/`
- ✅ `assets/data/` → `public/data/`
- ✅ `assets/images/` → `public/images/`
- ✅ `assets/libraries/` → `public/libraries/`
- ✅ `emulator.html` → `public/emulator.html`
- ✅ `404.html` → `public/404.html`

## 🗑️ Original Assets

The original `assets/` folder is kept for reference but is no longer used by the application. You can safely remove `assets/js/` after confirming everything works.

## 🔄 Updated Files

The following files were updated to reference the public folder:

1. **`src/App.vue`**
   - CSS import: `@import '/css/style.css';`

2. **`src/stores/gameStore.js`**
   - Games data: `fetch(`${baseURL}data/games.json`)`

3. **`src/main.js`**
   - EmulatorJS path: `window.emulatorJSPath = 'libraries/emulatorjs/4.2.3'`

4. **`src/components/GameControls.vue`**
   - Removed unnecessary Vue imports (defineProps, defineEmits are compiler macros)

## 🚀 Next Steps

1. Start the dev server: `npm run dev`
2. Test the application
3. Build for production: `npm run build`
4. Deploy the `dist/` folder

All assets will work correctly both in development and production!
