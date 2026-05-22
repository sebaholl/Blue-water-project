<script setup>
import { useHead } from '@unhead/vue'

import HeavyLiftHero from './Heavy-lift-sections/Heavy-lift-Hero.vue'
import HeavyLiftSpecs from './Heavy-lift-sections/Heavy-lift-specs.vue'
import HeavyLiftCases from './Heavy-lift-sections/Heavy-lift-case.vue'
import HeavyLiftQuote from './Heavy-lift-sections/Heavy-lift-quote.vue'

useHead({
  title: 'Heavy-Lift and Industrial Freight | Blue Water Shipping',
  meta: [
    {
      name: 'description',
      content:
        'Heavy-lift and industrial freight solutions for complex cargo, project logistics and specialised transport needs.',
    },
    {
      property: 'og:title',
      content: 'Heavy-Lift and Industrial Freight | Blue Water Shipping',
    },
    {
      property: 'og:description',
      content:
        'Heavy-lift and project cargo prototype for complex industrial freight, specialised transport planning and oversized cargo.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
})
</script>

<template>
  <main
    class="heavy-lift-page"
    aria-labelledby="heavy-lift-page-title"
  >
    <h1
      id="heavy-lift-page-title"
      class="sr-only"
    >
      Heavy-Lift and Industrial Freight
    </h1>

    <HeavyLiftHero />

    <HeavyLiftSpecs />

    <HeavyLiftCases />

    <HeavyLiftQuote />
  </main>
</template>

<style scoped>
.heavy-lift-page {
  font-family: theme('fontFamily.proxima');
}

.hero-animate {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-14px);
  }

  100% {
    transform: translateY(0);
  }
}

.spec-row:last-child {
  border-bottom: none;
}
</style>
