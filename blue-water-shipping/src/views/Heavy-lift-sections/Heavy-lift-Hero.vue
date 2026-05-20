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
    <section class="relative min-h-screen flex items-center overflow-hidden bg-bw-night">
      <!-- Background Image with Overlay -->
      <div
        class="absolute inset-0 z-0 bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1541888941295-8bc68f3eb730?auto=format&fit=crop&q=80&w=2000')"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-bw-night to-bw-blue/90 opacity-95"></div>
      </div>

      <div class="container mx-auto max-w-7xl px-6 md:px-12 relative z-10 py-24">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Left Content -->
          <div class="hero-animate space-y-8">
            <div class="flex items-center gap-3">
              <span class="h-2 w-2 rounded-full bg-bw-green"></span>
              <span class="h-px w-8 bg-bw-green"></span>
              <span class="text-xs font-black uppercase tracking-[0.3em] text-bw-green">
                {{ t('heavy_lift.hero.eyebrow') }}
              </span>
            </div>

            <h1 class="text-5xl md:text-7xl font-black leading-tight text-white">
              {{ t('heavy_lift.hero.heading_line_1') }}<br />
              {{ t('heavy_lift.hero.heading_line_2') }}<br />
              <span class="text-bw-green">{{ t('heavy_lift.hero.heading_line_3') }}</span>
            </h1>

            <p class="text-xl text-white/80 max-w-lg leading-relaxed">
              {{ t('heavy_lift.hero.subheading') }}
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
              <button class="inline-flex h-12 items-center justify-center bg-bw-red px-8 text-sm font-black uppercase tracking-wide text-white transition hover:opacity-90">
                {{ t('heavy_lift.hero.cta_quote') }}
              </button>
              <button class="inline-flex h-12 items-center justify-center border-2 border-white px-8 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-bw-blue">
                {{ t('heavy_lift.hero.cta_cases') }}
              </button>
            </div>
          </div>

          <!-- Right Floating Card -->
          <div class="hero-animate [animation-delay:200ms]">
            <div class="bg-bw-night/80 backdrop-blur-md rounded-2xl p-8 border border-white/10 animate-float shadow-2xl">
              <h3 class="text-xs font-black uppercase tracking-[0.3em] text-white/60 mb-8 pb-4 border-b border-white/5">
                {{ t('heavy_lift.hero.stats_title') }}
              </h3>

              <div class="grid grid-cols-2 gap-x-8 gap-y-10">
                <div v-for="i in 4" :key="i" class="space-y-1">
                  <div class="font-black text-bw-green text-3xl md:text-4xl">
                    {{ t(`heavy_lift.hero.stat_${i}_val`) }}
                  </div>
                  <div class="text-[10px] uppercase tracking-widest text-white/60 font-black leading-tight">
                    {{ t(`heavy_lift.hero.stat_${i}_label`) }}
                  </div>
                </div>
              </div>
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
          <div class="h-4 w-px bg-gray-200 hidden md:block"></div>
          <div class="flex items-center gap-3 text-bw-blue">
            <div class="w-5 h-5 bg-bw-green rounded-full flex items-center justify-center text-[10px] font-bold text-bw-blue">$</div>
            <span class="text-xs font-black uppercase tracking-widest">Insured Up to $500M</span>
          </div>
        </div>
      </div>
    </section>

</template>