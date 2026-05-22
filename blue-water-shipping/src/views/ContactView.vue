<template>
  <section class="bg-white">
    <!-- Hero -->
    <section
      class="bg-bw-blue text-white"
      aria-labelledby="contact-page-title"
    >
      <div class="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <p class="text-sm font-black uppercase tracking-[0.3em] text-white/70">
          Contact
        </p>

        <h1
          id="contact-page-title"
          class="mt-5 max-w-5xl text-4xl font-black leading-tight md:text-7xl"
        >
          Find the right Blue Water office.
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-xl">
          Choose the office or area that best matches your logistics request. Each office page includes contact details and a guided transport request form.
        </p>
      </div>
    </section>

    <!-- Offices -->
    <section
      class="bg-gray-100 px-6 py-16 md:px-12 md:py-24"
      aria-labelledby="local-offices-title"
    >
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <p class="text-sm font-black uppercase tracking-[0.25em] text-gray-500">
            Local offices
          </p>

          <h2
            id="local-offices-title"
            class="mt-3 text-3xl font-black text-bw-blue md:text-5xl"
          >
            Contact the team closest to your transport needs.
          </h2>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="office in offices"
            :key="office.slug"
            class="group bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p class="text-xs font-black uppercase tracking-[0.25em] text-gray-500">
              {{ office.country }}
            </p>

            <h3 class="mt-3 text-2xl font-black text-bw-blue">
              {{ office.name }}
            </h3>

            <p class="mt-4 text-sm leading-relaxed text-gray-600">
              {{ office.shortDescription }}
            </p>

            <address class="mt-6 space-y-2 text-sm not-italic text-gray-600">
              <p>
                <span class="font-black text-black">Phone:</span>
                <a
                  :href="`tel:${office.phone.replaceAll(' ', '')}`"
                  class="transition hover:text-bw-blue focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
                >
                  {{ office.phone }}
                </a>
              </p>

              <p>
                <span class="font-black text-black">Email:</span>
                <a
                  :href="`mailto:${office.email}`"
                  class="transition hover:text-bw-blue focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
                >
                  {{ office.email }}
                </a>
              </p>
            </address>

            <RouterLink
              :to="`/contact/${office.slug}`"
              class="mt-8 inline-flex h-12 items-center justify-center bg-bw-blue px-6 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
              :aria-label="`Read more about the ${office.name} office`"
            >
              Read more
            </RouterLink>
          </article>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Contact Blue Water Shipping | Local Offices',
  meta: [
    {
      name: 'description',
      content:
        'Find the right Blue Water Shipping office and contact the team for transport, sea freight and logistics requests.',
    },
    {
      property: 'og:title',
      content: 'Contact Blue Water Shipping | Local Offices',
    },
    {
      property: 'og:description',
      content:
        'Find local Blue Water Shipping offices and contact the right team for sea freight, transport and logistics requests.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
})

const offices = [
  {
    slug: 'esbjerg',
    name: 'Esbjerg',
    country: 'Denmark',
    phone: '+45 79 13 40 00',
    email: 'info@bws.dk',
    shortDescription:
      'Main Danish office and strong logistics hub for sea freight, project cargo and transport coordination.',
  },
  {
    slug: 'copenhagen',
    name: 'Copenhagen',
    country: 'Denmark',
    phone: '+45 79 13 40 00',
    email: 'copenhagen@bws.dk',
    shortDescription:
      'Supports Danish and international customers with transport planning and business logistics.',
  },
  {
    slug: 'aarhus',
    name: 'Aarhus',
    country: 'Denmark',
    phone: '+45 79 13 40 00',
    email: 'aarhus@bws.dk',
    shortDescription:
      'A strong Danish logistics location for road transport, sea freight and customer support.',
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    country: 'Germany',
    phone: '+49 40 0000 0000',
    email: 'hamburg@bws.net',
    shortDescription:
      'Important European transport location connected to international sea freight and port activity.',
  },
  {
    slug: 'rotterdam',
    name: 'Rotterdam',
    country: 'Netherlands',
    phone: '+31 10 000 0000',
    email: 'rotterdam@bws.net',
    shortDescription:
      'European logistics location connected to one of the strongest port areas in Europe.',
  },
  {
    slug: 'aberdeen',
    name: 'Aberdeen',
    country: 'United Kingdom',
    phone: '+44 1224 000000',
    email: 'aberdeen@bws.net',
    shortDescription:
      'Supports transport and logistics needs connected to offshore, energy and project cargo.',
  },
]
</script>