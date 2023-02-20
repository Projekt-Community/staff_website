<template>
	<v-app>
		<NavBar :user="user" />
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>


<script setup lang="ts">
import NavBar from './components/Nav-bar.vue';

import { onBeforeMount } from 'vue';
import { useUserStore } from '@/store/index'
import { storeToRefs } from 'pinia';
import router from './router'
const store = useUserStore()

const { user } = storeToRefs(store)

const { fetchUserData } = store
onBeforeMount(() => {
	fetchUserData()
})
</script>
