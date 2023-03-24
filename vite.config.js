import { defineConfig, loadEnv } from 'vite';
import {fileURLToPath} from 'url'
// export default defineConfig({
//   server: {
//     port: 3000,
//   },
//   preview: {
//     port: 8080,
//   },
// });


export default defineConfig({
  appType: 'custom',
  base: "/",
  server: {
    port: 3000,
    sourcemapIgnoreList(sourcePath, sourcemapPath) {
      return sourcePath.includes('node_modules')
    }
  },
  preview: {
    port: 8080,
  },
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    }
},
  build: {
    outDir: 'docs',
    sourcemap: true,
    manifest: true,
    minify: false,
    rollupOptions: {
      // overwrite default .html entry
      input: '/src/server/views/index.njk',
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