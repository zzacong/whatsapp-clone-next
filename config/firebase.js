import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()
const firestore = firebase.firestore()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const { serverTimestamp } = firebase.firestore.FieldValue

if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099')
  firestore.useEmulator('localhost', 8080)
}

export { auth, firestore, googleProvider, serverTimestamp }
