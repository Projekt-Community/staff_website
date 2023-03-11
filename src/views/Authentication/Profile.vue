<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="10" lg="2" md="4">
				<v-sheet rounded="lg" min-height="24em">
					<v-row no-gutters justify="center">
						<v-avatar :image="userData?.photoURL" size="150" class="mx-5 mt-5" />
					</v-row>
					<v-row justify="center" no-gutters>
						<v-card-title>{{ userData?.username }}</v-card-title>
						<v-divider thickness="3" class="mx-16" />
						<v-card-subtitle>{{ userData?.jobTitle }}</v-card-subtitle>
					</v-row>
					<v-row no-gutters>
						<v-list>
							<v-list-item v-if="userData?.options.showEmail">
								<v-card-subtitle>Email: {{ userData?.Contact.Email }}</v-card-subtitle>
							</v-list-item>
							<v-list-item v-if="userData?.options.showPhone">
								<v-card-subtitle>Phone: {{ userData?.Contact.Phone }} </v-card-subtitle>
							</v-list-item>
							<v-list-item v-if="userData?.options.showDiscord">
								<v-card-subtitle>Discord: {{ userData?.Contact.Discord }} </v-card-subtitle>
							</v-list-item>
						</v-list>
					</v-row>
					<v-divider />
					<v-row no-gutters class="flex-column" align="center">
						<v-btn v-for="(social, i) in userData?.Socials" :key="i" class="my-2" width="70%"
							:href="social.link" target="_blank">
							{{ social.name }}
						</v-btn>
					</v-row>
				</v-sheet>
				<div style="width:fit-content" class="mx-auto my-5">
					<v-btn v-if="user && uid == user.uid" class="mx-auto" @click="router.push(`/users/${user?.uid}/edit`)">
						Edit Profile
					</v-btn>
				</div>
			</v-col>

			<v-col cols="12" lg="10" md="8" sm="12">
				<v-sheet min-height="80vh" rounded="lg">
					<v-row no-gutters>
						<v-img
							:src="userData?.profileBackground || 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'"
							width="100%" :aspect-ratio="40 / 6" cover />
					</v-row>
					<v-row no-gutters>
						<v-col cols="12" lg="4">
							<v-card min-height="20em" class="ma-5 pa-5">
								<v-card-title class="">Personal Bio</v-card-title>
								<v-card-text class="text-break">
									{{ userData?.personal || "This user has not filled in their personal bio" }}
								</v-card-text>
							</v-card>
						</v-col>
						<v-col cols="12" lg="4">
							<v-card min-height="20em" class="ma-5 pa-5">
								<v-card-title class=""> Work Bio </v-card-title>
								<v-card-text class="text-break">
									{{ userData?.work || "This user has not filled out their work bio" }}
								</v-card-text>
							</v-card>
						</v-col>
						<v-col cols="12" lg="4">
							<v-card min-height="20em" class="ma-5 pa-5">
								<v-card-title class=""> My Contributions </v-card-title>
								<v-card-text class="text-break">
									{{ userData?.contributions || "This user has not listed any contributions" }}
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
					<!-- Keep for when Projects are added -->
					<!-- <v-divider thickness="3"></v-divider>
					<v-row
						no-gutters
						class="my-5 flex-column"
					>
						<v-card-title>Events I worked on</v-card-title>
						<v-slide-group show-arrows>
							<v-card
								v-for="n in 5"
								:key="n"
								max-width="344"
								class="mx-5"
							>
								<v-img
									src="https://i.ytimg.com/vi/j5RZJh9Ks3g/hqdefault.jpg"
									width="200px"
									cover
								></v-img>

								<v-card-title>Projekt: Easter Egg 2023</v-card-title>
								<v-card-subtitle>This is a subtitle</v-card-subtitle>
								<v-card-actions>
									<v-btn variant="text">View Project</v-btn>
								</v-card-actions>

							</v-card>
						</v-slide-group>
					</v-row> -->
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useUserStore, useStorageStore, useFirebaseStore } from '@/store'
import { DocumentData } from 'firebase/firestore'


const uid = router.currentRoute.value.params.uid
onMounted(async () => {
	const data: DocumentData | { Error: string } = await getUserData(uid.toString())
	if (!data.Error)
		userData.value = data
	else {
		if (data.Error == "User not Found" && user.value) {
			await createUserDocument(user.value)
			userData.value = await getUserData(uid.toString())
		}
	}
})
const userStore = useUserStore()
const storageStore = useStorageStore()
const firestore = useFirebaseStore()

const { user, profilePhoto } = storeToRefs(userStore)
const { } = storeToRefs(storageStore)
const { } = storeToRefs(firestore)
const { createUserDocument, getUserData } = firestore
const userData: Ref<DocumentData | undefined> = ref()
</script>

<style scoped>
.text-break {
	white-space: pre-wrap;
}
</style>