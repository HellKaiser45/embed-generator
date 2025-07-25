# Social-Banner Static Micro-Site

A tiny static site that turns a short URL into a neat grid of social-media icons.

---

## What it is

A single HTML page you can open in any browser.  
It shows a row of clickable icons (GitHub, Twitter, LinkedIn, etc.) styled with your colours and sizes.

---

## What it does

- Reads a single query-string parameter (`?state=...`)  
- Instantly shows the icons without any server round-trip  
- Works as a standalone page or inside an `<iframe>`  
- Loads in milliseconds, even on slow connections

---

## How to use

```bash
bun install
bun run dev        # local preview
bun run build      # static files in /dist
```

---

## How users interact

1. Open the page in any browser  
2. Paste or click a link like `https://yourdomain.com/ui?state=...`  
3. See the icons appear, click any icon to visit the profile

---

## Project layout

```
src/
 ├─ routes/ui/index.tsx   # the page
 ├─ utils/sharedfncs.ts   # compress / decompress
 ├─ contexts/             # types
 ├─ components/basics/    # Button, Icon
 └─ icons-registry/       # icon map
docker/
 └─ nginx.conf            # SPA fallback
```

---

## License

MIT © 2025
