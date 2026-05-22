<template>
  <section
    class="relative flex min-h-[calc(100vh-6rem)] items-center overflow-hidden bg-bw-blue text-white md:min-h-[calc(100vh-7rem)]"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-bw-blue via-bw-night to-black opacity-95"></div>

    <div class="absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>

    <div class="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12">
      <p class="text-sm font-black uppercase tracking-[0.4em] text-white/60">
        Error 404
      </p>

      <h1 class="mt-6 text-5xl font-black leading-tight md:text-8xl">
        Page not found
      </h1>

      <p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl">
        This page is currently not available in the prototype. Some sections are outside
        the project scope and may be developed in a future version.
      </p>

      <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <RouterLink
          to="/"
          class="inline-flex h-12 items-center justify-center bg-white px-8 text-sm font-black uppercase tracking-wide text-black transition hover:-translate-y-1 hover:bg-gray-100"
        >
          Back to homepage
        </RouterLink>

        <RouterLink
          to="/contact"
          class="inline-flex h-12 items-center justify-center border border-white/40 px-8 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-white hover:text-bw-blue"
        >
          Contact us
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Page Not Found | Blue Water Shipping',
  meta: [
    {
      name: 'description',
      content:
        'This page is not available in the Blue Water Shipping prototype.',
    },
  ],
})

</script>
