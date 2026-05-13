<template>
  <section class="min-h-screen bg-gray-100 px-6 py-16">
    <div class="mx-auto max-w-md bg-white p-8 shadow">
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
        {{ t('auth.clientPortal') }}
      </p>

      <h1 class="mt-2 text-3xl font-black text-bws-blue">
        {{ t('auth.login') }}
      </h1>

      <p class="mt-2 text-gray-600">
        {{ t('auth.loginDescription') }}
      </p>

      <form class="mt-8 space-y-5" @submit.prevent="loginUser">
        <div>
          <label class="mb-2 block text-sm font-bold text-gray-700">
            {{ t('auth.email') }}
          </label>

          <input
            v-model="email"
            type="email"
            required
            :placeholder="t('auth.companyEmail')"
            class="w-full border border-gray-300 px-4 py-3 outline-none focus:border-bws-blue"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold text-gray-700">
            {{ t('auth.password') }}
          </label>

          <input
            v-model="password"
            type="password"
            required
            :placeholder="t('auth.passwordPlaceholder')"
            class="w-full border border-gray-300 px-4 py-3 outline-none focus:border-bws-blue"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-bws-blue px-5 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ isLoading ? t('auth.loggingIn') : t('auth.login') }}
        </button>

        <p v-if="errorMessage" class="text-sm font-semibold text-red-600">
          {{ errorMessage }}
        </p>
      </form>

      <p class="mt-6 text-sm text-gray-600">
        {{ t('auth.noAccount') }}
        <RouterLink to="/register" class="font-bold text-bws-blue hover:underline">
          {{ t('auth.createAccountLink') }}
        </RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

const router = useRouter()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const loginUser = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      errorMessage.value = t('auth.invalidEmail')
    } else if (error.code === 'auth/invalid-credential') {
      errorMessage.value = t('auth.wrongCredentials')
    } else {
      errorMessage.value = t('auth.loginFailed')
    }
  } finally {
    isLoading.value = false
  }
}
</script>