<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'

import StepsCustoms from './Customes-sections/StepsCustoms.vue'
import DocumentCustomes from './Customes-sections/DocumentCustomes.vue'
import ComplianceCustomes from './Customes-sections/ComplianceCustomes.vue'

import {
  Download,
  Shield,
  Zap,
  CheckCircle,
  Award,
} from 'lucide-vue-next'

useHead({
  title: 'Customs and Compliance | Blue Water Shipping',
  meta: [
    {
      name: 'description',
      content:
        'Customs and compliance support for Scandinavian transport routes, documentation and cross-border logistics.',
    },
    {
      property: 'og:title',
      content: 'Customs and Compliance | Blue Water Shipping',
    },
    {
      property: 'og:description',
      content:
        'Customs and compliance solutions for documentation, regulations and international transport operations.',
    },
    {
      property: 'og:type',
      content: 'website',
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
  message: '',
  consent: false,
})

const submitForm = () => {
  if (!form.consent) {
    alert('Please accept the privacy consent.')
    return
  }

  console.log('Customs enquiry submitted:', form)
  alert('Your customs enquiry has been sent!')
}
</script>

<template>
  <!-- HERO -->
  <section
    class="relative flex min-h-screen items-center overflow-hidden bg-bw-night"
    aria-labelledby="customs-title"
  >
    <div
      class="absolute inset-0 z-0 bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=2000')"
      aria-hidden="true"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-bw-night to-bw-blue/90 opacity-95"
        aria-hidden="true"
      ></div>
    </div>

    <div class="container relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-12">
      <div class="flex flex-col items-center text-center">
        <div class="space-y-8">
          <div class="flex items-center justify-center gap-3">
            <span class="h-2 w-2 rounded-full bg-bw-sky" aria-hidden="true"></span>
            <span class="h-px w-8 bg-bw-sky" aria-hidden="true"></span>

            <span class="text-xs font-black uppercase tracking-[0.3em] text-bw-sky">
              {{ t('customs.hero.eyebrow') }}
            </span>
          </div>

          <h1
            id="customs-title"
            class="text-5xl font-black leading-tight text-white md:text-7xl"
          >
            {{ t('customs.hero.heading_line_1') }}<br />
            {{ t('customs.hero.heading_line_2') }}<br />
            <span class="text-bw-green">
              {{ t('customs.hero.heading_line_3') }}
            </span>
          </h1>

          <p class="mx-auto max-w-lg text-xl leading-relaxed text-white/85">
            {{ t('customs.hero.subheading') }}
          </p>

          <div class="flex flex-wrap justify-center gap-4 pt-4">
            <button
              class="inline-flex h-12 items-center justify-center gap-2 bg-bw-sky px-9 text-sm font-black uppercase tracking-wide text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bw-blue"
              aria-label="Download customs guide"
            >
              <Download class="h-4 w-4" aria-hidden="true" />
              {{ t('customs.hero.cta_guide') }}
            </button>

            <button
              class="inline-flex h-12 items-center justify-center border-2 border-white px-8 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-bw-blue focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bw-blue"
              aria-label="Contact customs specialists"
            >
              {{ t('customs.hero.cta_contact') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust bar -->
    <div class="absolute bottom-0 left-0 w-full border-t border-gray-100 bg-white py-6">
      <div
        class="container mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 md:justify-start md:gap-16 md:px-12"
      >
        <div class="flex items-center gap-3 text-bw-blue">
          <Shield class="h-5 w-5" aria-hidden="true" />

          <span class="text-xs font-black uppercase tracking-widest">
            AEO Certified
          </span>
        </div>

        <div class="hidden h-4 w-px bg-gray-200 md:block"></div>

        <div class="flex items-center gap-3 text-bw-blue">
          <Award class="h-5 w-5" aria-hidden="true" />

          <span class="text-xs font-black uppercase tracking-widest">
            Licensed Declarants
          </span>
        </div>

        <div class="hidden h-4 w-px bg-gray-200 md:block"></div>

        <div class="flex items-center gap-3 text-bw-blue">
          <Zap class="h-5 w-5" aria-hidden="true" />

          <span class="text-xs font-black uppercase tracking-widest">
            In-House NCTS Filing
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section
    class="bg-white py-10 md:py-15"
    aria-labelledby="customs-process-title"
  >
    <h2 id="customs-process-title" class="sr-only">
      Customs process steps
    </h2>

    <StepsCustoms />
  </section>

  <!-- DOCUMENTS -->
  <section
    class="bg-bw-sand py-10 md:py-15"
    aria-labelledby="customs-documents-title"
  >
    <h2 id="customs-documents-title" class="sr-only">
      Customs document library
    </h2>

    <DocumentCustomes />
  </section>

  <!-- COMPLIANCE -->
  <section
    class="bg-white py-20 md:py-28"
    aria-labelledby="customs-compliance-title"
  >
    <h2 id="customs-compliance-title" class="sr-only">
      Compliance and regulations
    </h2>

    <ComplianceCustomes />
  </section>

  <!-- CONTACT -->
  <section
    class="bg-bw-sand py-20 md:py-28"
    aria-labelledby="customs-contact-title"
  >
    <div class="container mx-auto max-w-7xl px-6 md:px-12">
      <div class="grid items-start gap-16 lg:grid-cols-2">
        <div>
          <div class="mb-4 flex items-center gap-3">
            <span class="h-px w-8 bg-bw-blue" aria-hidden="true"></span>

            <span class="text-xs font-black uppercase tracking-[0.3em] text-bw-blue">
              {{ t('customs.contact.eyebrow') }}
            </span>
          </div>

          <h2
            id="customs-contact-title"
            class="mb-6 text-4xl font-black text-bw-blue md:text-5xl"
          >
            {{ t('customs.contact.heading') }}
          </h2>

          <p class="mb-10 text-lg leading-relaxed text-bw-steel">
            {{ t('customs.contact.body') }}
          </p>

          <div class="space-y-4">
            <div
              v-for="i in 3"
              :key="i"
              class="flex items-start gap-3"
            >
              <div
                class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-bw-green"
              >
                <CheckCircle class="h-3 w-3 text-bw-night" aria-hidden="true" />
              </div>

              <span class="text-sm font-bold text-bw-granite">
                {{ t(`customs.contact.trust_${i}`) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="border border-gray-200 bg-white p-8 shadow-sm">
          <h3
            class="mb-6 border-b border-gray-100 pb-4 text-xl font-black text-bw-blue"
          >
            {{ t('customs.contact.form_heading') }}
          </h3>

          <form
            @submit.prevent="submitForm"
            class="space-y-4"
          >
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  for="customs-name"
                  class="mb-1.5 block text-xs font-black uppercase tracking-wider text-bw-steel"
                >
                  {{ t('customs.contact.form_name') }}
                </label>

                <input
                  id="customs-name"
                  v-model="form.name"
                  type="text"
                  autocomplete="name"
                  maxlength="100"
                  class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite transition focus:border-bw-blue focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
                />
              </div>

              <div>
                <label
                  for="customs-company"
                  class="mb-1.5 block text-xs font-black uppercase tracking-wider text-bw-steel"
                >
                  {{ t('customs.contact.form_company') }}
                </label>

                <input
                  id="customs-company"
                  v-model="form.company"
                  type="text"
                  autocomplete="organization"
                  maxlength="100"
                  class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite transition focus:border-bw-blue focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
                />
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  for="customs-email"
                  class="mb-1.5 block text-xs font-black uppercase tracking-wider text-bw-steel"
                >
                  {{ t('customs.contact.form_email') }}
                </label>

                <input
                  id="customs-email"
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  maxlength="150"
                  class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite transition focus:border-bw-blue focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
                />
              </div>

              <div>
                <label
                  for="customs-phone"
                  class="mb-1.5 block text-xs font-black uppercase tracking-wider text-bw-steel"
                >
                  {{ t('customs.contact.form_phone') }}
                </label>

                <input
                  id="customs-phone"
                  v-model="form.phone"
                  type="tel"
                  autocomplete="tel"
                  maxlength="50"
                  class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite transition focus:border-bw-blue focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
                />
              </div>
            </div>

            <div>
              <label
                for="customs-cargo"
                class="mb-1.5 block text-xs font-black uppercase tracking-wider text-bw-steel"
              >
                {{ t('customs.contact.form_cargo') }}
              </label>

              <input
                id="customs-cargo"
                v-model="form.cargo"
                type="text"
                maxlength="100"
                class="w-full border border-gray-200 px-4 py-3 text-sm text-bw-granite transition focus:border-bw-blue focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
              />
            </div>

            <div>
              <label
                for="customs-message"
                class="mb-1.5 block text-xs font-black uppercase tracking-wider text-bw-steel"
              >
                {{ t('customs.contact.form_message') }}
              </label>

              <textarea
                id="customs-message"
                v-model="form.message"
                rows="4"
                maxlength="1000"
                class="w-full resize-none border border-gray-200 px-4 py-3 text-sm text-bw-granite transition focus:border-bw-blue focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
              ></textarea>
            </div>

            <!-- GDPR -->
            <div>
              <label class="flex items-start gap-3 text-sm leading-relaxed text-bw-steel">
                <input
                  v-model="form.consent"
                  type="checkbox"
                  required
                  class="mt-1 h-4 w-4 accent-bw-blue focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
                />

                <span>
                  I agree that Blue Water Shipping may process my information
                  in order to respond to this customs enquiry.
                </span>
              </label>
            </div>

            <button
              type="submit"
              class="h-12 w-full bg-bw-red text-sm font-black uppercase tracking-wide text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-bw-red focus:ring-offset-2"
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