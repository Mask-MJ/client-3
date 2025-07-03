<script setup lang="ts">
import type { AuthPageLayoutType, BuiltinThemeType } from '@/config/preferences'
import type { DropdownOption } from 'naive-ui'

import { COLOR_PRESETS } from '@/config/preferences'
import { $t } from '@/locales'

defineOptions({ name: 'AuthenticationToolbar' })

const preferencesStore = usePreferencesStore()
const builtinType = computed(() => preferencesStore.state.theme.builtinType)
const menus = computed((): DropdownOption[] => [
  {
    icon: () => h('i', { class: 'i-lucide-panelLeft size-4' }),
    label: $t('authentication.layout.alignLeft'),
    key: 'panel-left',
  },
  {
    icon: () => h('i', { class: 'i-lucide-inspectionPanel size-4' }),
    label: $t('authentication.layout.center'),
    key: 'panel-center',
  },
  {
    icon: () => h('i', { class: 'i-lucide-panelRight size-4' }),
    label: $t('authentication.layout.alignRight'),
    key: 'panel-right',
  },
])
const authPageLayout = computed(() => preferencesStore.state.app.authPageLayout)

function handleUpdateTheme(primary: string, type: BuiltinThemeType) {
  preferencesStore.state.theme.primary = primary
  preferencesStore.state.theme.builtinType = type
}
function handleUpdateApp(value: string | undefined) {
  preferencesStore.state.app.authPageLayout = value as AuthPageLayoutType
}
</script>

<template>
  <div class="bg-accent absolute right-2 top-4 z-10 flex-center rounded-3xl px-3 py-1">
    <div class="relative flex items-center overflow-hidden">
      <div class="w-0 flex overflow-hidden transition-all duration-500 ease-out group-hover:w-60">
        <template v-for="preset in COLOR_PRESETS" :key="preset.color">
          <NButton
            quaternary
            circle
            class="flex-center flex-shrink-0"
            @click="handleUpdateTheme(preset.color, preset.type)"
          >
            <div
              :style="{ backgroundColor: preset.color }"
              class="relative size-5 flex-center rounded-full hover:scale-110"
            >
              <svg
                v-if="builtinType === preset.type"
                class="h-3.5 w-3.5 text-white"
                height="1em"
                viewBox="0 0 15 15"
                width="1em"
              >
                <path
                  clip-rule="evenodd"
                  d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 0 1-.944.12l-2.75-2.5a.625.625 0 0 1 .841-.925l2.208 2.007l3.849-5.886a.625.625 0 0 1 .865-.181"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>
            </div>
          </NButton>
        </template>
      </div>

      <NButton quaternary circle>
        <template #icon>
          <i class="i-lucide-palette size-4 text-primary"></i>
        </template>
      </NButton>
    </div>
    <n-dropdown :options="menus" @select="handleUpdateApp">
      <n-button quaternary circle>
        <template #icon>
          <i
            :class="{
              'i-lucide-panelLeft': authPageLayout === 'panel-left',
              'i-lucide-inspectionPanel': authPageLayout === 'panel-center',
              'i-lucide-panelRight': authPageLayout === 'panel-right',
            }"
            class="size-4 text-primary"
          ></i>
        </template>
      </n-button>
    </n-dropdown>
    <!-- <AuthenticationLayoutToggle />
    <LanguageToggle />
    <ThemeToggle /> -->
  </div>
</template>

<style lang="" scoped></style>
