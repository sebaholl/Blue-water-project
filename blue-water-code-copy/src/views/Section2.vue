<script setup>
import { useI18n } from 'vue-i18n'
import { ShieldCheck, Ship } from 'lucide-vue-next'
const { t } = useI18n()
</script>

<template>
  <section id="trade-route-snapshot" class="relative overflow-hidden bg-bw-sand">

    <div class="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">

        <!-- Left Column: Route Visualization Panel -->
        <div class="lg:col-span-2">
          <div id="route-panel" class="bg-bw-night rounded-2xl p-8 shadow-2xl relative overflow-hidden border border-white/5">
            <!-- Route Header -->
            <div class="flex items-center justify-between mb-10">
              <div class="flex items-center gap-2">
                <span class="text-xl">🇩🇰</span>
                <span class="font-proxima font-bold text-bw-white text-lg">{{ t('section4.routeFrom') }}</span>
              </div>

              <div class="flex-1 px-4 relative flex items-center justify-center">
                <div class="w-full border-t-2 border-dashed border-bw-green/40 absolute top-1/2 -translate-y-1/2"></div>
                <div class="relative z-10 animate-ship">
                  <Ship class="w-6 h-6 text-bw-green fill-current" />
                </div>
              </div>

              <div class="flex items-center gap-2">
                <span class="font-proxima font-bold text-bw-white text-lg">{{ t('section4.routeTo') }}</span>
                <span class="text-xl">🇳🇴</span>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-3 gap-0 mb-8">
              <!-- Stat 1 -->
              <div class="text-center px-2">
                <div class="font-proxima font-black text-bw-green text-2xl xl:text-3xl mb-1">
                  {{ t('section4.stat1Value') }}
                </div>
                <div class="font-proxima text-bw-white/70 text-[10px] uppercase tracking-widest leading-none">
                  {{ t('section4.stat1Label') }}
                </div>
              </div>

              <!-- Stat 2 (with separators) -->
              <div class="text-center px-2 border-x border-white/10">
                <div class="font-proxima font-black text-bw-green text-2xl xl:text-3xl mb-1">
                  {{ t('section4.stat2Value') }}
                </div>
                <div class="font-proxima text-bw-white/70 text-[10px] uppercase tracking-widest leading-none">
                  {{ t('section4.stat2Label') }}
                </div>
              </div>

              <!-- Stat 3 -->
              <div class="text-center px-2">
                <div class="font-proxima font-black text-bw-green text-2xl xl:text-3xl mb-1">
                  {{ t('section4.stat3Value') }}
                </div>
                <div class="font-proxima text-bw-white/70 text-[10px] uppercase tracking-widest leading-none">
                  {{ t('section4.stat3Label') }}
                </div>
              </div>
            </div>

            <div class="border-t border-white/10 my-6"></div>

            <!-- Bottom Callout -->
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-bw-green animate-pulse shadow-[0_0_8px_#56E5B2]"></div>
              <span class="font-proxima text-sm text-bw-white/80">
                {{ t('section4.inHouseNote') }}
              </span>
            </div>

            <!-- Subtle background decorative elements -->
            <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-bw-blue/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>

        <!-- Right Column: Content -->
        <div class="lg:col-span-3 space-y-8">
          <div class="flex items-center gap-3">
            <div class="h-6 w-1 bg-bw-green"></div>
            <span class="inline-flex items-center px-3 py-1 bg-bw-blue text-bw-white font-proxima font-bold text-xs tracking-widest uppercase">
              {{ t('section4.eyebrow') }}
            </span>
          </div>

          <h2 class="font-proxima font-black text-bw-blue text-3xl md:text-5xl lg:text-6xl leading-tight">
            {{ t('section4.headline') }}
          </h2>

          <p class="font-proxima text-bw-steel text-base md:text-lg max-w-md leading-relaxed">
            {{ t('section4.body') }}
          </p>

          <div class="flex flex-col space-y-4">
            <div>
              <router-link to="/customs">
              <button
                id="cta-customs-guide"
                class="bg-bw-red text-bw-white font-proxima font-bold px-8 py-4 transition-all duration-200 hover:brightness-110 active:scale-95 uppercase tracking-wide"
              >
                {{ t('section4.cta') }}
              </button>
              </router-link>
            </div>

            <div class="flex items-center gap-2 text-bw-steel">
              <ShieldCheck class="w-4 h-4 text-bw-green" />
              <span class="font-proxima text-sm">{{ t('section4.trustSignal') }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

</template>