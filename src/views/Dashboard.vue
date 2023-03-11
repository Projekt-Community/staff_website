<template>
	<v-card>
		<h1>hello</h1>
	</v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/index'
const store = useUserStore()
const { user } = storeToRefs(store)
const { login, logout } = store


</script>
