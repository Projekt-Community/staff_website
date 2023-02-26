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
	updateProfile,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword
} from 'firebase/auth'
import { firebaseAuth } from '@/firebase/config'

export const userStore = () => {
	const user: Ref<User | null> = ref(null)
	async function login(email: string, password: string) {
		try {
			await signOut(firebaseAuth);
			setPersistence(firebaseAuth, browserLocalPersistence);
			const creds = await signInWithEmailAndPassword(firebaseAuth, email, password);
			user.value = creds.user;
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	}

	function logout() {
		signOut(firebaseAuth)
			.then(() => {
				user.value = null
			})
	}

	function fetchUserData() {
		onAuthStateChanged(firebaseAuth, (currentUser) => {
			user.value = currentUser;
			profilePhoto.value = currentUser?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
		});
	}

	async function updateUser(options: {
		displayName?: string | null,
		photoURL?: string | null
	}) {
		console.log(user.value)
		if (!user.value) return;

		await updateProfile(user.value, options);
		user.value = firebaseAuth.currentUser;
		if (user.value?.photoURL) {
			profilePhoto.value = user.value.photoURL;
		}
		if (user.value?.displayName) {
			username.value = user.value.displayName;
		}
	}

	async function updateUserEmail(user: User, newEmail: string): Promise<string> {
		try {
			console.log(newEmail);
			console.log(firebaseAuth.currentUser?.uid === user.uid);
			if (firebaseAuth.currentUser && firebaseAuth.currentUser.uid === user.uid) {
				await updateEmail(firebaseAuth.currentUser, newEmail);
				console.log("Success!!!");
				fetchUserData();
				return "Success";
			} else {
				throw { Error: "Error authenticating login information" };
			}
		} catch (error: unknown) {
			throw error;
		}
	}

	async function updateUserPassword(newPass: string) {
		if (firebaseAuth.currentUser)
			try {
				return await updatePassword(firebaseAuth.currentUser, newPass)
			} catch (error) {
				throw error
			}

	}

	async function resetPass(email: string) {
		try {
			await sendPasswordResetEmail(firebaseAuth, email);
			console.log("Password reset email sent!");
		} catch (error: any) {
			console.log(error.code, error.message);
			throw error;
		}
	}
	const username: Ref<string | null | undefined> = ref()

	const profilePhoto = ref(user.value?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")

	return {
		fetchUserData,
		login,
		logout,
		profilePhoto,
		resetPass,
		updateUser,
		updateUserEmail,
		updateUserPassword,
		user,
	}
}