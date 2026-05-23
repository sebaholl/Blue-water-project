<script setup>
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'

import FloatingAboutButton from '@/components/ui/FloatingAboutButton.vue'
import Section1 from '@/views/Section1.vue'
import Section2 from './Section2.vue';

const { t } = useI18n()

const heroVideoUrl = new URL('../assets/Hero-section-v.mp4', import.meta.url).href

useHead({
  title: 'Blue Water Shipping | Transport and Logistics Solutions',
  meta: [
    {
      name: 'description',
      content:
        'Blue Water Shipping prototype focused on modern logistics communication, transport solutions, and improved customer experience.',
    },
    {
      property: 'og:title',
      content: 'Blue Water Shipping | Transport and Logistics Solutions',
    },
    {
      property: 'og:description',
      content:
        'Modern logistics communication prototype focused on transport solutions, sea freight and B2B customer experience.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
})
</script>

<template>
  <section
    class="relative flex min-h-[calc(100vh-6rem)] w-full items-center overflow-hidden md:min-h-[calc(100vh-7rem)]"
    aria-labelledby="home-hero-title"
  >
    <FloatingAboutButton />

    <!-- Background video -->
    <video
      class="absolute inset-0 h-full w-full object-cover"
      :src="heroVideoUrl"
      autoplay
      muted
      loop
      playsinline
      aria-hidden="true"
    ></video>

    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-bw-black/55" aria-hidden="true"></div>

    <!-- Hero content -->
    <div class="relative z-10 max-w-6xl px-6 py-10 md:px-12 lg:px-20">
      <!-- Green accent lines -->
      <p
        class="font-proxima text-3xl font-medium leading-[0.95] tracking-wide text-bw-green md:text-6xl lg:text-7xl xl:text-[6rem]"
      >
        {{ t('hero.accentLine1') }}
      </p>

      <p
        class="mb-4 font-proxima text-3xl font-medium leading-[0.95] tracking-wide text-bw-green md:text-6xl lg:text-7xl xl:text-[6rem]"
      >
        {{ t('hero.accentLine2') }}
      </p>

      <!-- White headline -->
      <h1
        id="home-hero-title"
        class="font-proxima font-black leading-[0.95] text-bw-white"
      >
        <span class="block text-3xl md:text-7xl lg:text-8xl xl:text-[6rem]">
          {{ t('hero.headingLine1') }}
        </span>

        <span class="block text-3xl md:text-7xl lg:text-8xl xl:text-[6rem]">
          {{ t('hero.headingLine2') }}
        </span>

        <span class="block text-5xl md:text-7xl lg:text-8xl xl:text-[6rem]">
          {{ t('hero.headingLine3') }}
        </span>
      </h1>

      <div class="mt-8 flex flex-col gap-4 sm:flex-row">
        <RouterLink
          to="/Heavy-lift"
          class="inline-flex items-center justify-center bg-[#FE3866] px-8 py-4 font-proxima text-base font-bold leading-tight text-bw-white transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bw-black md:text-lg"
          :aria-label="`${t('hero.button1')} page`"
        >
          {{ t('hero.button1') }}
        </RouterLink>

        <RouterLink
          to="/Customs"
          class="inline-flex items-center justify-center bg-[#D9D9D9] px-8 py-4 font-proxima text-base font-bold leading-tight text-bw-black transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bw-black md:text-lg"
          :aria-label="`${t('hero.button2')} page`"
        >
          {{ t('hero.button2') }}
        </RouterLink>
      </div>
    </div>
  </section>

  <Section1 />
  <Section2 />
</template>