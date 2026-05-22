<template>
  <header
    :class="[
      'fixed left-0 top-0 z-50 w-full border-b transition-all duration-300',
      isScrolled
        ? 'border-gray-200 bg-white shadow-sm'
        : 'border-white/20 bg-bw-blue',
    ]"
  >
    <nav
      class="relative flex h-20 items-center justify-between px-5 md:h-28 md:px-12"
      aria-label="Main navigation"
    >
      <!-- Left -->
      <div class="flex items-center gap-6 md:gap-10">
        <button
          class="burger-button"
          :class="{ active: isMenuOpen, scrolled: isScrolled }"
          :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          :aria-expanded="isMenuOpen"
          aria-controls="main-burger-menu"
          @click="openMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <div
          :class="[
            'hidden items-center gap-10 font-bold uppercase tracking-wide transition-colors md:flex',
            isScrolled ? 'text-bw-blue' : 'text-white',
          ]"
        >
          <button type="button" class="nav-link" @click="openMenu">
            {{ t('nav.solutions') }}
          </button>

          <button type="button" class="nav-link" @click="openMenu">
            {{ t('nav.toolbox') }}
          </button>
        </div>
      </div>

      <!-- Logo -->
      <RouterLink
        to="/"
        class="absolute left-1/2 -translate-x-1/2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-bw-blue"
        aria-label="Go to Blue Water Shipping homepage"
      >
        <BwsLogo
          :class="[
            isScrolled ? 'text-bw-blue' : 'text-white',
            '!h-14 md:!h-[70px]',
          ]"
          aria-hidden="true"
        />
      </RouterLink>

      <!-- Desktop right -->
      <div class="hidden items-center gap-10 md:flex">
        <div class="flex items-center gap-5">
          <!-- Search -->
          <button
            :class="[
              'icon-button text-2xl focus:outline-none focus:ring-2 focus:ring-offset-2',
              isScrolled
                ? 'text-black focus:ring-bw-blue focus:ring-offset-white'
                : 'text-white focus:ring-white focus:ring-offset-bw-blue',
            ]"
            :aria-label="t('nav.search')"
            @click="openMenuSearch"
          >
            <FontAwesomeIcon :icon="faMagnifyingGlass" aria-hidden="true" />
          </button>

          <!-- Desktop language -->
          <div class="relative">
            <button
              :class="[
                'language-switch focus:outline-none focus:ring-2 focus:ring-offset-2',
                isScrolled
                  ? 'border-black/20 text-black focus:ring-bw-blue focus:ring-offset-white'
                  : 'border-white/40 text-white focus:ring-white focus:ring-offset-bw-blue',
              ]"
              :aria-label="t('nav.language')"
              :aria-expanded="isLanguageOpen"
              aria-controls="desktop-language-menu"
              @click.stop="isLanguageOpen = !isLanguageOpen"
            >
              <FontAwesomeIcon :icon="faEarthAmericas" class="text-lg" aria-hidden="true" />

              <span class="language-code">
                {{ locale === 'en' ? 'EN' : 'DA' }}
              </span>

              <FontAwesomeIcon :icon="faChevronDown" class="text-xs" aria-hidden="true" />
            </button>

            <Transition name="dropdown">
              <div
                v-if="isLanguageOpen"
                id="desktop-language-menu"
                class="absolute right-0 z-[80] mt-3 w-40 border border-gray-200 bg-white shadow-xl"
              >
                <button
                  v-for="language in languages"
                  :key="language.code"
                  class="language-option"
                  :class="{ active: locale === language.code }"
                  type="button"
                  @click="changeLanguage(language.code)"
                >
                  <span>{{ language.label }}</span>
                  <span class="font-black">{{ language.code.toUpperCase() }}</span>
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Desktop CTA -->
        <RouterLink
          :to="user ? (userRole === 'admin' ? '/admin' : '/dashboard') : '/login'"
          :class="[
            'flex h-12 min-w-[170px] items-center justify-center whitespace-nowrap px-5 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
            isScrolled
              ? 'bg-bw-blue text-white hover:bg-blue-900 focus:ring-bw-blue focus:ring-offset-white'
              : 'bg-white text-black hover:bg-gray-100 focus:ring-white focus:ring-offset-bw-blue',
          ]"
          :aria-label="user ? (userRole === 'admin' ? 'Open admin dashboard' : 'Open account dashboard') : 'Book transport through the client portal'"
        >
          {{ user ? (userRole === 'admin' ? 'Admin' : 'Account') : 'Book transport' }}
        </RouterLink>
      </div>

      <!-- Mobile right -->
      <div class="absolute right-5 flex items-center gap-2 md:hidden">
        <!-- Mobile language -->
        <div class="relative">
          <button
            :class="[
              'mobile-language-button focus:outline-none focus:ring-2 focus:ring-offset-2',
              isScrolled
                ? 'border-black/20 text-black focus:ring-bw-blue focus:ring-offset-white'
                : 'border-white/40 text-white focus:ring-white focus:ring-offset-bw-blue',
            ]"
            :aria-label="t('nav.language')"
            :aria-expanded="isMobileLanguageOpen"
            aria-controls="mobile-language-menu"
            @click.stop="isMobileLanguageOpen = !isMobileLanguageOpen"
          >
            {{ locale === 'en' ? 'EN' : 'DA' }}
          </button>

          <Transition name="dropdown">
            <div
              v-if="isMobileLanguageOpen"
              id="mobile-language-menu"
              class="absolute right-0 top-[52px] z-[80] w-36 border border-gray-200 bg-white shadow-xl"
            >
              <button
                v-for="language in languages"
                :key="language.code"
                class="language-option"
                :class="{ active: locale === language.code }"
                type="button"
                @click="changeLanguage(language.code)"
              >
                <span>{{ language.label }}</span>
                <span class="font-black">{{ language.code.toUpperCase() }}</span>
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </nav>
  </header>

  <BurgerMenu
    id="main-burger-menu"
    :is-open="isMenuOpen"
    :open-search="openSearchOnMenuOpen"
    @close="closeMenu"
    @search-opened="openSearchOnMenuOpen = false"
  />
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../../composables/useAuth'

import BwsLogo from '../ui/BwsLogo.vue'
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
const isMobileLanguageOpen = ref(false)
const openSearchOnMenuOpen = ref(false)

const languages = [
  { code: 'en', label: 'English' },
  { code: 'da', label: 'Dansk' },
]

const changeLanguage = (code) => {
  locale.value = code
  localStorage.setItem('bws-locale', code)

  isLanguageOpen.value = false
  isMobileLanguageOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const openMenu = () => {
  openSearchOnMenuOpen.value = false
  isLanguageOpen.value = false
  isMobileLanguageOpen.value = false
  isMenuOpen.value = true
}

const openMenuSearch = () => {
  openSearchOnMenuOpen.value = true
  isLanguageOpen.value = false
  isMobileLanguageOpen.value = false
  isMenuOpen.value = true
}

const closeMenu = () => {
  isMenuOpen.value = false
  openSearchOnMenuOpen.value = false
}

const handleWindowClick = (event) => {
  if (!event.target.closest('.language-switch')) {
    isLanguageOpen.value = false
  }

  if (!event.target.closest('.mobile-language-button')) {
    isMobileLanguageOpen.value = false
  }
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    isLanguageOpen.value = false
    isMobileLanguageOpen.value = false

    if (isMenuOpen.value) {
      closeMenu()
    }
  }
}

watch(isMenuOpen, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
})

onMounted(() => {
  handleScroll()

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', handleWindowClick)
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleWindowClick)
  window.removeEventListener('keydown', handleEscape)

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

.nav-link:hover::after,
.nav-link:focus-visible::after {
  width: 100%;
}

.nav-link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 6px;
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

.language-option:focus-visible {
  outline: 2px solid #0000ab;
  outline-offset: -4px;
}

.mobile-language-button {
  height: 38px;
  min-width: 46px;
  border: 1px solid;
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  transition:
    background-color 0.25s ease,
    transform 0.25s ease;
}

.mobile-language-button:hover {
  transform: translateY(-1px);
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
  width: 34px;
  height: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.burger-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 8px;
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
  width: 34px;
}

.burger-button span:nth-child(2) {
  width: 24px;
}

.burger-button:hover span:nth-child(2) {
  width: 34px;
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
  width: 34px;
}

.burger-button.active span:nth-child(2) {
  width: 0;
  opacity: 0;
}

.burger-button.active span:nth-child(3) {
  transform: rotate(-45deg) translate(2px, 3px);
  width: 34px;
}
</style>