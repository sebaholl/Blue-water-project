<script setup>
import { useI18n } from 'vue-i18n'
import FloatingAboutButton from '@/components/ui/FloatingAboutButton.vue'

const { t } = useI18n()

const heroVideoUrl = new URL('../assets/Hero-section-v.mp4', import.meta.url).href
</script>

<template>
  <section class="relative min-h-screen w-full flex items-center overflow-hidden">
    <FloatingAboutButton />
    <!-- Background video -->
    <video
      class="absolute inset-0 w-full h-full object-cover"
      :src="heroVideoUrl"
      autoplay
      muted
      loop
      playsinline
    />
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-bw-black/55"></div>

    <!-- Hero content — left-aligned, vertically centred by parent flex -->
    <div class="relative z-10 px-8 md:px-16 lg:px-24 pt-10 mt-38 max-w-6xl">

      <!-- Green accent lines -->
      <p class="font-proxima font-medium text-bw-green text-5xl md:text-7xl lg:text-[7rem] tracking-wide leading-tight">
        {{ t('hero.accentLine1') }}
      </p>
      <p class="font-proxima font-medium text-bw-green text-5xl md:text-7xl lg:text-[7rem] tracking-wide leading-tight mb-5">
        {{ t('hero.accentLine2') }}
      </p>

      <!-- White headline — three lines, very large, black weight -->
      <h1 class="font-proxima font-black text-bw-white leading-none">
        <span class="block text-6xl md:text-8xl lg:text-[8rem] mb-2 whitespace-nowrap">
          {{ t('hero.headingLine1') }}
        </span>
        <span class="block text-6xl md:text-8xl lg:text-[8rem] mb-2">
          {{ t('hero.headingLine2') }}
        </span>
        <span class="block text-6xl md:text-8xl lg:text-[8rem]">
          {{ t('hero.headingLine3') }}
        </span>
      </h1>

      <div class="flex space-x-4 mt-10">
      <button class="font-proxima font-medium text-bw-white text-base md:text-lg lg:text-xl leading-tight bg-[#FE3866] px-10 py-5">
        {{ t('hero.button1') }}
      </button>

      <button class="font-proxima font-medium text-bw-white text-base md:text-lg lg:text-xl leading-tight bg-[#D9D9D9] px-10 py-5">
        {{ t('hero.button2') }}
      </button>
    </div>  

      
    </div>

  </section>  

  
</template>
