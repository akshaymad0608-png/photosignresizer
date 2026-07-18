import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});

/*
 * SECURITY NOTE — do not re-add a `define` block for API keys.
 *
 * This previously contained:
 *   define: {
 *     'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
 *     'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
 *   }
 *
 * Vite's `define` is a literal find-and-replace performed at build time. Any
 * client file that reads process.env.API_KEY has the real key pasted into the
 * public JavaScript bundle, where anyone can read it with View Source. This was
 * verified: with a key set and one reference added, the key appeared verbatim in
 * dist/assets/index-*.js.
 *
 * It was only safe here because no client code referenced it, so the dead code
 * was tree-shaken away. The first person to write `process.env.API_KEY` in a
 * component would have published the key.
 *
 * A secret key must never reach the browser. If you need Gemini or any other
 * paid API, call it from a server route (or serverless function) that holds the
 * key server-side and proxies the request.
 */
