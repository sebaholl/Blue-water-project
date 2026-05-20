<template>
  <section class="bg-white">
    <!-- Hero -->
    <section class="bg-bw-blue text-white">
      <div class="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <RouterLink
          to="/contact"
          class="text-sm font-black uppercase tracking-[0.25em] text-white/60 transition hover:text-white"
        >
          ← Back to contact
        </RouterLink>

        <p class="mt-10 text-sm font-black uppercase tracking-[0.3em] text-white/60">
          Contact office
        </p>

        <h1 class="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-7xl">
          {{ selectedOffice.name }}
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-xl">
          {{ selectedOffice.description }}
        </p>
      </div>
    </section>

    <!-- Contact form section -->
    <section class="bg-gray-100 px-4 py-10 md:px-6 md:py-20">
      <!-- Office information -->
      <div class="mx-auto mb-8 max-w-7xl bg-white p-6 shadow-xl sm:p-8 lg:p-10">
        <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
          Office details
        </p>

        <div class="mt-6 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 class="text-3xl font-black text-bw-blue">
              {{ selectedOffice.name }}
            </h2>

            <p class="mt-3 text-sm font-bold text-black">
              {{ selectedOffice.address }}
            </p>

            <p class="mt-2 text-sm text-gray-600">
              {{ selectedOffice.country }}
            </p>
          </div>

          <div>
            <p class="text-base leading-relaxed text-gray-600">
              {{ selectedOffice.longText }}
            </p>

            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <p class="text-sm">
                <span class="font-black text-black">Phone:</span>
                {{ selectedOffice.phone }}
              </p>

              <p class="text-sm">
                <span class="font-black text-black">Email:</span>
                {{ selectedOffice.email }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mx-auto grid max-w-7xl overflow-hidden bg-white shadow-xl lg:grid-cols-[1.35fr_0.65fr]">
        <!-- Form area -->
        <div class="p-5 sm:p-8 lg:p-14">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
              Get in touch
            </p>

            <h2 class="mt-3 text-3xl font-black text-bw-blue md:text-5xl">
              Send request to {{ selectedOffice.name }}
            </h2>

            <p class="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
              Fill in the steps below and the request will be connected to this office.
            </p>
          </div>

          <!-- Category buttons -->
          <div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              class="h-12 border text-xs font-black uppercase tracking-wide transition sm:text-sm"
              :class="selectedCategory === category
                ? 'border-bw-blue bg-bw-blue text-white'
                : 'border-gray-300 bg-white text-black hover:border-bw-blue hover:text-bw-blue'"
              @click="selectedCategory = category"
            >
              {{ category }}
            </button>
          </div>

          <!-- Step progress -->
          <div class="mt-10 grid gap-6 md:grid-cols-3">
            <button
              v-for="(step, index) in steps"
              :key="step.id"
              type="button"
              class="text-left"
              @click="currentStep = index"
            >
              <div class="flex items-center justify-between gap-4">
                <p
                  class="text-sm font-black uppercase tracking-wide"
                  :class="currentStep === index ? 'text-bw-blue' : 'text-black'"
                >
                  Step {{ index + 1 }}
                </p>

                <p class="text-sm text-gray-600">
                  {{ step.title }}
                </p>
              </div>

              <div class="mt-3 h-[3px] bg-gray-300">
                <div
                  class="h-full bg-bw-blue transition-all duration-500"
                  :style="{ width: `${stepProgress(index)}%` }"
                ></div>
              </div>
            </button>
          </div>

          <!-- Form content -->
          <form class="mt-10" @submit.prevent="submitForm">
            <!-- Step 1 -->
            <div v-if="currentStep === 0">
              <h3 class="text-xl font-black">
                Tell us about your transport request.
              </h3>

              <div class="mt-8 grid gap-6 md:grid-cols-2">
                <FormInput v-model="form.from" label="From" placeholder="Example: Esbjerg" required />
                <FormInput v-model="form.to" label="To" placeholder="Example: Aberdeen" required />
                <FormInput v-model="form.cargoType" label="Type of cargo" placeholder="Example: Project Cargo" required />
                <FormSelect v-model="form.transport" label="Preferred transport" required :options="transportOptions" />
              </div>
            </div>

            <!-- Step 2 -->
            <div v-if="currentStep === 1">
              <h3 class="text-xl font-black">
                Add cargo information.
              </h3>

              <div class="mt-8 grid gap-6 md:grid-cols-2">
                <FormInput v-model="form.weight" label="Estimated weight" placeholder="Example: 1200 kg" required />
                <FormInput v-model="form.dimensions" label="Cargo dimensions" placeholder="Example: 120 × 80 × 100 cm" />
                <FormSelect v-model="form.urgency" label="Urgency" required :options="urgencyOptions" />
                <FormInput v-model="form.readyDate" label="Ready date" type="date" required />
              </div>

              <div class="mt-6">
                <label class="mb-2 block text-sm font-bold text-gray-700">
                  Additional cargo notes
                </label>

                <textarea
                  v-model="form.cargoNotes"
                  rows="4"
                  class="w-full border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-bw-blue focus:shadow-[0_0_0_3px_rgba(0,0,171,0.12)]"
                  placeholder="Tell us about special handling, fragile cargo, temperature needs, etc."
                ></textarea>
              </div>
            </div>

            <!-- Step 3 -->
            <div v-if="currentStep === 2">
              <h3 class="text-xl font-black">
                How can we contact you?
              </h3>

              <div class="mt-8 grid gap-6 md:grid-cols-2">
                <FormInput v-model="form.name" label="Full name" placeholder="Your name" required />
                <FormInput v-model="form.company" label="Company" placeholder="Company name" required />
                <FormInput v-model="form.email" label="Email" type="email" placeholder="name@company.com" required />
                <FormInput v-model="form.phone" label="Phone" placeholder="+45 ..." />
              </div>
            </div>

            <!-- Navigation -->
            <div class="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                class="h-12 px-6 text-sm font-black uppercase tracking-wide text-gray-500 transition hover:text-bw-blue disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="currentStep === 0"
                @click="currentStep--"
              >
                ← Previous step
              </button>

              <button
                v-if="currentStep < steps.length - 1"
                type="button"
                class="h-12 bg-bw-blue px-6 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-blue-900"
                @click="goNext"
              >
                Next step →
              </button>

              <button
                v-else
                type="submit"
                :disabled="isSubmitting"
                class="h-12 bg-bw-blue px-6 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ isSubmitting ? 'Sending...' : 'Send request' }}
              </button>
            </div>

            <p
              v-if="successMessage"
              class="mt-6 border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700"
            >
              {{ successMessage }}
            </p>

            <p
              v-if="errorMessage"
              class="mt-6 border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600"
            >
              {{ errorMessage }}
            </p>
          </form>
        </div>

        <!-- Rotating contact panel -->
        <aside class="relative min-h-[720px] overflow-hidden bg-gray-200 p-6 sm:p-8 lg:p-10">
          <div class="relative z-10">
            <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-500">
              Contact
            </p>

            <h2 class="mt-3 text-3xl font-black text-bw-blue">
              {{ activeContact.department }}
            </h2>

            <p class="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
              {{ activeContact.description }}
            </p>
          </div>

          <!-- Main contact card -->
          <div class="relative z-10 mt-8">
            <Transition name="contact-fade" mode="out-in">
              <article :key="activeContact.name" class="overflow-hidden bg-white shadow-xl">
                <img
                  :src="activeContact.image"
                  :alt="activeContact.name"
                  class="h-[300px] w-full object-cover"
                />

                <div class="p-6">
                  <p class="text-2xl font-black text-black">
                    {{ activeContact.name }}
                  </p>

                  <p class="mt-2 text-sm text-gray-500">
                    {{ activeContact.role }}
                  </p>

                  <p class="mt-1 text-sm text-gray-500">
                    {{ selectedOffice.name }}, {{ selectedOffice.country }}
                  </p>

                  <div class="mt-6 space-y-2 text-sm">
                    <p class="font-bold text-black">
                      {{ activeContact.phone }}
                    </p>

                    <p class="text-gray-600">
                      {{ activeContact.email }}
                    </p>
                  </div>
                </div>
              </article>
            </Transition>
          </div>

          <!-- Bottom slider controls -->
          <div class="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-5">
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-white text-xs font-black transition hover:scale-105 hover:border-bw-blue hover:text-bw-blue"
              :aria-label="isPaused ? 'Play contact rotation' : 'Pause contact rotation'"
              @click="toggleRotation"
            >
              <span v-if="isPaused">▶</span>
              <span v-else>❚❚</span>
            </button>

            <div class="flex items-center gap-4">
              <button
                v-for="(contact, index) in officeContacts"
                :key="contact.name"
                type="button"
                class="relative h-10 w-10"
                :aria-label="`Show ${contact.name}`"
                @click="selectContact(index)"
              >
                <svg
                  class="absolute inset-0 h-full w-full -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    class="text-gray-400"
                    stroke="currentColor"
                    stroke-width="2.5"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />

                  <path
                    v-if="currentContactIndex === index"
                    class="text-bw-blue"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    fill="none"
                    :stroke-dasharray="`${isPaused ? 100 : progress}, 100`"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                <img
                  :src="contact.image"
                  :alt="contact.name"
                  class="absolute inset-[5px] h-[30px] w-[30px] rounded-full object-cover"
                />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

const route = useRoute()

const offices = [
  {
    slug: 'esbjerg',
    name: 'Esbjerg',
    country: 'Denmark',
    address: 'Trafikhavnskaj 9, 6700 Esbjerg',
    phone: '+45 79 13 40 00',
    email: 'info@bws.dk',
    description: 'Contact the Esbjerg office for sea freight, project cargo and Danish logistics coordination.',
    longText:
      'The Esbjerg office is an important location for Danish logistics activities, especially connected to sea freight, offshore, project cargo and transport coordination.',
  },
  {
    slug: 'copenhagen',
    name: 'Copenhagen',
    country: 'Denmark',
    address: 'Copenhagen, Denmark',
    phone: '+45 79 13 40 00',
    email: 'copenhagen@bws.dk',
    description: 'Contact Copenhagen for transport planning, business logistics and customer support.',
    longText:
      'The Copenhagen area supports Danish and international customers with business logistics, transport coordination and customer-focused solutions.',
  },
  {
    slug: 'aarhus',
    name: 'Aarhus',
    country: 'Denmark',
    address: 'Aarhus, Denmark',
    phone: '+45 79 13 40 00',
    email: 'aarhus@bws.dk',
    description: 'Contact Aarhus for Danish road transport, sea freight and logistics support.',
    longText:
      'The Aarhus office supports transport flows across Denmark and Europe, with a focus on road transport, sea freight and customer support.',
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    country: 'Germany',
    address: 'Hamburg, Germany',
    phone: '+49 40 0000 0000',
    email: 'hamburg@bws.net',
    description: 'Contact Hamburg for European port-related logistics and international transport.',
    longText:
      'Hamburg is one of Europe’s most important logistics areas and supports international sea freight and European transport connections.',
  },
  {
    slug: 'rotterdam',
    name: 'Rotterdam',
    country: 'Netherlands',
    address: 'Rotterdam, Netherlands',
    phone: '+31 10 000 0000',
    email: 'rotterdam@bws.net',
    description: 'Contact Rotterdam for European sea freight and port logistics.',
    longText:
      'Rotterdam is connected to one of Europe’s strongest port regions and supports international cargo movement and logistics planning.',
  },
  {
    slug: 'aberdeen',
    name: 'Aberdeen',
    country: 'United Kingdom',
    address: 'Aberdeen, United Kingdom',
    phone: '+44 1224 000000',
    email: 'aberdeen@bws.net',
    description: 'Contact Aberdeen for offshore, energy and project cargo logistics.',
    longText:
      'Aberdeen supports transport and logistics needs connected to offshore, energy and project cargo activities.',
  },
]

const selectedOffice = computed(() => {
  return offices.find((office) => office.slug === route.params.officeSlug) || offices[0]
})

const currentStep = ref(0)
const selectedCategory = ref('Transport')
const successMessage = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const categories = ['Contact office', 'Transport', 'Expertise', 'Service']
const transportOptions = ['Sea Freight', 'Road Transport', 'Air Freight', 'Rail Transport']
const urgencyOptions = ['Standard', 'Urgent', 'Time-critical']

const form = reactive({
  from: '',
  to: '',
  cargoType: '',
  transport: '',
  weight: '',
  dimensions: '',
  urgency: '',
  readyDate: '',
  cargoNotes: '',
  name: '',
  company: '',
  email: '',
  phone: '',
})

const steps = [
  {
    id: 'transport',
    title: 'Transport Details',
    requiredFields: ['from', 'to', 'cargoType', 'transport'],
  },
  {
    id: 'cargo',
    title: 'Cargo Information',
    requiredFields: ['weight', 'urgency', 'readyDate'],
  },
  {
    id: 'contact',
    title: 'Contact Information',
    requiredFields: ['name', 'company', 'email'],
  },
]

const officeContacts = computed(() => [
  {
    name: 'Carsten Steffensen',
    role: 'Head of Procurement',
    department: 'Transport',
    phone: selectedOffice.value.phone,
    email: selectedOffice.value.email,
    description:
      'Responsible for transport coordination and customer logistics requests.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Maria Jensen',
    role: 'Sea Freight Specialist',
    department: 'Sea Freight',
    phone: selectedOffice.value.phone,
    email: selectedOffice.value.email,
    description:
      'Supports customers with international sea freight and container solutions.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Thomas Andersen',
    role: 'Project Cargo Manager',
    department: 'Project Cargo',
    phone: selectedOffice.value.phone,
    email: selectedOffice.value.email,
    description:
      'Specialised in oversized cargo, industrial logistics and complex transport planning.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
  },
])

const currentContactIndex = ref(0)
const progress = ref(0)
const isPaused = ref(false)
let rotationInterval = null

const activeContact = computed(() => officeContacts.value[currentContactIndex.value])

const toggleRotation = () => {
  isPaused.value = !isPaused.value
}

const selectContact = (index) => {
  currentContactIndex.value = index
  progress.value = 0
}

const stepProgress = (stepIndex) => {
  const step = steps[stepIndex]
  const filled = step.requiredFields.filter((field) => form[field]?.toString().trim()).length

  return Math.round((filled / step.requiredFields.length) * 100)
}

const isCurrentStepValid = computed(() => {
  const requiredFields = steps[currentStep.value].requiredFields

  return requiredFields.every((field) => form[field]?.toString().trim())
})

const goNext = () => {
  errorMessage.value = ''

  if (!isCurrentStepValid.value) {
    errorMessage.value = 'Please fill in all required fields before continuing.'
    return
  }

  if (currentStep.value < steps.length - 1) {
    currentStep.value += 1
  }
}

const resetForm = () => {
  form.from = ''
  form.to = ''
  form.cargoType = ''
  form.transport = ''
  form.weight = ''
  form.dimensions = ''
  form.urgency = ''
  form.readyDate = ''
  form.cargoNotes = ''
  form.name = ''
  form.company = ''
  form.email = ''
  form.phone = ''
  currentStep.value = 0
  selectedCategory.value = 'Transport'
}

const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!isCurrentStepValid.value) {
    errorMessage.value = 'Please fill in all required fields before sending.'
    return
  }

  isSubmitting.value = true

  try {
    await addDoc(collection(db, 'contactRequests'), {
      office: selectedOffice.value.name,
      officeSlug: selectedOffice.value.slug,
      officeCountry: selectedOffice.value.country,
      officeEmail: selectedOffice.value.email,
      selectedContact: activeContact.value.name,
      selectedContactRole: activeContact.value.role,
      category: selectedCategory.value,
      from: form.from,
      to: form.to,
      cargoType: form.cargoType,
      transport: form.transport,
      weight: form.weight,
      dimensions: form.dimensions,
      urgency: form.urgency,
      readyDate: form.readyDate,
      cargoNotes: form.cargoNotes,
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      status: 'New',
      createdAt: serverTimestamp(),
    })

    successMessage.value = 'Your request has been saved. Our team will contact you shortly.'
    resetForm()
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Could not send request. Please check your Firebase permissions.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  rotationInterval = setInterval(() => {
    if (isPaused.value) return

    progress.value += 2

    if (progress.value >= 100) {
      progress.value = 0
      currentContactIndex.value =
        (currentContactIndex.value + 1) % officeContacts.value.length
    }
  }, 100)
})

onUnmounted(() => {
  if (rotationInterval) {
    clearInterval(rotationInterval)
  }
})

const FormInput = defineComponent({
  props: {
    modelValue: String,
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    required: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h('div', [
        h('label', { class: 'mb-2 block text-sm font-bold text-gray-700' }, [
          props.label,
          props.required ? h('span', { class: 'ml-1 text-bw-blue' }, '*') : null,
        ]),
        h('input', {
          value: props.modelValue,
          type: props.type,
          required: props.required,
          placeholder: props.placeholder,
          class:
            'h-12 w-full border border-gray-300 px-4 text-base outline-none transition focus:border-bw-blue focus:shadow-[0_0_0_3px_rgba(0,0,171,0.12)]',
          onInput: (event) => emit('update:modelValue', event.target.value),
        }),
      ])
  },
})

const FormSelect = defineComponent({
  props: {
    modelValue: String,
    label: String,
    options: Array,
    required: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h('div', [
        h('label', { class: 'mb-2 block text-sm font-bold text-gray-700' }, [
          props.label,
          props.required ? h('span', { class: 'ml-1 text-bw-blue' }, '*') : null,
        ]),
        h(
          'select',
          {
            value: props.modelValue,
            required: props.required,
            class:
              'h-12 w-full border border-gray-300 px-4 text-base outline-none transition focus:border-bw-blue focus:shadow-[0_0_0_3px_rgba(0,0,171,0.12)]',
            onChange: (event) => emit('update:modelValue', event.target.value),
          },
          [
            h('option', { value: '', disabled: true }, 'Select option'),
            ...props.options.map((option) => h('option', { value: option }, option)),
          ]
        ),
      ])
  },
})
</script>

<style scoped>
.contact-fade-enter-active,
.contact-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.contact-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.contact-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>