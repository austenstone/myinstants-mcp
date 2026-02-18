---
description: "Browse and play a sound from myinstants.com"
agent: "agent"
tools: ["myinstants/*", "vscode/askQuestions"]
---
Help the user find and play a sound from myinstants.com using a guided picker flow.

## Flow

1. First, ask the user how they want to find a sound using ask_questions:
   - "Search by name" — they'll type a query
   - "Browse a category" — they'll pick from categories

2. If they chose **Browse a category**, present these categories as a select list:
   - anime & manga, games, memes, movies, music, reactions, sound effects, sports, television, tiktok trends, viral

3. Once you have search results or category results, present the top 6 sounds as a select list for the user to pick from.

4. Play the selected sound with `play_sound`.

## ask_questions constraints
- Max 6 options per question
- Header must be under 12 characters
- Use short labels
- Set `allowFreeformInput: true` on the search step so users can type a query