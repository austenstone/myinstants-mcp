#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { spawn, execSync } from "child_process";
import { existsSync, mkdirSync, createWriteStream } from "fs";
import { join } from "path";
import { platform as osPlatform } from "os";
import { get } from "https";

const home = process.env.HOME || process.env.USERPROFILE || "";
const cacheDir = process.env.MYINSTANTS_CACHE || join(home, ".cache", "myinstants");
const volume = parseFloat(process.env.MYINSTANTS_VOLUME || "0.5") || 0.5;
const BASE = "https://www.myinstants.com";

if (!existsSync(cacheDir)) mkdirSync(cacheDir, { recursive: true });

function fetch(url) {
  return new Promise((resolve, reject) => {
    const doGet = (u) => get(u, { headers: { "User-Agent": "myinstants-mcp/1.0" } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        doGet(new URL(res.headers.location, u)); return;
      }
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve(data));
    }).on("error", reject);
    doGet(url);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const doGet = (u) => get(u, { headers: { "User-Agent": "myinstants-mcp/1.0" } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        doGet(new URL(res.headers.location, u)); return;
      }
      const stream = createWriteStream(dest);
      res.pipe(stream);
      stream.on("finish", () => { stream.close(); resolve(); });
    }).on("error", reject);
    doGet(url);
  });
}

function parseResults(html) {
  const pattern = /onclick="play\('(\/media\/sounds\/[^']+)',\s*'[^']*',\s*'([^']+)'\)"/g;
  const results = [];
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const [, soundPath, slug] = match;
    const name = slug.replace(/-\d+$/, "").replace(/-/g, " ");
    results.push({ slug, name, url: BASE + soundPath });
  }
  return results;
}

async function search(query) {
  const html = await fetch(`${BASE}/en/search/?name=${encodeURIComponent(query)}`);
  return parseResults(html);
}

async function trending() {
  const html = await fetch(`${BASE}/en/index/us/`);
  return parseResults(html);
}

async function cachedPath(url, slug) {
  const ext = url.split(".").pop().split("?")[0] || "mp3";
  const path = join(cacheDir, `${slug}.${ext}`);
  if (!existsSync(path)) await download(url, path);
  return path;
}

function detectPlatform() {
  const p = osPlatform();
  if (p === "darwin") return "mac";
  if (p === "win32") return "windows";
  if (p === "linux") {
    try { if (/microsoft/i.test(require("fs").readFileSync("/proc/version", "utf-8"))) return "wsl"; } catch {}
    return "linux";
  }
  return null;
}

function findLinuxPlayer() {
  for (const p of ["pw-play", "paplay", "ffplay", "mpv", "play", "aplay"]) {
    try { execSync(`command -v ${p}`, { stdio: "ignore" }); return p; } catch {}
  }
  return null;
}

function getPlayCommand(filePath) {
  const plat = detectPlatform();
  if (plat === "mac") return ["afplay", ["-v", String(volume), filePath]];
  if (plat === "wsl") return ["powershell.exe", ["-NoProfile", "-Command", `(New-Object Media.SoundPlayer '${filePath.replace(/\//g, "\\")}').PlaySync()`]];
  if (plat === "linux") {
    const player = findLinuxPlayer();
    if (!player) return null;
    const v = volume;
    if (player === "pw-play" || player === "paplay") return [player, ["--volume", String(Math.round(v * 65536)), filePath]];
    if (player === "ffplay") return [player, ["-nodisp", "-autoexit", "-volume", String(Math.round(v * 100)), filePath]];
    if (player === "mpv") return [player, ["--no-video", `--volume=${Math.round(v * 100)}`, filePath]];
    return [player, [filePath]];
  }
  return null;
}

function playFile(filePath) {
  const cmd = getPlayCommand(filePath);
  if (!cmd) return Promise.resolve();
  return new Promise(resolve => {
    const child = spawn(cmd[0], cmd[1], { stdio: "ignore" });
    child.on("close", resolve);
    child.on("error", resolve);
  });
}

const queue = [];
let playing = false;

function enqueue(filePath) {
  queue.push(filePath);
  if (!playing) drain();
}

async function drain() {
  playing = true;
  while (queue.length) await playFile(queue.shift());
  playing = false;
}

const server = new McpServer({ name: "myinstants", version: "1.0.0" });

server.resource("trending", "myinstants://trending", { description: "Trending sounds on MyInstants", mimeType: "text/plain" }, async () => {
  const results = await trending();
  const text = results.length
    ? results.map(r => `${r.slug}: "${r.name}"`).join("\n")
    : "No trending sounds found.";
  return { contents: [{ uri: "myinstants://trending", text }] };
});

server.tool(
  "search_sounds",
  "Search myinstants.com for sound buttons. Returns a list of matches you can play.",
  { query: z.string().describe("Search query") },
  async ({ query }) => {
    const results = await search(query);
    if (!results.length) return { content: [{ type: "text", text: `No sounds found for "${query}"` }] };
    const text = results.slice(0, 15).map((r, i) => `${i + 1}. **${r.name}** → \`${r.slug}\``).join("\n");
    return { content: [{ type: "text", text }] };
  }
);

server.tool(
  "play_sound",
  "Play a sound from myinstants.com. Use a slug from search results, or a direct URL.",
  {
    slug: z.string().optional().describe("Sound slug from search results"),
    url: z.string().optional().describe("Direct myinstants.com MP3 URL"),
    query: z.string().optional().describe("Quick search — plays the first result"),
  },
  async ({ slug, url, query }) => {
    if (query) {
      const results = await search(query);
      if (!results.length) return { content: [{ type: "text", text: `No sounds found for "${query}"` }] };
      const r = results[0];
      const path = await cachedPath(r.url, r.slug);
      enqueue(path);
      return { content: [{ type: "text", text: `🔊 ${r.name} (${r.slug})` }] };
    }

    if (slug) {
      const results = await search(slug.replace(/-/g, " "));
      const match = results.find(r => r.slug === slug) || results[0];
      if (!match) return { content: [{ type: "text", text: `Sound "${slug}" not found` }] };
      const path = await cachedPath(match.url, match.slug);
      enqueue(path);
      return { content: [{ type: "text", text: `🔊 ${match.name} (${match.slug})` }] };
    }

    if (url) {
      const name = url.split("/").pop().replace(/\.\w+$/, "");
      const path = await cachedPath(url, name);
      enqueue(path);
      return { content: [{ type: "text", text: `🔊 ${name}` }] };
    }

    return { content: [{ type: "text", text: "Provide slug, url, or query." }] };
  }
);

await server.connect(new StdioServerTransport());
