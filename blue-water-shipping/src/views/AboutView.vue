<template>
  <section class="overflow-hidden bg-white">
    <!-- Hero -->
    <section
      class="relative bg-bw-blue text-white"
      aria-labelledby="about-title"
    >
      <div class="absolute inset-0 opacity-20 hero-grid" aria-hidden="true"></div>

      <div
        class="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-12 md:py-32 lg:grid-cols-[1fr_0.9fr] lg:items-center"
      >
        <div>
          <p class="text-sm font-black uppercase tracking-[0.3em] text-white/70">
            About Blue Water Shipping
          </p>

          <h1
            id="about-title"
            class="mt-5 max-w-5xl text-4xl font-black leading-tight md:text-7xl"
          >
            Logistics powered by people, precision and global movement.
          </h1>

          <p class="mt-6 max-w-3xl text-base leading-relaxed text-white/80 md:text-xl">
            Blue Water Shipping connects businesses with transport solutions across sea,
            road, air and project logistics — combining global reach with local expertise.
          </p>
        </div>

        <!-- Floating cards -->
        <div
          class="relative hidden min-h-[420px] lg:block"
          aria-label="Blue Water Shipping core strengths"
        >
          <div class="floating-card top-0 left-10">
            <p class="card-label">Network</p>
            <h3>Global logistics</h3>
          </div>

          <div class="floating-card top-32 right-0 delay-1">
            <p class="card-label">Expertise</p>
            <h3>Transport planning</h3>
          </div>

          <div class="floating-card bottom-12 left-0 delay-2">
            <p class="card-label">People</p>
            <h3>A people’s business</h3>
          </div>

          <div
            class="absolute inset-16 border border-white/20"
            aria-hidden="true"
          ></div>

          <div
            class="absolute inset-28 border border-white/10"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </section>

    <!-- Intro split -->
    <section
      class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24"
      aria-labelledby="about-intro-title"
    >
      <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-500">
            Who we are
          </p>

          <h2
            id="about-intro-title"
            class="mt-3 text-3xl font-black leading-tight text-bw-blue md:text-5xl"
          >
            A transport partner for companies moving goods across markets.
          </h2>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <article
            v-for="intro in introCards"
            :key="intro.title"
            class="group border border-gray-200 p-6 transition hover:-translate-y-2 hover:border-bw-blue hover:shadow-xl"
          >
            <p class="text-4xl font-black text-bw-blue" aria-hidden="true">
              {{ intro.number }}
            </p>

            <h3 class="mt-5 text-xl font-black">
              {{ intro.title }}
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-gray-600">
              {{ intro.text }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Moving stats band -->
    <section
      class="bg-gray-100 py-10"
      aria-labelledby="stats-title"
    >
      <h2 id="stats-title" class="sr-only">
        Blue Water Shipping logistics services
      </h2>

      <div class="stats-track">
        <div class="stats-row">
          <span v-for="item in movingStats" :key="item">
            {{ item }}
          </span>

          <span
            v-for="item in movingStats"
            :key="`${item}-copy`"
            aria-hidden="true"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </section>

    <!-- Capabilities -->
    <section
      class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24"
      aria-labelledby="capabilities-title"
    >
      <div class="max-w-3xl">
        <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-500">
          Logistics expertise
        </p>

        <h2
          id="capabilities-title"
          class="mt-3 text-3xl font-black text-bw-blue md:text-5xl"
        >
          Solutions across the transport chain.
        </h2>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="area in businessAreas"
          :key="area.title"
          class="capability-card"
        >
          <div class="capability-number" aria-hidden="true">
            {{ area.number }}
          </div>

          <h3 class="mt-8 text-2xl font-black">
            {{ area.title }}
          </h3>

          <p class="mt-4 text-sm leading-relaxed text-gray-600">
            {{ area.text }}
          </p>
        </article>
      </div>
    </section>

    <!-- People timeline -->
    <section
      class="bg-bw-blue text-white"
      aria-labelledby="people-title"
    >
      <div class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.25em] text-white/70">
              A people’s business
            </p>

            <h2
              id="people-title"
              class="mt-3 text-3xl font-black leading-tight md:text-5xl"
            >
              Logistics is built on trust, communication and responsibility.
            </h2>
          </div>

          <div
            class="relative space-y-6 before:absolute before:left-6 before:top-0 before:h-full before:w-px before:bg-white/20"
          >
            <article
              v-for="point in peoplePoints"
              :key="point.title"
              class="relative ml-16 border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white hover:text-bw-blue"
            >
              <div
                class="absolute -left-[52px] top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-black text-bw-blue"
                aria-hidden="true"
              >
                {{ point.number }}
              </div>

              <h3 class="text-xl font-black">
                {{ point.title }}
              </h3>

              <p class="mt-3 text-sm leading-relaxed opacity-75">
                {{ point.text }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand video -->
    <section
      class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24"
      aria-labelledby="video-title"
    >
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-500">
            Blue Water Shipping
          </p>

          <h2
            id="video-title"
            class="mt-3 text-3xl font-black leading-tight text-bw-blue md:text-5xl"
          >
            See how Blue Water connects people, cargo and global logistics.
          </h2>

          <p class="mt-5 text-sm leading-relaxed text-gray-600 md:text-base">
            This video gives a stronger visual feeling of the company, its logistics operations
            and the people behind the transport solutions.
          </p>
        </div>

        <div class="overflow-hidden border border-gray-200 bg-black shadow-xl">
          <iframe
            class="aspect-video w-full"
            src="https://www.youtube.com/embed/eD7QTX4vZx8?start=3"
            title="Blue Water Shipping corporate video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'About Blue Water Shipping | Global Logistics Partner',
  meta: [
    {
      name: 'description',
      content:
        'Learn more about Blue Water Shipping as a global logistics partner with strong experience in transport and supply chain solutions.',
    },
    {
      property: 'og:title',
      content: 'About Blue Water Shipping | Global Logistics Partner',
    },
    {
      property: 'og:description',
      content:
        'Learn more about Blue Water Shipping and its global transport, logistics and supply chain expertise.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
})

const introCards = [
  {
    number: '01',
    title: 'Global movement',
    text: 'Transport solutions that help companies move goods across markets, routes and industries.',
  },
  {
    number: '02',
    title: 'Operational control',
    text: 'Planning, coordination and documentation support the full logistics journey.',
  },
  {
    number: '03',
    title: 'Industry understanding',
    text: 'Different cargo, industries and customers require flexible logistics thinking.',
  },
  {
    number: '04',
    title: 'Long-term partnerships',
    text: 'Strong logistics depends on reliable collaboration and trust between people.',
  },
]

const movingStats = [
  'Sea Freight',
  'Road Transport',
  'Air Freight',
  'Project Logistics',
  'Warehousing',
  'Customs',
  'Supply Chain',
]

const businessAreas = [
  {
    number: '01',
    title: 'Sea freight',
    text: 'Container shipping and global ocean freight solutions for international trade.',
  },
  {
    number: '02',
    title: 'Road transport',
    text: 'European road freight connecting ports, suppliers, warehouses and customers.',
  },
  {
    number: '03',
    title: 'Air freight',
    text: 'Fast cargo solutions for urgent, valuable and time-critical shipments.',
  },
  {
    number: '04',
    title: 'Project logistics',
    text: 'Specialized planning for complex, oversized and industry-specific cargo.',
  },
]

const peoplePoints = [
  {
    number: '01',
    title: 'Local expertise',
    text: 'Close customer knowledge helps create practical and efficient logistics solutions.',
  },
  {
    number: '02',
    title: 'Global mindset',
    text: 'International transport requires coordination across countries, partners and transport modes.',
  },
  {
    number: '03',
    title: 'Responsible operations',
    text: 'Modern logistics must balance efficiency, safety, sustainability and long-term value.',
  },
]
</script>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px);
  background-size: 70px 70px;
}

.floating-card {
  position: absolute;
  width: 250px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.12);
  padding: 1.5rem;
  backdrop-filter: blur(12px);
  animation: float 5s ease-in-out infinite;
}

.floating-card h3 {
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 900;
}

.card-label {
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(255,255,255,0.7);
}

.delay-1 {
  animation-delay: 0.8s;
}

.delay-2 {
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-14px);
  }
}

.stats-track {
  overflow: hidden;
  white-space: nowrap;
}

.stats-row {
  display: inline-flex;
  gap: 4rem;
  animation: marquee 28s linear infinite;
}

.stats-row span {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  text-transform: uppercase;
  color: #0000ab;
  opacity: 0.18;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.capability-card {
  position: relative;
  min-height: 320px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  padding: 2rem;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.capability-card::before {
  content: '';
  position: absolute;
  inset: auto -30% -45% -30%;
  height: 180px;
  background: #0000ab;
  opacity: 0.08;
  transform: rotate(-8deg);
  transition: opacity 0.25s ease;
}

.capability-card:hover {
  transform: translateY(-8px);
  border-color: #0000ab;
  box-shadow: 0 20px 40px rgba(0, 0, 171, 0.12);
}

.capability-card:hover::before {
  opacity: 0.15;
}

.capability-number {
  font-size: 4rem;
  font-weight: 900;
  color: #0000ab;
  line-height: 1;
}
</style>