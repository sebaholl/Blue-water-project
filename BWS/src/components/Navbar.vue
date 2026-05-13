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
      <!-- Left -->
      <div class="flex items-center gap-10">
        <button
          class="burger-button"
          :class="{ active: isMenuOpen, scrolled: isScrolled }"
          aria-label="Toggle menu"
          @click="openMenu"
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
          <a href="#" class="nav-link">{{ t('nav.solutions') }}</a>
          <a href="#" class="nav-link">{{ t('nav.toolbox') }}</a>
        </div>
      </div>

      <!-- Logo -->
      <div class="absolute left-1/2 -translate-x-1/2 transition-transform duration-300 hover:scale-105">
        <BwsLogo :class="isScrolled ? 'text-bws-blue' : 'text-white'" />
      </div>

      <!-- Right -->
      <div class="flex items-center gap-10">
        <div class="hidden md:flex items-center gap-5">
          <!-- Search -->
          <button
            :class="[
              'icon-button text-2xl',
              isScrolled ? 'text-black' : 'text-white',
            ]"
            :aria-label="t('nav.search')"
            @click="openMenuSearch"
          >
            <FontAwesomeIcon :icon="faMagnifyingGlass" />
          </button>

          <!-- Language dropdown -->
          <div class="relative">
            <button
              :class="[
                'language-switch',
                isScrolled
                  ? 'text-black border-black/20'
                  : 'text-white border-white/40',
              ]"
              :aria-label="t('nav.language')"
              @click="isLanguageOpen = !isLanguageOpen"
            >
              <FontAwesomeIcon :icon="faEarthAmericas" class="text-lg" />

              <span class="language-code">
                {{ locale === 'en' ? 'EN' : 'DA' }}
              </span>

              <FontAwesomeIcon :icon="faChevronDown" class="text-xs" />
            </button>

            <Transition name="dropdown">
              <div
                v-if="isLanguageOpen"
                class="absolute right-0 mt-3 w-40 border border-gray-200 bg-white shadow-xl z-[80]"
              >
                <button
                  v-for="language in languages"
                  :key="language.code"
                  class="language-option"
                  :class="{ active: locale === language.code }"
                  @click="changeLanguage(language.code)"
                >
                  <span>{{ language.label }}</span>
                  <span class="font-black">{{ language.code.toUpperCase() }}</span>
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <!-- CTA -->
<RouterLink
  :to="user ? (userRole === 'admin' ? '/admin' : '/dashboard') : '/login'"
  :class="[
    'hidden md:flex h-12 w-[145px] items-center justify-center whitespace-nowrap px-5 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5',
    isScrolled
      ? 'bg-bws-blue text-white hover:bg-blue-900'
      : 'bg-white text-black hover:bg-gray-100',
  ]"
>
  {{ user ? (userRole === 'admin' ? 'Admin' : 'Account') : 'Book transport' }}
</RouterLink>
      </div>
    </nav>
  </header>

  <BurgerMenu
    :is-open="isMenuOpen"
    :open-search="openSearchOnMenuOpen"
    @close="closeMenu"
    @search-opened="openSearchOnMenuOpen = false"
  />
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../composables/useAuth'

import BwsLogo from './UI/BwsLogo.vue'
import BurgerMenu from './BurgerMenu.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faMagnifyingGlass,
  faEarthAmericas,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'

const { t, locale } = useI18n()

const { user, userRole } = useAuth()

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const isLanguageOpen = ref(false)
const openSearchOnMenuOpen = ref(false)

const languages = [
  { code: 'en', label: 'English' },
  { code: 'da', label: 'Dansk' },
]

const changeLanguage = (code) => {
  locale.value = code
  localStorage.setItem('bws-locale', code)
  isLanguageOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const openMenu = () => {
  openSearchOnMenuOpen.value = false
  isLanguageOpen.value = false
  isMenuOpen.value = true
}

const openMenuSearch = () => {
  openSearchOnMenuOpen.value = true
  isLanguageOpen.value = false
  isMenuOpen.value = true
}

const closeMenu = () => {
  isMenuOpen.value = false
  openSearchOnMenuOpen.value = false
}

watch(isMenuOpen, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)

  window.addEventListener('click', (event) => {
    if (!event.target.closest('.language-switch')) {
      isLanguageOpen.value = false
    }
  })
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
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.icon-button:hover {
  transform: translateY(-2px) scale(1.08);
  opacity: 0.8;
}

.language-switch {
  width: 104px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid;
  padding: 0 10px;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease,
    opacity 0.3s ease;
}

.language-switch:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.12);
  opacity: 0.9;
}

.language-code {
  width: 22px;
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
}

.language-option {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  font-size: 0.8rem;
  font-weight: 800;
  color: #111;
  text-transform: uppercase;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.language-option:hover,
.language-option.active {
  background: #0000ab;
  color: white;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
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