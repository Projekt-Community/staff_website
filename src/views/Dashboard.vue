<template>
	<div class="home">
		<h1>HOME</h1>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/index'
const store = useUserStore()
const { user } = storeToRefs(store)
const { login, logout } = store

function signin() {
	//temp info
	const email = "test@test.test"
	const password = "Test1234"

	login(email, password)
	console.log(user)
}

function signout() {
	logout()
}
</script>
