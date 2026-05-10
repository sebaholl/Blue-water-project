<template>
  <header
    :class="[
      'fixed top-0 left-0 z-50 w-full border-b transition-all duration-300',
      isScrolled
        ? 'bg-white border-gray-200 shadow-sm'
        : 'bg-bws-blue border-white/20',
    ]"
  >
    <nav class="relative h-24 md:h-28 px-6 md:px-12 flex items-center justify-between">
      <div class="flex items-center gap-10">
        <button
          class="burger-button"
          :class="{ active: isMenuOpen, scrolled: isScrolled }"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          :class="[
            'hidden md:flex items-center gap-10 font-bold uppercase tracking-wide transition-colors',
            isScrolled ? 'text-black' : 'text-white',
          ]"
        >
          <a href="#" class="nav-link">Solutions</a>
          <a href="#" class="nav-link">Toolbox</a>
        </div>
      </div>

      <div class="absolute left-1/2 -translate-x-1/2 transition-transform duration-300 hover:scale-105">
        <BwsLogo :class="isScrolled ? 'text-bws-blue' : 'text-white'" />
      </div>

      <div class="flex items-center gap-10">
        <div class="hidden md:flex items-center gap-5">
          <button
            :class="['icon-button text-2xl', isScrolled ? 'text-black' : 'text-white']"
            aria-label="Search"
          >
            <FontAwesomeIcon :icon="faMagnifyingGlass" />
          </button>

          <button
            :class="['icon-button text-2xl', isScrolled ? 'text-black' : 'text-white']"
            aria-label="Change language"
          >
            <FontAwesomeIcon :icon="faEarthAmericas" />
          </button>
        </div>

        <a
          href="#"
          :class="[
            'hidden md:inline-block px-5 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5',
            isScrolled
              ? 'bg-bws-blue text-white hover:bg-blue-900'
              : 'bg-white text-black hover:bg-gray-100',
          ]"
        >
          Book your transport
        </a>
      </div>
    </nav>
  </header>

  <BurgerMenu :is-open="isMenuOpen" @close="closeMenu" />
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import BwsLogo from './UI/BwsLogo.vue'
import BurgerMenu from './BurgerMenu.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMagnifyingGlass,
  faEarthAmericas,
} from '@fortawesome/free-solid-svg-icons'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(isMenuOpen, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.nav-link {
  position: relative;
  transition: opacity 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.icon-button {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.icon-button:hover {
  transform: translateY(-2px) scale(1.08);
  opacity: 0.8;
}

.burger-button {
  width: 36px;
  height: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.burger-button span {
  display: block;
  height: 3px;
  background: white;
  border-radius: 999px;
  transition:
    transform 0.35s ease,
    opacity 0.25s ease,
    width 0.25s ease,
    background-color 0.25s ease;
  transform-origin: left center;
}

.burger-button span:nth-child(1),
.burger-button span:nth-child(3) {
  width: 36px;
}

.burger-button span:nth-child(2) {
  width: 26px;
}

.burger-button:hover span:nth-child(2) {
  width: 36px;
}

.burger-button:hover span:nth-child(1) {
  width: 28px;
}

.burger-button.scrolled span,
.burger-button.active span {
  background: #0000ab;
}

.burger-button.active span:nth-child(1) {
  transform: rotate(45deg) translate(2px, -3px);
  width: 36px;
}

.burger-button.active span:nth-child(2) {
  width: 0;
  opacity: 0;
}

.burger-button.active span:nth-child(3) {
  transform: rotate(-45deg) translate(2px, 3px);
  width: 36px;
}
</style>