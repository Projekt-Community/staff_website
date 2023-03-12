<template>
	<div class="override">
		<v-row class="full-height" justify="start" no-gutters>
			<v-col cols="0" lg="6">
				<Slider />
			</v-col>
			<v-col cols="12" lg="6" class="full-height">
				<v-row justify="center" no-gutters class="align-center full-height">
					<v-col cols="10">
						<LoginForm />
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
import Slider from '@/components/Slider.vue'
import LoginForm from '@/components/LoginForm.vue';


//TODO: Make more elegant

</script>

<style scoped>
.override {
	position: fixed;
	top: 0px;
	left: 0px;
	height: 100vh;
	width: 100vw;
	z-index: 10000;
	background-color: rgb(25, 25, 25);
}

.full-height {
	height: 100vh;
}
</style>
