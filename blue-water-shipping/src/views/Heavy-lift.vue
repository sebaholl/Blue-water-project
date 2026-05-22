<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ShieldCheck, Package, Factory, Scale, Truck, ChevronRight } from 'lucide-vue-next'
import HeavyLiftHero from './Heavy-lift-sections/Heavy-lift-Hero.vue'
import HeavyLiftSpecs from './Heavy-lift-sections/Heavy-lift-specs.vue'
import HeavyLiftCases from './Heavy-lift-sections/Heavy-lift-case.vue'
import HeavyLiftQuote from './Heavy-lift-sections/Heavy-lift-quote.vue'

const { t } = useI18n()

const form = reactive({
  cargoType: '',
  weight: '',
  origin: '',
  destination: '',
  transportMode: '',
  deadline: '',
  name: '',
  company: '',
  email: '',
  phone: '',
  notes: ''
})

</script>

<template>
  <div class="heavy-lift-page"> 
    
    <!-- SECTION 1: HERO -->

    <HeavyLiftHero />
    
    <!-- SECTION 2: SPECS -->

    <HeavyLiftSpecs />

    <!-- SECTION 3: CASE STUDIES -->

    <HeavyLiftCases />
   

    <!-- SECTION 4: QUOTE -->

    <HeavyLiftQuote />
  
  </div>
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
  0% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
  100% { transform: translateY(0px); }
}

.spec-row:last-child {
  border-bottom: none;
}
</style>
