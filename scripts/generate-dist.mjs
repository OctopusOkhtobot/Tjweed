#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const STATIC_DIR = join(ROOT, ".vercel/output/static");
const PUBLIC_DIR = join(ROOT, "public");
const SERVER_FUNC = join(ROOT, ".vercel/output/functions/__server.func/index.mjs");

async function main() {
  console.log("[generate-dist] Generating dist artifacts for AI Studio deployment...");

  if (!existsSync(DIST)) {
    mkdirSync(DIST, { recursive: true });
  }

  // 1. Copy all static files from .vercel/output/static to dist
  if (existsSync(STATIC_DIR)) {
    cpSync(STATIC_DIR, DIST, { recursive: true });
    console.log("[generate-dist] Copied .vercel/output/static to dist");
  }

  // 2. Copy all files from public to dist (in case any were missed)
  if (existsSync(PUBLIC_DIR)) {
    cpSync(PUBLIC_DIR, DIST, { recursive: true });
    console.log("[generate-dist] Copied public to dist");
  }

  // 3. Prerender index.html using the server function
  let html = "";
  if (existsSync(SERVER_FUNC)) {
    try {
      const serverMod = await import(SERVER_FUNC);
      if (serverMod?.default?.fetch) {
        const response = await serverMod.default.fetch(new Request("http://localhost:3000/"));
        if (response.status === 200) {
          html = await response.text();
          console.log(`[generate-dist] Prerendered index.html from server function (${html.length} bytes)`);
        } else {
          console.warn(`[generate-dist] Server function returned status ${response.status}`);
        }
      }
    } catch (err) {
      console.warn("[generate-dist] Failed to prerender with server function:", err?.message || err);
    }
  }

  // Fallback: If prerender failed or server func wasn't available, build a complete index.html
  if (!html || html.length < 100) {
    const assetsDir = join(DIST, "assets");
    let scriptFile = "";
    let styleFile = "";
    if (existsSync(assetsDir)) {
      const files = readdirSync(assetsDir);
      scriptFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js")) || "";
      styleFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css")) || "";
    }

    html = `<!DOCTYPE html>
<html lang="ar" dir="rtl" class="antialiased">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>نونة وبستان التجويد | أحكام النون الساكنة</title>
  <meta name="description" content="مجلس تطبيقي تفاعلي لتعليم أحكام النون الساكنة والتنوين برواية حفص عن عاصم لمدرسة بنات في الكويت" />
  <meta name="theme-color" content="#1e4a3a" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:ital,wght@0,400;0,700;1,400&family=Readex+Pro:wght@400;500;600;700&display=swap" />
  ${styleFile ? `<link rel="stylesheet" href="/assets/${styleFile}" />` : ""}
</head>
<body>
  <div id="root"></div>
  ${scriptFile ? `<script type="module" src="/assets/${scriptFile}"></script>` : ""}
</body>
</html>`;
    console.log("[generate-dist] Created fallback index.html template");
  }

  const indexPath = join(DIST, "index.html");
  writeFileSync(indexPath, html, "utf-8");
  console.log(`[generate-dist] Wrote ${indexPath}`);

  // Summary
  const distEntries = readdirSync(DIST);
  console.log(`[generate-dist] dist artifact verification: ${distEntries.length} root items (${distEntries.join(", ")})`);
}

main().catch((err) => {
  console.error("[generate-dist] Error:", err);
  process.exit(1);
});
