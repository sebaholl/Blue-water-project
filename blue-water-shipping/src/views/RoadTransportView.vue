<template>
  <section class="bg-white">
    <!-- Hero -->
    <section class="relative min-h-[calc(100vh-80px)] overflow-hidden bg-bw-blue text-white md:min-h-[calc(100vh-112px)]">
      <img
        :src="roadTransportHero"
        alt="Blue Water road transport truck"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div class="absolute inset-0 bg-bw-blue/75"></div>

      <div class="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20 md:min-h-[calc(100vh-112px)] md:px-12">
        <div class="max-w-4xl">
          <p class="text-sm font-black uppercase tracking-[0.3em] text-white/70">
            Road Transport
          </p>

          <h1 class="mt-5 text-4xl font-black leading-tight md:text-7xl">
            Flexible road transport across Europe.
          </h1>

          <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-xl">
            Reliable road freight for companies that need fast regional delivery,
            strong route control and flexible European transport options.
          </p>

          <div class="mt-8 flex flex-col gap-4 sm:flex-row">
            <RouterLink
              to="/login"
              class="inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-black uppercase tracking-wide text-black transition hover:-translate-y-1 hover:bg-gray-100"
            >
              Book transport
            </RouterLink>

            <a
              href="#road-network"
              class="inline-flex h-12 items-center justify-center border border-white/40 px-6 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-white hover:text-bw-blue"
            >
              View network
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Route strip -->
    <section id="road-network" class="border-y border-gray-200 bg-gray-50">
      <div class="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12">
        <div
          v-for="route in routes"
          :key="route.title"
          class="flex items-center gap-5"
        >
          <div class="flex h-14 w-14 items-center justify-center bg-bw-blue text-lg font-black text-white">
            {{ route.number }}
          </div>

          <div>
            <p class="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
              {{ route.label }}
            </p>

            <h3 class="mt-1 text-lg font-black text-bw-blue">
              {{ route.title }}
            </h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Large content block -->
    <section class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <!-- Image -->
        <div class="relative overflow-hidden">
          <img
            :src="roadTransportHero"
            alt="European road freight"
            class="h-full min-h-[500px] w-full object-cover"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

          <div class="absolute bottom-8 left-8 max-w-md text-white">
            <p class="text-xs font-black uppercase tracking-[0.25em] text-white/70">
              European coverage
            </p>

            <h2 class="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Built around speed and flexibility.
            </h2>
          </div>
        </div>

        <!-- Side content -->
        <div class="flex flex-col justify-between bg-bw-blue p-8 text-white md:p-12">
          <div>
            <p class="text-xs font-black uppercase tracking-[0.25em] text-white/60">
              Road freight advantages
            </p>

            <div class="mt-10 space-y-8">
              <article
                v-for="advantage in advantages"
                :key="advantage.title"
                class="border-b border-white/15 pb-8"
              >
                <h3 class="text-2xl font-black">
                  {{ advantage.title }}
                </h3>

                <p class="mt-3 text-sm leading-relaxed text-white/75">
                  {{ advantage.text }}
                </p>
              </article>
            </div>
          </div>

          <RouterLink
            to="/track-trace"
            class="mt-10 inline-flex h-12 items-center justify-center border border-white/30 text-sm font-black uppercase tracking-wide transition hover:bg-white hover:text-bw-blue"
          >
            Track shipment
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Stacked logistics cards -->
    <section class="bg-gray-100">
      <div class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div class="max-w-3xl">
          <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
            Services
          </p>

          <h2 class="mt-3 text-3xl font-black text-bw-blue md:text-5xl">
            Different transport options for different shipment needs.
          </h2>
        </div>

        <div class="mt-12 space-y-6">
          <article
            v-for="service in services"
            :key="service.title"
            class="grid gap-8 border border-gray-200 bg-white p-8 transition hover:border-bw-blue hover:shadow-xl md:grid-cols-[180px_1fr_auto]"
          >
            <div>
              <p class="text-6xl font-black text-bw-blue">
                {{ service.number }}
              </p>
            </div>

            <div>
              <h3 class="text-2xl font-black">
                {{ service.title }}
              </h3>

              <p class="mt-4 max-w-3xl text-sm leading-relaxed text-gray-600">
                {{ service.text }}
              </p>
            </div>

            <div class="flex items-center">
              <span class="border border-bw-blue px-5 py-3 text-xs font-black uppercase tracking-wide text-bw-blue">
                {{ service.tag }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Timeline checklist -->
    <section class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
            Shipment process
          </p>

          <h2 class="mt-3 text-3xl font-black leading-tight text-bw-blue md:text-5xl">
            A clear transport flow from pickup to delivery.
          </h2>
        </div>

        <div class="space-y-5">
          <article
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="flex gap-6 border-l-4 border-bw-blue bg-gray-50 p-6"
          >
            <div class="text-2xl font-black text-bw-blue">
              {{ String(index + 1).padStart(2, '0') }}
            </div>

            <div>
              <h3 class="text-xl font-black">
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
        Ready to move goods across Europe?
      </p>

      <h2 class="mt-3 max-w-3xl text-3xl font-black leading-tight text-bw-blue md:text-5xl">
        Use the client portal to submit and manage your transport requests.
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
import roadTransportHero from '../assets/RoadTransport.jpeg'

const routes = [
  {
    number: '01',
    label: 'Regional',
    title: 'European delivery',
  },
  {
    number: '02',
    label: 'Flexible',
    title: 'Part & full loads',
  },
  {
    number: '03',
    label: 'Connected',
    title: 'Door-to-door flow',
  },
]

const advantages = [
  {
    title: 'Flexible scheduling',
    text: 'Road freight allows companies to adapt delivery timing and routing more easily between European destinations.',
  },
  {
    title: 'Regional speed',
    text: 'Efficient road networks support faster transport between suppliers, warehouses and customers.',
  },
  {
    title: 'Connected logistics',
    text: 'Road transport works together with sea freight, warehousing and terminal operations.',
  },
]

const services = [
  {
    number: '01',
    title: 'Full truck load',
    text: 'Dedicated truck capacity for larger shipments where direct routing and timing are important.',
    tag: 'FTL',
  },
  {
    number: '02',
    title: 'Part load transport',
    text: 'Flexible transport for smaller shipments that do not require a full truck.',
    tag: 'LTL',
  },
  {
    number: '03',
    title: 'Time-critical transport',
    text: 'Road freight solutions for urgent shipments and strict delivery schedules.',
    tag: 'Express',
  },
]

const processSteps = [
  {
    title: 'Pickup',
    text: 'Goods are collected from the supplier, warehouse or production facility.',
  },
  {
    title: 'Planning',
    text: 'Routes and schedules are prepared based on destination and delivery requirements.',
  },
  {
    title: 'Transport',
    text: 'The shipment moves through the European road network with tracking updates.',
  },
  {
    title: 'Delivery',
    text: 'Goods arrive at the destination and delivery documentation is completed.',
  },
]
</script>