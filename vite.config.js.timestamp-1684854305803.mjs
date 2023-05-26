// vite.config.js
import { defineConfig, loadEnv, createLogger, searchForWorkspaceRoot } from "file:///Users/Giovanni/Developer/browser-technologies-assignment/node_modules/.pnpm/vite@4.2.1_sass@1.59.3/node_modules/vite/dist/node/index.js";
import { fileURLToPath } from "url";
import commonjs from "file:///Users/Giovanni/Developer/browser-technologies-assignment/node_modules/.pnpm/@rollup+plugin-commonjs@24.0.1/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
import path from "path";
var __vite_injected_original_import_meta_url = "file:///Users/Giovanni/Developer/browser-technologies-assignment/vite.config.js";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  appType: "custom",
  base: "/",
  plugins: [commonjs()],
  optimizeDeps: { exclude: ["fsevents"] },
  publicDir: "src/public",
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
    outDir: "docs",
    sourcemap: true,
    manifest: true,
    ssrManifest: true,
    ssr: "./src/server.js",
    minify: false,
    rollupOptions: {
      // overwrite default .html entry
      input: "./src/server.js"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvR2lvdmFubmkvRGV2ZWxvcGVyL2Jyb3dzZXItdGVjaG5vbG9naWVzLWFzc2lnbm1lbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9HaW92YW5uaS9EZXZlbG9wZXIvYnJvd3Nlci10ZWNobm9sb2dpZXMtYXNzaWdubWVudC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvR2lvdmFubmkvRGV2ZWxvcGVyL2Jyb3dzZXItdGVjaG5vbG9naWVzLWFzc2lnbm1lbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYsIGNyZWF0ZUxvZ2dlciwgc2VhcmNoRm9yV29ya3NwYWNlUm9vdCB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHtmaWxlVVJMVG9QYXRofSBmcm9tICd1cmwnO1xuaW1wb3J0IGNvbW1vbmpzIGZyb20gJ0Byb2xsdXAvcGx1Z2luLWNvbW1vbmpzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuLy8gZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbi8vICAgc2VydmVyOiB7XG4vLyAgICAgcG9ydDogMzAwMCxcbi8vICAgfSxcbi8vICAgcHJldmlldzoge1xuLy8gICAgIHBvcnQ6IDgwODAsXG4vLyAgIH0sXG4vLyB9KTtcblxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKTtcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBhcHBUeXBlOiAnY3VzdG9tJyxcbiAgYmFzZTogXCIvXCIsXG4gIHBsdWdpbnM6IFtjb21tb25qcygpLF0sXG4gIG9wdGltaXplRGVwczoge2V4Y2x1ZGU6IFtcImZzZXZlbnRzXCJdfSxcbiAgcHVibGljRGlyOiAnc3JjL3B1YmxpYycsXG4gIGNzczoge1xuICAgIGRldlNvdXJjZW1hcDogdHJ1ZVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuICAgIG9yaWdpbjogJ2h0dHA6Ly8xMjcuMC4wLjE6MzAwMCcsXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBwb3J0OiA4MDgwLFxuICB9LFxuICBzc3I6IHtcbiAgICB0YXJnZXQ6ICdub2RlJ1xuICB9LFxuICBobXI6IHtcbiAgICBjbGllbnRQb3J0OiA1MTczXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZG9jcycsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIG1hbmlmZXN0OiB0cnVlLFxuICAgIHNzck1hbmlmZXN0OiB0cnVlLFxuICAgIHNzcjogJy4vc3JjL3NlcnZlci5qcycsXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBvdmVyd3JpdGUgZGVmYXVsdCAuaHRtbCBlbnRyeVxuICAgICAgaW5wdXQ6ICcuL3NyYy9zZXJ2ZXIuanMnLFxuICAgIH0sXG4gIH1cbn0sKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIC8vIExvYWQgZW52IGZpbGUgYmFzZWQgb24gYG1vZGVgIGluIHRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LlxuICAvLyBTZXQgdGhlIHRoaXJkIHBhcmFtZXRlciB0byAnJyB0byBsb2FkIGFsbCBlbnYgcmVnYXJkbGVzcyBvZiB0aGUgYFZJVEVfYCBwcmVmaXguXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXG4gIHJldHVybiB7XG4gICAgLy8gdml0ZSBjb25maWdcbiAgICBkZWZpbmU6IHtcbiAgICAgIF9fQVBQX0VOVl9fOiBlbnYuQVBQX0VOVixcbiAgICB9LFxuICB9XG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlYsU0FBUyxjQUFjLFNBQVMsY0FBYyw4QkFBOEI7QUFDemEsU0FBUSxxQkFBb0I7QUFDNUIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sVUFBVTtBQUh5TSxJQUFNLDJDQUEyQztBQWEzUSxJQUFNLGFBQWEsY0FBYyx3Q0FBZTtBQUNoRCxJQUFNLFlBQVksS0FBSyxRQUFRLFVBQVU7QUFHekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLFNBQVMsQ0FBRTtBQUFBLEVBQ3JCLGNBQWMsRUFBQyxTQUFTLENBQUMsVUFBVSxFQUFDO0FBQUEsRUFDcEMsV0FBVztBQUFBLEVBQ1gsS0FBSztBQUFBLElBQ0gsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLElBQ2IsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBO0FBQUEsTUFFYixPQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDRixHQUFFLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUd2QixRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsU0FBTztBQUFBO0FBQUEsSUFFTCxRQUFRO0FBQUEsTUFDTixhQUFhLElBQUk7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=