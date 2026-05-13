<template>
  <section class="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 sm:py-12 md:py-16">
    <div class="mx-auto max-w-6xl">
      <!-- Header -->
      <div
        class="mb-6 flex flex-col justify-between gap-5 bg-white p-5 shadow sm:p-6 md:mb-8 md:flex-row md:items-center"
      >
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 sm:text-sm">
            {{ t('admin.adminPortal') }}
          </p>

          <h1 class="mt-2 text-3xl font-black leading-tight text-bws-blue sm:text-4xl">
            {{ t('admin.shipmentManagement') }}
          </h1>

          <p class="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            {{ t('admin.description') }}
          </p>
        </div>

        <button
          class="flex h-12 w-full items-center justify-center bg-black px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-bws-blue md:w-auto"
          @click="handleLogout"
        >
          {{ t('admin.logout') }}
        </button>
      </div>

      <!-- Shipments -->
      <div class="bg-white p-5 shadow sm:p-6">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 class="text-2xl font-black text-bws-blue">
            {{ t('admin.allShipments') }}
          </h2>

          <span class="text-xs font-bold uppercase tracking-widest text-gray-400">
            {{ shipments.length }} {{ t('admin.records') }}
          </span>
        </div>

        <div class="mt-6 space-y-4">
          <article
            v-for="shipment in shipments"
            :key="shipment.firebaseId"
            class="border border-gray-200 p-4 transition hover:border-bws-blue hover:shadow-md sm:p-5"
          >
            <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div class="min-w-0">
                <p class="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {{ shipment.id }}
                </p>

                <h3 class="mt-1 break-words text-lg font-black">
                  {{ shipment.route }}
                </h3>

                <p class="mt-1 break-words text-sm leading-relaxed text-gray-600">
                  {{ translateTransportType(shipment.type) }} · {{ shipment.company }}
                </p>

                <p class="mt-1 break-all text-sm text-gray-500">
                  {{ t('admin.userId') }}: {{ shipment.userId }}
                </p>
              </div>

              <div class="flex flex-col items-start gap-3 md:items-end">
                <select
                  v-model="shipment.status"
                  class="h-12 w-full border border-gray-300 px-4 text-sm font-bold outline-none transition focus:border-bws-blue focus:shadow-[0_0_0_3px_rgba(0,0,171,0.12)] sm:w-auto"
                  @change="updateShipmentStatus(shipment)"
                >
                  <option value="Pending">{{ t('statuses.pending') }}</option>
                  <option value="In transit">{{ t('statuses.inTransit') }}</option>
                  <option value="Customs">{{ t('statuses.customs') }}</option>
                  <option value="Delivered">{{ t('statuses.delivered') }}</option>
                </select>

                <span
                  class="px-3 py-1 text-xs font-bold uppercase"
                  :class="getStatusBadgeClass(shipment.status)"
                >
                  {{ translateStatus(shipment.status) }}
                </span>
              </div>
            </div>
          </article>

          <p v-if="shipments.length === 0" class="text-sm text-gray-500">
            {{ t('admin.noShipments') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

import { db } from '../firebase/config'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { t } = useI18n()
const { logout } = useAuth()

const shipments = ref([])
let unsubscribeShipments = null

const shipmentsQuery = query(collection(db, 'shipments'))

unsubscribeShipments = onSnapshot(shipmentsQuery, (snapshot) => {
  shipments.value = snapshot.docs.map((shipmentDoc) => ({
    firebaseId: shipmentDoc.id,
    ...shipmentDoc.data(),
  }))
})

const updateShipmentStatus = async (shipment) => {
  await updateDoc(doc(db, 'shipments', shipment.firebaseId), {
    status: shipment.status,
    eta: shipment.status === 'Delivered' ? 'Delivered' : shipment.eta,
    updatedAt: serverTimestamp(),
  })
}

const translateStatus = (status) => {
  const map = {
    Pending: 'statuses.pending',
    'In transit': 'statuses.inTransit',
    Customs: 'statuses.customs',
    Delivered: 'statuses.delivered',
  }

  return t(map[status] || 'statuses.pending')
}

const translateTransportType = (type) => {
  const map = {
    'Sea Freight': 'transportTypes.seaFreight',
    'Air Freight': 'transportTypes.airFreight',
    'Road Transport': 'transportTypes.roadTransport',
    'Container Shipment': 'transportTypes.containerShipment',
  }

  return t(map[type] || 'transportTypes.seaFreight')
}

const getStatusBadgeClass = (status) => {
  if (status === 'Delivered') {
    return 'bg-green-100 text-green-700'
  }

  if (status === 'Customs') {
    return 'bg-yellow-100 text-yellow-700'
  }

  if (status === 'Pending') {
    return 'bg-gray-100 text-gray-700'
  }

  return 'bg-blue-100 text-bws-blue'
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onUnmounted(() => {
  if (unsubscribeShipments) {
    unsubscribeShipments()
  }
})
</script>