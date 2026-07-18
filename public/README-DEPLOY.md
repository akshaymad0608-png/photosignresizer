# Deploy configuration — where each file must live

SPA routing needs the host to return `index.html` with **HTTP 200** for any
unknown path. Without it, `/jobs` and `/about` return a real 404, and Google
Search Console reports "Page cannot be indexed: Not found (404)".

| Host | File | Correct location |
|---|---|---|
| Vercel | `vercel.json` | **repo root** (NOT `public/`) |
| Netlify | `netlify.toml` or `_redirects` | root / publish dir |
| Cloud Run, Node | `server.ts` | already handles it |
| IIS | `web.config` | publish dir |

`vercel.json` used to sit in `public/`. Vite copies `public/` into `dist/`, so it
became `dist/vercel.json` — a path Vercel never reads. The rewrites and security
headers were silently ignored. It now lives at the repo root.

## Verify after deploying

```bash
curl -o /dev/null -w "%{http_code}\n" https://photoresizer.click/jobs
```

Must print `200`. If it prints `404`, the rewrite is not active on your host.
