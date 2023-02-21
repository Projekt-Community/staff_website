<script setup lang="ts">
import { defineProps } from 'vue';
import { User } from 'firebase/auth'
import { useUserStore } from '@/store/index'
import router from '@/router'
import { Ref } from 'vue'

const props = defineProps<{
	user: User,
	profilePhoto: string
}>()

const store = useUserStore()
const { logout } = store

</script>

<template>
	<v-card>
		<v-card-text>
			<div class="mx-auto text-center">
				<v-avatar
					icon="mdi-account"
					:image="profilePhoto"
				/>
				<h3>{{ user.displayName || user.email }}</h3>
				<p
					v-if="user.displayName"
					class="text-caption mt-1"
				>{{ user.email }}</p>
				<v-divider class="my-3" />
				<v-btn
					rounded
					variant="text"
					@click="router.push('/Profile')"
				>
					View Profile
				</v-btn>
				<v-divider class="my-3" />
				<v-btn
					rounded
					variant="text"
					@click="logout"
				>
					Logout
				</v-btn>
			</div>
		</v-card-text>
	</v-card>
</template>

<style scoped></style>