<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>
  </Transition>

  <Transition name="slide-menu">
    <aside
      v-if="isOpen"
      class="fixed top-0 left-0 z-[100] flex h-screen w-full overflow-hidden bg-white"
    >
      <!-- Left icon rail -->
      <div class="flex w-20 flex-col items-center justify-between bg-bws-blue py-6 md:w-24">
        <div class="flex flex-col items-center gap-9">
          <BwsLogo class="text-white !h-12 md:!h-14" />

          <button
            class="text-4xl text-white transition-all duration-300 hover:rotate-90 hover:scale-110"
            aria-label="Close menu"
            @click="$emit('close')"
          >
            <FontAwesomeIcon :icon="faXmark" />
          </button>
        </div>

        <div class="flex flex-col items-center gap-7 text-2xl text-white">
          <button
            class="rail-icon"
            :class="{ active: isSearchOpen }"
            :aria-label="t('nav.search')"
            @click="toggleSearch"
          >
            <FontAwesomeIcon :icon="faMagnifyingGlass" />
          </button>

          <button class="rail-icon" aria-label="Track shipment">
            <FontAwesomeIcon :icon="faLocationCrosshairs" />
          </button>

          <button class="rail-icon" aria-label="Contact">
            <FontAwesomeIcon :icon="faPhone" />
          </button>

          <!-- Language dropdown trigger -->
          <div class="relative">
            <button
              class="rail-language"
              :aria-label="t('nav.language')"
              @click="isLanguageOpen = !isLanguageOpen"
            >
              <FontAwesomeIcon :icon="faEarthAmericas" class="text-lg" />

              <span>
                {{ locale === 'en' ? 'EN' : 'DA' }}
              </span>

              <FontAwesomeIcon :icon="faChevronDown" class="text-[10px]" />
            </button>

            <Transition name="dropdown">
              <div
                v-if="isLanguageOpen"
                class="absolute bottom-0 left-16 z-[130] w-40 border border-gray-200 bg-white shadow-xl"
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
      </div>

      <!-- Mobile menu content -->
      <div class="flex-1 overflow-y-auto bg-white px-6 py-8 md:hidden">
        <p class="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
          {{ t('menu.navigation') }}
        </p>

        <nav class="mt-6 space-y-3">
          <details
            v-for="item in menuItems"
            :key="item.key"
            class="mobile-menu-group"
          >
            <summary class="mobile-main-item">
              <span>{{ item.name }}</span>

              <FontAwesomeIcon
                v-if="item.children"
                :icon="faChevronDown"
                class="text-sm"
              />
            </summary>

            <div v-if="item.children" class="mt-3 space-y-2 pl-4">
              <details
                v-for="child in item.children"
                :key="child.key"
                class="mobile-sub-group"
              >
                <summary class="mobile-sub-item">
                  <span>{{ child.name }}</span>

                  <FontAwesomeIcon
                    v-if="child.children"
                    :icon="faChevronDown"
                    class="text-xs"
                  />
                </summary>

                <div v-if="child.children" class="mt-2 space-y-2 pl-4">
                  <a
                    v-for="sub in child.children"
                    :key="sub.key"
                    href="#"
                    class="mobile-third-item"
                    @click="$emit('close')"
                  >
                    {{ sub.name }}
                  </a>
                </div>
              </details>
            </div>
          </details>
        </nav>

        <RouterLink
          :to="user ? (userRole === 'admin' ? '/admin' : '/dashboard') : '/login'"
          class="mt-8 flex h-12 w-full items-center justify-center border border-black bg-white text-sm font-black uppercase tracking-wide transition hover:border-bws-blue hover:bg-bws-blue hover:text-white"
          @click="$emit('close')"
        >
          {{ user ? (userRole === 'admin' ? 'Admin' : 'Account') : 'Book transport' }}
        </RouterLink>
      </div>

      <!-- Search panel -->
      <Transition name="search-slide">
        <div
          v-if="isSearchOpen"
          class="w-[320px] overflow-y-auto border-r border-gray-200 bg-white px-6 py-10 md:w-[380px] md:px-8"
        >
          <div class="mb-6 flex items-center justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                {{ t('menu.navigation') }}
              </p>

              <h2 class="mt-1 text-2xl font-black uppercase text-bws-blue">
                {{ t('menu.search') }}
              </h2>
            </div>

            <button
              class="text-2xl text-black transition hover:text-bws-blue"
              aria-label="Close search"
              @click="closeSearch"
            >
              <FontAwesomeIcon :icon="faXmark" />
            </button>
          </div>

          <div class="relative">
            <FontAwesomeIcon
              :icon="faMagnifyingGlass"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              :placeholder="t('menu.searchPlaceholder')"
              class="w-full border border-gray-300 py-4 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-bws-blue focus:shadow-[0_0_0_3px_rgba(0,0,171,0.12)]"
            />
          </div>

          <div v-if="!searchQuery" class="mt-8">
            <p class="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
              {{ t('menu.popularSearches') }}
            </p>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="term in popularSearches"
                :key="term"
                class="border border-gray-300 px-3 py-2 text-xs font-bold uppercase transition hover:border-bws-blue hover:text-bws-blue"
                @click="searchQuery = term"
              >
                {{ term }}
              </button>
            </div>
          </div>

          <div class="mt-8 space-y-3">
            <a
              v-for="result in filteredResults"
              :key="result.path"
              href="#"
              class="search-result group"
              @click="$emit('close')"
            >
              <div>
                <p class="text-xs uppercase tracking-widest text-gray-400">
                  {{ result.category }}
                </p>

                <h3 class="mt-1 font-black text-black transition group-hover:text-bws-blue">
                  {{ result.name }}
                </h3>
              </div>

              <FontAwesomeIcon
                :icon="faChevronRight"
                class="text-sm text-gray-400 transition group-hover:translate-x-1 group-hover:text-bws-blue"
              />
            </a>

            <p
              v-if="searchQuery && filteredResults.length === 0"
              class="border border-gray-200 p-4 text-sm text-gray-500"
            >
              {{ t('menu.noResults') }}
            </p>
          </div>
        </div>
      </Transition>

      <!-- Main column desktop -->
      <div
        class="hidden w-[250px] border-r border-gray-200 bg-white px-8 py-24 md:block md:w-[300px] md:px-10"
      >
        <nav class="space-y-2">
          <button
            v-for="item in menuItems"
            :key="item.key"
            class="main-menu-item group"
            :class="{ active: activeMain?.key === item.key }"
            @click="openMainColumn(item)"
          >
            <span>{{ item.name }}</span>

            <FontAwesomeIcon
              v-if="item.children"
              :icon="faChevronRight"
              class="text-base transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </nav>
      </div>

      <!-- Second column desktop -->
      <Transition name="column-slide" mode="out-in">
        <div
          v-if="activeMain?.children"
          :key="activeMain.key"
          class="hidden w-[230px] border-r border-gray-200 bg-white px-8 py-24 md:block md:w-[270px]"
        >
          <p class="column-label">{{ activeMain.name }}</p>

          <nav class="space-y-4">
            <button
              v-for="child in activeMain.children"
              :key="child.key"
              class="submenu-item group"
              :class="{ active: activeChild?.key === child.key }"
              @click="openChildColumn(child)"
            >
              <span>{{ child.name }}</span>

              <FontAwesomeIcon
                v-if="child.children || child.type"
                :icon="faChevronRight"
                class="text-xs transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </nav>
        </div>
      </Transition>

      <!-- Third column desktop -->
      <Transition name="column-slide" mode="out-in">
        <div
          v-if="activeChild?.children"
          :key="activeChild.key"
          class="hidden w-[260px] border-r border-gray-200 bg-white px-8 py-24 md:block md:w-[310px]"
        >
          <p class="column-label">{{ activeChild.name }}</p>

          <nav class="space-y-4">
            <a
              v-for="sub in activeChild.children"
              :key="sub.key"
              href="#"
              class="third-menu-item"
              @click="$emit('close')"
            >
              {{ sub.name }}
            </a>
          </nav>
        </div>
      </Transition>

      <!-- Right visual area desktop -->
      <div class="relative hidden flex-1 overflow-hidden bg-gray-200 lg:flex">
        <div class="absolute inset-0 bg-bws-blue/5"></div>

        <div
          v-if="!activeChild?.type"
          class="absolute inset-0 bg-[linear-gradient(to_bottom_right,transparent_49.9%,black_50%,transparent_50.1%),linear-gradient(to_top_right,transparent_49.9%,black_50%,transparent_50.1%)] opacity-40"
        ></div>

        <div
          v-else-if="activeChild.type === 'containers'"
          class="relative z-10 grid h-full w-full grid-cols-2"
        >
          <div
            v-for="container in containers"
            :key="container"
            class="flex cursor-pointer flex-col items-center justify-center gap-4 border border-black/60 transition hover:bg-white"
          >
            <div
              class="flex h-14 w-24 rotate-[-20deg] items-center justify-center border border-black text-[10px] font-bold text-bws-blue"
            >
              BWS
            </div>

            <p class="text-center text-sm font-black uppercase">
              {{ container }}
            </p>
          </div>
        </div>

        <div
          v-else-if="activeChild.type === 'news'"
          class="relative z-10 w-full max-w-sm space-y-6 bg-white/70 px-8 py-24"
        >
          <p class="text-xs uppercase tracking-widest text-gray-500">
            {{ t('menu.latest') }}
          </p>

          <article
            v-for="news in newsCards"
            :key="news.title"
            class="cursor-pointer border border-gray-300 bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="relative h-28 bg-gray-300">
              <div
                class="absolute inset-0 bg-[linear-gradient(to_bottom_right,transparent_49.5%,black_50%,transparent_50.5%),linear-gradient(to_top_right,transparent_49.5%,black_50%,transparent_50.5%)]"
              ></div>
            </div>

            <div class="p-4">
              <h3 class="text-sm font-bold leading-tight">
                {{ news.title }}
              </h3>

              <button class="mt-3 border border-black px-3 py-1 text-xs font-bold">
                {{ t('menu.readMore') }}
              </button>
            </div>
          </article>
        </div>
      </div>

      <!-- Stable CTA desktop only -->
      <RouterLink
        :to="user ? (userRole === 'admin' ? '/admin' : '/dashboard') : '/login'"
        class="fixed bottom-5 left-[140px] z-[120] hidden border border-black bg-white px-6 py-4 text-sm font-black uppercase tracking-wide transition hover:-translate-y-1 hover:border-bws-blue hover:bg-bws-blue hover:text-white md:flex"
        @click="$emit('close')"
      >
        {{ user ? (userRole === 'admin' ? 'Admin' : 'Account') : 'Book transport' }}
      </RouterLink>
    </aside>
  </Transition>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useI18n } from 'vue-i18n'

import BwsLogo from './UI/BwsLogo.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faMagnifyingGlass,
  faEarthAmericas,
  faXmark,
  faChevronRight,
  faChevronDown,
  faLocationCrosshairs,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  openSearch: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'search-opened'])

const { t, locale } = useI18n()
const { user, userRole } = useAuth()

const activeMainKey = ref(null)
const activeChildKey = ref(null)
const isSearchOpen = ref(false)
const isLanguageOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const languages = [
  { code: 'en', label: 'English' },
  { code: 'da', label: 'Dansk' },
]

const changeLanguage = (code) => {
  locale.value = code
  localStorage.setItem('bws-locale', code)
  isLanguageOpen.value = false
}

const popularSearches = computed(() => [
  t('searchTerms.seaFreight'),
  t('searchTerms.tracking'),
  t('searchTerms.container'),
  t('searchTerms.incoterms'),
  t('searchTerms.career'),
])

const menuItems = computed(() => [
  {
    key: 'solutions',
    name: t('menu.solutions'),
    children: [
      {
        key: 'transport',
        name: t('menu.transport'),
        children: [
          { key: 'road-transport', name: t('menu.roadTransport') },
          { key: 'sea-freight', name: t('menu.seaFreight') },
          { key: 'air-freight', name: t('menu.airFreight') },
          { key: 'rail-transport', name: t('menu.railTransport') },
          { key: 'courier-transport', name: t('menu.courierTransport') },
          { key: 'port-service', name: t('menu.portService') },
          { key: 'oil-gas-projects', name: t('menu.oilGasProjects') },
          { key: 'reefer-logistics', name: t('menu.reeferLogistics') },
          { key: 'marine-logistics', name: t('menu.marineLogistics') },
        ],
      },
      {
        key: 'expertise',
        name: t('menu.expertise'),
        children: [
          { key: 'automotive', name: t('menu.automotive') },
          { key: 'retail', name: t('menu.retail') },
          { key: 'energy', name: t('menu.energy') },
          { key: 'pharma', name: t('menu.pharma') },
        ],
      },
      {
        key: 'service',
        name: t('menu.service'),
        children: [
          { key: 'customs-clearance', name: t('menu.customsClearance') },
          { key: 'warehousing', name: t('menu.warehousing') },
          { key: 'supply-chain', name: t('menu.supplyChain') },
        ],
      },
    ],
  },
  {
    key: 'toolbox',
    name: t('menu.toolbox'),
    children: [
      {
        key: 'tools',
        name: t('menu.tools'),
        type: 'containers',
        children: [
          { key: 'carbon-calculator', name: t('menu.carbonCalculator') },
          { key: 'container-specs', name: t('menu.containerSpecs') },
          { key: 'trailer-specs', name: t('menu.trailerSpecs') },
          { key: 'courier-shipments', name: t('menu.courierShipments') },
          { key: 'currency-converter', name: t('menu.currencyConverter') },
          { key: 'unit-converter', name: t('menu.unitConverter') },
          { key: 'country-codes', name: t('menu.countryCodes') },
          { key: 'incoterms', name: t('menu.incoterms') },
        ],
      },
      {
        key: 'traffic-information',
        name: t('menu.trafficInformation'),
        children: [
          { key: 'port-updates', name: t('menu.portUpdates') },
          { key: 'road-delays', name: t('menu.roadDelays') },
          { key: 'weather-alerts', name: t('menu.weatherAlerts') },
        ],
      },
      {
        key: 'surcharges-fees',
        name: t('menu.surchargesFees'),
        children: [
          { key: 'fuel-surcharges', name: t('menu.fuelSurcharges') },
          { key: 'handling-fees', name: t('menu.handlingFees') },
          { key: 'customs-fees', name: t('menu.customsFees') },
        ],
      },
    ],
  },
  {
    key: 'insights',
    name: t('menu.insights'),
    children: [
      { key: 'news', name: t('menu.news'), type: 'news' },
      { key: 'case-stories', name: t('menu.caseStories'), type: 'news' },
      { key: 'blog-posts', name: t('menu.blogPosts'), type: 'news' },
      { key: 'guides', name: t('menu.guides'), type: 'news' },
    ],
  },
  {
    key: 'responsibility',
    name: t('menu.responsibility'),
    children: [
      { key: 'responsibility-main', name: t('menu.responsibility') },
      { key: 'environment', name: t('menu.environment') },
      { key: 'people-business', name: t('menu.peopleBusiness') },
      { key: 'governance', name: t('menu.governance') },
      { key: 'partnerships', name: t('menu.partnerships') },
    ],
  },
  {
    key: 'about',
    name: t('menu.about'),
    children: [
      { key: 'about-us', name: t('menu.aboutUs') },
      { key: 'organisation', name: t('menu.organisation') },
      { key: 'values', name: t('menu.values') },
      { key: 'policies', name: t('menu.policies') },
      { key: 'safety', name: t('menu.safety') },
      { key: 'history', name: t('menu.history') },
      { key: 'foundation', name: t('menu.foundation') },
    ],
  },
  {
    key: 'career',
    name: t('menu.career'),
  },
])

const activeMain = computed(() =>
  menuItems.value.find((item) => item.key === activeMainKey.value)
)

const activeChild = computed(() =>
  activeMain.value?.children?.find((child) => child.key === activeChildKey.value)
)

const containers = [
  '20’ Dry container',
  '20’ Open top container',
  '20’ Flat rack container',
  '20’ Reefer container',
  '40’ Dry container',
  '40’ Dry high-cube container',
  '40’ Reefer high-cube container',
  '45’ Dry high-cube container',
]

const newsCards = [
  { title: 'Blue Water expands European sea freight services' },
  { title: 'New logistics solution improves B2B delivery time' },
  { title: 'Guide: choosing the right transport mode' },
]

const openMainColumn = (item) => {
  if (!item.children) {
    emit('close')
    return
  }

  activeMainKey.value = item.key
  activeChildKey.value = null
}

const openChildColumn = (child) => {
  if (!child.children && !child.type) {
    emit('close')
    return
  }

  activeChildKey.value = child.key
}

const toggleSearch = async () => {
  isSearchOpen.value = !isSearchOpen.value
  isLanguageOpen.value = false

  if (isSearchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}

const flattenMenuItems = (items, parent = '') => {
  return items.flatMap((item) => {
    const category = parent || item.name

    const currentItem = {
      name: item.name,
      category,
      path: `${parent}/${item.name}`,
    }

    const children = item.children ? flattenMenuItems(item.children, category) : []

    return [currentItem, ...children]
  })
}

const allSearchResults = computed(() => flattenMenuItems(menuItems.value))

const filteredResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) return []

  return allSearchResults.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  )
})

watch(
  () => props.openSearch,
  async (value) => {
    if (value && props.isOpen) {
      isSearchOpen.value = true
      isLanguageOpen.value = false
      emit('search-opened')

      await nextTick()
      searchInput.value?.focus()
    }
  }
)

watch(
  () => props.isOpen,
  async (value) => {
    if (!value) {
      closeSearch()
      isLanguageOpen.value = false
      activeMainKey.value = null
      activeChildKey.value = null
      return
    }

    if (props.openSearch) {
      isSearchOpen.value = true
      isLanguageOpen.value = false
      emit('search-opened')

      await nextTick()
      searchInput.value?.focus()
    }
  }
)
</script>

<style scoped>
.rail-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    background-color 0.3s ease;
}

.rail-icon:hover,
.rail-icon.active {
  transform: translateX(6px) scale(1.12);
  background: rgba(255, 255, 255, 0.14);
  opacity: 0.95;
}

.rail-language {
  width: 54px;
  min-height: 54px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: grid;
  place-items: center;
  gap: 1px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.rail-language:hover {
  transform: translateX(6px) scale(1.08);
  background: rgba(255, 255, 255, 0.16);
  border-color: white;
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

.search-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid #e5e7eb;
  padding: 16px;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.search-result:hover {
  border-color: #0000ab;
  box-shadow: 0 12px 24px rgba(0, 0, 171, 0.1);
  transform: translateY(-2px);
}

.main-menu-item,
.submenu-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.main-menu-item {
  padding: 12px 0;
  font-size: 1.35rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #555;
}

.main-menu-item:hover,
.main-menu-item.active {
  color: #000;
  transform: translateX(6px);
}

.submenu-item {
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  font-weight: 800;
  color: #666;
}

.submenu-item:hover,
.submenu-item.active {
  color: #0000ab;
  transform: translateX(6px);
}

.third-menu-item {
  display: block;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
  font-weight: 800;
  color: #111;
  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.third-menu-item:hover {
  color: #0000ab;
  transform: translateX(6px);
}

.column-label {
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #0000ab;
  transform: translateY(-28px);
}

/* Mobile menu */
.mobile-menu-group,
.mobile-sub-group {
  border-bottom: 1px solid #e5e7eb;
}

.mobile-main-item,
.mobile-sub-item {
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-main-item {
  padding: 18px 0;
  font-size: 1.25rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #111;
}

.mobile-sub-item {
  padding: 12px 0;
  font-size: 0.95rem;
  font-weight: 800;
  color: #555;
}

.mobile-third-item {
  display: block;
  padding: 10px 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #111;
}

.mobile-main-item::-webkit-details-marker,
.mobile-sub-item::-webkit-details-marker {
  display: none;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active,
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

.slide-menu-enter-active,
.slide-menu-leave-active {
  transition: transform 0.55s cubic-bezier(0.77, 0, 0.175, 1);
}

.slide-menu-enter-from,
.slide-menu-leave-to {
  transform: translateX(-100%);
}

.column-slide-enter-active,
.column-slide-leave-active,
.search-slide-enter-active,
.search-slide-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.column-slide-enter-from,
.search-slide-enter-from {
  opacity: 0;
  transform: translateX(-24px);
}

.column-slide-leave-to,
.search-slide-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>