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
          <button class="rail-icon" aria-label="Search">
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

      <!-- Main column -->
      <div
        class="w-[250px] md:w-[300px] bg-white px-8 md:px-10 py-24 flex flex-col justify-between border-r border-gray-200"
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

        <a href="#" class="menu-cta">Book your transport</a>
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
    </aside>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
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

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['close'])

const activeMain = ref(null)
const activeChild = ref(null)

const openMainColumn = (item) => {
  if (!item.children) return

  activeMain.value = item
  activeChild.value = null
}

const openChildColumn = (child) => {
  if (!child.children && !child.type) return

  activeChild.value = child
}

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
</script>

<style scoped>
.rail-icon {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.rail-icon:hover {
  transform: translateX(6px) scale(1.12);
  opacity: 0.85;
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

.menu-cta {
  border: 1px solid black;
  padding: 14px 20px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition: all 0.3s ease;
}

.menu-cta:hover {
  background: #0000ab;
  color: white;
  border-color: #0000ab;
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 171, 0.25);
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
.column-slide-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.column-slide-enter-from {
  opacity: 0;
  transform: translateX(-24px);
}

.column-slide-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>