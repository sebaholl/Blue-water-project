<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>
  </Transition>

  <Transition name="slide-menu">
    <aside
      v-if="isOpen"
      class="fixed top-0 left-0 z-[100] h-screen w-full bg-white flex overflow-hidden"
    >
      <div class="w-20 md:w-24 bg-bws-blue flex flex-col items-center justify-between py-6">
        <div class="flex flex-col items-center gap-9">
          <BwsLogo class="text-white !h-12 md:!h-14 transition-transform duration-300 hover:scale-110" />

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

          <button class="rail-icon" aria-label="Location">
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

      <div class="w-[310px] md:w-[380px] bg-white px-10 md:px-12 py-24 flex flex-col justify-between border-r border-gray-200">
        <nav class="space-y-3">
          <a
            v-for="(item, index) in menuItems"
            :key="item.name"
            href="#"
            class="menu-item group"
            :style="{ animationDelay: `${index * 0.08}s` }"
            @mouseenter="activeMenuItem = item"
          >
            <span>{{ item.name }}</span>

            <FontAwesomeIcon
              v-if="item.hasSubmenu"
              :icon="faChevronRight"
              class="text-lg transition-transform duration-300 group-hover:translate-x-2"
            />
          </a>
        </nav>

        <a href="#" class="menu-cta">
          Book your transport
        </a>
      </div>

      <div class="hidden md:flex flex-1 bg-gray-200 relative overflow-hidden">
        <div class="absolute inset-0 bg-bws-blue/10"></div>

        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 left-0 w-full h-px bg-black rotate-[35deg] origin-top-left"></div>
          <div class="absolute bottom-0 left-0 w-full h-px bg-black -rotate-[35deg] origin-bottom-left"></div>
        </div>

        <div class="relative z-10 m-auto max-w-xl px-10 text-center">
          <p class="text-sm font-bold uppercase tracking-[0.3em] text-bws-blue mb-4">
            Explore
          </p>

          <h2 class="text-5xl font-black uppercase text-black transition-all duration-300">
            {{ activeMenuItem.title }}
          </h2>

          <p class="mt-5 text-lg text-gray-700 leading-relaxed">
            {{ activeMenuItem.description }}
          </p>

          <button class="mt-8 bg-bws-blue text-white px-6 py-3 font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            View section
          </button>
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

const menuItems = [
  {
    name: 'Solutions',
    title: 'Sea freight solutions',
    description: 'Explore reliable transport solutions designed for European B2B shipping needs.',
    hasSubmenu: true,
  },
  {
    name: 'Toolbox',
    title: 'Shipping toolbox',
    description: 'Access tracking, booking, transport tools, and useful client resources.',
    hasSubmenu: true,
  },
  {
    name: 'Insights',
    title: 'Industry insights',
    description: 'Read guides, articles, and case studies about logistics and freight communication.',
    hasSubmenu: true,
  },
  {
    name: 'Responsibility',
    title: 'Responsible logistics',
    description: 'Learn how sustainability and responsible business are part of modern shipping.',
    hasSubmenu: true,
  },
  {
    name: 'About',
    title: 'About Blue Water',
    description: 'Discover the company profile, values, history, and global presence.',
    hasSubmenu: true,
  },
  {
    name: 'Career',
    title: 'Career opportunities',
    description: 'Explore job opportunities and learn more about working in logistics.',
    hasSubmenu: false,
  },
]

const activeMenuItem = ref(menuItems[0])
</script>

<style scoped>
.rail-icon {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.rail-icon:hover {
  transform: translateX(6px) scale(1.12);
  opacity: 0.85;
}

.menu-item {
  opacity: 0;
  animation: itemIn 0.55s ease forwards;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  font-size: 1.35rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: black;
  transition:
    color 0.3s ease,
    transform 0.3s ease,
    padding-left 0.3s ease;
}

.menu-item:hover {
  color: #0000ab;
  transform: translateX(8px);
  padding-left: 6px;
}

.menu-cta {
  border: 1px solid black;
  padding: 14px 20px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.menu-cta:hover {
  background: #0000ab;
  color: white;
  border-color: #0000ab;
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 171, 0.25);
}

@keyframes itemIn {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
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
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}

.slide-menu-enter-from,
.slide-menu-leave-to {
  transform: translateX(-100%);
}
</style>