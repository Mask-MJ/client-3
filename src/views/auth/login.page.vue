<script lang="ts" setup>
import type { FormInst } from 'naive-ui'

import { $t } from '@/locales'

import Toolbar from './toolbar.vue'

defineOptions({ name: 'Login' })

const userStore = useUserStore()
const preferencesStore = usePreferencesStore()
const loading = computed(() => userStore.loginLoading)
const router = useRouter()
const formRef = ref<FormInst | null>(null)
const REMEMBER_ME_KEY = `REMEMBER_ME_USERNAME_${location.hostname}`
const appName = computed(() => preferencesStore.state.app.name)
const logo = computed(() => preferencesStore.state.logo.source)
const authPageLayout = computed(() => preferencesStore.state.app.authPageLayout)

const localUsername = localStorage.getItem(REMEMBER_ME_KEY) || ''

const rememberMe = ref(!!localUsername)
const model = ref<{ password: null | string; username: null | string }>({
  username: null,
  password: null,
})

async function handleSubmit(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (errors) {
      window.$message.error('Invalid')
    } else {
      window.$message.success('Valid')
    }
  })
}

function handleGo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="min-h-full flex flex-1 select-none overflow-x-hidden">
    <!-- 头部 Logo 和应用名称 -->
    <div v-if="logo || appName" class="absolute left-0 top-0 z-10 flex flex-1">
      <div
        class="text-foreground lg:text-foreground ml-4 mt-4 flex flex-1 items-center sm:left-6 sm:top-6"
      >
        <img v-if="logo" :alt="appName" :src="logo" class="mr-2" width="42" />
        <p v-if="appName" class="m-0 text-xl font-medium">
          {{ appName }}
        </p>
      </div>
    </div>
    <Toolbar />
    <!-- 左侧认证面板 -->
    <div
      v-if="authPageLayout === 'panel-left'"
      class="min-h-full w-2/5 max-lg:flex-1"
      transition-name="slide-left"
    >
      <div class="relative h-full flex-col-center px-6 lg:flex-initial lg:px-8">
        <div class="enter-x w-full sm:mx-auto md:max-w-md">
          <div class="mb-7 sm:mx-auto sm:max-w-md sm:w-full">
            <h2
              class="text-foreground mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl"
            >
              {{ `${$t('authentication.welcomeBack')} 👋🏻` }}
            </h2>

            <p class="text-muted-foreground lg:text-md text-sm">
              <span class="text-muted-foreground">
                {{ $t('authentication.loginSubtitle') }}
              </span>
            </p>
          </div>
          <NForm
            ref="formRef"
            :model="model"
            size="large"
            label-placement="left"
            :rules="{
              username: {
                required: true,
                message: $t('authentication.usernameTip'),
                trigger: 'blur',
              },
              password: {
                required: true,
                message: $t('authentication.passwordErrorTip'),
                trigger: ['input', 'blur'],
              },
            }"
            @keydown.enter.prevent="handleSubmit"
          >
            <NFormItem path="username">
              <NInput
                v-model:value="model.username"
                :placeholder="$t('authentication.usernameTip')"
              />
            </NFormItem>
            <NFormItem path="password">
              <NInput
                v-model:value="model.password"
                :placeholder="$t('authentication.passwordTip')"
                type="password"
              />
            </NFormItem>
          </NForm>
          <div class="mb-6 flex justify-between">
            <div class="flex-center">
              <NCheckbox v-model:checked="rememberMe" name="rememberMe">
                {{ $t('authentication.rememberMe') }}
              </NCheckbox>
            </div>

            <span class="vben-link text-sm font-normal" @click="handleGo('/auth/forget-password')">
              {{ $t('authentication.forgetPassword') }}
            </span>
          </div>
          <NButton
            :class="{ 'cursor-wait': loading }"
            :loading="loading"
            type="primary"
            size="large"
            class="w-full"
            @click="handleSubmit"
          >
            {{ $t('common.login') }}
          </NButton>
        </div>
      </div>
    </div>
    <!-- 系统介绍 -->
    <NCard v-if="authPageLayout !== 'panel-center'" class="relative hidden flex-1 lg:block">
      <div class="absolute inset-0 h-full w-full">
        <div class="login-background absolute left-0 top-0 size-full"></div>
        <div class="-enter-x mr-20 h-full flex-col-center">
          <IconSlogan :alt="appName" class="animate-float h-64 w-2/5" />
          <div class="mt-6 text-xl font-sans lg:text-2xl">
            {{ $t('authentication.pageTitle') }}
          </div>
          <div class="mt-2">
            {{ $t('authentication.pageDesc') }}
          </div>
        </div>
      </div>
    </NCard>
  </div>
</template>

<route lang="yaml">
name: login
meta:
  ignoreAccess: true
</route>

<style scoped>
.login-background {
  background: linear-gradient(154deg, #07070915 30%, rgba(24, 160, 88, 0.3) 48%, #07070915 64%);
}

/* .dark {
  .login-background {
    background: linear-gradient(
      154deg,
      #07070915 30%,
      rgba(var(--primary-color), 0.2) 48%,
      #07070915 64%
    );
    filter: blur(100px);
  }
} */
</style>
