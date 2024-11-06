import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Correct for custom domain
  
  server: {
    port: 3000,
    host: true,
    // Add historyApiFallback for client-side routing
    historyApiFallback: {
      disableDotRule: true
    }
  },
  
  preview: {
    // Also add historyApiFallback to preview server
    historyApiFallback: true,
    port: 3000,
    host: true
  },
  
  build: {
    outDir: 'dist',
    // Generate a 404.html that mirrors index.html for SPA routing
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion']
        }
      }
    },
    // Ensure proper module loading
    modulePreload: {
      polyfill: true
    },
    sourcemap: true,
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    // Add SPA-specific build options
    ssrManifest: false,
    manifest: true,
    // Ensure clean URLs work
    copyPublicDir: true
  },
  
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // Add alias for absolute imports if needed
    alias: {
      '@': '/src'
    }
  },
  
  // Add optimizeDeps for better dev performance
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: []
  }
});