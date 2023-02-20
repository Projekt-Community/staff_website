<script setup lang="ts">
import { Ref, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/index'
import { firebaseAuth } from '@/firebase/config';
import router from '@/router';
const logingIn = ref(false)
const store = useUserStore()
const { login } = store

const email = ref('')
const password = ref('')
const isValid: Ref<boolean | undefined> = ref(undefined)
const loginError = ref(false)
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

const form = document.getElementById("form")
const snackbar: Ref<boolean> = ref(false)
const sbText: Ref<String> = ref('')
async function formLogin() {
	loginError.value = false
	logingIn.value = true
	validateForm()
	if (isValid.value == true) {
		try {
			await login(email.value, password.value)
			router.push("/")
		} catch (error: any) {
			logingIn.value = false
			const invalidUserPass = "Error: Email or Password does not match our records"
			loginError.value = true
			switch (error.message) {
				case "Firebase: Error (auth/user-not-found).":
					snackbar.value = true
					sbText.value = invalidUserPass
					break;

				case "Firebase: Error (auth/wrong-password).":
					snackbar.value = true
					sbText.value = invalidUserPass
					break;

				case "Firebase: Error (auth/network-request-failed).":
					console.log("404")
					snackbar.value = true
					sbText.value = "Error: Please contact your system administrator (Error: 404)"
					break;
				default:
					snackbar.value = true
					sbText.value = `${error.code} : ${error.message}`
					break;
			}
		}
	}
}

function validateForm() {
	isValid.value = (
		emailRules[0](email.value) == true && passwordRules[0](password.value) == true
	)
}

function clearValidation() {
	isValid.value = undefined
}
</script>

<template>
	<div class="right d-flex justify-center align-center">
		<v-snackbar
			color="error"
			v-model="snackbar"
			location="top"
			:attach="form ? form : ''"
		>
			{{ sbText }}
		</v-snackbar>
		<v-card class="form-card">
			<h1 class="text-center py-5">Log in to Projekt: Staff</h1>
			<v-form
				@submit.prevent="formLogin"
				@update:model-value="clearValidation"
				id="form"
			>
				<v-text-field
					v-model="email"
					name="email"
					type="email"
					label="Email"
					placeholder="you@company.com"
					aria-autocomplete="current-email"
					:rules="emailRules"
					required
				/>
				<p class="text-right">Forgot Password</p>
				<v-text-field
					v-model="password"
					name="password"
					type="password"
					label="Password"
					aria-autocomplete="current-password"
					:rules="passwordRules"
					required
				/>
				<v-btn
					block
					class="py-6"
					type="submit"
					v-if="logingIn == false"
				>
					Login
				</v-btn>
			</v-form>
			<v-progress-circular
			v-if="logingIn"
				indeterminate
				color="primary"
				class="mx-auto my-5"
			></v-progress-circular>
		</v-card>
	</div>
</template>

<style scoped>
.right {
	width: 100%;
	height: 100%;
}

.form-card {
	width: 40em;
	height: 30em;
	color: inherit;
	background-color: inherit;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>