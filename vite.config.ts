import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Minification et optimisation (esbuild est le défaut avec rolldown)
    minify: 'esbuild',
    // Code splitting optimisé
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Code splitting pour meilleures performances
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('three')) {
              return 'three-vendor'
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons'
            }
            return 'vendor'
          }
        },
        // Obfuscation du nom des fichiers avec hash
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Optimisations de build
    cssCodeSplit: true,
    sourcemap: false, // Désactiver source maps en production
    chunkSizeWarningLimit: 1000,
    // Compression
    reportCompressedSize: true,
    target: 'esnext',
    // Tree shaking
    assetsInlineLimit: 4096, // Inline les petits assets (< 4kb)
  },
  // Optimisations de performance
  optimizeDeps: {
    include: ['react', 'react-dom', 'three'],
    exclude: [],
    force: true, // Force la réoptimisation si nécessaire
    esbuildOptions: {
      target: 'esnext',
    },
  },
  // Optimisations supplémentaires pour les performances
  esbuild: {
    target: 'esnext',
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
  // Configuration du serveur de développement
  server: {
    port: 5173,
    strictPort: false, // Permet d'utiliser un autre port si 5173 est occupé
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      // Port HMR sera automatiquement synchronisé avec le port du serveur
    },
    watch: {
      usePolling: false,
    },
  },
})
