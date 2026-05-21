<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
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
    
    <section class="py-20 md:py-28 bg-bw-sand">
    <div class="container mx-auto max-w-7xl px-6 md:px-12">
      <div class="mb-16">
        <div class="mb-4 flex items-center gap-3">
          <span class="h-px w-8 bg-bw-sky"></span>
          <span class="text-xs font-black uppercase tracking-[0.3em] text-bw-sky">
            {{ t('customs.documents.eyebrow') }}
          </span>
        </div>
        <h2 class="text-bw-blue font-black text-4xl md:text-5xl mb-6">
          {{ t('customs.documents.heading') }}
        </h2>
        <p class="text-bw-steel text-lg max-w-2xl">
          {{ t('customs.documents.subtext') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="bg-white border border-gray-200 p-6 transition hover:-translate-y-1 hover:border-bw-blue hover:shadow-lg group"
        >
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-bw-sky/10 flex items-center justify-center flex-shrink-0 group-hover:bg-bw-sky/20 transition">
              <FileText class="w-5 h-5 text-bw-sky" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-black text-bw-blue text-sm mb-2">
                {{ t(`customs.documents.doc_${i}_title`) }}
              </h3>
              <p class="text-bw-steel text-xs leading-relaxed mb-4">
                {{ t(`customs.documents.doc_${i}_desc`) }}
              </p>
              <div class="flex gap-3">
                <button class="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wide text-bw-sky hover:text-bw-blue transition">
                  <Download class="w-3 h-3" />
                  {{ t('customs.documents.download') }}
                </button>
                <button class="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wide text-bw-steel hover:text-bw-blue transition">
                  <Eye class="w-3 h-3" />
                  {{ t('customs.documents.view') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>






