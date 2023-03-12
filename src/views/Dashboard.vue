<template>
	<h1>Dashboard</h1>
	<h3>Text for testing scrolling:</h3>
	<v-card class="pa-4 my-4" v-for="i in 20">
		Random Text:
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis perspiciatis in officiis, eum vero soluta
		doloribus voluptates qui! Tempore aliquid ducimus provident animi esse quisquam dolor labore nisi in incidunt amet consectetur, adipisicing elit. Perferendis perspiciatis in officiis, eum vero soluta
		doloribus voluptates qui! Tempore aliquid ducimus provident animi amet consectetur, adipisicing elit. Perferendis perspiciatis in officiis, eum vero soluta
		doloribus voluptates qui! Tempore aliquid ducimus provident animi ?
	</v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/index'
const store = useUserStore()
const { user } = storeToRefs(store)
const { login, logout } = store


</script>
