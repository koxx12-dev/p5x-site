import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import devtools from 'solid-devtools/vite'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from "@content-collections/vite";
import path from 'node:path'
import { compression } from 'vite-plugin-compression2'
// import { imagetools } from 'vite-imagetools'
// import viteImagemin from '@vheemstra/vite-plugin-imagemin'
// import imageminSvgo from 'imagemin-svgo'
import { setupPlugins } from '@responsive-image/vite-plugin'

export default defineConfig({
  plugins: [
    solid(),
    TanStackRouterVite({ target: 'solid', autoCodeSplitting: true }),
    tailwindcss(),
    devtools({
      /* features options - all disabled by default */
      autoname: true, // e.g. enable autoname
    }), 
    contentCollections(), 
    setupPlugins({
      format: ['webp'],
      lqip: { type: 'thumbhash' },
      include: /^[^?]+\.png\?.*responsive.*$/,
    }),
    // viteImagemin({
    //   plugins: {
        // svg: imageminSvgo()
    //   },
    // }),
    compression(),
    // imagetools()
  ],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/types.ts') },
      { find: '@collections', replacement: path.resolve(__dirname, 'src/collections') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
      { find: '@assets', replacement: path.resolve(__dirname, 'assets') },
      { find: '@data', replacement: path.resolve(__dirname, 'data') },
    ]
  }
})

