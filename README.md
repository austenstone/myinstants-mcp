<h1 align="center">🔴 myinstants-mcp</h1>

<p align="center">
  <strong>give your AI agent a soundboard. no cap.</strong><br/>
  <sub>millions of sound buttons · zero config · just vibes ✨</sub>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/myinstants-mcp"><img src="https://img.shields.io/npm/v/myinstants-mcp?style=flat-square&color=red" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/myinstants-mcp"><img src="https://img.shields.io/npm/dm/myinstants-mcp?style=flat-square&color=orange" alt="npm downloads" /></a>
  <a href="https://registry.modelcontextprotocol.io/?q=io.github.austenstone%2Fmyinstants"><img src="https://img.shields.io/badge/MCP_Registry-published-green?style=flat-square" alt="MCP Registry" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="license" /></a>
</p>

<p align="center">
  <strong>Quick Start:</strong><br/>
  <a href="https://vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%7B%22name%22%3A%22myinstants%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22myinstants-mcp%40latest%22%5D%7D">
    <img src="https://img.shields.io/badge/VS_Code-Install_MCP_Server-0098FF?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Install MCP Server in VS Code" />
  </a>
  <a href="https://insiders.vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%7B%22name%22%3A%22myinstants%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22myinstants-mcp%40latest%22%5D%7D">
    <img src="https://img.shields.io/badge/VS_Code_Insiders-Install_MCP_Server-24bfa5?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Install MCP Server in VS Code Insiders" />
  </a>
  <br/>
  <a href="https://aka.ms/awesome-copilot/install/instructions?url=vscode%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Faustenstone%2Fmyinstants-mcp%2Fmain%2F.github%2Finstructions%2Fmyinstants.instructions.md">
    <img src="https://img.shields.io/badge/VS_Code-Install_Instructions-0098FF?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Install in VS Code" />
  </a>
  <a href="https://aka.ms/awesome-copilot/install/instructions?url=vscode-insiders%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Faustenstone%2Fmyinstants-mcp%2Fmain%2F.github%2Finstructions%2Fmyinstants.instructions.md">
    <img src="https://img.shields.io/badge/VS_Code_Insiders-Install_Instructions-24bfa5?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Install in VS Code Insiders" />
  </a>
</p>

---

<img src="images/robot.png" width="100%" />

## fr fr what is this

an [MCP](https://modelcontextprotocol.io) server that connects AI agents to [myinstants.com](https://www.myinstants.com) — the internet's largest soundboard. millions of meme sounds, vine booms, fart noises, anime clips, gaming sfx, whatever you need bestie.

your AI agent can now:

- 🔍 **search** any sound on myinstants
- 🔴 **smash that button** and play it through your speakers
- 📂 **browse categories** — memes, games, movies, reactions, tiktok trends
- 📈 **check what's trending** — stay current fr fr
- ⏳ **wait or don't** — block until sound finishes or let it play in the background

this is not a notification beep. this is the entire internet soundboard. your agent has rizz now.

## the setup is bussin

```bash
npx myinstants-mcp
```

that's it. that's the setup. no cap.

### VS Code / GitHub Copilot

Add to your VS Code MCP config (User or `.vscode/mcp.json`):

```json
{
  "servers": {
    "myinstants": {
      "command": "npx",
      "args": ["-y", "myinstants-mcp@latest"]
    }
  }
}
```

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "myinstants": {
      "command": "npx",
      "args": ["-y", "myinstants-mcp@latest"]
    }
  }
}
```

### Cursor

`.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "myinstants": {
      "command": "npx",
      "args": ["-y", "myinstants-mcp@latest"]
    }
  }
}
```

> [!TIP]
> works on **macOS** out of the box (uses native `afplay`) — no extra installs needed. on linux just `sudo apt install ffmpeg`. that's it bestie.

---

<img src="images/banner.png" width="100%" />

## what can it do tho 🤔

### 🔧 Tools

| Tool | What it does | It's giving |
|------|-------------|---------|
| `search_sounds` | search myinstants for sounds | `"bruh"` → 20 results with slugs |
| `browse_category` | browse by category | `"memes"` `"games"` `"reactions"` |
| `play_sound` | play a sound (by slug, url, or quick search) | `{ query: "sad trombone" }` plays instantly |
| `get_sound_details`* | get details about a sound (views, uploader, duration) | requires `MYINSTANTS_DETAILS=true` |
| `list_devices`* | list available audio output devices | requires `MYINSTANTS_DETAILS=true` |

<sub>* requires `MYINSTANTS_DETAILS=true` environment variable</sub>

#### `play_sound` options

| Parameter | Type | Default | The tea ☕ |
|-----------|------|---------|-----------|
| `query` | string | — | quick search, plays first result. the goat option. |
| `slug` | string | — | exact slug from search results |
| `url` | string | — | direct MP3 URL if you're built different |
| `wait` | boolean | `false` | `false` = plays in background while agent keeps cooking (default 💨). `true` = blocks until done (for dramatic effect 🎭) |

### 📚 Resources

| Resource | The vibe |
|----------|-------------|
| `myinstants://trending` | what's bussin rn in the US 🔥 |
| `myinstants://categories` | all 14 categories no cap |
| `myinstants://best` | hall of fame. the GOATs. the legends. 🐐 |

### Categories

`anime & manga` · `games` · `memes` · `movies` · `music` · `politics` · `pranks` · `reactions` · `sound effects` · `sports` · `television` · `tiktok trends` · `viral` · `whatsapp audios`

## how it works (for the sigma devs)

```
agent calls play_sound({ query: "vine boom", wait: false })
  → searches myinstants.com
  → finds the MP3 URL
  → streams it through afplay/ffplay/mpv
  → sound plays through your speakers
  → agent keeps cooking while you hear the boom 🍳
```

sounds queue up automatically. no overlap. your agent can fire multiple sounds and they play one after another. sheesh.

## teach your agent to troll you 💀

drop a `.instructions.md` in your repo (with `applyTo: "**"` in the frontmatter) and your agent will play sounds **while it works**. imagine: vine boom when it finds a bug. sad trombone when your tests fail. rick roll mid-code-review for absolutely no reason.

```markdown
---
name: "Soundboard"
description: "Sounds for all contexts"
applyTo: "**"
---

Play sounds using the myinstants MCP server while you work:
- Play `play_sound(query: "vine boom sound")` when you find cursed code
- Play `play_sound(query: "sad trombone")` when the user's code doesn't work
- Play `play_sound(query: "minecraft level up sound")` when you fix something
```

check our [myinstants.instructions.md](.github/instructions/myinstants.instructions.md) for the full unhinged setup. your agent will never be an NPC again. 🏆

## config

### env vars

| Variable | Default | The tea ☕ |
|----------|---------|------|
| `MYINSTANTS_VOLUME` | `0.5` | how loud (0-1). crank it bestie. |
| `MYINSTANTS_WAIT` | `false` | `"true"` = sounds block until finished. dramatic effect mode 🎭 |
| `MYINSTANTS_DEVICE` | (system default) | route audio to a specific output device. platform-specific device name. |
| `MYINSTANTS_PLAYER` | (auto) | force a specific player: `ffplay`, `mpv`, `afplay`, or `paplay`. |
| `MYINSTANTS_DETAILS` | `false` | `"true"` = enables `get_sound_details` and `list_devices` tools. |

```json
{
  "servers": {
    "myinstants": {
      "command": "npx",
      "args": ["-y", "myinstants-mcp@latest"],
      "env": {
        "MYINSTANTS_VOLUME": "0.8",
        "MYINSTANTS_DEVICE": "Denon AVR-S760H",
        "MYINSTANTS_DETAILS": "true"
      }
    }
  }
}
```

### audio device selection

route sounds to a specific output device instead of system default:

```bash
# set device name (platform-specific)
export MYINSTANTS_DEVICE="Denon AVR-S760H"

# force a specific player (optional)
export MYINSTANTS_PLAYER="ffplay"

# enable device listing tool
export MYINSTANTS_DETAILS="true"
```

**discover available devices:**

```bash
# macOS
ffmpeg -f avfoundation -list_devices true -i "" 2>&1

# Linux (PulseAudio)
pactl list short sinks

# mpv (cross-platform)
mpv --audio-device=help
```

or use the `list_devices` tool when `MYINSTANTS_DETAILS=true` — your agent can discover devices for you. 💅

**player support:**

| Player | Device Flag | Example |
|--------|------------|---------|
| `ffplay` | `-audio_device` | `ffplay -audio_device "Denon AVR-S760H"` |
| `mpv` | `--audio-device=` | `mpv --audio-device="pulse/alsa_output.usb"` |
| `paplay` | `--device=` | `paplay --device=bluez_sink.XX` |
| `afplay` | ❌ N/A | macOS system default only (no device selection) |

**notes:**
- default behavior unchanged — uses system default output if `MYINSTANTS_DEVICE` not set
- afplay on macOS doesn't support device selection — set `MYINSTANTS_PLAYER=ffplay` or `mpv` if you need device control
- device names are platform-specific (see discovery commands above)
- Windows PowerShell player doesn't support device selection — install ffmpeg or mpv for device support

### audio player support

| Player | Platform | Install | Vibe |
|--------|----------|---------|------|
| `afplay` | macOS | pre-installed 💅 | just works. zero effort. slay. |
| `ffplay` | everywhere | `brew install ffmpeg` / `apt install ffmpeg` | the reliable bestie |
| `mpv` | everywhere | `brew install mpv` / `apt install mpv` | also valid no cap |

auto-detects what you have. tries `afplay` first on mac, then `ffplay`, then `mpv`. fallback chain is bussin.

## why tho 💀

because your AI agent should be able to hit you with a vine boom when the code compiles. because sad trombone when tests fail is objectively correct. because the bruh button exists and your agent deserves to press it. this is not delulu — this is the future.

every other MCP sound server plays one notification beep. **one beep.** that's giving NPC energy. we have millions of sounds. the entire internet soundboard. main character behavior only.

## it's giving... open source 💅

made by [@austenstone](https://github.com/austenstone) 🏷️

powered by [myinstants.com](https://www.myinstants.com) · built with [MCP](https://modelcontextprotocol.io)

no cap this might be the most unhinged MCP server ever and we're lowkey proud of it 💀🔥

## Hosted deployment

A hosted deployment is available on [Fronteir AI](https://fronteir.ai/mcp/austenstone-myinstants-mcp).

