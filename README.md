# 🎀 UwUify Plugin for Revenge Discord

A delightfully cute plugin that transforms your Discord messages into adorable "uwu speak" for the Revenge Discord client! Built on the Vendetta plugin architecture.

## ✨ Features

- **🎯 Manual UwUification**: Use the `/uwu` slash command to transform any text
- **🤖 Auto UwUify Mode**: Automatically transform all your outgoing messages  
- **⚡ Intensity Control**: Choose from 3 levels of uwuification intensity
- **🧠 Smart Transformations**: 
  - `r/l` → `w` conversions ("really" → "weawwy")
  - `n + vowel` → `ny + vowel` ("nice" → "nyce") 
  - Common word replacements ("you" → "u", "the" → "da")
  - Random stutters for extra cuteness
  - Cute punctuation ("!" → " uwu!", "?" → " owo?")

## 🚀 Installation

1. **Clone or Download** this repository
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build the plugin**:
   ```bash
   npm run build
   ```
4. **Load in Revenge Discord** using the plugin manager

## 📖 Usage

### Manual UwUification
Use the `/uwu` slash command with optional intensity:
```
/uwu text: Hello world, how are you doing today?
/uwu text: This is amazing! intensity: 3
```

**Example outputs:**
- Intensity 1: `Hewwo wowwd, how awe u doing today? uwu`
- Intensity 3: `H-hewwo w-wowwd, how awe u d-doing today? uwu owo`

### Auto UwUify Mode
1. Open plugin settings
2. Enable "UwUify Plugin" 
3. Turn on "Auto UwUify Messages"
4. Set your preferred intensity level
5. All your messages will be uwuified automatically!

## ⚙️ Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable UwUify** | Master toggle for the plugin | `false` |
| **Auto UwUify Messages** | Auto-transform all outgoing messages | `false` |
| **UwU Intensity** | Transformation intensity (1-3) | `1` |

## 🛠️ Development

### Development Commands
```bash
npm run dev      # Build and watch for changes
npm run build    # Build for production
npm run clean    # Clean build artifacts
```

## 📜 License

MIT License - feel free to modify and distribute!

---

<div align="center">
<strong>Made with 💜 and lots of uwus!</strong><br>
<em>Transform your Discord experience, one "owo" at a time~ 🎀</em>
</div>
