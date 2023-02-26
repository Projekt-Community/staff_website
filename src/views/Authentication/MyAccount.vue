<template>
	<v-snackbar
		v-model="snackbar"
		:color="snackbarMessage.color"
		location="top"
	>
		{{ snackbarMessage.message }}
	</v-snackbar>
	<v-container>
		<v-row justify="center">
			<v-col
				cols="12"
				lg="10"
				md="8"
				sm="12"
			>
				<v-sheet
					min-height="80vh"
					rounded="lg"
				>
					<v-toolbar
						density="compact"
						:elevation="8"
					>
						<v-tabs
							v-model="tab"
							align-tabs="title"
						>
							<v-tab value="Images">Images</v-tab>
							<v-tab value="Basic Info">Basic Info</v-tab>
							<v-tab value="Security">Security</v-tab>
						</v-tabs>
						<v-btn
							v-if="tab == 'Basic Info'"
							class="ml-auto"
							@click="publish"
						>
							Publish
						</v-btn>
					</v-toolbar>
					<v-window v-model="tab">
						<v-window-item
							value="Images"
							class="pa-5"
						>
							<h3 class="mx-10 mt-5">Picture</h3>
							<v-row no-gutters>
								<v-col
									cols="12"
									lg="2"
									class="ml-5 mt-5"
								>
									<v-card
										class="d-flex justify-center align-center "
										height="150px"
										width="150px"
									>
										<v-img
											:src="profilePhoto"
											aspect-ratio="1"
										></v-img>
									</v-card>
								</v-col>
								<v-col
									cols="12"
									lg="3"
									class="ml-5 mt-5"
								>
									<p>Your pictures are saved in a 1:1 ratio and are decompressed upon upload. However, we still recommend keeping your file upload to 4MB or less due to browser capabilities</p>
									<div class="mt-5">
										<v-btn @click="startDialog('picture')">Change</v-btn>
										<v-btn>Remove</v-btn>
									</div>
								</v-col>
							</v-row>
							<h3 class="mx-10 mt-5">Banner</h3>
							<v-row no-gutters>
								<v-col
									cols="12"
									lg="4"
									class="ml-5 mt-5"
								>
									<v-card class="d-flex justify-center align-center ">
										<v-img
											:src="userData?.profileBackground || 'https://images.pexels.com/photos/3980364/pexels-photo-3980364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'"
											:aspect-ratio="20 / 3"
											cover
										></v-img>
									</v-card>
								</v-col>
								<v-col
									cols="12"
									lg="6"
									class="ml-5 mt-5"
								>
									<p>Profile Banners are sized in a 20:3 Aspect Ratio</p>
									<div class="mt-5">
										<v-btn @click="startDialog('banner')">Change</v-btn>
										<v-btn>Remove</v-btn>
									</div>
								</v-col>
							</v-row>
						</v-window-item>
						<v-window-item
							value="Basic Info"
							class="pa-5"
						>
							<v-row no-gutters>
								<v-col
									cols="12"
									lg="8"
								>
									<v-text-field
										label="Username"
										v-model="displayName"
										variant="outlined"
									/>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col
									cols="12"
									lg="8"
								>
									<v-row no-gutters>

										<v-col cols="8">
											<v-text-field
												label="Contact Email"
												v-model="email"
												variant="outlined"
											/>
										</v-col>
										<v-col>
											<v-checkbox
												label="Public?"
												v-model="publicOptions.email"
												hide-details
											/>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col
									cols="12"
									lg="8"
								>
									<v-row no-gutters>
										<v-col cols="8">
											<v-text-field
												label="Phone Number"
												v-model="phoneNumber"
												variant="outlined"
											/>
										</v-col>
										<v-col>
											<v-checkbox
												label="Public?"
												v-model="publicOptions.phone"
												hide-details
											/>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col
									cols="12"
									lg="8"
								>
									<v-row no-gutters>
										<v-col cols="8">
											<v-text-field
												label="Discord"
												hint="johndoe#1234"
												v-model="discord"
												variant="outlined"
											/>
										</v-col>
										<v-col>
											<v-checkbox
												label="Public?"
												v-model="publicOptions.discord"
												hide-details
											/>
										</v-col>
									</v-row>
								</v-col>
							</v-row>

							<v-row no-gutters>
								<v-col
									cols="12"
									lg="8"
								>
									<v-row no-gutters>
										<v-textarea
											v-model="bio"
											label="Personal Bio"
											hint="Tell us about yourself!"
											variant="outlined"
											no-resize
										/>
									</v-row>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col
									cols="12"
									lg="8"
								>
									<v-row no-gutters>
										<v-textarea
											v-model="work"
											label="Work Bio"
											hint="Tell us about how you got involved with Projekt Community, and about the work you have already done!"
											variant="outlined"
											no-resize
										/>
									</v-row>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col
									cols="12"
									lg="8"
								>
									<v-row no-gutters>
										<v-textarea
											v-model="contributions"
											label="Your Contributions"
											hint="What are you proud to have contributed towards Projekt Community?"
											variant="outlined"
											no-resize
										/>
									</v-row>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col
									cols="12"
									lg="8"
								>
									<h3>
										Socials
										<v-btn
											@click="addLink"
											variant="plain"
										>
											<v-icon>mdi-plus</v-icon>
											Add Link
										</v-btn>
									</h3>
									<div
										style="width: 100%"
										class="mb-16"
									>
										<draggable
											v-model="socials"
											item-key="key"
										>
											<template v-slot:item="{ element }">
												<div class="my-4">
													<v-hover>
														<template #default="{ isHovering, props }">
															<v-row
																no-gutters
																v-bind="props"
																align="center"
															>
																<v-col
																	cols="1"
																	class="d-flex justify-center align-center"
																>
																	<v-icon>mdi-menu</v-icon>
																</v-col>
																<v-col
																	cols="5"
																	lg="3"
																	class="mx-1 my-0"
																>
																	<v-text-field
																		label="Link Title"
																		hide-details
																		v-model="element.name"
																	></v-text-field>
																</v-col>
																<v-col
																	cols="5"
																	lg="3"
																	class="mx-1 my-0"
																>
																	<v-text-field
																		label="URL"
																		v-model="element.link"
																		hide-details
																	></v-text-field>
																</v-col>

																<v-btn
																	v-if="isHovering"
																	icon="mdi-delete"
																	variant="plain"
																	class="my-auto"
																	@click="deleteLink(element)"
																/>
															</v-row>
														</template>
													</v-hover>
												</div>
											</template>
										</draggable>
									</div>
								</v-col>
							</v-row>
						</v-window-item>
						<v-window-item
							value="Security"
							class="pa-5"
						>
							<h3>Change Login Email</h3>
							<v-row
								no-gutters
								class="my-5"
							>
								<v-col
									cols="12"
									lg="4"
									class="px-5"
								>
									<v-text-field
										label="Email"
										type="text"
										variant="outlined"
										:placeholder="placeholderEmail"
										:rules="emailRules"
										persistent-placeholder
										:name="Math.random().toString()"
										autocomplete="none"
										v-model="loginEmail"
									></v-text-field>
								</v-col>
								<v-col class="d-flex align-center">
									<v-btn @click="ChangeEmail">Update</v-btn>
								</v-col>
							</v-row>
							<h3>Change Password</h3>
							<v-row
								no-gutters
								class="my-5"
							>
								<v-col
									cols="12"
									lg="3"
									class="px-5"
									aria-required
								>
									<v-text-field
										label="Current Password"
										type="text"
										class="pass"
										variant="outlined"
										:name="Math.random().toString()"
										autocomplete="off"
										v-model="CurrentPassword"
									></v-text-field>
								</v-col>
								<v-col
									cols="12"
									lg="3"
									class="px-5"
								>
									<v-text-field
										label="New Password"
										variant="outlined"
										type="text"
										class="pass"
										:name="Math.random().toString()"
										autocomplete="off"
										v-model="NewPassword"
									></v-text-field>
								</v-col>
								<v-col
									cols="12"
									lg="3"
									class="px-5"
								>
									<v-text-field
										label="Confirm Password"
										variant="outlined"
										type="text"
										class="pass"
										:name="Math.random().toString()"
										autocomplete="off"
										v-model="ConfirmPassword"
									></v-text-field>
								</v-col>
								<v-col
									cols="12"
									lg="3"
									class="px-5 d-flex align-center"
								>
									<v-btn @click="ChangePassword">Change Password</v-btn>
								</v-col>
							</v-row>
						</v-window-item>
					</v-window>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>

	<v-dialog
		v-model="dialog"
		persistent
	>
		<ProfilePhoto
			@close="dialog = false"
			:type="edit.type"
			:current="edit.current"
		/>
	</v-dialog>
</template>

<script setup lang="ts">

//#region Imports
import { Ref, ref, onBeforeMount } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useUserStore, useStorageStore, useFirebaseStore } from '@/store'
import { DocumentData } from 'firebase/firestore'
import ProfilePhoto from '@/components/props/ProfilePhoto.vue';
import draggable from 'vuedraggable'
import { userFields, UserNotFoundError, UnexpectedError } from '@/store/stores/firebase/firestoreStore'
import { FirebaseError } from '@firebase/util'
import { firebaseAuth } from '@/firebase/config'
import { AuthCredential, reauthenticateWithCredential, signInWithEmailAndPassword, } from '@firebase/auth'
//#endregion

//#region variables

//#region Firebase: Auth
const userStore = useUserStore()
const { user, profilePhoto } = storeToRefs(userStore)
const { resetPass, updateUserEmail, updateUserPassword } = userStore
//#endregion

//#region Firebase Storage
const storageStore = useStorageStore()
const { } = storeToRefs(storageStore)
//#endregion

//#region Firebase Firestore
const firestore = useFirebaseStore()
const { } = storeToRefs(firestore)
const { createUserDocument, getUserData, setUserData } = firestore
//#endregion

//#region Document Variables

//#region Binds

//#region Firebase Variables
const dialog = ref(false)
const displayName = ref('')
const email = ref('')
const phoneNumber = ref('')
const discord = ref('')
const socialAmount = ref(0)
const publicOptions: Ref<{ email: boolean, phone: boolean, discord: boolean }> = ref({
	email: false,
	phone: false,
	discord: false
})
const bio = ref('')
const work = ref('')
const contributions = ref('')
const socials = ref([
	{
		name: "Test 1",
		link: "https://senpaivr.com"
	},
	{
		name: "Test 2",
		link: "https://senpaivr.com"
	},
	{
		name: "Test 3",
		link: "https://senpaivr.com"
	},
])
//#endregion

//#region Auth Variables
const loginEmail: Ref<string> = ref('')
const emailRef: Ref<string> = ref('') // To compair with Login Email when changed
const placeholderEmail: Ref<string> = ref('')

const CurrentPassword = ref('')
const NewPassword = ref('')
const ConfirmPassword = ref('')

//#endregion

const tab = ref("photos")
const snackbarMessage: Ref<{ message: string, color: string }> = ref({ message: '', color: '' })
const snackbar: Ref<boolean> = ref(false)

const connectedToDatabase = ref(false)

//#endregion

//#region constant variables
const fields = {
	displayName: {
		name: "Username",
		ref: displayName,
	},
	email: {
		name: "Email",
		ref: email,
		askShow: true
	},
	phone: {
		name: "Phone"
	}
}
const uid = router.currentRoute.value.params.uid
const userData: Ref<DocumentData | undefined> = ref()

const edit = ref({
	type: "profile",
	current: profilePhoto.value
})

const emailRules = [
	(v: string | null) => {
		if (v != null && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
			return "E-mail must be valid";
		} else {
			return true;
		}
	}
];
const passwordRules = [
	(value: String) => {
		if (value) {
			return true
		}
		return 'This field is Required'
	}
]

//#endregion

//#endregion

//#endregion

//#region Classes

class FirebaseUnexpectedError extends Error {
	constructor(code: string, message: string) {
		super(message)
		this.code = code
	}
	code: string;
}

//#endregion

//#region Functions
onBeforeMount(async () => {
	connectedToDatabase.value = false;
	// Get Auth Data
	if (user.value && user.value.email) {
		emailRef.value = user.value.email;
		let parts = emailRef.value.split("@");
		let name = parts[0];
		let tld = parts[1];

		let censored = name.charAt(0) + "****" + name.charAt(name.length - 1);

		placeholderEmail.value = censored + "@" + tld.substring(0, Math.floor(1 / 3 * tld.length));
	}

	// Get Firebase Data
	try {
		const data: DocumentData | UserNotFoundError | UnexpectedError = await getUserData(uid.toString());
		if ("Error" in data) {
			if (data.Error == "User not Found" && user.value) {
				createUserDocument(user.value)

			} else {
				displayError(data.Error);
				return;
			}
		}
		userData.value = data;

		displayName.value = userData.value?.displayname || '';
		email.value = userData.value?.Contact?.Email || '';
		phoneNumber.value = userData.value?.Contact?.Phone || '';
		discord.value = userData.value?.Contact?.Discord || '';
		contributions.value = userData.value?.contributions || '';
		displayName.value = userData.value?.displayname || '';
		publicOptions.value.discord = userData.value?.options?.showDiscord || false;
		publicOptions.value.email = userData.value?.options?.showEmail || false;
		publicOptions.value.phone = userData.value?.options?.showPhone || false;
		bio.value = userData.value?.personal || '';
		socials.value = userData.value?.Socials || [];
		work.value = userData.value?.work || '';
		connectedToDatabase.value = true;
	} catch (error: unknown) {
		if (error instanceof FirebaseUnexpectedError || error instanceof FirebaseError) {
			switch (error.code) {
				case "permission-denied":
					displayError("You do not have permission to access this information");
					break;
				case "unavailable":
					displayError("Unable to connect to database. Please try again later");
					break;
				default:
					console.error(error);
					displayError(error.message);
					break;
			}
		} else {
			displayError("Unknown error. Please see your administrator");
		}
		snackbar.value = true;
		setTimeout(() => {
			router.go(-1);
		}, 5000);
	}
});

function addLink() {
	socials.value.push({
		name: '',
		link: ''
	})
}

function deleteLink(el: any) {
	var index = socials.value.findIndex(item => item == el)
	socials.value.splice(index, 1)
}

async function publish() {
	var data: userFields = {
		Contact: {
			Discord: discord.value,
			Email: email.value,
			Phone: phoneNumber.value
		},
		contributions: contributions.value,
		displayname: displayName.value,
		options: {
			showDiscord: publicOptions.value.discord,
			showEmail: publicOptions.value.email,
			showPhone: publicOptions.value.phone
		},
		personal: bio.value,
		Socials: socials.value,
		work: work.value
	};

	if (user.value) {
		await setUserData(user.value, data).then(() => {
			displaySuccess("Information Updated");
			setTimeout(() => { router.push(`/users/${user.value?.uid}`) }, 3000);
		}).catch((error) => {
			displayFirebaseError(error);
		});
	}
}

async function ChangeEmail() {
	if (user.value && user.value.uid === uid) {
		const res = await updateUserEmail(user.value, loginEmail.value);
		if (res === "Success") {
			displaySuccess("Email Updated");
		}
	}
}

async function ChangePassword() {
	const current = CurrentPassword.value;
	const newpass = NewPassword.value;
	const confPass = ConfirmPassword.value;

	if (newpass !== confPass) {
		displayError("New Password and Confirmation Password do not match");
		return;
	}

	if (user.value?.email) {
		try {
			await signInWithEmailAndPassword(firebaseAuth, user.value.email, current);
			await updateUserPassword(newpass);
			displaySuccess("Password Set");
		} catch (error: any) {
			if (error.code === "auth/wrong-password") {
				displayError("Invalid Password");
			} else {
				displayFirebaseError(error);
			}
		}
	}
}

function startDialog(type: string) {
	if (type == "picture") {
		edit.value.type = "picture";
		edit.value.current = profilePhoto.value;
		dialog.value = true;
	} else if (type == "banner") {
		edit.value.type = "banner";
		edit.value.current = userData?.value?.profileBackground || 'https://images.pexels.com/photos/1194714/pexels-photo-1194714.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
		dialog.value = true;
	}
}

function displayError(message: string) {
	snackbarMessage.value = {
		message: message,
		color: "error",
	};
	snackbar.value = true;
}

function displaySuccess(message: string) {
	snackbarMessage.value = {
		message: message,
		color: "success",
	};
	snackbar.value = true;
}

function displayFirebaseError(error: FirebaseError) {
	let message = "Unknown error. Please see your administrator.";
	if (error.code === "auth/wrong-password") {
		message = "Invalid Password";
	} else if (error.code === "auth/user-not-found") {
		message = "User not found";
	} else if (error.code === "auth/email-already-in-use") {
		message = "Email already in use";
	} else if (error.code === "auth/weak-password") {
		message = "Password should be at least 6 characters";
	}
	displayError(message);
}
//#endregion
</script>

<style>
.pass .v-input__control .v-field .v-field__field input {
	-webkit-text-security: disc;
}
</style>
<style scoped>
.edit-icon {
	background-color: rgba(1, 1, 1, 0.7);
	width: 100%;
	transform: translate(0, 2.5em)
}

.dashboard {
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: start;
}

.account-info {
	width: 80vw;
}

.profilePicture {
	height: 100%;
	width: 100%;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	background-color: rgba(0, 0, 0, 0);
	transition: background-color 200ms ease-in-out;
}

.profilePicture.hover {
	background-color: rgba(0, 0, 0, 0.2)
}
</style>