<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import StepsCustoms from './StepsCustoms.vue'
import DocumentCustomes from './DocumentCustomes.vue'
import {
  FileText, Download, Eye, Shield, Globe,
  Zap, CheckCircle, Award, Search, ArrowRight
} from 'lucide-vue-next'

import { useHead } from '@unhead/vue'

useHead({
  title: 'Customs Compliance | Blue Water Shipping',
  meta: [
    {
      name: 'description',
      content:
        'Compliance support for customs documentation, transport requirements and cross-border logistics.',
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

    <section class="py-20 md:py-28 bg-white">
    <div class="container mx-auto max-w-7xl px-6 md:px-12">
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div class="lg:sticky lg:top-20">
          <div class="mb-4 flex items-center gap-3">
            
          </div>
          <h2 class="text-bw-blue font-black text-4xl md:text-5xl mb-6">
            {{ t('customs.compliance.heading') }}
          </h2>
          <p class="text-bw-steel text-lg leading-relaxed">
            {{ t('customs.compliance.subtext') }}
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="i in 6"
            :key="i"
            class="flex gap-4 p-5 border border-gray-100 transition hover:border-bw-blue hover:shadow-md group"
          >
            <div class="w-8 h-8 rounded-full bg-bw-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-bw-blue transition">
              <CheckCircle class="w-4 h-4 text-bw-blue group-hover:text-white transition" />
            </div>
            <div>
              <h3 class="font-black text-bw-blue text-sm mb-1">
                {{ t(`customs.compliance.item_${i}_title`) }}
              </h3>
              <p class="text-bw-steel text-sm leading-relaxed">
                {{ t(`customs.compliance.item_${i}_body`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>
</template>