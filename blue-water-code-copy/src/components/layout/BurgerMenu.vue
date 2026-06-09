<template>
  <!-- Dark overlay -->
  <Transition name="fade">

<div
  v-if="isOpen"
  class="fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm"
  aria-hidden="true"s
  @click="$emit('close')"
></div>
  </Transition>

  <Transition name="slide-menu">
    <aside
  v-if="isOpen"
  class="fixed left-0 top-0 z-[100] flex h-screen w-full overflow-hidden bg-transparent"
  role="dialog"
  aria-modal="true"
  aria-label="Main navigation menu"
>
      <!-- Left icon rail -->
      <div class="flex w-20 flex-col items-center justify-between bg-bw-blue py-6 md:w-24">
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

          <RouterLink to="/track-trace" class="rail-icon" aria-label="Track shipment" @click="$emit('close')">
            <FontAwesomeIcon :icon="faLocationCrosshairs" />
          </RouterLink>

          <RouterLink to="/contact" class="rail-icon" aria-label="Contact" @click="$emit('close')">
            <FontAwesomeIcon :icon="faPhone" />
          </RouterLink>

          <div class="relative">
            <button
              class="rail-language"
              :aria-label="t('nav.language')"
              @click="isLanguageOpen = !isLanguageOpen"
            >
              <FontAwesomeIcon :icon="faEarthAmericas" class="text-lg" />
              <span>{{ locale === 'en' ? 'EN' : 'DA' }}</span>
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
          <details v-for="item in menuItems" :key="item.key" class="mobile-menu-group">
            <summary class="mobile-main-item">
              <span>{{ item.name }}</span>
              <FontAwesomeIcon v-if="item.children" :icon="faChevronDown" class="text-sm" />
            </summary>

            <div v-if="item.children" class="mt-3 space-y-2 pl-4">
              <details v-for="child in item.children" :key="child.key" class="mobile-sub-group">
                <summary class="mobile-sub-item">
                  <span>{{ child.name }}</span>
                  <FontAwesomeIcon v-if="child.children" :icon="faChevronDown" class="text-xs" />
                </summary>

                <div v-if="child.children" class="mt-2 space-y-2 pl-4">
                  <template v-for="sub in child.children" :key="sub.key">
                    <RouterLink
                      v-if="sub.path"
                      :to="sub.path"
                      class="mobile-third-item"
                      @click="$emit('close')"
                    >
                      {{ sub.name }}
                    </RouterLink>

                    <a
                      v-else
                      :href="sub.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="mobile-third-item"
                      @click="$emit('close')"
                    >
                      {{ sub.name }}
                    </a>
                  </template>
                </div>
              </details>
            </div>

            <RouterLink
              v-else-if="item.path"
              :to="item.path"
              class="mobile-direct-link"
              @click="$emit('close')"
            >
              {{ item.name }}
            </RouterLink>

            <a
              v-else-if="item.url"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="mobile-direct-link"
              @click="$emit('close')"
            >
              {{ item.name }}
            </a>
          </details>
        </nav>

        <RouterLink
          :to="user ? (userRole === 'admin' ? '/admin' : '/dashboard') : '/login'"
          class="mt-8 flex h-12 w-full items-center justify-center border border-black bg-white text-sm font-black uppercase tracking-wide transition hover:border-bw-blue hover:bg-bw-blue hover:text-white"
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

              <h2 class="mt-1 text-2xl font-black uppercase text-bw-blue">
                {{ t('menu.search') }}
              </h2>
            </div>

            <button
              class="text-2xl text-black transition hover:text-bw-blue"
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
  id="burger-search"
  ref="searchInput"
  v-model="searchQuery"
  type="search"
  :placeholder="t('menu.searchPlaceholder')"
  class="w-full border border-gray-300 py-4 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-bw-blue focus:ring-2 focus:ring-bw-blue focus:ring-offset-2"
  aria-label="Search the website menu"
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
                class="border border-gray-300 px-3 py-2 text-xs font-bold uppercase transition hover:border-bw-blue hover:text-bw-blue"
                @click="searchQuery = term"
              >
                {{ term }}
              </button>
            </div>
          </div>

          <div class="mt-8 space-y-3">
            <template v-for="result in filteredResults" :key="result.searchKey">
              <RouterLink
                v-if="result.path"
                :to="result.path"
                class="search-result group"
                @click="$emit('close')"
              >
                <div>
                  <p class="text-xs uppercase tracking-widest text-gray-400">
                    {{ result.category }}
                  </p>

                  <h3 class="mt-1 font-black text-black transition group-hover:text-bw-blue">
                    {{ result.name }}
                  </h3>
                </div>

                <FontAwesomeIcon
                  :icon="faChevronRight"
                  class="text-sm text-gray-400 transition group-hover:translate-x-1 group-hover:text-bw-blue"
                />
              </RouterLink>

              <a
                v-else
                :href="result.url"
                target="_blank"
                rel="noopener noreferrer"
                class="search-result group"
                @click="$emit('close')"
              >
                <div>
                  <p class="text-xs uppercase tracking-widest text-gray-400">
                    {{ result.category }}
                  </p>

                  <h3 class="mt-1 font-black text-black transition group-hover:text-bw-blue">
                    {{ result.name }}
                  </h3>
                </div>

                <FontAwesomeIcon
                  :icon="faChevronRight"
                  class="text-sm text-gray-400 transition group-hover:translate-x-1 group-hover:text-bw-blue"
                />
              </a>
            </template>

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
      <!-- activeMain: which top level category is selected -->
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
            <template v-for="sub in activeChild.children" :key="sub.key">
              <RouterLink
                v-if="sub.path"
                :to="sub.path"
                class="third-menu-item"
                @click="$emit('close')"
              >
                {{ sub.name }}
              </RouterLink>

              <a
                v-else
                :href="sub.url"
                target="_blank"
                rel="noopener noreferrer"
                class="third-menu-item"
                @click="$emit('close')"
              >
                {{ sub.name }}
              </a>
            </template>
          </nav>
        </div>
      </Transition>

     <!-- Right visual area desktop -->
<div class="relative hidden flex-1 overflow-hidden bg-bw-blue/35 lg:flex">
  <div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>

  <div class="absolute -right-32 top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
  <div class="absolute bottom-0 left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

  <div class="relative z-10 flex h-full w-full items-end justify-end p-10">
    <p class="text-xs font-black uppercase tracking-[0.35em] text-white/45">
      Blue Water Shipping
    </p>
  </div>
</div>

      <!-- Stable CTA desktop only -->
      <RouterLink
        :to="user ? (userRole === 'admin' ? '/admin' : '/dashboard') : '/login'"
        class="fixed bottom-5 left-[140px] z-[120] hidden border border-black bg-white px-6 py-4 text-sm font-black uppercase tracking-wide transition hover:-translate-y-1 hover:border-bw-blue hover:bg-bw-blue hover:text-white md:flex"
        @click="$emit('close')"
      >
        {{ user ? (userRole === 'admin' ? 'Admin' : 'Account') : 'Book transport' }}
      </RouterLink>
    </aside>
  </Transition>
</template>

<script setup>
// --- IMPORTS ---
// Vue tools we use: computed (derived values), nextTick (wait for DOM update),
// onMounted/onUnmounted (run code when component loads/unloads), ref (reactive variable), watch (react to changes)
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

// useAuth gives us the logged-in user and their role (admin or normal user)
import { useAuth } from '../../composables/useAuth'

// useI18n gives us the translation function t() and the current language (locale)
import { useI18n } from 'vue-i18n'

// The Blue Water logo component shown in the menu rail
import BwsLogo from '../ui/BwsLogo.vue'

// FontAwesomeIcon is the component that renders icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// These are the individual icons used throughout the menu
import {
  faMagnifyingGlass,   // search icon
  faEarthAmericas,     // language/globe icon
  faXmark,             // close (X) icon
  faChevronRight,      // right arrow icon
  faChevronDown,       // down arrow icon
  faLocationCrosshairs, // track & trace icon
  faPhone,             // contact icon
} from '@fortawesome/free-solid-svg-icons'


// --- PROPS ---
// Props are values passed in from the parent component (Navbar).
// isOpen: tells this component whether the menu should be visible or hidden
// openSearch: tells this component to open the search panel straight away
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

// --- EMITS ---
// Emits are events this component can send back up to the parent.
// 'close' → tells the parent to close the menu
// 'search-opened' → tells the parent the search panel has been opened
const emit = defineEmits(['close', 'search-opened'])


// --- GLOBAL STATE ---
// t() translates text keys into the correct language
// locale is the currently selected language ('en' or 'da')
const { t, locale } = useI18n()

// user is the logged-in Firebase user (or null if not logged in)
// userRole is either 'admin' or a normal user role
const { user, userRole } = useAuth()


// --- REACTIVE VARIABLES (ref) ---
// These are like "live" variables — when they change, the page updates automatically.

const activeMainKey = ref(null)    // which top-level menu item is currently selected (desktop)
const activeChildKey = ref(null)   // which second-level menu item is currently selected (desktop)
const isSearchOpen = ref(false)    // whether the search panel is visible
const isLanguageOpen = ref(false)  // whether the language dropdown is visible
const searchQuery = ref('')        // the text the user has typed in the search box
const searchInput = ref(null)      // a direct reference to the search <input> element in the DOM


// --- LANGUAGE LIST ---
// The two languages available in the language switcher
const languages = [
  { code: 'en', label: 'English' },
  { code: 'da', label: 'Dansk' },
]


// --- FUNCTION: changeLanguage ---
// Called when the user clicks a language option.
// It updates the active language, saves the choice to localStorage so it
// is remembered after a page refresh, then closes the language dropdown.
const changeLanguage = (code) => {
  locale.value = code
  localStorage.setItem('bws-locale', code)
  isLanguageOpen.value = false
}


// --- COMPUTED: popularSearches ---
// Returns a fixed list of suggested search terms shown in the search panel
// before the user starts typing. The t() calls translate them automatically.
const popularSearches = computed(() => [
  t('searchTerms.seaFreight'),
  t('searchTerms.tracking'),
  t('searchTerms.container'),
  t('searchTerms.incoterms'),
  t('searchTerms.career'),
])


// --- COMPUTED: menuItems ---
// Builds the full navigation structure used by the menu.
// It is a computed value so that all the translated names (t()) update
// automatically whenever the language changes.
// Each item can have:
//   - path: an internal page route (e.g. '/sea-freight')
//   - url: an external website link
//   - children: a nested list of sub-items
const menuItems = computed(() => [
  {
    key: 'solutions',
    name: t('menu.solutions'),
    children: [
      {
        key: 'transport',
        name: t('menu.transport'),
        children: [
          { key: 'road-transport', name: t('menu.roadTransport'), path: '/road-transport' },
          { key: 'sea-freight', name: t('menu.seaFreight'), path: '/sea-freight' },
          { key: 'air-freight', name: t('menu.airFreight'), path: '/air-freight' },
          { key: 'rail-transport', name: t('menu.railTransport'), path: '/not-developed' },
          { key: 'courier-transport', name: t('menu.courierTransport'), path: '/not-developed' },
          { key: 'port-service', name: t('menu.portService'), path: '/not-developed' },
          { key: 'oil-gas-projects', name: t('menu.oilGasProjects'), path: '/not-developed' },
          { key: 'reefer-logistics', name: t('menu.reeferLogistics'), path: '/not-developed' },
          { key: 'marine-logistics', name: t('menu.marineLogistics'), path: '/not-developed' },
        ],
      },
      {
        key: 'expertise',
        name: t('menu.expertise'),
        children: [
          { key: 'automotive', name: t('menu.automotive'), path: '/not-developed' },
          { key: 'retail', name: t('menu.retail'), path: '/not-developed' },
          { key: 'energy', name: t('menu.energy'), path: '/not-developed' },
          { key: 'pharma', name: t('menu.pharma'), path: '/not-developed' },
        ],
      },
      {
        key: 'service',
        name: t('menu.service'),
        children: [
          { key: 'customs-clearance', name: t('menu.customsClearance'), path: '/not-developed' },
          { key: 'warehousing', name: t('menu.warehousing'), path: '/not-developed' },
          { key: 'supply-chain', name: t('menu.supplyChain'), path: '/not-developed' },
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
        children: [
          { key: 'carbon-calculator', name: t('menu.carbonCalculator'), url: 'https://www.bws.net/toolbox/carbon-calculator' },
          { key: 'container-specs', name: t('menu.containerSpecs'), url: 'https://www.bws.net/toolbox/container-specifications' },
          { key: 'trailer-specs', name: t('menu.trailerSpecs'), url: 'https://www.bws.net/toolbox/trailer-specifications' },
          { key: 'courier-shipments', name: t('menu.courierShipments'), path: '/not-developed' },
          { key: 'currency-converter', name: t('menu.currencyConverter'), url: 'https://www.bws.net/toolbox/currency-converter' },
          { key: 'unit-converter', name: t('menu.unitConverter'), path: '/not-developed' },
          { key: 'country-codes', name: t('menu.countryCodes'), url: 'https://www.bws.net/toolbox/country-codes' },
          { key: 'incoterms', name: t('menu.incoterms'), url: 'https://www.bws.net/toolbox/incoterms' },
        ],
      },
      {
        key: 'traffic-information',
        name: t('menu.trafficInformation'),
        children: [
          { key: 'port-updates', name: t('menu.portUpdates'), path: '/not-developed' },
          { key: 'road-delays', name: t('menu.roadDelays'), path: '/not-developed' },
          { key: 'weather-alerts', name: t('menu.weatherAlerts'), path: '/not-developed' },
        ],
      },
      {
        key: 'surcharges-fees',
        name: t('menu.surchargesFees'),
        children: [
          { key: 'fuel-surcharges', name: t('menu.fuelSurcharges'), path: '/not-developed' },
          { key: 'handling-fees', name: t('menu.handlingFees'), path: '/not-developed' },
          { key: 'customs-fees', name: t('menu.customsFees'), path: '/not-developed' },
        ],
      },
    ],
  },
  {
    key: 'insights',
    name: t('menu.insights'),
    children: [
      {
        key: 'latest',
        name: t('menu.latest'),
        children: [
          { key: 'news', name: t('menu.news'), path: '/not-developed' },
          { key: 'case-stories', name: t('menu.caseStories'), path: '/not-developed' },
          { key: 'blog-posts', name: t('menu.blogPosts'), path: '/not-developed' },
          { key: 'guides', name: t('menu.guides'), path: '/not-developed' },
        ],
      },
    ],
  },
  {
    key: 'responsibility',
    name: t('menu.responsibility'),
    children: [
      {
        key: 'responsibility-overview',
        name: t('menu.responsibility'),
        children: [
          { key: 'environment', name: t('menu.environment'), path: '/not-developed' },
          { key: 'people-business', name: t('menu.peopleBusiness'), path: '/not-developed' },
          { key: 'governance', name: t('menu.governance'), path: '/not-developed' },
          { key: 'partnerships', name: t('menu.partnerships'), path: '/not-developed' },
        ],
      },
    ],
  },
  {
    key: 'about',
    name: t('menu.about'),
    children: [
      {
        key: 'company',
        name: t('menu.about'),
        children: [
          { key: 'about-us', name: t('menu.aboutUs'), path: '/about' },
          { key: 'organisation', name: t('menu.organisation'), path: '/not-developed' },
          { key: 'values', name: t('menu.values'), path: '/not-developed' },
          { key: 'policies', name: t('menu.policies'), path: '/not-developed' },
          { key: 'safety', name: t('menu.safety'), path: '/not-developed' },
          { key: 'history', name: t('menu.history'), path: '/not-developed' },
          { key: 'foundation', name: t('menu.foundation'), path: '/not-developed' },
          { key: 'contact', name: 'Contact', path: '/contact' },
        ],
      },
    ],
  },
  {
    key: 'career',
    name: t('menu.career'),
    path: '/not-developed',
  },
])


// --- COMPUTED: activeMain ---
// Finds and returns the full menu item object for whichever top-level
// item is currently selected (stored as a key in activeMainKey).
// The template uses this to know which second column to show.
const activeMain = computed(() =>
  menuItems.value.find((item) => item.key === activeMainKey.value)
)

// --- COMPUTED: activeChild ---
// Same idea as activeMain but for the second level.
// Finds the child item inside the active top-level item.
// The template uses this to know which third column to show.
const activeChild = computed(() =>
  activeMain.value?.children?.find((child) => child.key === activeChildKey.value)
)


// --- FUNCTION: openMainColumn ---
// Called when a top-level menu button is clicked on desktop.
// If the item goes directly to a page or external link, just close the menu.
// If the item has sub-items (children), open the second column for that item
// and reset the third column so it doesn't show stale content.
const openMainColumn = (item) => {
  if (item.path || item.url) {
    emit('close')
    return
  }

  if (!item.children) {
    emit('close')
    return
  }

  activeMainKey.value = item.key
  activeChildKey.value = null
}

// --- FUNCTION: openChildColumn ---
// Same logic as openMainColumn but for second-level items.
// Direct links close the menu; items with children open the third column.
const openChildColumn = (child) => {
  if (child.path || child.url) {
    emit('close')
    return
  }

  if (!child.children) {
    emit('close')
    return
  }

  activeChildKey.value = child.key
}


// --- FUNCTION: toggleSearch ---
// Opens the search panel if it is closed, or closes it if it is open.
// Also closes the language dropdown so both aren't open at the same time.
// When opening, we wait for the DOM to update (nextTick) before moving
// focus to the search input so the user can start typing immediately.
const toggleSearch = async () => {
  isSearchOpen.value = !isSearchOpen.value
  isLanguageOpen.value = false

  if (isSearchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}

// --- FUNCTION: closeSearch ---
// Hides the search panel and clears the search box,
// so it starts empty the next time the user opens it.
const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}


// --- FUNCTION: flattenMenuItems ---
// The menuItems list is deeply nested (3 levels). For search to work, we
// need a flat (single-level) list of every page. This function walks through
// all the levels recursively and returns one big flat array.
// Each item gets a 'category' label (the top-level parent name) so search
// results can show which section they belong to (e.g. "Solutions").
const flattenMenuItems = (items, parent = '') => {
  return items.flatMap((item) => {
    const category = parent || item.name

    const currentItem = {
      name: item.name,
      category,
      path: item.path,
      url: item.url,
      searchKey: `${category}-${item.key}`,
    }

    const children = item.children ? flattenMenuItems(item.children, category) : []

    return [currentItem, ...children]
  })
}

// --- COMPUTED: allSearchResults ---
// Takes the full flat list from flattenMenuItems and removes any items that
// don't have a destination (no path or url). Those are just category headings.
const allSearchResults = computed(() =>
  flattenMenuItems(menuItems.value).filter((item) => item.path || item.url)
)

// --- COMPUTED: filteredResults ---
// Filters allSearchResults in real time as the user types in the search box.
// Returns an empty array when nothing is typed (popular searches are shown instead).
// The comparison is case-insensitive so "sea" matches "Sea Freight".
const filteredResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase() // strip spaces and lowercase

  if (!query) return [] // nothing typed → show popular searches instead

  return allSearchResults.value.filter((item) =>
    item.name.toLowerCase().includes(query) // keep items whose name contains the search text
  )
})


// --- FUNCTION: handleEscape ---
// Listens for keyboard presses. If the user presses the Escape key while
// the menu is open, it closes the menu. This is an accessibility feature.
const handleEscape = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

// --- LIFECYCLE: onMounted ---
// Runs once when this component appears on the page.
// Attaches the Escape key listener to the whole window.
onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

// --- LIFECYCLE: onUnmounted ---
// Runs once when this component is removed from the page.
// Removes the Escape key listener to avoid memory leaks
// (an unused listener kept running in the background).
onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})


// --- WATCHER: props.openSearch ---
// Watches the openSearch prop that comes from the parent (Navbar).
// If the parent tells us to open search (e.g. user clicked the search icon
// in the navbar), we open the panel and focus the input automatically.
watch(
  () => props.openSearch,
  async (value) => {
    if (value && props.isOpen) {
      isSearchOpen.value = true
      isLanguageOpen.value = false
      emit('search-opened') // tell the parent the search panel is now open

      await nextTick()
      searchInput.value?.focus()
    }
  }
)

// --- WATCHER: props.isOpen ---
// Watches whether the whole menu is opened or closed.
// When the menu CLOSES: reset everything back to its default state
//   (clear search, close language dropdown, deselect all columns).
// When the menu OPENS: check if the parent also wants search open, and if so
//   open the search panel and focus the input automatically.
watch(
  () => props.isOpen,
  async (value) => {
    if (!value) {
      // Menu is closing — reset all state
      closeSearch()
      isLanguageOpen.value = false
      activeMainKey.value = null
      activeChildKey.value = null
      return
    }

    if (props.openSearch) {
      // Menu is opening and search should be shown immediately
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

.mobile-third-item,
.mobile-direct-link {
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

.rail-icon:focus-visible,
.rail-language:focus-visible,
.main-menu-item:focus-visible,
.submenu-item:focus-visible,
.third-menu-item:focus-visible,
.mobile-main-item:focus-visible,
.mobile-sub-item:focus-visible,
.mobile-third-item:focus-visible,
.mobile-direct-link:focus-visible,
.search-result:focus-visible,
.language-option:focus-visible {
  outline: 2px solid #0000ab;
  outline-offset: 4px;
}

.rail-icon:focus-visible,
.rail-language:focus-visible {
  outline-color: white;
}
</style>