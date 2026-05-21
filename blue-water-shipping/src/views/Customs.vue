<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import StepsCustoms from './Customes-sections/StepsCustoms.vue'
import DocumentCustomes from './Customes-sections/DocumentCustomes.vue'
import ComplianceCustomes from './Customes-sections/ComplianceCustomes.vue'
import {
  FileText, Download, Eye, Shield, Globe,
  Zap, CheckCircle, Award, Search, ArrowRight
} from 'lucide-vue-next'

const { t } = useI18n()

const trackingSteps = [
  { key: 'step_1', done: true, active: false },
  { key: 'step_2', done: true, active: false },
  { key: 'step_3', done: true, active: false },
  { key: 'step_4', done: false, active: true },
  { key: 'step_5', done: false, active: false },
  { key: 'step_6', done: false, active: false },
]

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  cargo: '',
  message: ''
})

const submitForm = () => {
  console.log('Customs enquiry submitted:', form)
  alert('Your customs enquiry has been sent!')
}
</script>

<template>
  <!-- HERO -->
  <section class="relative min-h-screen flex items-center overflow-hidden bg-bw-night">
    <div
      class="absolute inset-0 z-0 bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=2000')"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-bw-night to-bw-blue/90 opacity-95"></div>
    </div>

    <div class="container mx-auto max-w-7xl px-6 md:px-12 relative z-10 py-24">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-8">
          <div class="flex items-center gap-3">
            <span class="h-2 w-2 rounded-full bg-bw-sky"></span>
            <span class="h-px w-8 bg-bw-sky"></span>
            <span class="text-xs font-black uppercase tracking-[0.3em] text-bw-sky">
              {{ t('customs.hero.eyebrow') }}
            </span>
          </div>

          <h1 class="text-5xl md:text-7xl font-black leading-tight text-white">
            {{ t('customs.hero.heading_line_1') }}<br />
            {{ t('customs.hero.heading_line_2') }}<br />
            <span class="text-bw-green">{{ t('customs.hero.heading_line_3') }}</span>
          </h1>

          <p class="text-xl text-white/80 max-w-lg leading-relaxed">
            {{ t('customs.hero.subheading') }}
          </p>

          <div class="flex flex-wrap gap-4 pt-4">
            <button class="inline-flex h-12 items-center justify-center gap-2 bg-bw-sky px-8 text-sm font-black uppercase tracking-wide text-white transition hover:opacity-90">
              <Download class="w-4 h-4" />
              {{ t('customs.hero.cta_guide') }}
            </button>
            <button class="inline-flex h-12 items-center justify-center border-2 border-white px-8 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-bw-blue">
              {{ t('customs.hero.cta_contact') }}
            </button>
          </div>
        </div>

        <div>
          <div class="bg-bw-night/80 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
            <h3 class="text-xs font-black uppercase tracking-[0.3em] text-white/60 mb-8 pb-4 border-b border-white/5">
              {{ t('customs.hero.stats_title') }}
            </h3>

            <div class="flex items-center gap-4 mb-8">
              <div class="text-center">
                <div class="w-12 h-12 rounded-full bg-bw-blue flex items-center justify-center text-white font-black text-sm mb-2">DK</div>
                <div class="text-[10px] text-white/60 font-black uppercase tracking-wider">Denmark</div>
              </div>
              <div class="flex-1 flex items-center gap-1">
                <div class="flex-1 h-px bg-bw-sky/40"></div>
                <ArrowRight class="w-5 h-5 text-bw-sky" />
                <div class="flex-1 h-px bg-bw-sky/40"></div>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 rounded-full bg-bw-sky flex items-center justify-center text-white font-black text-sm mb-2">NO</div>
                <div class="text-[10px] text-white/60 font-black uppercase tracking-wider">Norway</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-x-8 gap-y-10">
              <div v-for="i in 4" :key="i" class="space-y-1">
                <div class="font-black text-bw-green text-3xl md:text-4xl">
                  {{ t(`customs.hero.stat_${i}_val`) }}
                </div>
                <div class="text-[10px] uppercase tracking-widest text-white/60 font-black leading-tight">
                  {{ t(`customs.hero.stat_${i}_label`) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 w-full bg-white py-6 border-t border-gray-100">
      <div class="container mx-auto max-w-7xl px-6 md:px-12 flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-16">
        <div class="flex items-center gap-3 text-bw-blue">
          <Shield class="w-5 h-5" />
          <span class="text-xs font-black uppercase tracking-widest">AEO Certified</span>
        </div>
        <div class="h-4 w-px bg-gray-200 hidden md:block"></div>
        <div class="flex items-center gap-3 text-bw-blue">
          <Award class="w-5 h-5" />
          <span class="text-xs font-black uppercase tracking-widest">Licensed Declarants</span>
        </div>
        <div class="h-4 w-px bg-gray-200 hidden md:block"></div>
        <div class="flex items-center gap-3 text-bw-blue">
          <Zap class="w-5 h-5" />
          <span class="text-xs font-black uppercase tracking-widest">In-House NCTS Filing</span>
        </div>
      </div>
    </div>
    
  </section>

  <!-- PROCESS STEPS -->
  <section class="py-10 md:py-15 bg-white">
    <StepsCustoms />
  </section>

  <!-- DOCUMENT LIBRARY -->
  <section class="py-10 md:py-15 bg-bw-sand">
  
    <DocumentCustomes />
  
  </section>

  <!-- COMPLIANCE & REGULATIONS -->
  <section class="py-20 md:py-28 bg-white">
  
    <ComplianceCustomes />
    
  </section>

  
  <!-- CONTACT FORM -->
  <section class="py-20 md:py-28 bg-bw-sand">
    <div class="container mx-auto max-w-7xl px-6 md:px-12">
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <div class="mb-4 flex items-center gap-3">
            <span class="h-px w-8 bg-bw-blue"></span>
            <span class="text-xs font-black uppercase tracking-[0.3em] text-bw-blue">
              {{ t('customs.contact.eyebrow') }}
            </span>
          </div>
          <h2 class="text-bw-blue font-black text-4xl md:text-5xl mb-6">
            {{ t('customs.contact.heading') }}
          </h2>
          <p class="text-bw-steel text-lg leading-relaxed mb-10">
            {{ t('customs.contact.body') }}
          </p>

          <div class="space-y-4">
            <div v-for="i in 3" :key="i" class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-bw-green flex items-center justify-center mt-0.5 flex-shrink-0">
                <CheckCircle class="w-3 h-3 text-bw-night" />
              </div>
              <span class="text-bw-granite font-bold text-sm">{{ t(`customs.contact.trust_${i}`) }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 p-8 shadow-sm">
          <h3 class="text-bw-blue font-black text-xl mb-6 pb-4 border-b border-gray-100">
            {{ t('customs.contact.form_heading') }}
          </h3>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-black uppercase tracking-wider text-bw-steel mb-1.5">
                  {{ t('customs.contact.form_name') }}
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite focus:outline-none focus:border-bw-blue transition"
                />
              </div>
              <div>
                <label class="block text-xs font-black uppercase tracking-wider text-bw-steel mb-1.5">
                  {{ t('customs.contact.form_company') }}
                </label>
                <input
                  v-model="form.company"
                  type="text"
                  class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite focus:outline-none focus:border-bw-blue transition"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-black uppercase tracking-wider text-bw-steel mb-1.5">
                  {{ t('customs.contact.form_email') }}
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite focus:outline-none focus:border-bw-blue transition"
                />
              </div>
              <div>
                <label class="block text-xs font-black uppercase tracking-wider text-bw-steel mb-1.5">
                  {{ t('customs.contact.form_phone') }}
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite focus:outline-none focus:border-bw-blue transition"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-black uppercase tracking-wider text-bw-steel mb-1.5">
                {{ t('customs.contact.form_cargo') }}
              </label>
              <input
                v-model="form.cargo"
                type="text"
                class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite focus:outline-none focus:border-bw-blue transition"
              />
            </div>

            <div>
              <label class="block text-xs font-black uppercase tracking-wider text-bw-steel mb-1.5">
                {{ t('customs.contact.form_message') }}
              </label>
              <textarea
                v-model="form.message"
                rows="4"
                class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite focus:outline-none focus:border-bw-blue transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full h-12 bg-bw-red text-white font-black uppercase tracking-wide text-sm transition hover:opacity-90"
            >
              {{ t('customs.contact.form_submit') }}
            </button>
            <p class="text-center text-xs text-bw-clay">
              {{ t('customs.contact.form_footer') }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>