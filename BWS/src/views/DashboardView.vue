<template>
  <section class="min-h-screen bg-gray-100 px-6 py-16">
    <div class="mx-auto max-w-6xl">
      <!-- Header -->
      <div class="mb-8 flex flex-col justify-between gap-4 bg-white p-6 shadow md:flex-row md:items-center">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
            {{ t('dashboard.clientPortal') }}
          </p>

          <h1 class="mt-2 text-3xl font-black text-bws-blue">
            {{ t('dashboard.welcome') }}
          </h1>

          <p class="mt-2 text-gray-600">
            {{ t('dashboard.loggedInAs') }}:
            <span class="font-bold text-black">{{ user?.email }}</span>
          </p>
        </div>

        <button
          class="bg-black px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-bws-blue"
          @click="handleLogout"
        >
          {{ t('dashboard.logout') }}
        </button>
      </div>

      <!-- Stats -->
      <div class="grid gap-6 md:grid-cols-4">
        <div class="bg-white p-6 shadow">
          <p class="text-sm font-bold uppercase tracking-widest text-gray-400">
            {{ t('dashboard.active') }}
          </p>
          <h2 class="mt-3 text-4xl font-black text-bws-blue">{{ activeCount }}</h2>
        </div>

        <div class="bg-white p-6 shadow">
          <p class="text-sm font-bold uppercase tracking-widest text-gray-400">
            {{ t('dashboard.pending') }}
          </p>
          <h2 class="mt-3 text-4xl font-black text-bws-blue">{{ pendingCount }}</h2>
        </div>

        <div class="bg-white p-6 shadow">
          <p class="text-sm font-bold uppercase tracking-widest text-gray-400">
            {{ t('dashboard.inTransit') }}
          </p>
          <h2 class="mt-3 text-4xl font-black text-bws-blue">{{ inTransitCount }}</h2>
        </div>

        <div class="bg-white p-6 shadow">
          <p class="text-sm font-bold uppercase tracking-widest text-gray-400">
            {{ t('dashboard.delivered') }}
          </p>
          <h2 class="mt-3 text-4xl font-black text-bws-blue">{{ deliveredCount }}</h2>
        </div>
      </div>

      <div class="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <!-- Saved shipments -->
        <div class="bg-white p-6 shadow">
          <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-black text-bws-blue">
              {{ t('dashboard.savedShipments') }}
            </h2>

            <span class="text-xs font-bold uppercase tracking-widest text-gray-400">
              {{ isLoading ? t('dashboard.loading') : `${visibleShipments.length} ${t('dashboard.records')}` }}
            </span>
          </div>

          <div class="mt-6 space-y-4">
            <article
              v-for="shipment in visibleShipments"
              :key="shipment.firebaseId || shipment.id"
              class="cursor-pointer border border-gray-200 p-4 transition hover:-translate-y-1 hover:border-bws-blue hover:shadow-md"
              @click="openShipmentModal(shipment)"
            >
              <div class="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div class="flex-1">
                  <p class="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {{ shipment.id }}
                  </p>

                  <h3 class="mt-1 text-lg font-black">
                    {{ shipment.route }}
                  </h3>

                  <p class="mt-1 text-sm text-gray-600">
                    {{ translateTransportType(shipment.type) }} · {{ t('dashboard.eta') }}: {{ shipment.eta }}
                  </p>

                  <p v-if="shipment.company" class="mt-1 text-sm text-gray-500">
                    {{ t('dashboard.company') }}: {{ shipment.company }}
                  </p>

                  <p v-if="shipment.message" class="mt-2 text-sm text-gray-500">
                    {{ shipment.message }}
                  </p>

                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      v-for="status in statusSteps"
                      :key="status"
                      class="rounded-full px-3 py-1 text-xs font-bold uppercase"
                      :class="getStepClass(shipment.status, status)"
                    >
                      {{ translateStatus(status) }}
                    </span>
                  </div>
                </div>

                <div class="flex flex-col items-start gap-3 md:items-end">
                  <span
                    class="inline-flex w-fit px-3 py-1 text-xs font-bold uppercase"
                    :class="getStatusBadgeClass(shipment.status)"
                  >
                    {{ translateStatus(shipment.status) }}
                  </span>

                  <button
                    v-if="shipment.firebaseId && shipment.status !== 'Delivered'"
                    class="border border-bws-blue px-4 py-2 text-xs font-black uppercase text-bws-blue transition hover:bg-bws-blue hover:text-white"
                    @click.stop="moveToNextStatus(shipment)"
                  >
                    {{ t('dashboard.moveTo') }} {{ translateStatus(getNextStatus(shipment.status)) }}
                  </button>

                  <p
                    v-else-if="!shipment.firebaseId"
                    class="text-xs font-semibold text-gray-400"
                  >
                    {{ t('dashboard.demoShipment') }}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Booking form -->
        <div class="bg-white p-6 shadow">
          <h2 class="text-2xl font-black text-bws-blue">
            {{ t('dashboard.bookTransport') }}
          </h2>

          <p class="mt-2 text-sm text-gray-600">
            {{ t('dashboard.bookingText') }}
          </p>

          <form class="mt-6 space-y-4" @submit.prevent="submitBooking">
            <div>
              <label class="mb-2 block text-sm font-bold text-gray-700">
                {{ t('dashboard.companyName') }}
              </label>

              <input
                v-model="booking.company"
                type="text"
                required
                class="w-full border border-gray-300 px-4 py-3 outline-none focus:border-bws-blue"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-bold text-gray-700">
                {{ t('dashboard.destination') }}
              </label>

              <input
                v-model="booking.destination"
                type="text"
                required
                :placeholder="t('dashboard.destinationPlaceholder')"
                class="w-full border border-gray-300 px-4 py-3 outline-none focus:border-bws-blue"
              />
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-bold text-gray-700">
                  {{ t('dashboard.departurePort') }}
                </label>

                <input
                  v-model="booking.departurePort"
                  type="text"
                  required
                  :placeholder="t('dashboard.departurePlaceholder')"
                  class="w-full border border-gray-300 px-4 py-3 outline-none focus:border-bws-blue"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-bold text-gray-700">
                  {{ t('dashboard.arrivalPort') }}
                </label>

                <input
                  v-model="booking.arrivalPort"
                  type="text"
                  required
                  :placeholder="t('dashboard.arrivalPlaceholder')"
                  class="w-full border border-gray-300 px-4 py-3 outline-none focus:border-bws-blue"
                />
              </div>
            </div>

            <div>
              <label class="mb-2 block text-sm font-bold text-gray-700">
                {{ t('dashboard.transportType') }}
              </label>

              <select
                v-model="booking.transportType"
                class="w-full border border-gray-300 px-4 py-3 outline-none focus:border-bws-blue"
              >
                <option value="Sea Freight">{{ t('transportTypes.seaFreight') }}</option>
                <option value="Air Freight">{{ t('transportTypes.airFreight') }}</option>
                <option value="Road Transport">{{ t('transportTypes.roadTransport') }}</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-bold text-gray-700">
                {{ t('dashboard.message') }}
              </label>

              <textarea
                v-model="booking.message"
                rows="4"
                required
                class="w-full border border-gray-300 px-4 py-3 outline-none focus:border-bws-blue"
              ></textarea>
            </div>

            <button
              :disabled="isSubmitting"
              class="w-full bg-bws-blue px-5 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ isSubmitting ? t('dashboard.sending') : t('dashboard.sendRequest') }}
            </button>

            <p v-if="successMessage" class="text-sm font-bold text-green-700">
              {{ successMessage }}
            </p>

            <p v-if="errorMessage" class="text-sm font-bold text-red-600">
              {{ errorMessage }}
            </p>
          </form>
        </div>
      </div>
    </div>

    <!-- Shipment detail modal -->
    <Transition name="modal-fade">
      <div
        v-if="selectedShipment"
        class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-6 backdrop-blur-sm"
        @click.self="closeShipmentModal"
      >
        <div class="max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white shadow-2xl">
          <div class="flex items-start justify-between border-b border-gray-200 p-6">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                {{ t('dashboard.shipmentDetails') }}
              </p>

              <h2 class="mt-2 text-3xl font-black text-bws-blue">
                {{ selectedShipment.id }}
              </h2>

              <p class="mt-2 text-gray-600">
                {{ selectedShipment.route }}
              </p>
            </div>

            <button
              class="text-3xl font-black text-black transition hover:text-bws-blue"
              @click="closeShipmentModal"
            >
              ×
            </button>
          </div>

          <div class="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="detail-box">
                  <p class="detail-label">{{ t('dashboard.containerNumber') }}</p>
                  <p class="detail-value">{{ selectedShipment.containerNumber }}</p>
                </div>

                <div class="detail-box">
                  <p class="detail-label">{{ t('dashboard.currentStatus') }}</p>
                  <p
                    class="mt-2 inline-flex px-3 py-1 text-xs font-bold uppercase"
                    :class="getStatusBadgeClass(selectedShipment.status)"
                  >
                    {{ translateStatus(selectedShipment.status) }}
                  </p>
                </div>

                <div class="detail-box">
                  <p class="detail-label">{{ t('dashboard.departurePort') }}</p>
                  <p class="detail-value">{{ selectedShipment.departurePort }}</p>
                </div>

                <div class="detail-box">
                  <p class="detail-label">{{ t('dashboard.arrivalPort') }}</p>
                  <p class="detail-value">{{ selectedShipment.arrivalPort }}</p>
                </div>

                <div class="detail-box">
                  <p class="detail-label">{{ t('dashboard.eta') }}</p>
                  <p class="detail-value">{{ selectedShipment.eta }}</p>
                </div>

                <div class="detail-box">
                  <p class="detail-label">{{ t('dashboard.transportType') }}</p>
                  <p class="detail-value">{{ translateTransportType(selectedShipment.type) }}</p>
                </div>
              </div>

              <div class="mt-6 border border-gray-200 p-5">
                <h3 class="text-xl font-black text-bws-blue">
                  {{ t('dashboard.statusTimeline') }}
                </h3>

                <div class="mt-5 space-y-5">
                  <div
                    v-for="status in statusSteps"
                    :key="status"
                    class="flex gap-4"
                  >
                    <div class="flex flex-col items-center">
                      <div
                        class="h-5 w-5 rounded-full"
                        :class="isStepCompleted(selectedShipment.status, status)
                          ? 'bg-bws-blue'
                          : 'bg-gray-300'"
                      ></div>

                      <div
                        v-if="status !== statusSteps[statusSteps.length - 1]"
                        class="h-10 w-px"
                        :class="isStepCompleted(selectedShipment.status, status)
                          ? 'bg-bws-blue'
                          : 'bg-gray-300'"
                      ></div>
                    </div>

                    <div>
                      <p
                        class="font-black"
                        :class="isStepCompleted(selectedShipment.status, status)
                          ? 'text-black'
                          : 'text-gray-400'"
                      >
                        {{ translateStatus(status) }}
                      </p>

                      <p class="text-sm text-gray-500">
                        {{ getTimelineDescription(status) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside class="border border-gray-200 p-5">
              <h3 class="text-xl font-black text-bws-blue">
                {{ t('dashboard.documents') }}
              </h3>

              <div class="mt-5 space-y-3">
                <a
                  v-for="document in selectedShipment.documents"
                  :key="document"
                  href="#"
                  class="flex items-center justify-between border border-gray-200 px-4 py-3 text-sm font-bold transition hover:border-bws-blue hover:text-bws-blue"
                >
                  <span>{{ translateDocument(document) }}</span>
                  <span>PDF</span>
                </a>
              </div>

              <div class="mt-6 border-t border-gray-200 pt-5">
                <h3 class="text-xl font-black text-bws-blue">
                  {{ t('dashboard.clientNote') }}
                </h3>

                <p class="mt-3 text-sm leading-relaxed text-gray-600">
                  {{ selectedShipment.message || t('dashboard.noMessage') }}
                </p>
              </div>

              <button
                v-if="selectedShipment.firebaseId && selectedShipment.status !== 'Delivered'"
                class="mt-6 w-full bg-bws-blue px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-blue-900"
                @click="moveToNextStatus(selectedShipment)"
              >
                {{ t('dashboard.moveTo') }} {{ translateStatus(getNextStatus(selectedShipment.status)) }}
              </button>
            </aside>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '../firebase/config'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { t } = useI18n()
const { user, logout } = useAuth()

const successMessage = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)
const isLoading = ref(true)
const firestoreShipments = ref([])
const selectedShipment = ref(null)

let unsubscribeShipments = null

const statusSteps = ['Pending', 'In transit', 'Customs', 'Delivered']

const demoShipments = [
  {
    id: 'BWS-20481',
    route: 'Hamburg → Copenhagen',
    type: 'Sea Freight',
    eta: '3 days',
    status: 'In transit',
    containerNumber: 'MSCU-839201-4',
    departurePort: 'Hamburg',
    arrivalPort: 'Copenhagen',
    documents: ['Bill of Lading', 'Commercial Invoice', 'Packing List'],
  },
  {
    id: 'BWS-20482',
    route: 'Rotterdam → Esbjerg',
    type: 'Container Shipment',
    eta: '5 days',
    status: 'Customs',
    containerNumber: 'BWSU-482910-7',
    departurePort: 'Rotterdam',
    arrivalPort: 'Esbjerg',
    documents: ['Bill of Lading', 'Customs Declaration', 'Insurance Certificate'],
  },
  {
    id: 'BWS-20483',
    route: 'Aarhus → Oslo',
    type: 'Road Transport',
    eta: 'Delivered',
    status: 'Delivered',
    containerNumber: 'ROAD-20483',
    departurePort: 'Aarhus',
    arrivalPort: 'Oslo',
    documents: ['Delivery Note', 'Proof of Delivery', 'Invoice'],
  },
]

const booking = reactive({
  company: '',
  destination: '',
  departurePort: '',
  arrivalPort: '',
  transportType: 'Sea Freight',
  message: '',
})

const visibleShipments = computed(() => {
  return [...firestoreShipments.value, ...demoShipments]
})

const activeCount = computed(() =>
  visibleShipments.value.filter((shipment) => shipment.status !== 'Delivered').length
)

const pendingCount = computed(() =>
  visibleShipments.value.filter((shipment) => shipment.status === 'Pending').length
)

const inTransitCount = computed(() =>
  visibleShipments.value.filter(
    (shipment) => shipment.status === 'In transit' || shipment.status === 'Customs'
  ).length
)

const deliveredCount = computed(() =>
  visibleShipments.value.filter((shipment) => shipment.status === 'Delivered').length
)

watch(
  user,
  (currentUser) => {
    if (!currentUser) {
      isLoading.value = false
      return
    }

    if (unsubscribeShipments) {
      unsubscribeShipments()
    }

    const shipmentsQuery = query(
      collection(db, 'shipments'),
      where('userId', '==', currentUser.uid)
    )

    unsubscribeShipments = onSnapshot(
      shipmentsQuery,
      (snapshot) => {
        firestoreShipments.value = snapshot.docs.map((shipmentDoc) => ({
          firebaseId: shipmentDoc.id,
          ...shipmentDoc.data(),
        }))

        isLoading.value = false
      },
      (error) => {
        console.error(error)
        errorMessage.value = t('dashboard.couldNotLoad')
        isLoading.value = false
      }
    )
  },
  { immediate: true }
)

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

const translateDocument = (document) => {
  const map = {
    'Booking Confirmation': 'dashboard.bookingConfirmation',
    'Commercial Invoice': 'dashboard.commercialInvoice',
    'Transport Request': 'dashboard.transportRequest',
    'Bill of Lading': 'dashboard.billOfLading',
    'Packing List': 'dashboard.packingList',
    'Customs Declaration': 'dashboard.customsDeclaration',
    'Insurance Certificate': 'dashboard.insuranceCertificate',
    'Delivery Note': 'dashboard.deliveryNote',
    'Proof of Delivery': 'dashboard.proofOfDelivery',
    Invoice: 'dashboard.invoice',
  }

  return t(map[document] || 'dashboard.transportRequest')
}

const generateContainerNumber = () => {
  const letters = 'BWSU'
  const numbers = Math.floor(100000 + Math.random() * 900000)
  const checkDigit = Math.floor(Math.random() * 9)

  return `${letters}-${numbers}-${checkDigit}`
}

const getNextStatus = (currentStatus) => {
  const currentIndex = statusSteps.indexOf(currentStatus)

  if (currentIndex === -1 || currentIndex === statusSteps.length - 1) {
    return currentStatus
  }

  return statusSteps[currentIndex + 1]
}

const moveToNextStatus = async (shipment) => {
  if (!shipment.firebaseId) return

  const nextStatus = getNextStatus(shipment.status)

  try {
    await updateDoc(doc(db, 'shipments', shipment.firebaseId), {
      status: nextStatus,
      eta: nextStatus === 'Delivered' ? 'Delivered' : shipment.eta,
      updatedAt: serverTimestamp(),
    })

    if (selectedShipment.value?.firebaseId === shipment.firebaseId) {
      selectedShipment.value = {
        ...selectedShipment.value,
        status: nextStatus,
        eta: nextStatus === 'Delivered' ? 'Delivered' : selectedShipment.value.eta,
      }
    }

    successMessage.value = `${shipment.id} ${t('dashboard.movedTo')} ${translateStatus(nextStatus)}.`
  } catch (error) {
    console.error(error)
    errorMessage.value = t('dashboard.couldNotUpdate')
  }
}

const getStatusBadgeClass = (status) => {
  if (status === 'Delivered') return 'bg-green-100 text-green-700'
  if (status === 'Customs') return 'bg-yellow-100 text-yellow-700'
  if (status === 'Pending') return 'bg-gray-100 text-gray-700'

  return 'bg-blue-100 text-bws-blue'
}

const getStepClass = (currentStatus, step) => {
  const currentIndex = statusSteps.indexOf(currentStatus)
  const stepIndex = statusSteps.indexOf(step)

  if (stepIndex <= currentIndex) {
    return 'bg-bws-blue text-white'
  }

  return 'bg-gray-100 text-gray-400'
}

const isStepCompleted = (currentStatus, step) => {
  return statusSteps.indexOf(step) <= statusSteps.indexOf(currentStatus)
}

const getTimelineDescription = (status) => {
  const descriptions = {
    Pending: t('dashboard.timeline.pending'),
    'In transit': t('dashboard.timeline.inTransit'),
    Customs: t('dashboard.timeline.customs'),
    Delivered: t('dashboard.timeline.delivered'),
  }

  return descriptions[status]
}

const normalizeShipment = (shipment) => {
  return {
    containerNumber: shipment.containerNumber || generateContainerNumber(),
    departurePort: shipment.departurePort || 'Not specified',
    arrivalPort: shipment.arrivalPort || 'Not specified',
    documents: shipment.documents || ['Booking Confirmation', 'Commercial Invoice', 'Transport Request'],
    ...shipment,
  }
}

const openShipmentModal = (shipment) => {
  selectedShipment.value = normalizeShipment(shipment)
  document.body.style.overflow = 'hidden'
}

const closeShipmentModal = () => {
  selectedShipment.value = null
  document.body.style.overflow = ''
}

const submitBooking = async () => {
  if (!user.value) {
    router.push('/login')
    return
  }

  successMessage.value = ''
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    const shipmentNumber = `BWS-${Math.floor(10000 + Math.random() * 90000)}`

    await addDoc(collection(db, 'shipments'), {
      id: shipmentNumber,
      userId: user.value.uid,
      company: booking.company,
      route: booking.destination,
      departurePort: booking.departurePort,
      arrivalPort: booking.arrivalPort,
      containerNumber: generateContainerNumber(),
      documents: ['Booking Confirmation', 'Commercial Invoice', 'Transport Request'],
      type: booking.transportType,
      message: booking.message,
      eta: 'Pending confirmation',
      status: 'Pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    successMessage.value = t('dashboard.savedToFirebase')

    booking.company = ''
    booking.destination = ''
    booking.departurePort = ''
    booking.arrivalPort = ''
    booking.transportType = 'Sea Freight'
    booking.message = ''
  } catch (error) {
    console.error(error)
    errorMessage.value = t('dashboard.couldNotSave')
  } finally {
    isSubmitting.value = false
  }
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onUnmounted(() => {
  if (unsubscribeShipments) {
    unsubscribeShipments()
  }

  document.body.style.overflow = ''
})
</script>

<style scoped>
.detail-box {
  border: 1px solid #e5e7eb;
  padding: 1rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #9ca3af;
}

.detail-value {
  margin-top: 0.5rem;
  font-weight: 900;
  color: #111827;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>