import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth'
import { getStorage, FirebaseStorage, connectStorageEmulator } from 'firebase/storage'
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore'

const localIP = import.meta.env.VITE_LocalIP
console.log(localIP)
const firebaseConfig = {
	apiKey: "AIzaSyCISOirQ_s1-GilFVH3x5PmMGJ3RuvlHBg",
	authDomain: "projekt-staff.firebaseapp.com",
	projectId: "projekt-staff",
	storageBucket: "projekt-staff.appspot.com",
	messagingSenderId: "121538216131",
	appId: "1:121538216131:web:14186d34ce42700ac0a276",
	measurementId: "G-YZ07ZZKR3N"
};
var app: FirebaseApp
var firebaseAuth: Auth
var firebaseStorage: FirebaseStorage
var db: Firestore

if (process.env.NODE_ENV === "production") {
	app = initializeApp(firebaseConfig)
	firebaseAuth = getAuth(app)
	firebaseStorage = getStorage(app)
	db = getFirestore(app)
} else {
	initializeApp(firebaseConfig)
	firebaseAuth = getAuth()
	firebaseStorage = getStorage()
	db = getFirestore()
	connectAuthEmulator(firebaseAuth, `http://${localIP}:9099`)
	connectStorageEmulator(firebaseStorage, `${localIP}`, 9199)
	connectFirestoreEmulator(db, `${localIP}`, 8080)
}
// console.debug('firebaseAuth', firebaseAuth)


export { firebaseAuth, firebaseStorage, db }