<template>
  <section class="bg-white">
    <!-- Hero -->
    <section class="bg-bw-blue text-white">
      <div class="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <p class="text-sm font-black uppercase tracking-[0.3em] text-white/60">
          Contact
        </p>

        <h1 class="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-7xl">
          Get in touch with the right logistics team.
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-xl">
          Tell us what you need, and we will guide your request to the right department.
        </p>
      </div>
    </section>

    <!-- Contact form section -->
    <section class="bg-gray-100 px-4 py-10 md:px-6 md:py-20">
      <div class="mx-auto grid max-w-7xl overflow-hidden bg-white shadow-xl lg:grid-cols-[1.35fr_0.65fr]">
        <!-- Form area -->
        <div class="p-5 sm:p-8 lg:p-14">
          <div class="text-center">
            <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
              Get in touch
            </p>

            <h2 class="mt-3 text-3xl font-black text-bw-blue md:text-5xl">
              Contact request
            </h2>
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
                  STEP {{ index + 1 }}
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

        <!-- Contact side panel -->
        <aside class="flex flex-col justify-between bg-gray-200 p-6 sm:p-8 lg:p-14">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-500">
              Contact
            </p>

            <h2 class="mt-3 text-3xl font-black text-bw-blue">
              {{ selectedCategory }}
            </h2>

            <p class="mt-4 text-sm leading-relaxed text-gray-600">
              Based on your selected category, your request will be guided to the most relevant department.
            </p>
          </div>

          <div class="mt-12">
            <p class="text-xl font-black">
              {{ contactPerson.name }}
            </p>

            <p class="mt-2 text-sm text-gray-600">
              {{ contactPerson.role }}
            </p>

            <p class="text-sm text-gray-600">
              {{ contactPerson.location }}
            </p>

            <div class="mt-8 flex gap-3">
              <span class="h-4 w-4 rounded-full bg-bw-blue"></span>
              <span class="h-4 w-4 rounded-full bg-gray-500"></span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, reactive, ref } from 'vue'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

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

const contacts = {
  'Contact office': {
    name: 'Blue Water Shipping',
    role: 'General office contact',
    location: 'Esbjerg',
  },
  Transport: {
    name: 'Carsten Steffensen',
    role: 'Head of Procurement',
    location: 'Esbjerg',
  },
  Expertise: {
    name: 'Industry specialist',
    role: 'Customer logistics advisor',
    location: 'Denmark',
  },
  Service: {
    name: 'Service team',
    role: 'Operational support',
    location: 'Global network',
  },
}

const contactPerson = computed(() => contacts[selectedCategory.value])

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
      category: selectedCategory.value,
      assignedContact: contactPerson.value,
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

/**
 * Local input components
 */
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