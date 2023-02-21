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
			class="mt-10 px-0"
		>
			<v-card-title>My Account</v-card-title>
			<div class="account-info">
				<v-row class="ma-0 pa-0">
					<!-- Profile Photo -->
					<v-col
						cols="12"
						lg="2"
						md="6"
						class=""
					>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								:elevation="isHovering ? 12 : 0"
								v-bind="props"
								class="d-flex justify-center align-center"
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
										<div
											v-if="isHovering"
											style=""
											class="d-flex justify-center align-top edit-icon"
										>
											<v-icon
												:size="50"
												class="pt-10 pb-15"
											>mdi-camera</v-icon>
										</div>

									</div>
								</v-img>

							</v-card>
						</v-hover>
					</v-col>
					<v-divider
						vertical
						thickness=5
						class="ma-5"
					></v-divider>
					<v-col>
						<h1>Account information</h1>

						<p><strong>ID:</strong> {{ user.uid }}</p>

						<v-row class="my-10">
							<v-col
								cols="12"
								lg="6"
								class="d-flex"
							>
								<v-text-field
									variant="outlined"
									type="text"
									label="Display Name"
									:placeholder="user.displayName ? user.displayName : ''"
									persistent-placeholder
								/>
								<v-btn height="80%"><v-icon>mdi-pencil</v-icon></v-btn>
							</v-col>
							<v-col
								cols="12"
								lg="6"
								class="d-flex"
							>
								<v-text-field
									variant="outlined"
									type="text"
									label="Email Address"
									:placeholder="user.email ? user.email : 'yourEmail@work.com'"
									persistent-placeholder
								/>
								<v-btn height="80%"><v-icon>mdi-pencil</v-icon></v-btn>
							</v-col>
							<v-col
								cols="12"
								lg="6"
								class="d-flex"
							>
								<v-text-field
									variant="outlined"
									type="text"
									label="Display Name"
									:placeholder="user.displayName ? user.displayName : ''"
									persistent-placeholder
								/>
								<v-btn height="80%"><v-icon>mdi-pencil</v-icon></v-btn>
							</v-col>
							<v-col
								cols="12"
								lg="6"
								class="d-flex"
							>
								<v-text-field
									variant="outlined"
									type="text"
									label="Email Address"
									:placeholder="user.email ? user.email : 'yourEmail@work.com'"
									persistent-placeholder
								/>
								<v-btn height="80%"><v-icon>mdi-pencil</v-icon></v-btn>
							</v-col>
						</v-row>



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
.edit-icon {
	background-color: rgba(1, 1, 1, 0.7);
	width: 100%;
	transform: translate(0, 2.5em)
}

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