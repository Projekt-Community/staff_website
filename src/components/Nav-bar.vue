<script setup lang="ts">
//#region Imports
import { ref } from 'vue';
import { defineProps } from 'vue';
import { User } from 'firebase/auth'
import { useTheme } from 'vuetify/lib/framework.mjs';
import router from '@/router'
import AccountMenu from './props/Account-menu.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

const store = useUserStore()
const { profilePhoto } = storeToRefs(store)
//#endregion
defineProps<{
	user: User | null,
}>()

const drawer = ref(false)

//#region Theme
const theme = useTheme()
theme.global.name.value = "dark"
const toggleTheme = () => {
	console.log(theme.global.name.value)
	theme.global.name.value = theme.global.current.value.dark ? 'light' : "dark"
}

const navLocs = [
	{
		name: "Dashboard",
		path: "/"
	}
]
//#endregion

</script>

<template>
	<v-app-bar app>
		<v-app-bar-nav-icon @click="drawer = !drawer" />
		<v-toolbar-title>Projekt: Staff</v-toolbar-title>
		<v-spacer />
		<v-menu
			v-if="user"
			min-width="200px"
			rounded
		>
			<template v-slot:activator="{ props }">
				<v-btn
					v-if="user"
					icon
					v-bind="props"
				>
					<v-avatar
						icon="mdi-account"
						:image="profilePhoto"
					/>
				</v-btn>
			</template>
			<AccountMenu
				:user="user"
				:profilePhoto="profilePhoto"
			/>
		</v-menu>
	</v-app-bar>

	<v-navigation-drawer
		app
		v-model="drawer"
	>
		<v-list>
			<v-list-item
				v-for="(nav, i) in navLocs"
				:key="i"
			>
				<v-btn
					@click="router.push(nav.path)"
					block
				>
					{{ nav.name }}
				</v-btn>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<style scoped></style>