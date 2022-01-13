import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'

export const firebaseApp = initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

export const auth = getAuth(firebaseApp)
export const authProvider = new GoogleAuthProvider()
export const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
export const imagesStorage = ref(storage, 'images')
export const audiosStorage = ref(storage, 'audios')
