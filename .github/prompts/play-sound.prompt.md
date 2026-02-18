---
description: "Browse and play a sound from myinstants.com"
agent: "agent"
tools: ["mcp_myinstants_search_sounds", "mcp_myinstants_browse_category", "mcp_myinstants_play_sound"]
---
Search myinstants.com for sounds matching the user's mood or request. Present the top 6 results using the ask_questions tool as a select list so the user can pick one. Then play the selected sound.

When using ask_questions:
- Limit to 6 options max (tool constraint)
- Keep the header under 12 characters (e.g. "Pick a sound")
- Use short labels for each option (just the sound name)
- Allow freeform input so users can type their own search

Use `wait: true` (default) to block until the sound finishes, or `wait: false` for background playback.

## Suggested Sounds by Vibe

### Researching / Exploring Codebase
- `play_sound(query: "keyboard typing sound")` — furious code reading
- `play_sound(query: "hmm thinking")` — pondering the code
- `play_sound(query: "suspense build up")` — digging through files
- `play_sound(query: "jeopardy theme song")` — thinking music

### Found Something Unexpected
- `play_sound(query: "dun dun duuun")` — dramatic reveal
- `play_sound(query: "vine boom sound")` — the rock eyebrow energy
- `play_sound(query: "windows xp error")` — classic bug found

### Task Complete / Success
- `play_sound(query: "minecraft level up sound")` — feature shipped
- `play_sound(query: "gta sa mission complete")` — respect+
- `play_sound(query: "roblox oof")` — when it was harder than expected

### Reactions
- `play_sound(query: "bruh")` — self-explanatory
- `play_sound(query: "emotional damage meme")` — roasted by the code

If no specific query is given, browse a popular category like "memes" or "sound effects" and present those instead.

Categories: anime & manga, games, memes, movies, music, reactions, sound effects, sports, television, tiktok trends, viral