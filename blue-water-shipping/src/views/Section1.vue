<script setup>
import { useI18n } from 'vue-i18n'
import { ShieldCheck, Ship } from 'lucide-vue-next'
import Section2 from './Section2.vue';
const { t } = useI18n()

</script>

<template>
  <section class="bg-bw-sand text-white relative overflow-hidden">
    <!-- Main content: text on the left -->
    <div class="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
      <div class="lg:max-w-[60%]">
        <!-- Left: heading + body + CTA -->
        <div>
          <h2 class="font-proxima font-black text-4xl md:text-5xl lg:text-7xl text-bw-blue leading-tight mb-6">
            {{ t('section1.heading') }}
          </h2>
          <p class="font-proxima text-base md:text-lg text-bw-steel mb-8 max-w-md">
            {{ t('section1.body') }}
          </p>
          <!-- "View Heavy Lift Specs" button" -->
           <a href="https://www.bws.net/toolbox/container-specifications">
             <button class="font-proxima font-bold text-bw-white bg-[#FE3966] px-8 py-3 rounded text-xl">
               {{ t('section1.cta') }}
             </button>
           </a>
        </div>
      </div>
    </div>

    <!-- Ship image: large, anchored to the right -->
    <img
      class="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-[60vh] w-auto max-w-none"
      src="../assets/big-ship.png"
      :alt="t('section1.placeholder')"
    >

    <!-- Advantages strip -->
    <div class="border-t border-white/10 mb-12"></div>
   
  </section>
  
  <Section2 />
  
  </template>
