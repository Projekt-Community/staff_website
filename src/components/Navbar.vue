<script setup lang="ts">
//#region Imports
import { ref } from 'vue';
import { defineProps } from 'vue';
import { User } from 'firebase/auth'
import { useTheme } from 'vuetify/lib/framework.mjs';
import router from '@/router'
import AccountMenu from './props/AccountMenu.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

const store = useUserStore()
const { profilePhoto } = storeToRefs(store)
//#endregion
defineProps<{
	user: User | null,
}>()

const drawer = ref(true)


const theme = useTheme()
theme.global.name.value = "dark"
const toggleTheme = () => {
	console.log(theme.global.name.value)
	theme.global.name.value = theme.global.current.value.dark ? 'light' : "dark"
}

const navLinks = [
	{
		name: "Dashboard",
		icon: "mdi-apps",
		path: "/"
	},
	{
		name: "Calendar",
		icon: "mdi-calendar",
		path: "/calendar"
	},
	{
		name: "Events",
		icon: "mdi-calendar-star",
		path: "/events"
	},
]

</script>

<template>
	<v-app-bar>
		<v-app-bar-nav-icon @click="drawer = !drawer" />
		<v-avatar rounded="0" class="ma-2">
			<v-img src="@/assets/logo.svg" contain></v-img>
		</v-avatar>
		<v-toolbar-title>
			Projekt: Staff
		</v-toolbar-title>

		<v-menu v-if="user" min-width="200px" rounded>
			<template v-slot:activator="{ props }">
				<v-btn v-if="user" icon v-bind="props">
					<v-avatar icon="mdi-account" :image="profilePhoto" />
				</v-btn>
			</template>
			<AccountMenu :user="user" :profilePhoto="profilePhoto" />
		</v-menu>
	</v-app-bar>

	<v-navigation-drawer v-model="drawer">
		<v-list nav density="compact" class="mt-4">
			<v-list-item v-for="(link, i) in navLinks" :key="i" :prepend-icon="link.icon" :title="link.name"
				:to="link.path" />
		</v-list>
	</v-navigation-drawer>
</template>

<style scoped></style>