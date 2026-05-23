
<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ShieldCheck, Package, Factory, Scale, Truck, ChevronRight } from 'lucide-vue-next'


const { t } = useI18n()

const scrollToQuote = () => {
  document.getElementById('quote-section')?.scrollIntoView({ behavior: 'smooth' })
}



</script>

<template>

       <section class="py-20 md:py-28 bg-bw-sand">
      <div class="container mx-auto max-w-7xl px-6 md:px-12">
        <div class="mb-16">
          <h2 class="text-bw-blue font-black text-4xl md:text-5xl mb-6">
            {{ t('heavy_lift.specs.heading') }}
          </h2>
          <p class="text-bw-steel text-lg max-w-2xl">
            {{ t('heavy_lift.specs.subtext') }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Crane Card -->
          <div class="bg-white border border-gray-200 p-8 transition duration-300 hover:-translate-y-1 hover:border-bw-blue hover:shadow-lg">
            <Factory class="text-bw-sky w-10 h-10 mb-6" />
            <h3 class="text-xl font-black text-bw-blue mb-6 border-b border-gray-100 pb-4">
              {{ t('heavy_lift.specs.crane_title') }}
            </h3>
            <div class="space-y-0">
              <div v-for="i in 4" :key="i" class="spec-row flex justify-between py-3 border-b border-gray-100 text-sm">
                <span class="font-bold text-bw-steel">{{ t(`heavy_lift.specs.crane_row_${i}_key`) }}</span>
                <span class="text-bw-blue font-bold">{{ t(`heavy_lift.specs.crane_row_${i}_val`) }}</span>
              </div>
            </div>
          </div>

          <!-- Dimensions Card -->
          <div class="bg-white border border-gray-200 p-8 transition duration-300 hover:-translate-y-1 hover:border-bw-blue hover:shadow-lg">
            <Scale class="text-bw-sky w-10 h-10 mb-6" />
            <h3 class="text-xl font-black text-bw-blue mb-6 border-b border-gray-100 pb-4">
              {{ t('heavy_lift.specs.cargo_title') }}
            </h3>
            <div class="space-y-0">
              <div v-for="i in 4" :key="i" class="spec-row flex justify-between py-3 border-b border-gray-100 text-sm">
                <span class="font-bold text-bw-steel">{{ t(`heavy_lift.specs.cargo_row_${i}_key`) }}</span>
                <span class="text-bw-blue font-bold text-right ml-4">{{ t(`heavy_lift.specs.cargo_row_${i}_val`) }}</span>
              </div>
            </div>
          </div>

          <!-- Transport Card -->
          <div class="bg-white border border-gray-200 p-8 transition duration-300 hover:-translate-y-1 hover:border-bw-blue hover:shadow-lg">
            <Truck class="text-bw-sky w-10 h-10 mb-6" />
            <h3 class="text-xl font-black text-bw-blue mb-6 border-b border-gray-100 pb-4">
              {{ t('heavy_lift.specs.road_title') }}
            </h3>
            <div class="space-y-0">
              <div v-for="i in 4" :key="i" class="spec-row flex justify-between py-3 border-b border-gray-100 text-sm">
                <span class="font-bold text-bw-steel">{{ t(`heavy_lift.specs.road_row_${i}_key`) }}</span>
                <span class="text-bw-blue font-bold">{{ t(`heavy_lift.specs.road_row_${i}_val`) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dark Banner -->
        <div class="bg-bw-night text-white py-10 px-8 md:px-12 mt-16  flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div class="text-center md:text-left">
            <p class="text-2xl font-black text-white italic">
              "{{ t('heavy_lift.specs.banner_text') }}"
            </p>
          </div>
          <button
            class="inline-flex h-12 items-center justify-center bg-bw-red px-10 text-sm font-black uppercase tracking-wide text-white transition hover:opacity-90 whitespace-nowrap"
            @click="scrollToQuote"
          >
            {{ t('heavy_lift.specs.banner_cta') }}
          </button>
        </div>
      </div>
    </section>
    
</template>