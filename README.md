# Vue EmulatorJS - Retro Gaming Platform

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://tailtq.github.io/retro-gaming)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.4+-4FC08D?logo=vue.js)](https://vuejs.org/)
[![EmulatorJS](https://img.shields.io/badge/EmulatorJS-Latest-orange)](https://emulatorjs.org)

A modern web-based retro gaming platform that brings classic arcade and console games to your browser. Built with Vue.js and powered by EmulatorJS, this platform supports dozens of gaming systems from the golden age of gaming.

## 🎮 Live Demo

**[Play Now on GitHub Pages →](https://tailtq.github.io/retro-gaming)**

## ✨ Features

- 🌐 **Browser-Based**: No downloads or installations required
- 🎯 **Multi-System Support**: 30+ retro gaming systems supported
- 💾 **Save States**: Save and load your progress anywhere
- 🖥️ **Fullscreen Gaming**: Immersive fullscreen experience
- ⌨️ **Customizable Controls**: Remap controls to your preference
- 📱 **Mobile Friendly**: Touch controls for mobile devices
- 🚀 **Fast Loading**: Optimized WebAssembly cores
- 🎨 **Modern UI**: Clean, responsive interface

## 🎲 Supported Systems

### Arcade Systems
- **FBNeo** - Final Burn Neo (CPS1, CPS2, Neo Geo)
- **MAME 2003/2003+** - Multiple Arcade Machine Emulator

## 🚀 Quick Start

### GitHub Pages Deployment

1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings
3. **Update `_config.yml`** with your GitHub username:
   ```yaml
   url: "https://tailtq.github.io"
   baseurl: "/retro-gaming"
   ```
4. **Add ROM files** to the `roms/` directory
5. **Commit and push** - your site will be live at `https://tailtq.github.io/retro-gaming`

### Local Development

```bash
# Clone the repository
git clone https://github.com/tailtq/retro-gaming.git
cd retro-gaming

# Install dependencies
npm install
pip install -r requirements.txt

# Start the development server
npm run dev
# OR
python server.py

# Open http://localhost:8000
```

## 🎮 Controls

### Default Keyboard Mapping

| Action | Player 1 | Player 2 |
|--------|----------|----------|
| **Movement** | Arrow Keys | WASD |
| **A Button** | Z | T |
| **B Button** | X | Y |
| **C Button** | A | U |
| **D Button** | S | I |
| **Start** | Enter | P |
| **Select** | Shift | O |

### Emulator Shortcuts

| Key | Action |
|-----|--------|
| **F1** | Show/Hide Controls |
| **F2** | Save State |
| **F4** | Load State |
| **F9** | Toggle Fullscreen |
| **F12** | Take Screenshot |

## 📁 Project Structure

```
retro-gaming/
├── _config.yml              # Jekyll configuration
├── index.html               # Main game interface
├── README.md                # This file
├── package.json             # Node.js dependencies
├── server.py                # FastAPI development server
├── emulator-config.js       # Game configuration
├── data/                    # EmulatorJS core files
│   ├── cores/              # WebAssembly emulator cores
│   ├── compression/        # Archive utilities
│   └── localization/       # Language files
├── roms/                   # ROM files directory
│   └── mame-roms/         # Organized by system
├── _layouts/               # Jekyll layouts
├── _includes/              # Jekyll includes
└── assets/                 # Static assets
    ├── css/               # Stylesheets
    ├── js/                # JavaScript files
    └── images/            # Images and icons
```

## ⚙️ Configuration

### Adding New Games

1. **Add ROM file** to appropriate directory in `roms/`
2. **Update game configuration** in `emulator-config.js`:

```javascript
this.gameConfigs = {
    'your-game': {
        name: 'Your Game Title',
        romFile: 'your-game.zip',
        core: 'appropriate-core',
        system: 'system-name',
        color: '#hexcolor',
        description: 'Game description'
    }
};
```

3. **Create game page** (optional) in `_games/your-game.md`
4. **Update navigation** if needed

### Customizing the Site

Edit `_config.yml` to customize:
- Site title and description
- Author information
- Social links
- Navigation menu
- Supported systems

## 🌐 GitHub Pages Setup

### Automatic Deployment

This repository is configured for automatic GitHub Pages deployment:

1. **Push to main branch** triggers automatic build
2. **Jekyll processes** markdown and configuration
3. **Site deploys** to `https://tailtq.github.io/retro-gaming`

### Custom Domain (Optional)

To use a custom domain:

1. Add `CNAME` file with your domain
2. Configure DNS settings
3. Enable HTTPS in repository settings

## 🛠️ Development

### Local Jekyll Development

```bash
# Install Jekyll and dependencies
gem install bundler jekyll
bundle install

# Serve the site locally
bundle exec jekyll serve

# Open http://localhost:4000
```

### Building for Production

```bash
# Build the site
bundle exec jekyll build

# Output in _site/ directory
```

## 📱 Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| **Chrome** | 57+ | Recommended |
| **Firefox** | 52+ | Full support |
| **Safari** | 11+ | iOS 11+ |
| **Edge** | 16+ | Chromium-based preferred |

**Requirements:**
- WebAssembly support
- Hardware acceleration (recommended)
- Modern JavaScript (ES6+)

## 🔧 API Reference

### FastAPI Endpoints (Development)

- `GET /` - Main game interface
- `GET /health` - Health check
- `GET /data/*` - EmulatorJS static files
- `GET /roms/*` - ROM file serving

### JavaScript API

```javascript
// Initialize emulator
const config = new EmulatorConfig();
config.initGame('game-key');

// Event callbacks
window.EJS_onGameStart = () => console.log('Game started');
window.EJS_onSaveState = () => console.log('State saved');
```

## 📄 Legal Notice

**Important**: This project is for educational and preservation purposes. Users must own legal copies of any ROM files used. The maintainers do not provide or distribute copyrighted content.

### ROM Sources
- **Homebrew games** - Free and legal
- **Public domain** - No copyright restrictions
- **Personal backups** - Your legally owned games
- **Open source** - Community-created content

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Areas for Contribution
- New emulator cores
- UI/UX improvements
- Mobile optimization
- Performance enhancements
- Documentation
- Game compatibility testing

## 📊 Performance Tips

### Optimal Performance
- Use **Chrome or Firefox** for best performance
- Enable **hardware acceleration** in browser settings
- Close **unnecessary tabs** and applications
- Use **appropriate emulator cores** for your system
- Consider **lower resolution** for older hardware

### Troubleshooting
- **Game won't load**: Check ROM format and core compatibility
- **Poor performance**: Try different emulator core or lower settings
- **Controls not working**: Click game area to focus, check F1 for mappings
- **Audio issues**: Check browser audio permissions and settings

## 📈 Roadmap

- [ ] **Multiplayer support** - Online multiplayer gaming
- [ ] **Achievement system** - Track gaming milestones
- [ ] **Game library** - Browse and organize ROM collection
- [ ] **Mobile app** - Native mobile applications
- [ ] **Cloud saves** - Sync save states across devices
- [ ] **Streaming** - Share gameplay with others

## 🙏 Acknowledgments

- **[EmulatorJS](https://emulatorjs.org)** - Core emulation library
- **[RetroArch](https://www.retroarch.com)** - Emulator cores and libretro
- **[Vue.js](https://vuejs.org)** - Progressive JavaScript framework
- **[Jekyll](https://jekyllrb.com)** - Static site generator
- **[GitHub Pages](https://pages.github.com)** - Free hosting platform

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/tailtq/retro-gaming/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tailtq/retro-gaming/discussions)
- **Documentation**: [Wiki](https://github.com/tailtq/retro-gaming/wiki)

---

**Made with ❤️ for retro gaming enthusiasts**

*Relive the golden age of gaming in your browser!*