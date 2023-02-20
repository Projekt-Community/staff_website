import {
	ref,
	Ref
} from 'vue'
import {
	browserLocalPersistence,
	onAuthStateChanged,
	setPersistence,
	signInWithEmailAndPassword,
	signOut,
	User,
	updateProfile
} from 'firebase/auth'
import { firebaseAuth } from '@/firebase/config'

export const userStore = () => {
	const user: Ref<User | null> = ref(null)
	async function login(email: string, password: string) {
		try {
			await signOut(firebaseAuth)
			setPersistence(firebaseAuth, browserLocalPersistence)
			const creds = await signInWithEmailAndPassword(firebaseAuth, email, password)
			user.value = creds.user
		} catch (error: any) {
			console.log(error)
			throw error
		}
	}

	function logout() {
		signOut(firebaseAuth).then(() => {
			user.value = null
		})
	}

	function fetchUserData() {
		onAuthStateChanged(firebaseAuth, () => {
			user.value = firebaseAuth.currentUser
			profilePhoto.value = user.value?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
		})
	}

	async function updateUser(options: { displayName?: string | null, photoURL?: string | null }) {
		console.log(user.value)
		if (user.value) {
			await updateProfile(user.value, options)
			user.value = firebaseAuth.currentUser
			if (user.value?.photoURL)
				profilePhoto.value = user.value?.photoURL
			if (user.value?.displayName)
				username.value = user.value.displayName
		}
	}

	const username: Ref<string | null | undefined> = ref()

	const profilePhoto = ref(user.value?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")

	return { user, profilePhoto, login, logout, fetchUserData, updateUser }
}