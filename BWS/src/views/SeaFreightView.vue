<template>
  <section class="bg-white">
<!-- Hero -->
<section class="relative min-h-[calc(100vh-80px)] overflow-hidden bg-bws-blue text-white md:min-h-[calc(100vh-112px)]">
  <!-- Background image -->
  <img
    :src="seaFreightHero"
    alt="Container ship carrying sea freight containers"
    class="absolute inset-0 h-full w-full object-cover"
  />

  <!-- EVEN blue overlay -->
  <div class="absolute inset-0 bg-bws-blue/75"></div>

  <!-- Hero content -->
  <div
    class="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20 md:min-h-[calc(100vh-112px)] md:px-12"
  >
    <div class="max-w-3xl">
      <p class="text-sm font-black uppercase tracking-[0.3em] text-white/70">
        Sea Freight
      </p>

      <h1 class="mt-5 text-4xl font-black leading-tight md:text-7xl">
        Reliable sea freight solutions for European B2B logistics.
      </h1>

      <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-xl">
        Move your goods efficiently across global trade routes with flexible FCL, LCL,
        reefer and project cargo solutions.
      </p>

      <div class="mt-8 flex flex-col gap-4 sm:flex-row">
        <RouterLink
          to="/login"
          class="inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-black uppercase tracking-wide text-black transition hover:-translate-y-1 hover:bg-gray-100"
        >
          Book transport
        </RouterLink>

        <a
          href="#process"
          class="inline-flex h-12 items-center justify-center border border-white/40 px-6 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-white hover:text-bws-blue"
        >
          View process
        </a>
      </div>
    </div>
  </div>
</section>

    <!-- USP cards -->
    <div class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <div class="max-w-3xl">
        <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
          Why sea freight
        </p>

        <h2 class="mt-3 text-3xl font-black text-bws-blue md:text-5xl">
          A clearer way to communicate complex logistics.
        </h2>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <article
          v-for="benefit in benefits"
          :key="benefit.title"
          class="border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-bws-blue hover:shadow-lg"
        >
          <p class="text-4xl font-black text-bws-blue">
            {{ benefit.number }}
          </p>

          <h3 class="mt-5 text-xl font-black">
            {{ benefit.title }}
          </h3>

          <p class="mt-3 text-sm leading-relaxed text-gray-600">
            {{ benefit.text }}
          </p>
        </article>
      </div>
    </div>

    <!-- Services -->
    <div class="bg-gray-100">
      <div class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
              Services
            </p>

            <h2 class="mt-3 text-3xl font-black text-bws-blue md:text-5xl">
              Sea freight options
            </h2>
          </div>

          <p class="max-w-xl text-sm leading-relaxed text-gray-600">
            The page presents the most important sea freight services in a simple,
            sales-friendly structure so B2B customers can quickly understand their options.
          </p>
        </div>

        <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="service in services"
            :key="service.title"
            class="bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 class="text-xl font-black text-bws-blue">
              {{ service.title }}
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-gray-600">
              {{ service.text }}
            </p>
          </article>
        </div>
      </div>
    </div>

    <!-- Process -->
    <div id="process" class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <div class="max-w-3xl">
        <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
          Process
        </p>

        <h2 class="mt-3 text-3xl font-black text-bws-blue md:text-5xl">
          From request to delivery.
        </h2>
      </div>

      <div class="mt-12 space-y-6">
        <article
          v-for="(step, index) in processSteps"
          :key="step.title"
          class="grid gap-6 border border-gray-200 p-6 md:grid-cols-[120px_1fr]"
        >
          <div>
            <p class="text-5xl font-black text-bws-blue">
              {{ String(index + 1).padStart(2, '0') }}
            </p>
          </div>

          <div>
            <h3 class="text-2xl font-black">
              {{ step.title }}
            </h3>

            <p class="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
              {{ step.text }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <!-- Pre-footer CTA -->
    <div class="border-y border-gray-200 bg-gray-100">
      <div
        class="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-14 md:flex-row md:items-center md:px-12"
      >
        <div>
          <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
            Need guidance?
          </p>

          <h2 class="mt-3 max-w-2xl text-3xl font-black text-bws-blue md:text-4xl">
            Looking for a tailored sea freight solution?
          </h2>

          <p class="mt-4 max-w-xl text-sm leading-relaxed text-gray-600">
            Our prototype supports a clearer customer journey from service information
            to transport request and shipment tracking.
          </p>
        </div>

        <RouterLink
          to="/login"
          class="inline-flex h-12 items-center justify-center border border-bws-blue bg-white px-6 text-sm font-black uppercase tracking-wide text-bws-blue transition hover:-translate-y-1 hover:bg-bws-blue hover:text-white"
        >
          Get in touch
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>

import seaFreightHero from '../assets/SeaFreightShip.jpeg'

const benefits = [
  {
    number: '01',
    title: 'Clear service overview',
    text: 'Customers can quickly understand which sea freight solution fits their shipment.',
  },
  {
    number: '02',
    title: 'B2B-focused communication',
    text: 'Content is structured around decision-making, reliability, and transport clarity.',
  },
  {
    number: '03',
    title: 'Stronger conversion path',
    text: 'The page guides users from information to action through visible CTAs.',
  },
]

const services = [
  {
    title: 'FCL',
    text: 'Full container load solutions for larger shipments with dedicated container capacity.',
  },
  {
    title: 'LCL',
    text: 'Less than container load options for smaller shipments and flexible transport needs.',
  },
  {
    title: 'Reefer',
    text: 'Temperature-controlled sea freight for sensitive or refrigerated cargo.',
  },
  {
    title: 'Project Cargo',
    text: 'Specialized handling for oversized, heavy or complex industrial shipments.',
  },
]

const processSteps = [
  {
    title: 'Request transport',
    text: 'The customer sends a shipment request through the booking flow or client portal.',
  },
  {
    title: 'Plan shipment',
    text: 'Blue Water prepares the best transport option based on route, cargo and timeline.',
  },
  {
    title: 'Move cargo',
    text: 'The shipment is handled through the sea freight network and status updates are tracked.',
  },
  {
    title: 'Deliver and document',
    text: 'The customer receives delivery confirmation and access to important shipment documents.',
  },
]
</script>