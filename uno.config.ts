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
    presetWind3({ dark: 'class' }),
    presetIcons({
      collections: {
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
    ['flex-center', 'flex justify-center items-center'],
    ['flex-between', 'flex justify-between items-center'],
    ['flex-col', 'flex flex-col'],
    ['flex-col-center', 'flex justify-center items-center flex-col'],
    ['text-primary', 'text-[var(--primary-color)]'],
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
