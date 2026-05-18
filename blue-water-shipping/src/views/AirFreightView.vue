<template>
  <section class="bg-white">
    <!-- Hero -->
    <section class="relative min-h-[calc(100vh-80px)] overflow-hidden bg-bw-blue text-white md:min-h-[calc(100vh-112px)]">
      <img
        :src="airFreightHero"
        alt="Air freight cargo airplane"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div class="absolute inset-0 bg-bw-blue/75"></div>

      <div class="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20 md:min-h-[calc(100vh-112px)] md:px-12">
        <div class="max-w-4xl">
          <p class="text-sm font-black uppercase tracking-[0.3em] text-white/70">
            Air Freight
          </p>

          <h1 class="mt-5 text-4xl font-black leading-tight md:text-7xl">
            Fast air freight for time-sensitive logistics.
          </h1>

          <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-xl">
            Reliable air cargo solutions for urgent shipments, global supply chains
            and businesses that need speed, control and visibility.
          </p>

          <div class="mt-8 flex flex-col gap-4 sm:flex-row">
            <RouterLink
              to="/login"
              class="inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-black uppercase tracking-wide text-black transition hover:-translate-y-1 hover:bg-gray-100"
            >
              Book transport
            </RouterLink>

            <a
              href="#air-priorities"
              class="inline-flex h-12 items-center justify-center border border-white/40 px-6 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-white hover:text-bw-blue"
            >
              View priorities
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Priority strip -->
    <section id="air-priorities" class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
              Air freight priorities
            </p>

            <h2 class="mt-3 text-3xl font-black leading-tight text-bw-blue md:text-5xl">
              When speed matters, communication has to be clear.
            </h2>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <article
              v-for="priority in priorities"
              :key="priority.title"
              class="border border-gray-200 p-6 transition hover:border-bw-blue hover:shadow-lg"
            >
              <p class="text-5xl font-black text-bw-blue">
                {{ priority.number }}
              </p>

              <h3 class="mt-5 text-xl font-black">
                {{ priority.title }}
              </h3>

              <p class="mt-3 text-sm leading-relaxed text-gray-600">
                {{ priority.text }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Blue service board -->
    <section class="bg-bw-blue text-white">
      <div class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div class="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.25em] text-white/60">
              Service board
            </p>

            <h2 class="mt-3 text-3xl font-black leading-tight md:text-5xl">
              Air cargo solutions for urgent business needs.
            </h2>

            <p class="mt-5 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
              This page presents air freight in a more operational way, focusing on
              time, cargo requirements and shipment control.
            </p>
          </div>

          <div class="grid gap-4">
            <article
              v-for="service in services"
              :key="service.title"
              class="grid gap-4 border border-white/20 bg-white/10 p-6 backdrop-blur-sm md:grid-cols-[90px_1fr]"
            >
              <p class="text-4xl font-black text-white">
                {{ service.code }}
              </p>

              <div>
                <h3 class="text-xl font-black">
                  {{ service.title }}
                </h3>

                <p class="mt-2 text-sm leading-relaxed text-white/75">
                  {{ service.text }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Cargo types -->
    <section class="bg-gray-100">
      <div class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div class="max-w-3xl">
          <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
            Cargo categories
          </p>

          <h2 class="mt-3 text-3xl font-black text-bw-blue md:text-5xl">
            Designed for shipments where timing and handling are critical.
          </h2>
        </div>

        <div class="mt-10 grid gap-6 lg:grid-cols-2">
          <article
            v-for="cargo in cargoTypes"
            :key="cargo.title"
            class="flex flex-col justify-between bg-white p-8 shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              <p class="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                {{ cargo.label }}
              </p>

              <h3 class="mt-3 text-2xl font-black text-bw-blue">
                {{ cargo.title }}
              </h3>

              <p class="mt-4 text-sm leading-relaxed text-gray-600">
                {{ cargo.text }}
              </p>
            </div>

            <div class="mt-8 h-2 w-full bg-gray-100">
              <div class="h-full bg-bw-blue" :class="cargo.width"></div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <div class="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
            Air freight workflow
          </p>

          <h2 class="mt-3 text-3xl font-black text-bw-blue md:text-5xl">
            A faster route from request to departure.
          </h2>

          <p class="mt-5 text-sm leading-relaxed text-gray-600 md:text-base">
            Air freight customers usually need quick responses. The content structure
            therefore focuses on short decision paths and clear transport steps.
          </p>
        </div>

        <div class="grid gap-4">
          <article
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="flex gap-5 border border-gray-200 p-5 transition hover:border-bw-blue hover:shadow-md"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bw-blue text-sm font-black text-white">
              {{ index + 1 }}
            </div>

            <div>
              <h3 class="text-lg font-black">
                {{ step.title }}
              </h3>

              <p class="mt-2 text-sm leading-relaxed text-gray-600">
                {{ step.text }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-gray-100">
      <div class="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-12">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
            Time-sensitive shipment?
          </p>

          <h2 class="mt-3 max-w-3xl text-3xl font-black leading-tight text-bw-blue md:text-5xl">
            Use the client portal to request fast air freight support.
          </h2>
        </div>

        <RouterLink
          to="/login"
          class="inline-flex h-12 items-center justify-center bg-bw-blue px-6 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-blue-900"
        >
          Open portal
        </RouterLink>
      </div>
    </section>
  </section>
</template>

<script setup>
import airFreightHero from '../assets/AirFreight.jpg'

const priorities = [
  {
    number: '01',
    title: 'Speed',
    text: 'Air freight supports urgent shipments where delivery time is the main priority.',
  },
  {
    number: '02',
    title: 'Control',
    text: 'Clear shipment information helps customers make faster transport decisions.',
  },
  {
    number: '03',
    title: 'Visibility',
    text: 'Tracking and status updates improve confidence throughout the shipment flow.',
  },
]

const services = [
  {
    code: 'EXP',
    title: 'Express air freight',
    text: 'For urgent cargo where fast departure and delivery are essential.',
  },
  {
    code: 'STD',
    title: 'Standard air freight',
    text: 'A balanced option for shipments that need speed but also cost awareness.',
  },
  {
    code: 'SPC',
    title: 'Special cargo handling',
    text: 'Support for sensitive, valuable or complex shipments requiring extra care.',
  },
]

const cargoTypes = [
  {
    label: 'Priority cargo',
    title: 'Urgent commercial goods',
    text: 'Used when companies need to protect production schedules, customer deadlines or supply chain continuity.',
    width: 'w-[92%]',
  },
  {
    label: 'Sensitive cargo',
    title: 'High-value or fragile shipments',
    text: 'Air freight can support goods that require controlled handling, reliable timing and strong communication.',
    width: 'w-[78%]',
  },
  {
    label: 'Global cargo',
    title: 'International supply chains',
    text: 'Air transport connects markets quickly when distance and delivery windows are critical.',
    width: 'w-[86%]',
  },
  {
    label: 'Business cargo',
    title: 'Samples and spare parts',
    text: 'Useful for smaller urgent shipments that need to reach customers, partners or production facilities fast.',
    width: 'w-[70%]',
  },
]

const processSteps = [
  {
    title: 'Request',
    text: 'The customer sends shipment details through the booking flow or client portal.',
  },
  {
    title: 'Confirm route',
    text: 'The shipment is matched with a suitable air freight option and schedule.',
  },
  {
    title: 'Prepare cargo',
    text: 'Documents, handling requirements and pickup details are prepared.',
  },
  {
    title: 'Depart',
    text: 'The cargo moves through the air freight network with shipment visibility.',
  },
]
</script>