<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ShieldCheck, Package } from 'lucide-vue-next'

const { t } = useI18n()

const scrollToQuote = () => {
  document.getElementById('quote-section')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToCases = () => {
  document.getElementById('cases-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>


<template>
    <section class="relative min-h-screen flex items-center overflow-hidden bg-bw-night">
      <!-- Background Image with Overlay -->
      <div
        class="absolute inset-0 z-0 bg-cover bg-center"
        style="background-image: url('https://hecksher.com/wp-content/uploads/2023/07/Project-Logistics-Blog-image.jpeg.webp')"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-bw-night to-bw-blue/90 opacity-95"></div>
      </div>

      <div class="container mx-auto max-w-7xl px-6 md:px-12 relative z-10 py-24">
        <div class="flex flex-col items-center text-center">
          <div class="hero-animate space-y-8">


            <h1 class="text-5xl md:text-7xl font-black leading-tight text-white">
              {{ t('heavy_lift.hero.heading_line_1') }}<br />
              <span class="text-bw-green">{{ t('heavy_lift.hero.heading_line_3') }}</span>
            </h1>

            <p class="mx-auto max-w-lg text-xl text-white/80 leading-relaxed">
              {{ t('heavy_lift.hero.subheading') }}
            </p>

            <div class="flex flex-wrap justify-center gap-4 pt-4">
              <button @click="scrollToQuote" class="inline-flex h-12 items-center justify-center bg-bw-red px-8 text-sm font-black uppercase tracking-wide text-white transition hover:opacity-90">
                {{ t('heavy_lift.hero.cta_quote') }}
              </button>
              <button @click="scrollToCases" class="inline-flex h-12 items-center justify-center border-2 border-white px-8 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-bw-blue">
                {{ t('heavy_lift.hero.cta_cases') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Trust Bar -->
      <div class="absolute bottom-0 left-0 w-full bg-white py-6 border-t border-gray-100">
        <div class="container mx-auto max-w-7xl px-6 md:px-12 flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-16">
          <div class="flex items-center gap-3 text-bw-blue">
            <ShieldCheck class="w-5 h-5" />
            <span class="text-xs font-black uppercase tracking-widest">ISO Certified</span>
          </div>
          <div class="h-4 w-px bg-gray-200 hidden md:block"></div>
          <div class="flex items-center gap-3 text-bw-blue">
            <Package class="w-5 h-5" />
            <span class="text-xs font-black uppercase tracking-widest">FIATA Member</span>
          </div>
        </div>
      </div>
    </section>

</template>