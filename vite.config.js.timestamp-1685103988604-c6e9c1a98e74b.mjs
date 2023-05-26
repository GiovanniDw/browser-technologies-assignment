// vite.config.js
import { defineConfig, loadEnv, createLogger, searchForWorkspaceRoot } from "file:///Users/Giovanni/Developer/browser-technologies-assignment/node_modules/.pnpm/vite@4.3.8_sass@1.62.1/node_modules/vite/dist/node/index.js";
import { fileURLToPath } from "url";
import commonjs from "file:///Users/Giovanni/Developer/browser-technologies-assignment/node_modules/.pnpm/@rollup+plugin-commonjs@24.1.0/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
import path from "path";
var __vite_injected_original_import_meta_url = "file:///Users/Giovanni/Developer/browser-technologies-assignment/vite.config.js";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  appType: "custom",
  base: "/",
  plugins: [commonjs()],
  optimizeDeps: { exclude: ["fsevents"] },
  publicDir: "./public",
  css: {
    devSourcemap: true
  },
  server: {
    port: 3e3,
    origin: "http://127.0.0.1:3000"
  },
  preview: {
    port: 8080
  },
  ssr: {
    target: "node"
  },
  hmr: {
    clientPort: 5173
  },
  build: {
    emptyOutDir: true,
    assetsDir: "public",
    outDir: "docs",
    sourcemap: true,
    manifest: true,
    ssrManifest: true,
    ssr: "./src/server/server.js",
    minify: false,
    rollupOptions: {
      // overwrite default .html entry
      input: "./src/main.js"
    }
  }
}, ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvR2lvdmFubmkvRGV2ZWxvcGVyL2Jyb3dzZXItdGVjaG5vbG9naWVzLWFzc2lnbm1lbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9HaW92YW5uaS9EZXZlbG9wZXIvYnJvd3Nlci10ZWNobm9sb2dpZXMtYXNzaWdubWVudC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvR2lvdmFubmkvRGV2ZWxvcGVyL2Jyb3dzZXItdGVjaG5vbG9naWVzLWFzc2lnbm1lbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYsIGNyZWF0ZUxvZ2dlciwgc2VhcmNoRm9yV29ya3NwYWNlUm9vdCB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHtmaWxlVVJMVG9QYXRofSBmcm9tICd1cmwnO1xuaW1wb3J0IGNvbW1vbmpzIGZyb20gJ0Byb2xsdXAvcGx1Z2luLWNvbW1vbmpzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuLy8gZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbi8vICAgc2VydmVyOiB7XG4vLyAgICAgcG9ydDogMzAwMCxcbi8vICAgfSxcbi8vICAgcHJldmlldzoge1xuLy8gICAgIHBvcnQ6IDgwODAsXG4vLyAgIH0sXG4vLyB9KTtcblxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKTtcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBhcHBUeXBlOiAnY3VzdG9tJyxcbiAgYmFzZTogXCIvXCIsXG4gIHBsdWdpbnM6IFtjb21tb25qcygpLF0sXG4gIG9wdGltaXplRGVwczoge2V4Y2x1ZGU6IFtcImZzZXZlbnRzXCJdfSxcbiAgcHVibGljRGlyOiAnLi9wdWJsaWMnLFxuICBjc3M6IHtcbiAgICBkZXZTb3VyY2VtYXA6IHRydWVcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBvcmlnaW46ICdodHRwOi8vMTI3LjAuMC4xOjMwMDAnLFxuICB9LFxuICBwcmV2aWV3OiB7XG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgc3NyOiB7XG4gICAgdGFyZ2V0OiAnbm9kZSdcbiAgfSxcbiAgaG1yOiB7XG4gICAgY2xpZW50UG9ydDogNTE3M1xuICB9LFxuICBidWlsZDoge1xuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIGFzc2V0c0RpcjogJ3B1YmxpYycsXG4gICAgb3V0RGlyOiAnZG9jcycsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIG1hbmlmZXN0OiB0cnVlLFxuICAgIHNzck1hbmlmZXN0OiB0cnVlLFxuICAgIHNzcjogJy4vc3JjL3NlcnZlci9zZXJ2ZXIuanMnLFxuICAgIG1pbmlmeTogZmFsc2UsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gb3ZlcndyaXRlIGRlZmF1bHQgLmh0bWwgZW50cnlcbiAgICAgIGlucHV0OiAnLi9zcmMvbWFpbi5qcycsXG4gICAgfSxcbiAgfVxufSwoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgLy8gTG9hZCBlbnYgZmlsZSBiYXNlZCBvbiBgbW9kZWAgaW4gdGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuXG4gIC8vIFNldCB0aGUgdGhpcmQgcGFyYW1ldGVyIHRvICcnIHRvIGxvYWQgYWxsIGVudiByZWdhcmRsZXNzIG9mIHRoZSBgVklURV9gIHByZWZpeC5cbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJylcbiAgcmV0dXJuIHtcbiAgICAvLyB2aXRlIGNvbmZpZ1xuICAgIGRlZmluZToge1xuICAgICAgX19BUFBfRU5WX186IGVudi5BUFBfRU5WLFxuICAgIH0sXG4gIH1cbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VixTQUFTLGNBQWMsU0FBUyxjQUFjLDhCQUE4QjtBQUN6YSxTQUFRLHFCQUFvQjtBQUM1QixPQUFPLGNBQWM7QUFDckIsT0FBTyxVQUFVO0FBSHlNLElBQU0sMkNBQTJDO0FBYTNRLElBQU0sYUFBYSxjQUFjLHdDQUFlO0FBQ2hELElBQU0sWUFBWSxLQUFLLFFBQVEsVUFBVTtBQUd6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsRUFDVCxNQUFNO0FBQUEsRUFDTixTQUFTLENBQUMsU0FBUyxDQUFFO0FBQUEsRUFDckIsY0FBYyxFQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUM7QUFBQSxFQUNwQyxXQUFXO0FBQUEsRUFDWCxLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsSUFDYixLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUE7QUFBQSxNQUViLE9BQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNGLEdBQUUsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBR3ZCLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxTQUFPO0FBQUE7QUFBQSxJQUVMLFFBQVE7QUFBQSxNQUNOLGFBQWEsSUFBSTtBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
