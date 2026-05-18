<template>
  <footer class="bg-bw-blue text-white">
    <div class="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <p class="text-sm font-black text-white/60">
        Blue Water Shipping
      </p>

      <div class="mt-16 grid gap-12 md:grid-cols-3">
       <!-- Transport -->
<div>
  <h3 class="text-lg font-black">
    {{ t('footer.transport') }}
  </h3>

  <ul class="mt-8 space-y-5 text-sm font-bold text-white/70">
    <li>
      <RouterLink to="/road-transport" class="footer-link">
       {{ t('footer.roadTransport') }}
      </RouterLink>
    </li>

    <li>
      <RouterLink to="/sea-freight" class="footer-link">
        {{ t('footer.seaFreight') }}
      </RouterLink>
    </li>

    <li>
      <RouterLink to="/air-freight" class="footer-link">
       {{ t('footer.airFreight') }}
      </RouterLink>
    </li>

    <li>
      <a href="https://www.bws.net/solutions/transport/rail-transport" target="_blank" rel="noopener noreferrer" class="footer-link">
        {{ t('footer.railTransport') }}
      </a>
    </li>

    <li>
      <a href="https://www.bws.net/solutions/transport/courier-transport" target="_blank" rel="noopener noreferrer" class="footer-link">
        {{ t('footer.courierTransport') }}
      </a>
    </li>

    <li>
      <a href="https://www.bws.net/solutions/transport/port-service" target="_blank" rel="noopener noreferrer" class="footer-link">
        {{ t('footer.portService') }}
      </a>
    </li>

    <li>
      <a href="https://www.bws.net/solutions/transport/oil-gas-industrial-projects" target="_blank" rel="noopener noreferrer" class="footer-link">
        {{ t('footer.oilGasProjects') }}
      </a>
    </li>

    <li>
      <a href="https://www.bws.net/solutions/transport/reefer-logistics" target="_blank" rel="noopener noreferrer" class="footer-link">
        {{ t('footer.reeferLogistics') }}
      </a>
    </li>

    <li>
      <a href="https://www.bws.net/solutions/transport/marine-logistics" target="_blank" rel="noopener noreferrer" class="footer-link">
        {{ t('footer.marineLogistics') }}
      </a>
    </li>
  </ul>
</div>

        <!-- Information -->
<div>
  <h3 class="text-lg font-black">
    {{ t('footer.information') }}
  </h3>

  <ul class="mt-8 space-y-5 text-sm font-bold text-white/70">
    <li>
      <a
        href="https://www.bws.net/solutions"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
      >
        {{ t('footer.solutions') }}
      </a>
    </li>

    <li>
      <RouterLink to="/about" class="footer-link">
        {{ t('footer.about') }}
      </RouterLink>
    </li>

    <li>
      <a
        href="https://www.bws.net/about/conditions"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
      >
        {{ t('footer.conditions') }}
      </a>
    </li>

    <li>
      <RouterLink to="/track-trace" class="footer-link">
        {{ t('footer.trafficInfo') }}
      </RouterLink>
    </li>

    <li>
      <a
        href="https://www.bws.net/toolbox/surcharges-fees"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
      >
        {{ t('footer.surchargesFees') }}
      </a>
    </li>

    <li>
      <a
        href="https://www.bws.net/about/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
      >
        {{ t('footer.privacyPolicy') }}
      </a>
    </li>

    <li>
      <a
        href="https://www.bws.net/about/tax-policy"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
      >
        {{ t('footer.taxPolicy') }}
      </a>
    </li>

    <li>
      <RouterLink to="/contact" class="footer-link">
        Contact
      </RouterLink>
    </li>
  </ul>
</div>

        <!-- Social -->
<div>
  <h3 class="text-lg font-black">
    {{ t('footer.followUs') }}
  </h3>

  <div class="mt-8 flex gap-4">
    <a
      href="https://www.facebook.com/bluewatershipping"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
      aria-label="Facebook"
    >
      <FontAwesomeIcon :icon="faFacebookF" />
    </a>

    <a
      href="https://www.instagram.com/bluewatershipping"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
      aria-label="Instagram"
    >
      <FontAwesomeIcon :icon="faInstagram" />
    </a>

    <a
      href="https://www.linkedin.com/company/blue-water-shipping"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
      aria-label="LinkedIn"
    >
      <FontAwesomeIcon :icon="faLinkedinIn" />
    </a>

    <a
      href="https://www.youtube.com/@BlueWaterShipping"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
      aria-label="YouTube"
    >
      <FontAwesomeIcon :icon="faYoutube" />
    </a>
  </div>
</div>
      </div>

      <div
        class="mt-16 flex flex-col justify-between gap-4 border-t border-white/20 pt-6 text-sm font-bold text-white/50 md:flex-row"
      >
        <p>© {{ currentYear }} {{ t('footer.prototype') }}</p>

        <!-- <p>{{ t('footer.projectText') }}</p> -->
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

const { t } = useI18n()

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-link {
  display: inline-block;

  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.footer-link:hover {
  color: white;
  transform: translateX(6px);
}

.social-link {
  width: 52px;
  height: 52px;

  display: grid;
  place-items: center;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.08);

  font-size: 1.1rem;
  color: white;

  transition:
    background-color 0.25s ease,
    transform 0.25s ease,
    color 0.25s ease;
}

.social-link:hover {
  background: white;
  color: #0000ab;

  transform: translateY(-4px);
}
</style>