import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import NotFoundView from '@/views/NotFoundView.vue'

// path = URL typed in Browser
// component = page to show 
const routes = [ // Map of pages
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  { path: '/sea-freight', name: 'sea-freight', component: () => import('../views/SeaFreightView.vue') },
  { path: '/road-transport', name: 'road-transport', component: () => import('../views/RoadTransportView.vue') },
  { path: '/air-freight', name: 'air-freight', component: () => import('../views/AirFreightView.vue') },
  { path: '/track-trace', name: 'track-trace', component: () => import('../views/TrackTraceView.vue') },
  { path: '/Heavy-lift', name: 'heavy-lift', component: () => import('../views/Heavy-lift.vue') },
  { path: '/Customs', name: 'customs', component: () => import('../views/Customs.vue') },
  { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }, // tells the router that the user must be logged in to access this page
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }, // requires auth to be logged in and requires admin to be an admin
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView, // 404 page if page is not found 
  },
  {
    path: '/contact/:officeSlug',
    name: 'ContactOffice',
    component: () => import('@/views/ContactOfficeView.vue'), // displays different contact pages based on the office slug 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const getCurrentUser = () =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })

const getUserRole = async (userId) => {
  const userDoc = await getDoc(doc(db, 'users', userId))
  return userDoc.exists() ? userDoc.data().role || 'client' : 'client'
}

router.beforeEach(async (to) => { // Protects the routes from unauthenticated users 
  const currentUser = await getCurrentUser()

  if (to.meta.requiresAuth && !currentUser) return '/login'

  if (to.meta.requiresAdmin) {
    const role = await getUserRole(currentUser.uid)
    if (role !== 'admin') return '/dashboard'
  }
})

export default router
