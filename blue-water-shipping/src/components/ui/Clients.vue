<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const logos = [
  {
    id: 'logo-1',
    description: 'Maersk',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg',
  },
  {
    id: 'logo-2',
    description: 'MSC',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg',
  },
  {
    id: 'logo-3',
    description: 'CMA CGM',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg',
  },
  {
    id: 'logo-4',
    description: 'Hapag-Lloyd',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-wordmark.svg',
  },
  {
    id: 'logo-5',
    description: 'COSCO',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg',
  },
  {
    id: 'logo-6',
    description: 'Evergreen',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg',
  },
  {
    id: 'logo-7',
    description: 'Yang Ming',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg',
  },
  {
    id: 'logo-8',
    description: 'ONE',
    image: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg',
  },
]
</script>

<template>
  <section class="bg-bw-white py-20 md:py-28">
    <!-- Heading -->
    <div class="container mx-auto px-6 text-center mb-12 md:mb-16">
      <h2 class="font-proxima font-bold text-bw-blue text-2xl md:text-3xl lg:text-4xl text-pretty">
        {{ t('clients.heading') }}
      </h2>
    </div>

    <!-- Marquee wrapper — overflow hidden here so the track can be full-width -->
    <div class="relative overflow-hidden">
      <div class="marquee-track flex">
        <div
          v-for="(logo, index) in [...logos, ...logos]"
          :key="`${logo.id}-${index}`"
          class="mx-10 flex shrink-0 items-center justify-center"
        >
          <img
            :src="logo.image"
            :alt="logo.description"
            class="h-7 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          />
        </div>
      </div>

      <!-- Gradient fade — left -->
      <div class="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bw-white to-transparent" />
      <!-- Gradient fade — right -->
      <div class="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bw-white to-transparent" />
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.marquee-track {
  /* Each half = one full set of logos; -50% snaps back to the identical start frame */
  animation: marquee 35s linear infinite;
  width: max-content;
}
</style>
