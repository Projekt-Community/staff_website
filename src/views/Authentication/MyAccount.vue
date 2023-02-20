<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/index'
import { ref } from 'vue';
import ProfilePhoto from '@/components/props/ProfilePhoto.vue';
const store = useUserStore()
const { user, profilePhoto } = storeToRefs(store)
const { } = store
const dialog = ref(false)
const imageURL = profilePhoto

</script>

<template>
	<div
		class="dashboard"
		v-if="user"
	>
		<v-card
			elevation="5"
			class="mt-10"
		>
			<v-card-title>My Account</v-card-title>
			<div class="account-info">
				<v-row>
					<v-col
						cols="12"
						lg="2"
						md="6"
					>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								:elevation="isHovering ? 12 : 0"
								v-bind="props"
								class="ma-5 d-flex justify-center align-center"
								height="20em"
								width="20em"
								style="border-radius: 50%;"
								@click="dialog = true"
							>
								<v-img :src="profilePhoto">
									<div
										class="profilePicture d-flex flex-column align-center justify-end pb-10"
										:class="{ 'hover': isHovering }"
										id="profilePicture"
									>
										<v-icon
											v-if="isHovering"
											:size="50"
										>mdi-camera</v-icon>
									</div>
								</v-img>

							</v-card>
						</v-hover>
					</v-col>
					<v-col>
					</v-col>
				</v-row>
			</div>
		</v-card>

		<!-- Edit Picture dialog -->
		<v-dialog
			v-model="dialog"
			persistent
		>
			<ProfilePhoto @close="dialog = false" />
		</v-dialog>
	</div>
</template>

<style scoped>
.dashboard {
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: start;
}

.account-info {
	width: 80vw;
}

.profilePicture {
	height: 100%;
	width: 100%;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	background-color: rgba(0, 0, 0, 0);
	transition: background-color 200ms ease-in-out;
}

.profilePicture.hover {
	background-color: rgba(0, 0, 0, 0.2)
}
</style>