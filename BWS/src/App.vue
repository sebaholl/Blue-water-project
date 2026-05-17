<template>
  <Navbar />

  <main class="min-h-screen pt-20 md:pt-28">
    <router-view />
  </main>

  <Footer />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>