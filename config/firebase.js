import firebase from 'firebase'

const firebaseConfig = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const auth = app.auth()
const db = app.firestore()
const googleProvider = new firebase.auth.GoogleAuthProvider()

export { auth, db, googleProvider }
