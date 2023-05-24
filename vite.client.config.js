import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path'
// export default defineConfig({
//   server: {
//     port: 3000,
//   },
//   preview: {
//     port: 8080,
//   },
// });


export default defineConfig({
  appType: 'mpa',
  base: "/browser-technologies",
  plugins: [],
  publicDir: 'src/public',
  css: {
    devSourcemap: true
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  build: {
    outDir: 'docs',
    sourcemap: true,
    manifest: true,
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html'),
      },
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