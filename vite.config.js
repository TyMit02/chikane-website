import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Base URL configuration
  base: '/',
  
  // Development server configuration
  server: {
    port: 3000,
    host: true,
    open: true,
    strictPort: true,
    middlewareMode: 'html',
    // Enhanced history fallback for SPA routing
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /^\/[^.]+$/, to: '/index.html' }
      ]
    }
  },
  
  // Preview server configuration
  preview: {
    port: 3000,
    host: true,
    strictPort: true,
    historyApiFallback: true
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    sourcemap: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    
    // Rollup specific options
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        // Chunk splitting configuration
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react']
        },
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        // Entry file naming
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    
    // Module preload options
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps, { hostId, hostType }) => deps
    },
    
    // Terser minification options
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    
    // SPA specific options
    manifest: true,
    ssrManifest: false,
    copyPublicDir: true,
    assetsDir: 'assets'
  },
  
  // Module resolution configuration
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/components/pages'),
      '@sections': path.resolve(__dirname, './src/components/sections'),
      '@layout': path.resolve(__dirname, './src/components/layout'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@config': path.resolve(__dirname, './src/config'),
      '@services': path.resolve(__dirname, './src/services')
    }
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ],
    exclude: [],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
    modules: {
      scopeBehaviour: 'local'
    }
  }
});