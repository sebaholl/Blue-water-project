<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ShieldCheck, Package, Factory, Scale, Truck, ChevronRight } from 'lucide-vue-next'

const { t } = useI18n()

const form = reactive({
  cargoType: '',
  weight: '',
  origin: '',
  destination: '',
  transportMode: '',
  deadline: '',
  name: '',
  company: '',
  email: '',
  phone: '',
  notes: ''
})

const submitForm = () => {
  console.log('Form submitted:', form)
  alert('Quote request sent successfully!')
}

</script>

<template>
    
    <section class="py-20 md:py-28 bg-white">
      <div class="container mx-auto max-w-7xl px-6 md:px-12">
        <div class="mb-16">
          <div class="mb-4 flex items-center gap-3">
            <span class="h-px w-8 bg-bw-green"></span>
            <span class="text-xs font-black uppercase tracking-[0.3em] text-bw-green">
              {{ t('heavy_lift.cases.eyebrow') }}
            </span>
          </div>
          <h2 class="text-bw-blue font-black text-4xl md:text-5xl mb-6">
            {{ t('heavy_lift.cases.heading') }}
          </h2>
          <p class="text-bw-steel text-lg max-w-2xl">
            {{ t('heavy_lift.cases.subtext') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Case Card 1 -->
          <div class="group relative overflow-hidden bg-bw-sand border border-gray-200">
            <div class="aspect-video w-full overflow-hidden relative bg-gray-300">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" alt="Steel transport" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-bw-night/80 to-transparent"></div>
              <span class="absolute top-4 left-4 bg-bw-blue text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5">
                {{ t('heavy_lift.cases.case_1_tag') }}
              </span>
            </div>
            <div class="p-8">
              <div class="mb-4">
                <div class="text-bw-green font-black text-3xl leading-none">{{ t('heavy_lift.cases.case_1_stat') }}</div>
                <div class="text-[10px] uppercase tracking-widest text-bw-steel font-bold mt-1">{{ t('heavy_lift.cases.case_1_stat_label') }}</div>
              </div>
              <h3 class="font-black text-bw-blue text-2xl leading-tight group-hover:text-bw-sky transition duration-300">
                {{ t('heavy_lift.cases.case_1_title') }}
              </h3>
              <p class="text-bw-steel text-base mt-4 leading-relaxed line-clamp-2">
                {{ t('heavy_lift.cases.case_1_body') }}
              </p>
              <a href="#" class="inline-flex items-center gap-2 mt-8 text-bw-blue font-black text-xs uppercase tracking-widest transition-all group-hover:gap-4">
                {{ t('heavy_lift.cases.read_more') }} <ChevronRight class="w-3 h-3" />
              </a>
            </div>
          </div>

          <!-- Case Card 2 -->
          <div class="group relative overflow-hidden bg-bw-sand border border-gray-200">
            <div class="aspect-video w-full overflow-hidden relative bg-gray-300">
              <img src="https://images.unsplash.com/photo-1541888941295-8bc68f3eb730?auto=format&fit=crop&q=80&w=1200" alt="Offshore module" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-bw-night/80 to-transparent"></div>
              <span class="absolute top-4 left-4 bg-bw-blue text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5">
                {{ t('heavy_lift.cases.case_2_tag') }}
              </span>
            </div>
            <div class="p-8">
              <div class="mb-4">
                <div class="text-bw-green font-black text-3xl leading-none">{{ t('heavy_lift.cases.case_2_stat') }}</div>
                <div class="text-[10px] uppercase tracking-widest text-bw-steel font-bold mt-1">{{ t('heavy_lift.cases.case_2_stat_label') }}</div>
              </div>
              <h3 class="font-black text-bw-blue text-2xl leading-tight group-hover:text-bw-sky transition duration-300">
                {{ t('heavy_lift.cases.case_2_title') }}
              </h3>
              <p class="text-bw-steel text-base mt-4 leading-relaxed line-clamp-2">
                {{ t('heavy_lift.cases.case_2_body') }}
              </p>
              <a href="#" class="inline-flex items-center gap-2 mt-8 text-bw-blue font-black text-xs uppercase tracking-widest transition-all group-hover:gap-4">
                {{ t('heavy_lift.cases.read_more') }} <ChevronRight class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div class="mt-16 flex justify-center">
          <button class="inline-flex h-12 items-center justify-center border-2 border-bw-blue px-12 text-sm font-black uppercase tracking-wide text-bw-blue transition hover:bg-bw-blue hover:text-white">
            {{ t('heavy_lift.cases.find_more') }}
          </button>
        </div>
      </div>
    </section>
    

</template>
