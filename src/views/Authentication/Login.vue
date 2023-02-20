<template>
	<main
		class="pa-0 ma-0 d-flex flex-column"
		style="height: 100%"
	>
		<v-row
			class="pa-0 ma-0"
			style="height: 100%"
		>
			<v-col
				class="pa-0 ma-0"
				cols="0"
				lg="6"
				style="height: 100%"
			>
				<Slider />
			</v-col>
			<v-col
				class="pa-0 ma-0"
				cols="12"
				lg="6"
			>
				<LoginForm />
			</v-col>
		</v-row>
	</main>
</template>

<script setup lang="ts">
import Slider from '@/components/Slider.vue'
import LoginForm from '@/components/LoginForm.vue';

</script>

<style scoped>
.full-page {
	width: 100vw;
	height: 100vh;
}

.flex {
	display: flex
}</style>
