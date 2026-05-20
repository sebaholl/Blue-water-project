<script setup>
import { useI18n } from 'vue-i18n'
import FloatingAboutButton from '@/components/ui/FloatingAboutButton.vue'
import Clients from '@/components/ui/Clients.vue'
import Section1 from '@/views/Section1.vue'

const { t } = useI18n()

const heroVideoUrl = new URL('../assets/Hero-section-v.mp4', import.meta.url).href
</script>

<template>
<section
  class="relative flex min-h-[calc(100vh-6rem)] w-full items-center overflow-hidden md:min-h-[calc(100vh-7rem)]"
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
  />

  <!-- Dark overlay -->
  <div class="absolute inset-0 bg-bw-black/55"></div>

  <!-- Hero content -->
  <div class="relative z-10 max-w-6xl px-6 py-10 md:px-12 lg:px-20">
    <!-- Green accent lines -->
    <p
      class="font-proxima text-4xl font-medium leading-[0.95] tracking-wide text-bw-green md:text-6xl lg:text-7xl xl:text-[6.5rem]"
    >
      {{ t('hero.accentLine1') }}
    </p>

    <p
      class="mb-4 font-proxima text-4xl font-medium leading-[0.95] tracking-wide text-bw-green md:text-6xl lg:text-7xl xl:text-[6.5rem]"
    >
      {{ t('hero.accentLine2') }}
    </p>

    <!-- White headline -->
    <h1 class="font-proxima font-black leading-[0.95] text-bw-white">
      <span class="block text-5xl md:text-7xl lg:text-8xl xl:text-[7rem]">
        {{ t('hero.headingLine1') }}
      </span>

      <span class="block text-5xl md:text-7xl lg:text-8xl xl:text-[7rem]">
        {{ t('hero.headingLine2') }}
      </span>

      <span class="block text-5xl md:text-7xl lg:text-8xl xl:text-[7rem]">
        {{ t('hero.headingLine3') }}
      </span>
    </h1>

    <div class="mt-8 flex flex-col gap-4 sm:flex-row">
      <RouterLink to="/Heavy-lift">
        <button
          class="font-proxima bg-[#FE3866] px-8 py-4 text-base font-bold leading-tight text-bw-white transition hover:-translate-y-1 md:text-lg"
        >
          {{ t('hero.button1') }}
        </button>
      </RouterLink>

      <RouterLink to="/Customs">
        <button
          class="font-proxima bg-[#D9D9D9] px-8 py-4 text-base font-bold leading-tight text-bw-black transition hover:-translate-y-1 md:text-lg"
        >
          {{ t('hero.button2') }}
        </button>
      </RouterLink>
    </div>
  </div>
</section>

  <!-- <Clients /> -->
  <Section1 />
  
</template>
