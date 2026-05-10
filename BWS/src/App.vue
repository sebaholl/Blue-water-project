<template>
  <Navbar />

  <main class="pt-24 md:pt-28 min-h-screen">
    <section class="min-h-screen bg-gray-100 px-6 py-10">
      <h1 class="text-3xl font-bold text-bws-blue">
        Blue Water Shipping Redesign
      </h1>

      <p class="mt-4 max-w-xl text-gray-700">
        Homepage content will go here. This section also gives the page height so we can test the navbar scroll effect.
      </p>
    </section>
  </main>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>