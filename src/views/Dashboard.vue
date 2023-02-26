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


</script>
