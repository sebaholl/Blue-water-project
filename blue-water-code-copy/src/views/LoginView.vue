<template>
  <section class="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 sm:py-12 md:py-16">
    <div class="mx-auto w-full max-w-md bg-white p-6 shadow sm:p-8">
      <p class="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 sm:text-sm">
        {{ t('auth.clientPortal') }}
      </p>

      <h1 class="mt-2 text-3xl font-black text-bw-blue sm:text-4xl">
        {{ t('auth.login') }}
      </h1>

      <p class="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
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
            class="h-12 w-full border border-gray-300 px-4 text-base outline-none transition focus:border-bw-blue focus:shadow-[0_0_0_3px_rgba(0,0,171,0.12)]"
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
            class="h-12 w-full border border-gray-300 px-4 text-base outline-none transition focus:border-bw-blue focus:shadow-[0_0_0_3px_rgba(0,0,171,0.12)]"
          />
        </div>

        <!-- If the login is in progress, the button is greyed, you can't click it twice. -->
        <button 
          type="submit"
          :disabled="isLoading"
          class="flex h-12 w-full items-center justify-center bg-bw-blue px-5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ isLoading ? t('auth.loggingIn') : t('auth.login') }}
        </button>

        <p
          v-if="errorMessage"
          class="border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600"
        >
          {{ errorMessage }}
        </p>
      </form>

      <p class="mt-6 text-sm leading-relaxed text-gray-600">
        {{ t('auth.noAccount') }}
        <RouterLink to="/register" class="font-bold text-bw-blue hover:underline">
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

import { useHead } from '@unhead/vue'

useHead({
  title: 'Login | Blue Water Shipping',
  meta: [
    {
      name: 'description',
      content:
        'Log in to the Blue Water Shipping prototype client portal.',
    },
  ],
})

const router = useRouter()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false) // used to grey out the button while logging in. 

const loginUser = async () => {
  errorMessage.value = '' // clear error message
  isLoading.value = true 

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value) // Awaits for the firebase to say okay
    router.push('/dashboard') // if okay, sends user to dash board
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