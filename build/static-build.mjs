import { createHash } from "node:crypto";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Resolve build tools through the installed dependency tree (pnpm).
const viteDir = dirname(require.resolve("vite/package.json"));
const esbuild = require(require.resolve("esbuild", { paths: [viteDir] }));
const postcss = require(require.resolve("postcss", { paths: [viteDir] }));
const tailwindcss = require(require.resolve("@tailwindcss/postcss"));

const distDir = resolve(root, "dist");
const assetsDir = resolve(distDir, "assets");
const ssrDir = resolve(root, ".static-ssr");

rmSync(distDir, { recursive: true, force: true });
rmSync(ssrDir, { recursive: true, force: true });
mkdirSync(assetsDir, { recursive: true });

// 1) CSS: Tailwind v4 + custom styles via postcss.
const cssSource = readFileSync(resolve(root, "app", "globals.css"), "utf8");
const cssResult = await postcss([tailwindcss()]).process(cssSource, {
  from: resolve(root, "app", "globals.css"),
});
const cssName = `styles-${createHash("sha256").update(cssResult.css).digest("hex").slice(0, 8)}.css`;
writeFileSync(resolve(assetsDir, cssName), cssResult.css);

// 2) Client bundle (hydration) via esbuild.
const clientOut = resolve(ssrDir, "client.js");
await esbuild.build({
  entryPoints: [resolve(root, "build", "static-client.tsx")],
  bundle: true,
  minify: true,
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  outfile: clientOut,
  logLevel: "info",
});
const jsContent = readFileSync(clientOut, "utf8");
const jsName = `static-client-${createHash("sha256").update(jsContent).digest("hex").slice(0, 8)}.js`;
writeFileSync(resolve(assetsDir, jsName), jsContent);

// 3) SSR render bundle via esbuild.
await esbuild.build({
  entryPoints: [resolve(root, "build", "static-html.tsx")],
  bundle: true,
  format: "esm",
  platform: "node",
  packages: "external",
  jsx: "automatic",
  outfile: resolve(ssrDir, "static-html.js"),
  logLevel: "info",
});

const { renderPage } = await import(
  pathToFileURL(resolve(ssrDir, "static-html.js")).href
);
const rendered = renderPage();

// React 19 SSR emits image preload hints inside the component tree; hoist them
// to <head> so the hydrated body matches the client render exactly.
const preloads = Array.from(
  rendered.matchAll(/<link rel="preload"[^>]*\/?>/g),
  (match) => match[0]
).join("");
const body = rendered.replace(/<link rel="preload"[^>]*\/?>/g, "");

// 4) Static HTML shell.
const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Tracé - 极简中文剧本写作软件</title>
    <meta
      name="description"
      content="Tracé 是一款为 macOS 而生的极简中文剧本写作软件，提供场景目录、卡片墙、灵感白板与 PDF 导出。"
    />
    <link rel="icon" href="/trace-icon.png" />
    <link rel="preload" as="image" href="/打赏收款码.webp" />
    ${preloads}
    <link rel="stylesheet" href="/assets/${cssName}" />
  </head>
  <body>
    <div id="root">${body}</div>
    <script type="module" src="/assets/${jsName}"></script>
  </body>
</html>
`;
writeFileSync(resolve(distDir, "index.html"), html);

// 5) Static assets from public/.
cpSync(resolve(root, "public"), distDir, { recursive: true });

rmSync(ssrDir, { recursive: true, force: true });

console.log("Static build complete -> dist/index.html");
console.log(`Assets: ${jsName}, ${cssName}`);
