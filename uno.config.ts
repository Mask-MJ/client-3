import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { themeVars } from './src/config/preferences/vars'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      collections: {
        // mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        lucide: () => import('@iconify-json/lucide/icons.json').then((i) => i.default),
        antDesign: () => import('@iconify-json/ant-design/icons.json').then((i) => i.default),
      },
    }),
    presetTypography(),
  ],
  theme: {
    ...themeVars,
  },
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['flex-between', 'flex items-center justify-between'],
    ['flex-col-center', 'flex flex-col items-center justify-center'],
    ['text-primary', `text-[var(--primary-color)]`],
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
