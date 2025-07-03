<script lang="ts" setup>
import type { FormInst } from 'naive-ui'

import { $t } from '@/locales'

import Toolbar from './toolbar.vue'

defineOptions({ name: 'Login' })

const loading = computed(() => userStore.loginLoading)
const userStore = useUserStore()
const router = useRouter()
const formRef = ref<FormInst | null>(null)
const REMEMBER_ME_KEY = `REMEMBER_ME_USERNAME_${location.hostname}`

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
    <Toolbar />
    <div>
      <div class="mb-7 sm:mx-auto sm:max-w-md sm:w-full">
        <h2 class="text-foreground mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl">
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
        :rules="{
          username: { required: true, message: $t('authentication.usernameTip'), trigger: 'blur' },
          password: {
            required: true,
            message: $t('authentication.passwordErrorTip'),
            trigger: ['input', 'blur'],
          },
        }"
        @keydown.enter.prevent="handleSubmit"
      >
        <NFormItem path="username">
          <NInput v-model:value="model.username" :placeholder="$t('authentication.usernameTip')" />
        </NFormItem>
        <NFormItem path="password">
          <NInput
            v-model:value="model.password"
            :placeholder="$t('authentication.passwordTip')"
            type="password"
          />
        </NFormItem>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button round type="primary" @click="handleSubmit"> 验证 </n-button>
            </div>
          </n-col>
        </n-row>
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
        aria-label="login"
        class="w-full"
        @click="handleSubmit"
      >
        {{ $t('common.login') }}
      </NButton>

      <div class="mt-3 text-center text-sm">
        {{ $t('authentication.accountTip') }}
        <span class="vben-link text-sm font-normal" @click="handleGo('/auth/register')">
          {{ $t('authentication.createAccount') }}
        </span>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: login
meta:
  ignoreAccess: true
</route>
