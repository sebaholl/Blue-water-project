<template>
  <section class="bg-white">
    <!-- Hero -->
    <section
      class="relative min-h-[calc(100vh-80px)] overflow-hidden bg-bw-blue text-white md:min-h-[calc(100vh-112px)]"
      aria-labelledby="sea-freight-title"
    >
      <!-- Background image -->
      <img
        :src="seaFreightHero"
        alt="Container ship carrying sea freight containers for international logistics"
        class="absolute inset-0 h-full w-full object-cover"
        fetchpriority="high"
      />

      <!-- Blue overlay -->
      <div class="absolute inset-0 bg-bw-blue/75" aria-hidden="true"></div>

      <!-- Hero content -->
      <div
        class="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20 md:min-h-[calc(100vh-112px)] md:px-12"
      >
        <div class="max-w-3xl">
          <p class="text-sm font-black uppercase tracking-[0.3em] text-white/70">
            Sea Freight
          </p>

          <h1
            id="sea-freight-title"
            class="mt-5 text-4xl font-black leading-tight md:text-7xl"
          >
            Reliable sea freight solutions for European B2B logistics.
          </h1>

          <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-xl">
            Move your goods efficiently across global trade routes with flexible FCL, LCL,
            reefer and project cargo solutions.
          </p>

          <div class="mt-8 flex flex-col gap-4 sm:flex-row">
            <RouterLink
              to="/login"
              class="inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-black uppercase tracking-wide text-black transition hover:-translate-y-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bw-blue"
              aria-label="Book sea freight transport through the client portal"
            >
              Book transport
            </RouterLink>

            <a
              href="#process"
              class="inline-flex h-12 items-center justify-center border border-white/40 px-6 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-white hover:text-bw-blue focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bw-blue"
              aria-label="Jump to the sea freight process section"
            >
              View process
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- USP cards -->
    <section class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24" aria-labelledby="sea-freight-benefits">
      <div class="max-w-3xl">
        <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-500">
          Why sea freight
        </p>

        <h2 id="sea-freight-benefits" class="mt-3 text-3xl font-black text-bw-blue md:text-5xl">
          A clearer way to communicate complex logistics.
        </h2>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <article
          v-for="benefit in benefits"
          :key="benefit.title"
          class="border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-bw-blue hover:shadow-lg"
        >
          <p class="text-4xl font-black text-bw-blue" aria-hidden="true">
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
    </section>

    <!-- Services -->
    <section class="bg-gray-100" aria-labelledby="sea-freight-services">
      <div class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-500">
              Services
            </p>

            <h2 id="sea-freight-services" class="mt-3 text-3xl font-black text-bw-blue md:text-5xl">
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
            <h3 class="text-xl font-black text-bw-blue">
              {{ service.title }}
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-gray-600">
              {{ service.text }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section
      id="process"
      class="mx-auto max-w-7xl scroll-mt-28 px-6 py-16 md:px-12 md:py-24"
      aria-labelledby="sea-freight-process"
    >
      <div class="max-w-3xl">
        <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-500">
          Process
        </p>

        <h2 id="sea-freight-process" class="mt-3 text-3xl font-black text-bw-blue md:text-5xl">
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
            <p class="text-5xl font-black text-bw-blue" aria-hidden="true">
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
    </section>

    <!-- Pre-footer CTA -->
    <section class="border-y border-gray-200 bg-gray-100" aria-labelledby="sea-freight-cta">
      <div
        class="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-14 md:flex-row md:items-center md:px-12"
      >
        <div>
          <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-500">
            Need guidance?
          </p>

          <h2 id="sea-freight-cta" class="mt-3 max-w-2xl text-3xl font-black text-bw-blue md:text-4xl">
            Looking for a tailored sea freight solution?
          </h2>

          <p class="mt-4 max-w-xl text-sm leading-relaxed text-gray-600">
            Our prototype supports a clearer customer journey from service information
            to transport request and shipment tracking.
          </p>
        </div>

        <RouterLink
          to="/contact"
          class="inline-flex h-12 items-center justify-center border border-bw-blue bg-white px-6 text-sm font-black uppercase tracking-wide text-bw-blue transition hover:-translate-y-1 hover:bg-bw-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
          aria-label="Contact Blue Water Shipping about a sea freight solution"
        >
          Get in touch
        </RouterLink>
      </div>
    </section>
  </section>
</template>

<script setup>
import { useHead } from '@unhead/vue'

import seaFreightHero from '../assets/SeaFreightShip.webp'

useHead({
  title: 'Sea Freight Solutions | Blue Water Shipping',
  meta: [
    {
      name: 'description',
      content:
        'Reliable sea freight solutions for European B2B logistics with flexible FCL, LCL, reefer and project cargo options.',
    },
    {
      property: 'og:title',
      content: 'Sea Freight Solutions | Blue Water Shipping',
    },
    {
      property: 'og:description',
      content:
        'Reliable sea freight communication prototype focused on European B2B logistics, transport clarity and stronger customer journeys.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
})

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