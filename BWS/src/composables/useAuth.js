import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../firebase/config'

const user = ref(null)
const userRole = ref('client')
const isAuthReady = ref(false)

onAuthStateChanged(auth, async (currentUser) => {
  user.value = currentUser
  userRole.value = 'client'

  if (currentUser) {
    const userDocRef = doc(db, 'users', currentUser.uid)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
      userRole.value = userDoc.data().role || 'client'
    }
  }

  isAuthReady.value = true
})

const logout = async () => {
  await signOut(auth)
  user.value = null
  userRole.value = 'client'
}

export function useAuth() {
  return {
    user,
    userRole,
    isAuthReady,
    logout,
  }
}