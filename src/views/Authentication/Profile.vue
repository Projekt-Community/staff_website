<style scoped></style>

<template>
	<div class="full-page d-flex justify-center align-center">
		<div>
			<v-row>
				<v-col>
					<v-avatar
						:image="profilePhoto"
						size="200"
					/>
				</v-col>
				<div
					style="height: 14em"
					class="mx-5"
				>
					<v-divider
						vertical
						thickness="5"
					></v-divider>
				</div>
				<v-col>
					<div
						style="width: 40em"
						class="py-5 d-flex flex-column"
					>
						<v-row class="pa-0 ma-0">
							<h1 class="text-h2"><strong>{{ user?.displayName || user?.email?.split('@')[0] }}</strong></h1>
						</v-row>
						<v-divider
							class="mb-2"
							thickness="5"
						></v-divider>
						<v-row class="pa-0 ma-0">
							<!-- Insert Job Title -->
							<h3 class=" text-h5">Admin of the website</h3>
						</v-row>

						<v-row class="pa-0 ma-5">
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quisquam odio dicta quibusdam quidem similique commodi adipisci distinctio, ex iste rem asperiores quo harum porro doloremque nulla natus repudiandae praesentium?</p>
						</v-row>

						<v-row
							justify="center"
							align="center"
						>
							<v-col cols="3">
								<v-btn block>Social</v-btn>
							</v-col>
						</v-row>
					</div>

				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore, useStorageStore } from '@/store'
const userStore = useUserStore()
const storageStore = useStorageStore()

const { user, profilePhoto } = storeToRefs(userStore)
const { } = storeToRefs(storageStore)
</script>