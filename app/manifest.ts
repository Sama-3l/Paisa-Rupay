import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Paisa Rupay',
    short_name: 'PR',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#141414',
    icons: [
      { src: '/favicons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/favicons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}