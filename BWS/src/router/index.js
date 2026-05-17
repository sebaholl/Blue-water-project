import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { auth, db } from '../firebase/config'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminView from '../views/AdminView.vue'
import SeaFreightView from '../views/SeaFreightView.vue'
import RoadTransportView from '../views/RoadTransportView.vue'
import AirFreightView from '../views/AirFreightView.vue'
import TrackTraceView from '../views/TrackTraceView.vue'
import ContactView from '../views/ContactView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },

  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  {
  path: '/sea-freight',
  name: 'sea-freight',
  component: SeaFreightView,
  },

  { path: '/road-transport', name: 'road-transport', component: RoadTransportView },
  { path: '/air-freight', name: 'air-freight', component: AirFreightView },
  { path: '/track-trace', name: 'track-trace', component: TrackTraceView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/about', name: 'about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

const getUserRole = async (userId) => {
  const userDocRef = doc(db, 'users', userId)
  const userDoc = await getDoc(userDocRef)

  if (!userDoc.exists()) {
    return 'client'
  }

  return userDoc.data().role || 'client'
}

router.beforeEach(async (to) => {
  const currentUser = await getCurrentUser()

  if (to.meta.requiresAuth && !currentUser) {
    return '/login'
  }

  if (to.meta.requiresAdmin) {
    const role = await getUserRole(currentUser.uid)

    if (role !== 'admin') {
      return '/dashboard'
    }
  }
})

export default router