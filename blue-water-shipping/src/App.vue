<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import Section2 from '@/views/Section2.vue'
</script>

<template>
  <Navbar />
  <RouterView />
  <Section2 />
  <Footer />
</template>
