<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Section2 from '@/views/Section2.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <Navbar />

  <main class="pt-24 md:pt-28 min-h-screen">
    <RouterView />
  </main>

  <Footer />
</template>

