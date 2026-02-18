# myinstants-mcp

MCP server for [myinstants.com](https://www.myinstants.com) — search and play millions of sound buttons from any AI agent.

## Setup

```bash
npm install
```

### Claude Desktop

```json
{
  "mcpServers": {
    "myinstants": {
      "command": "node",
      "args": ["/path/to/myinstants-mcp/server.js"]
    }
  }
}
```

## Architecture

| MCP Feature | Purpose |
|---|---|
| **Tool: `search_sounds`** | Search myinstants.com, returns list of matches |
| **Tool: `play_sound`** | Play by slug, URL, or quick search (plays first match) |
| **Resource: `myinstants://trending`** | Currently trending sounds |

Sounds are downloaded once and cached to `~/.cache/myinstants/`.

## Environment

| Variable | Default | Description |
|---|---|---|
| `MYINSTANTS_VOLUME` | `0.5` | Playback volume (0-1) |
| `MYINSTANTS_CACHE` | `~/.cache/myinstants` | Download cache directory |
