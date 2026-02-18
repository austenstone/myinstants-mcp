<p align="center">
  <img src="hero.png" width="200" />
</p>

<h1 align="center">🔴 myinstants-mcp</h1>

<p align="center">
  <strong>give your AI agent a soundboard. no cap.</strong>
</p>

<p align="center">
  <a href="https://www.myinstants.com">myinstants.com</a> has millions of sound buttons.<br/>
  this MCP server lets any AI agent search and play them.<br/>
  your agent can literally hit the bruh button. we are so back.
</p>

<p align="center">
  <img src="banner.png" width="600" />
</p>

---

## fr fr what is this

an [MCP](https://modelcontextprotocol.io) server that connects AI agents to [myinstants.com](https://www.myinstants.com) — the internet's largest soundboard. millions of sound buttons. memes, movie quotes, vine booms, fart noises, anime, gaming, whatever you need.

your AI agent can now:
- 🔍 **search** any sound on myinstants
- 🔴 **smash that button** and play it through your speakers
- 📂 **browse categories** — memes, games, movies, reactions, tiktok trends
- 📈 **check what's trending** — stay current bestie

sounds stream directly. no downloads. no files on disk. just vibes.

## the setup is bussin

```bash
npx myinstants-mcp
```

that's it. that's the setup.

### VS Code (Copilot Chat)

`.vscode/mcp.json`:
```json
{
  "servers": {
    "myinstants": {
      "command": "npx",
      "args": ["-y", "myinstants-mcp"]
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
      "args": ["-y", "myinstants-mcp"]
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
      "args": ["-y", "myinstants-mcp"]
    }
  }
}
```

## what can it do tho

### 🔧 Tools

| Tool | What it does | Example |
|------|-------------|---------|
| `search_sounds` | search myinstants for sounds | `"bruh"` → 20 results with slugs |
| `browse_category` | browse by category | `"memes"` `"games"` `"reactions"` |
| `play_sound` | play a sound (by slug, url, or quick search) | `{ query: "sad trombone" }` plays instantly |

### 📚 Resources

| Resource | What's in it |
|----------|-------------|
| `myinstants://trending` | what's hot rn in the US |
| `myinstants://categories` | all 14 categories |
| `myinstants://best` | best of all time (the hall of fame fr) |

### Categories

`anime & manga` · `games` · `memes` · `movies` · `music` · `politics` · `pranks` · `reactions` · `sound effects` · `sports` · `television` · `tiktok trends` · `viral` · `whatsapp audios`

## how it works (for the nerds)

```
agent calls play_sound({ query: "vine boom" })
  → server searches myinstants.com
  → finds the MP3 URL
  → streams it through ffplay/mpv
  → sound plays through your speakers
  → tool returns immediately (non-blocking)
  → agent keeps working while you hear the boom
```

sounds queue up automatically. no overlap. your agent can fire multiple sounds and they play one after another. clean.

## env vars

| Variable | Default | Vibe |
|----------|---------|------|
| `MYINSTANTS_VOLUME` | `0.5` | how loud (0-1). crank it. |

## requirements

just need one audio player installed:

```bash
brew install ffmpeg   # macOS (recommended)
sudo apt install ffmpeg  # linux
# mpv also works
```

## why tho

because your AI agent should be able to hit you with a vine boom when the code compiles. because sad trombone when tests fail is objectively correct. because the bruh button exists and your agent deserves to press it.

every other MCP sound server plays one notification beep. **one beep.** we have millions of sounds. the entire internet soundboard. that's the difference.

## slay

made by [@tag-assistant](https://github.com/tag-assistant) 🏷️

powered by [myinstants.com](https://www.myinstants.com) · built with [MCP](https://modelcontextprotocol.io)
