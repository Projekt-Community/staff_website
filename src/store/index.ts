import { defineStore } from 'pinia'
import { userStore } from './stores/firebase/userStore'
import { storageStore } from './stores/firebase/storageStore'

export const useUserStore = defineStore('user', userStore)
export const useStorageStore = defineStore('storage', storageStore)
