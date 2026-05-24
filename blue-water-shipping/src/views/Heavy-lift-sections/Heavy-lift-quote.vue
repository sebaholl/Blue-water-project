<script setup>
import { reactive, ref } from 'vue'
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

const showSuccess = ref(false)

const submitForm = () => {
  showSuccess.value = true
}

</script>

<template>

      <section id="quote-section" class="grid md:grid-cols-2">
      <!-- Left Column: Trust & Context -->
      <div class="bg-bw-blue p-8 md:p-10 text-white flex flex-col justify-center">
  

        <h2 class="text-3xl md:text-4xl font-black leading-tight mb-4">
          {{ t('heavy_lift.contact.heading') }}
        </h2>

        <p class="text-white/70 text-base leading-relaxed max-w-md mb-6">
          {{ t('heavy_lift.contact.body') }}
        </p>

        <div class="space-y-3">
          <div v-for="i in 3" :key="i" class="flex items-center gap-3 text-white/90 font-bold text-sm">
            <div class="flex-shrink-0 w-6 h-6 bg-bw-green/20 rounded-full flex items-center justify-center">
              <ShieldCheck class="w-4 h-4 text-bw-green" />
            </div>
            <span>{{ t(`heavy_lift.contact.trust_${i}`) }}</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Form -->
      <div class="bg-bw-sand p-6 sm:p-8 lg:p-10">
        <div class="bg-white shadow-2xl p-6 md:p-8 border border-gray-100">
          <h3 class="text-bw-blue font-black text-xl mb-6 border-b border-gray-100 pb-3">
            {{ t('heavy_lift.contact.form_heading') }}
          </h3>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Cargo Type <span class="text-bw-blue">*</span></label>
                <select v-model="form.cargoType" required class="h-12 w-full border border-gray-200 px-4 text-sm font-bold outline-none transition focus:border-bw-blue appearance-none bg-bw-sand/30">
                  <option value="" disabled>Select Cargo Type</option>
                  <option>Steel & Pipes</option>
                  <option>Machinery & Equipment</option>
                  <option>Offshore / Energy Modules</option>
                  <option>Wind Energy Components</option>
                  <option>Mining Equipment</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Approximate Weight <span class="text-bw-blue">*</span></label>
                <select v-model="form.weight" required class="h-12 w-full border border-gray-200 px-4 text-sm font-bold outline-none transition focus:border-bw-blue appearance-none bg-bw-sand/30">
                  <option value="" disabled>Select Weight Range</option>
                  <option>Under 10 tons</option>
                  <option>10–50 tons</option>
                  <option>50–200 tons</option>
                  <option>200–500 tons</option>
                  <option>500+ tons</option>
                </select>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Origin Country</label>
                <input v-model="form.origin" type="text" placeholder="e.g. China" class="h-12 w-full border border-gray-200 px-4 text-sm font-bold outline-none transition focus:border-bw-blue bg-bw-sand/30" />
              </div>
              <div>
                <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Destination Country</label>
                <input v-model="form.destination" type="text" placeholder="e.g. Norway" class="h-12 w-full border border-gray-200 px-4 text-sm font-bold outline-none transition focus:border-bw-blue bg-bw-sand/30" />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Transport Mode</label>
                <select v-model="form.transportMode" class="h-12 w-full border border-gray-200 px-4 text-sm font-bold outline-none transition focus:border-bw-blue appearance-none bg-bw-sand/30">
                  <option value="">Preferred Transport Mode</option>
                  <option>Sea Freight</option>
                  <option>Road Transport</option>
                  <option>Sea + Road Combined</option>
                  <option>Multimodal</option>
                  <option>Not Sure — Need Advice</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Desired Delivery</label>
                <input v-model="form.deadline" type="text" placeholder="e.g. Q3 2025" class="h-12 w-full border border-gray-200 px-4 text-sm font-bold outline-none transition focus:border-bw-blue bg-bw-sand/30" />
              </div>
            </div>

            <div class="space-y-4 pt-3 border-t border-gray-100">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Full Name <span class="text-bw-blue">*</span></label>
                  <input v-model="form.name" required type="text" class="h-12 w-full border border-gray-200 px-4 text-sm font-bold outline-none transition focus:border-bw-blue" />
                </div>
                <div>
                  <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Company Name <span class="text-bw-blue">*</span></label>
                  <input v-model="form.company" required type="text" class="h-12 w-full border border-gray-200 px-4 text-sm font-bold outline-none transition focus:border-bw-blue" />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Email Address <span class="text-bw-blue">*</span></label>
                  <input v-model="form.email" required type="email" class="h-12 w-full border border-gray-200 px-4 text-sm font-bold outline-none transition focus:border-bw-blue" />
                </div>
                <div>
                  <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Phone Number</label>
                  <input v-model="form.phone" type="tel" class="h-12 w-full border border-gray-200 px-4 text-sm font-bold outline-none transition focus:border-bw-blue" />
                </div>
              </div>
              <div>
                <label class="mb-2 block text-xs font-black uppercase tracking-widest text-bw-steel">Additional Notes</label>
                <textarea v-model="form.notes" rows="4" placeholder="Any special requirements, permits needed, or project context…" class="w-full border border-gray-200 px-4 py-3 text-sm font-bold outline-none transition focus:border-bw-blue"></textarea>
              </div>
            </div>

            <button type="submit" class="w-full h-12 bg-bw-red text-white font-black uppercase tracking-widest text-sm shadow-xl transition hover:opacity-90 hover:scale-[1.02] active:scale-95">
              {{ t('heavy_lift.contact.form_submit') }} →
            </button>
            <p
              v-if="showSuccess"
              aria-live="polite"
              class="mt-2 border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700"
            >
              Form submitted successfully!
            </p>

            <p class="text-[10px] text-bw-steel text-center mt-4 font-bold uppercase tracking-widest opacity-60">
              {{ t('heavy_lift.contact.form_footer') }}
            </p>
          </form>
        </div>
      </div>
    </section>

</template>