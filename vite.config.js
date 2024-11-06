import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Keep as '/' for custom domain
  server: {
    port: 3000,
    host: true // Add this to allow network access
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Add these options to ensure proper module loading
    modulePreload: {
      polyfill: true
    },
    sourcemap: true,
    // Ensure proper MIME types
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  // Add resolve config for proper file extensions
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
});