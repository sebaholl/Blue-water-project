<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function handleClick() {
  // TODO: add navigation (e.g. router.push('/about'))
}
</script>

<template>
  <div class="absolute top-20 right-8 z-30">
    <button
      class="relative block cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-none"
      style="width: 140px; height: 140px;"
      @click="handleClick"
      :aria-label="t('floatingAbout.ariaLabel')"
    >
      <!-- Static arc text around the circle -->
      <svg
        viewBox="0 0 200 200"
        class="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <path
            id="floatingAboutCirclePath"
            d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>
        <text
          font-size="14"
          fill="white"
          font-family="'Proxima Nova', sans-serif"
          font-weight="500"
          letter-spacing="3"
        >
          <textPath href="#floatingAboutCirclePath" startOffset="12%">
            {{ t('floatingAbout.circleText') }}
          </textPath>
        </text>
      </svg>

      <!-- Center placeholder circle (add your image src here later) -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="rounded-full border-2 border-white/50 bg-white/10"
          style="width: 86px; height: 86px;"
        />
      </div>
    </button>
  </div>
</template>
