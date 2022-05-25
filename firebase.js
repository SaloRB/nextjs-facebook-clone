import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyBsssY4Io54upMf-HlGPtHm6y9X5OKG2S0',
  authDomain: 'facebook-clone-52b09.firebaseapp.com',
  projectId: 'facebook-clone-52b09',
  storageBucket: 'facebook-clone-52b09.appspot.com',
  messagingSenderId: '455804791995',
  appId: '1:455804791995:web:57cb9a600d9943f2410d9e',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage }
