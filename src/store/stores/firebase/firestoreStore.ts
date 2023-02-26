import { db } from '@/firebase/config'
import { ref } from 'vue'
import { FirebaseError } from 'firebase/app'
import { getDoc, collection, doc, getDocs, setDoc, DocumentData, FirestoreError, addDoc } from 'firebase/firestore'
import { User } from 'firebase/auth'

export type userFields = {
	Contact?: { //
		Discord?: string,
		Email?: string,
		Phone?: string
	},
	contributions?: string, //
	displayname?: string, //
	jobTitle?: string,
	options?: { //
		showDiscord?: boolean,
		showEmail?: boolean,
		showPhone?: boolean
	},
	personal?: string, //
	photoURL?: string, //
	profileBackground?: string, //
	projects?: [],
	Socials?: { //
		link: string,
		name: string
	}[],
	Teams?: string[]
	work?: string //
}

export interface UserNotFoundError {
	Error: "User not found"
}

export interface UnexpectedError {
	Error: string
}

export const firebaseStore = () => {
	type GetUserResult = DocumentData | UserNotFoundError | UnexpectedError
	async function getUserData(uid: string): Promise<GetUserResult> {
		const docRef = doc(db, "users", uid)
		try {
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				return docSnap.data()
			} else {
				const error = { Error: "User not Found" }
				return error
			}
		} catch (error: unknown) {
			if (error instanceof FirestoreError || error instanceof FirebaseError) {
				throw error
			} else {
				console.error
				const errorObject: UnexpectedError = { Error: "Unknown error" }
				throw errorObject
			}
		}
	}
	async function createUserDocument(user: User) {
		var newFields = {
			Contact: {
				Discord: '',
				Email: '',
				Phone: ''
			},
			contributions: '',
			displayname: user.displayName || '',
			jobTitle: '',
			options: {
				showDiscord: false,
				showEmail: false,
				showPhone: false
			},
			personal: '',
			photoURL: user.photoURL || '',
			profileBackground: '',
			projects: [],
			Socials: [],
			Teams: [],
			work: ''
		}

		const userRef = doc(db, "users", user.uid)
		await setDoc(userRef, newFields)
	}

	async function setUserData(user: User, fields: userFields) {
		try {
			console.log(fields)
			const userRef = doc(db, "users", user.uid)
			const currentData: DocumentData | UserNotFoundError | UnexpectedError = await getUserData(user.uid)

			// If currentData is an error Object, return it immediately
			if ("Error" in currentData) {
				console.log("Error in currentData")
				throw currentData
			}

			Object.entries(fields).forEach((field) => {
				const fieldName = field[0]
				const fieldValue = field[1]
				if (fieldValue == undefined) return;
				if (typeof fieldValue === "object" && currentData[fieldName] && fieldName !== "Socials") {
					currentData[fieldName] = Object.assign(currentData[fieldName], fieldValue)
				} else {
					console.log(fieldName, fieldValue)
					currentData[fieldName] = fieldValue
				}
			})

			const newData = currentData
			console.log("Setting information", newData)
			return await setDoc(userRef, newData).then(() => {
				console.log("Updated!")
			}).catch((error) => {
				console.log(error)
			})
		} catch (error: unknown) {
			if (error instanceof FirestoreError) {
				const errorObject: UnexpectedError = { Error: error.message }
				return errorObject
			} else {
				const errorObject: UnexpectedError = { Error: "Unknown error" }
				return errorObject
			}
		}
	}

	return { createUserDocument, getUserData, setUserData }
}