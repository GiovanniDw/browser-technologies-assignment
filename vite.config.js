import { defineConfig, loadEnv, createLogger, searchForWorkspaceRoot } from 'vite';
import {fileURLToPath} from 'url';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
// export default defineConfig({
//   server: {
//     port: 3000,
//   },
//   preview: {
//     port: 8080,
//   },
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default defineConfig({
  appType: 'custom',
  base: "./",
  plugins: [commonjs(),],
  optimizeDeps: {},
  publicDir: './public',
  css: {
    devSourcemap: true
  },
  server: {
    port: 3000,
    origin: 'http://127.0.0.1:3000',
  },
  preview: {
    port: 8080,
  },
  ssr: {
    target: 'node'
  },
  hmr: {
    clientPort: 5173
  },
  build: {
    emptyOutDir: true,
    assetsDir: 'public',
    outDir: 'build',
    sourcemap: true,
    manifest: true,
    ssrManifest: true,
    minify: false,
    rollupOptions: {
      // overwrite default .html entry
      input: './src/assets/main.js',
    },
  }
},({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})