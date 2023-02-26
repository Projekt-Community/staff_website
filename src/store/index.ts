import { defineStore } from 'pinia'
import { userStore } from './stores/firebase/userStore'
import { storageStore } from './stores/firebase/storageStore'
import { firebaseStore } from './stores/firebase/firestoreStore'

export const useUserStore = defineStore('user', userStore)
export const useStorageStore = defineStore('storage', storageStore)
export const useFirebaseStore = defineStore('firestore', firebaseStore)
