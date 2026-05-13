<template>
  <section class="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 sm:py-12 md:py-16">
    <div class="mx-auto w-full max-w-md bg-white p-6 shadow sm:p-8">
      <p class="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 sm:text-sm">
        {{ t('auth.clientPortal') }}
      </p>

      <h1 class="mt-2 text-3xl font-black text-bws-blue sm:text-4xl">
        {{ t('auth.createAccount') }}
      </h1>

      <p class="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
        {{ t('auth.registerDescription') }}
      </p>

      <form class="mt-8 space-y-5" @submit.prevent="registerUser">
        <div>
          <label class="mb-2 block text-sm font-bold text-gray-700">
            {{ t('auth.email') }}
          </label>

          <input
            v-model="email"
            type="email"
            required
            :placeholder="t('auth.companyEmail')"
            class="h-12 w-full border border-gray-300 px-4 text-base outline-none transition focus:border-bws-blue focus:shadow-[0_0_0_3px_rgba(0,0,171,0.12)]"
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
            minlength="6"
            :placeholder="t('auth.minPassword')"
            class="h-12 w-full border border-gray-300 px-4 text-base outline-none transition focus:border-bws-blue focus:shadow-[0_0_0_3px_rgba(0,0,171,0.12)]"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="flex h-12 w-full items-center justify-center bg-bws-blue px-5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ isLoading ? t('auth.creatingAccount') : t('auth.register') }}
        </button>

        <p
          v-if="errorMessage"
          class="border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600"
        >
          {{ errorMessage }}
        </p>
      </form>

      <p class="mt-6 text-sm leading-relaxed text-gray-600">
        {{ t('auth.alreadyAccount') }}
        <RouterLink to="/login" class="font-bold text-bws-blue hover:underline">
          {{ t('auth.loginHere') }}
        </RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

import { auth, db } from '../firebase/config'

const router = useRouter()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const registerUser = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      role: 'client',
      createdAt: serverTimestamp(),
    })

    router.push('/dashboard')
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      errorMessage.value = t('auth.emailUsed')
    } else if (error.code === 'auth/weak-password') {
      errorMessage.value = t('auth.weakPassword')
    } else if (error.code === 'auth/invalid-email') {
      errorMessage.value = t('auth.invalidEmail')
    } else {
      errorMessage.value = t('auth.registerFailed')
    }
  } finally {
    isLoading.value = false
  }
}
</script>