<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, Search, Globe } from 'lucide-vue-next'

const { t } = useI18n()

const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-bw-blue shadow-md' : 'bg-transparent',
    ]"
  >
    <div class="w-full mx-auto px-6 h-20 flex items-center justify-between gap-10 mt-2">

      <!-- Left: Hamburger + Nav Links -->
      <div class="flex items-start gap-10">
        <button
          class="text-white hover:text-bw-sand transition-colors"
          aria-label="Open menu"
        >
          <Menu class="w-9 h-9" />
        </button>

        <a
          href="#"
          class="text-white font-proxima font-semibold text-2xl
                 hover:text-bw-sand transition-colors tracking-wide"
        >
          {{ t('nav.toolbox') }}
        </a>

        <a
          href="#"
          class="text-white font-proxima font-semibold text-2xl
                 hover:text-bw-sand transition-colors tracking-wide"
        >
          {{ t('nav.solutions') }}
        </a>
      </div>

      <!-- Center: Logo -->
      <div class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none select-none">
        <img src="@/assets/BWS-white.svg" alt="Blue Water Shipping" class="h-20 w-auto" />
      </div>

      <!-- Right: Search + Globe + CTA -->
      <div class="flex items-center gap-5">
        <button
          class="text-white hover:text-bw-sand transition-colors"
          aria-label="Search"
        >
          <Search class="w-8 h-8" />
        </button>

        <button
          class="text-white hover:text-bw-sand transition-colors"
          aria-label="Change language"
        >
          <Globe class="w-8 h-8" />
        </button>

        <a
          href="#"
          class="bg-bw-red text-white font-proxima font-semibold text-xl
                 px-6 py-3 rounded
                 hover:brightness-110 transition-all whitespace-nowrap"
        >
          {{ t('nav.bookTransport') }}
        </a>
      </div>
    </div>
  </nav>
</template>
