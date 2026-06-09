<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  FileText, Download, Eye, Shield, Globe,
  Zap, CheckCircle, Award, Search, ArrowRight
} from 'lucide-vue-next'

import { useHead } from '@unhead/vue'

useHead({
  title: 'Customs Process | Blue Water Shipping',
  meta: [
    {
      name: 'description',
      content:
        'Step-by-step customs process for smoother transport planning and reduced border delays.',
    },
  ],
})

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

</script>

<template>


  <!-- PROCESS STEPS -->
  <section class="py-10 md:py-10 bg-white">
    <div class="container mx-auto max-w-7xl px-6 md:px-12">
      <div class="mb-10">
        <div class="mb-4 flex items-center gap-3">
        </div>
        <h2 class="text-bw-blue font-black text-4xl md:text-5xl mb-6">
          {{ t('customs.process.heading') }}
        </h2>
        <p class="text-bw-steel text-lg max-w-2xl">
          {{ t('customs.process.subtext') }}
        </p>
      </div>

      <div class="grid md:grid-cols-5 gap-6">
        <div v-for="i in 5" :key="i" class="group">
          <div class="bg-bw-sand border border-transparent transition hover:border-bw-blue hover:shadow-lg p-6 h-full">
            <div class="w-12 h-12 bg-bw-blue text-white font-black text-lg flex items-center justify-center mb-4 group-hover:bg-bw-sky transition">
              {{ i }}
            </div>
            <h3 class="font-black text-bw-blue text-base mb-2">
              {{ t(`customs.process.step_${i}_title`) }}
            </h3>
            <p class="text-bw-steel text-sm leading-relaxed">
              {{ t(`customs.process.step_${i}_body`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>