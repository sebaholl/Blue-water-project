import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../firebase/config'
// ref = it makes a variable that the rest of the app can react to when it changes
const user = ref(null) // who is logged in (null = none)
const userRole = ref('client') // roles = admin, employee, client 
const isAuthReady = ref(false) // is the login process complete

onAuthStateChanged(auth, async (currentUser) => { // Monitors changes in firebase auth to track who is logged in 
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
// logout function
const logout = async () => {
  await signOut(auth) // signs out of firebase
  user.value = null // resets the user variable to null
  userRole.value = 'client' // resets the role variable to client
}

export function useAuth() {
  return {
    user,
    userRole,
    isAuthReady,
    logout,
  }
}