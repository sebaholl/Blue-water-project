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
      class="fixed top-0 left-0 z-[100] h-screen w-full bg-white flex overflow-hidden"
    >
      <!-- Left icon rail -->
      <div class="w-20 md:w-24 bg-bws-blue flex flex-col items-center justify-between py-6">
        <div class="flex flex-col items-center gap-9">
          <BwsLogo class="text-white !h-12 md:!h-14" />

          <button
            class="text-white text-4xl transition-all duration-300 hover:rotate-90 hover:scale-110"
            aria-label="Close menu"
            @click="$emit('close')"
          >
            <FontAwesomeIcon :icon="faXmark" />
          </button>
        </div>

        <div class="flex flex-col items-center gap-7 text-white text-2xl">
          <button
            class="rail-icon"
            :class="{ active: isSearchOpen }"
            aria-label="Search"
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

          <button class="rail-icon" aria-label="Language">
            <FontAwesomeIcon :icon="faEarthAmericas" />
          </button>
        </div>
      </div>

      <!-- Search panel -->
      <Transition name="search-slide">
        <div
          v-if="isSearchOpen"
          class="w-[320px] md:w-[380px] bg-white border-r border-gray-200 px-6 md:px-8 py-10 overflow-y-auto"
        >
          <div class="flex items-center justify-between mb-6">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                Navigation
              </p>

              <h2 class="mt-1 text-2xl font-black uppercase text-bws-blue">
                Search
              </h2>
            </div>

            <button
              class="text-2xl text-black hover:text-bws-blue transition"
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
              v-model="searchQuery"
              ref="searchInput"
              type="text"
              placeholder="Search sea freight, tracking, careers..."
              class="w-full border border-gray-300 pl-11 pr-4 py-4 text-sm font-semibold outline-none transition focus:border-bws-blue focus:shadow-[0_0_0_3px_rgba(0,0,171,0.12)]"
            />
          </div>

          <div v-if="!searchQuery" class="mt-8">
            <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Popular searches
            </p>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="term in popularSearches"
                :key="term"
                class="border border-gray-300 px-3 py-2 text-xs font-bold uppercase hover:border-bws-blue hover:text-bws-blue transition"
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

                <h3 class="mt-1 font-black text-black group-hover:text-bws-blue transition">
                  {{ result.name }}
                </h3>
              </div>

              <FontAwesomeIcon
                :icon="faChevronRight"
                class="text-sm text-gray-400 group-hover:text-bws-blue group-hover:translate-x-1 transition"
              />
            </a>

            <p
              v-if="searchQuery && filteredResults.length === 0"
              class="text-sm text-gray-500 border border-gray-200 p-4"
            >
              No results found. Try searching for “Sea Freight”, “Tracking”, or “Container”.
            </p>
          </div>
        </div>
      </Transition>

      <!-- Main column -->
      <div
        class="w-[250px] md:w-[300px] bg-white px-8 md:px-10 py-24 border-r border-gray-200"
      >
        <nav class="space-y-2">
          <button
            v-for="item in menuItems"
            :key="item.name"
            class="main-menu-item group"
            :class="{ active: activeMain?.name === item.name }"
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

      <!-- Second column -->
      <Transition name="column-slide" mode="out-in">
        <div
          v-if="activeMain?.children"
          :key="activeMain.name"
          class="w-[230px] md:w-[270px] bg-white px-8 py-24 border-r border-gray-200"
        >
          <p class="column-label">{{ activeMain.name }}</p>

          <nav class="mt-8 space-y-4">
            <button
              v-for="child in activeMain.children"
              :key="child.name"
              class="submenu-item group"
              :class="{ active: activeChild?.name === child.name }"
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

      <!-- Third column -->
      <Transition name="column-slide" mode="out-in">
        <div
          v-if="activeChild?.children"
          :key="activeChild.name"
          class="w-[260px] md:w-[310px] bg-white px-8 py-24 border-r border-gray-200"
        >
          <p class="column-label">{{ activeChild.name }}</p>

          <nav class="mt-8 space-y-4">
            <a
              v-for="sub in activeChild.children"
              :key="sub.name"
              href="#"
              class="third-menu-item"
              @click="$emit('close')"
            >
              {{ sub.name }}
            </a>
          </nav>
        </div>
      </Transition>

      <!-- Right visual area -->
      <div class="hidden lg:flex flex-1 bg-gray-200 relative overflow-hidden">
        <div class="absolute inset-0 bg-bws-blue/5"></div>

        <div
          v-if="!activeChild?.type"
          class="absolute inset-0 opacity-40 bg-[linear-gradient(to_bottom_right,transparent_49.9%,black_50%,transparent_50.1%),linear-gradient(to_top_right,transparent_49.9%,black_50%,transparent_50.1%)]"
        ></div>

        <div
          v-else-if="activeChild.type === 'containers'"
          class="relative z-10 grid grid-cols-2 w-full h-full"
        >
          <div
            v-for="container in containers"
            :key="container"
            class="border border-black/60 flex flex-col items-center justify-center gap-4 hover:bg-white transition cursor-pointer"
          >
            <div
              class="w-24 h-14 border border-black rotate-[-20deg] flex items-center justify-center text-[10px] font-bold text-bws-blue"
            >
              BWS
            </div>

            <p class="font-black text-sm uppercase text-center">
              {{ container }}
            </p>
          </div>
        </div>

        <div
          v-else-if="activeChild.type === 'news'"
          class="relative z-10 w-full max-w-sm px-8 py-24 space-y-6 bg-white/70"
        >
          <p class="text-xs uppercase tracking-widest text-gray-500">Latest</p>

          <article
            v-for="news in newsCards"
            :key="news.title"
            class="border border-gray-300 bg-white hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
          >
            <div class="h-28 bg-gray-300 relative">
              <div
                class="absolute inset-0 bg-[linear-gradient(to_bottom_right,transparent_49.5%,black_50%,transparent_50.5%),linear-gradient(to_top_right,transparent_49.5%,black_50%,transparent_50.5%)]"
              ></div>
            </div>

            <div class="p-4">
              <h3 class="text-sm font-bold leading-tight">
                {{ news.title }}
              </h3>

              <button class="mt-3 text-xs border border-black px-3 py-1 font-bold">
                Read more
              </button>
            </div>
          </article>
        </div>
      </div>

      <!-- Stable CTA -->
      <a
        href="#"
        class="fixed bottom-8 left-[116px] md:left-[140px] z-[120] border border-black bg-white px-6 py-4 text-sm font-black uppercase tracking-wide hover:bg-bws-blue hover:text-white hover:border-bws-blue hover:-translate-y-1 transition"
      >
        Book your transport
      </a>
    </aside>
  </Transition>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import BwsLogo from './UI/BwsLogo.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMagnifyingGlass,
  faEarthAmericas,
  faXmark,
  faChevronRight,
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

const activeMain = ref(null)
const activeChild = ref(null)
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const popularSearches = ['Sea Freight', 'Tracking', 'Container', 'Incoterms', 'Career']

const menuItems = [
  {
    name: 'Solutions',
    children: [
      {
        name: 'Transport',
        children: [
          { name: 'Road Transport' },
          { name: 'Sea Freight' },
          { name: 'Air Freight' },
          { name: 'Rail Transport' },
          { name: 'Courier Transport' },
          { name: 'Port Service' },
          { name: 'Oil, Gas & Industrial Projects' },
          { name: 'Reefer Logistics' },
          { name: 'Marine Logistics' },
        ],
      },
      {
        name: 'Expertise',
        children: [
          { name: 'Automotive' },
          { name: 'Retail' },
          { name: 'Energy' },
          { name: 'Pharma' },
        ],
      },
      {
        name: 'Service',
        children: [
          { name: 'Customs Clearance' },
          { name: 'Warehousing' },
          { name: 'Supply Chain Management' },
        ],
      },
    ],
  },
  {
    name: 'Toolbox',
    children: [
      {
        name: 'Tools',
        type: 'containers',
        children: [
          { name: 'Carbon Calculator' },
          { name: 'Container Specifications' },
          { name: 'Trailer Specifications' },
          { name: 'Courier Shipments' },
          { name: 'Currency Converter' },
          { name: 'Unit Converter' },
          { name: 'Country Codes' },
          { name: 'Incoterms 2020' },
        ],
      },
      {
        name: 'Traffic Information',
        children: [
          { name: 'Port Updates' },
          { name: 'Road Delays' },
          { name: 'Weather Alerts' },
        ],
      },
      {
        name: 'Surcharges & Fees',
        children: [
          { name: 'Fuel Surcharges' },
          { name: 'Handling Fees' },
          { name: 'Customs Fees' },
        ],
      },
    ],
  },
  {
    name: 'Insights',
    children: [
      { name: 'News', type: 'news' },
      { name: 'Case Stories', type: 'news' },
      { name: 'Blog Posts', type: 'news' },
      { name: 'Guides', type: 'news' },
    ],
  },
  {
    name: 'Responsibility',
    children: [
      { name: 'Responsibility' },
      { name: 'Transport Solutions' },
      { name: 'Environment' },
      { name: 'A people’s business' },
      { name: 'Governance' },
      { name: 'Partnerships' },
    ],
  },
  {
    name: 'About',
    children: [
      { name: 'About us' },
      { name: 'Organisation' },
      { name: 'Values' },
      { name: 'Policies' },
      { name: 'Safety' },
      { name: 'History' },
      { name: 'Foundation' },
    ],
  },
  {
    name: 'Career',
  },
]

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

  activeMain.value = item
  activeChild.value = null
}

const openChildColumn = (child) => {
  if (!child.children && !child.type) {
    emit('close')
    return
  }

  activeChild.value = child
}

const toggleSearch = async () => {
  isSearchOpen.value = !isSearchOpen.value

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

const allSearchResults = flattenMenuItems(menuItems)

const filteredResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) return []

  return allSearchResults.filter((item) =>
    item.name.toLowerCase().includes(query)
  )
})

watch(
  () => props.openSearch,
  async (value) => {
    if (value && props.isOpen) {
      isSearchOpen.value = true
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
      activeMain.value = null
      activeChild.value = null
      return
    }

    if (props.openSearch) {
      isSearchOpen.value = true
      emit('search-opened')

      await nextTick()
      searchInput.value?.focus()
    }
  }
)
</script>

<style scoped>
.rail-icon {
  transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
}

.rail-icon:hover,
.rail-icon.active {
  transform: translateX(6px) scale(1.12);
  background: rgba(255, 255, 255, 0.14);
  opacity: 0.95;
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
  transition: color 0.25s ease, transform 0.25s ease;
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
  font-size: 0.9rem;
  font-weight: 800;
  color: #111;
  transition: color 0.25s ease, transform 0.25s ease;
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
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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