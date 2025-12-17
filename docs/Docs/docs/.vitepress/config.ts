import { defineConfig } from 'vitepress';

// see https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'en-US',
  title: 'Glados - 2k25',
  base: process.env.NODE_ENV === 'production' ? '/G-CPP-500-COT-5-1-rtype-22/Docs/' : '/',
  description: 'Glados project documentation',
  
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', rel: 'stylesheet' }],
    ['script', { src: 'https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js' }],
    ['meta', { name: 'theme-color', content: '#ff0000ff' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Our Team', link: '/TEAM_ORGANIZATION' },
      {
        text: 'Documentation',
        items: [
          { text: 'Architecture', link: '/Architecture/ARCHITECTURE' },
          { text: 'Technical Study', link: '/Technical/TECHNICAL_DOCUMENTATION' },
          { text: 'Developer Guide', link: '/Developer/CONTRIBUTING' },
          { text: 'User Guide', link: '/Developer/USER_GUIDE' },
          { text: 'Build & Deploy', link: '/Build/BUILD_GUIDE' },
          { text: 'Project Details', link: '/Glados' },
        ]
      },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Glados Project', link: '/' },
          { text: 'Our Team', link: '/TEAM_ORGANIZATION' },
        ],
      },
      {
        text: 'Architecture',
        collapsed: false,
        items: [
          { text: 'System Architecture', link: '/Architecture/ARCHITECTURE' },
        ],
      },
      {
        text: 'Technical Study',
        collapsed: true,
        items: [
          { text: 'Technical study', link: '/Technical/TECHNICAL_DOCUMENTATION' },
        ],
      },
      {
        text: 'Developer & User Guide',
        collapsed: true,
        items: [
          { text: 'Developer guide', link: '/Developer/CONTRIBUTING' },
          { text: 'User guide', link: '/Developer/USER_GUIDE' },
        ],
      },
      {
        text: 'Build & Deploy',
        collapsed: true,
        items: [
          { text: 'Build Instructions', link: '/Build/BUILD_GUIDE' },
          { text: 'CI/CD Pipeline', link: '/Developer/contributing#cicd-pipeline' },
        ],
      },
    ],
  },

  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       css: {
  //         additionalData: '@import "./theme/custom.css";'
  //       }
  //     }
  //   }
  // },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  }
})
