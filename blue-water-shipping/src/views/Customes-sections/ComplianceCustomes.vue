<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import StepsCustoms from './StepsCustoms.vue'
import DocumentCustomes from './DocumentCustomes.vue'
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

    <section class="py-20 md:py-28 bg-white">
    <div class="container mx-auto max-w-7xl px-6 md:px-12">
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div class="lg:sticky lg:top-20">
          <div class="mb-4 flex items-center gap-3">
            <span class="h-px w-8 bg-bw-red"></span>
            <span class="text-xs font-black uppercase tracking-[0.3em] text-bw-red">
              {{ t('customs.compliance.eyebrow') }}
            </span>
          </div>
          <h2 class="text-bw-blue font-black text-4xl md:text-5xl mb-6">
            {{ t('customs.compliance.heading') }}
          </h2>
          <p class="text-bw-steel text-lg leading-relaxed">
            {{ t('customs.compliance.subtext') }}
          </p>

          <div class="mt-8 inline-flex items-center gap-3 bg-bw-blue/5 border border-bw-blue/20 px-4 py-3">
            <Globe class="w-5 h-5 text-bw-blue flex-shrink-0" />
            <span class="text-xs font-black uppercase tracking-wider text-bw-blue">EEA Member — Preferential Tariffs Apply</span>
          </div>
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