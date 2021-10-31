import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'en-US',
    title: 'Hyoukeisan',
    description: 'WaniKani data in your Google Sheets',
    base: '/hyoukeisan',

    themeConfig: {
        logo: 'https://vuejs.org/images/logo.png',
        repo: 'bachmacintosh/hyoukeisan',
        docsDir: 'docs',
        sidebar: [
            '/',
            '/getting_started',
            '/sheets'
        ],
    },
})