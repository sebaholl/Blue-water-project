<template>
  <Navbar />

  <main class="min-h-screen pt-20 md:pt-28">
    <router-view />
  </main>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>