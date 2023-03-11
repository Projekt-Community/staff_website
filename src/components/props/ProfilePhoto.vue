<style scoped>
.preview {
	max-width: 20em;
	max-height: 20em;
}

.progress {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>

<style></style>

<template>
	<v-card class="mx-auto" width="50em" max-width="80vw" max-height="80vh">
		<v-card-title class="text-center d-flex">
			<v-row>
				<v-col cols="4" class="d-flex">
					<v-btn v-if="step == 1" icon="mdi-close" @click="close" class="mr-auto"></v-btn>
					<v-btn v-else icon="mdi-arrow-left" @click="back" class="mr-auto"></v-btn>
				</v-col>
				<v-col cols="4">
					<h3>{{ title }}</h3>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		</v-card-title>
		<v-window v-model="step" class="window">
			<v-window-item :value="1" class="window-item">
				<v-card-text>
					<h4>{{ type == "banner" ? "Banner Upload" : type == "picture" ? "Picture upload" : '' }}</h4>
					<p>Need to upload your {{ type }} picture. Do so here!</p>
					<v-divider class="my-10"></v-divider>
					<div class="d-flex align-center mx-auto" :style="type == 'picture' ? 'width: 50%' : ''">
						<v-img :src="current" :aspect-ratio="type == 'banner' ? 20 / 3 : 1"
							:width="type == 'picture' ? 50 : '100%'" :style="type == 'picture' ? 'border-radius: 50%' : ''"
							cover>
						</v-img>
					</div>
				</v-card-text>
			</v-window-item>
			<v-window-item :value="2">
				<v-card-text>
					<h4>Profile Picture</h4>
					<p>This is step 2!</p>
					<v-divider class="my-10"></v-divider>
					<div v-if="loading" class="progress" id="progress">
						<v-progress-circular indeterminate color="primary"></v-progress-circular>
					</div>
					<div id="croppie"></div>
				</v-card-text>
			</v-window-item>
			<v-window-Item :value="3">
				<v-card-text>
					<h4>Profile Picture</h4>
					<p>Need to upload your profile picture. Do so here!</p>
					<v-divider class="my-10"></v-divider>
					<div class="d-flex align-center" style="width: 100%">
						<div style="width: 40%; height: 40%; overflow: hidden;" :style="type == 'profile' ? '50' : '0'"
							class="mx-auto">
							<v-img :src="finalImgURL" class="d-flex align-center justify-center mx-auto">
								<!--  -->
								<div v-if="progress != undefined && progress != 100"
									class="d-flex justify-center align-center">
									<v-progress-circular indeterminate :size="111" :width="15" color="primary"
										class="mx-auto"></v-progress-circular>
								</div>
							</v-img>
						</div>
					</div>
				</v-card-text>
			</v-window-Item>

		</v-window>
		<v-card-actions>
			<input type="file" class="d-none" id="inputElement" :key="fileInputKey">
			<v-btn @click="handleCard(type)">{{ actions[step - 1] }}</v-btn>
		</v-card-actions>
		<v-progress-linear v-if="progress != undefined && progress != 100" color="primary"
			:model-value="progress"></v-progress-linear>
	</v-card>
</template>

<script setup>
import { ref, nextTick, onMounted, defineEmits, defineProps } from 'vue'
import Croppie from 'croppie'
import 'croppie/croppie.css' // import the croppie css manually
import { storeToRefs } from 'pinia'
import { useUserStore, useStorageStore, useFirebaseStore } from '@/store'
import { base64 } from '@firebase/util'
import imageCompression from 'browser-image-compression'
import { FieldPath } from '@firebase/firestore'

const props = defineProps({
	type: String,
	current: String
})
const emit = defineEmits(['close'])

const store = useUserStore()
const { user, profilePhoto } = storeToRefs(store)
const { updateUser } = store

const storageStore = useStorageStore()
const { progress, imageURL } = storeToRefs(storageStore)
const { uploadFile } = storageStore

const database = useFirebaseStore()
const { } = storeToRefs(database)
const { setUserData } = database

//#region Variables
const fileInputKey = ref(new Date().getTime())
const dialog = ref(false)
const title = ref('Projekt: Staff Account')
const c = ref()
const step = ref(1)
const loading = ref(false)
const actions = [
	'Upload',
	'Set',
	'Save'
]
const ActionName = actions[step.value - 1]
const finalImgURL = ref('')
const finalImgFile = ref('')
const finalImgBlob = ref()
//#endregion
async function handleCard(type) {
	switch (step.value) {
		case 1:
			await Upload(type)
			break;

		case 2:
			await Set(type)
			break;

		case 3:
			await Save(type)
		default:
			break;
	}
}
async function Upload(type) {
	const input = document.getElementById('inputElement')
	fileInputKey.value = new Date().getTime()
	input.click()
	input.addEventListener('change', () => {
		const files = input.files
		const image = files[0]
		const imageSizemb = image.size / (1024 * 1024)
		// if (imageSizemb > 20) {
		// 	alert("File Size is too large. Please Upload files less than 20 MB")
		// 	return;
		// }
		let imageURL = ''
		loading.value = true
		step.value = 2
		const reader = new FileReader()
		reader.addEventListener("load", () => {
			imageURL = reader.result
			sleep(.5).then(() => {
				const croppieEl = document.getElementById('croppie')
				const croppie = new Croppie(croppieEl, {
					boundary: {
						width: 400,
						height: 400
					},
					viewport: {
						width: 400,
						height: type == 'picture' ? 400 : 60,
						type: type == "picture" ? 'circle' : 'square'
					},
					customClass: "reactive"
				})
				const bindPromise = croppie.bind({
					url: imageURL
				})

				bindPromise.then(() => {
					loading.value = false
					c.value = croppie
				})
			})
		})
		reader.readAsDataURL(image)
	})
}

async function Set(type) {
	// var res = new Croppie().result({
	// 	size: "viewport",
	// 	format: "webp",
	// 	circle: true
	// })
	var res = c.value.result({
		size: "viewport",
		format: "webp",
		circle: false
	})
	var file = dataURLtoFile(await res, "ProfilePicture.webp")
	const compressedFile = await imageCompression(file, {
		maxSizeMB: .5,
		maxWidthOrHeight: 1920,
		useWebWorker: true
	})
	finalImgBlob.value = compressedFile
	sleep(1).then(() => {
		finalImgFile.value = new File(
			[compressedFile],
			`${user.value.uid}_${new Date().toDateString()}_${type == 'picture' ? 'profile' : 'banner'}Picture.webp`,
			{
				type: "image/webp"
			}
		)
		finalImgURL.value = URL.createObjectURL(compressedFile)
		step.value = 3
	})
}

async function Save(type) {
	uploadFile(finalImgBlob.value, `users/${user.value.uid}/images`, `${type == 'picture' ? 'profileImage' : 'bannerImage'}`, ".webp")
	do {
		await sleep(.5);
	} while (imageURL.value == undefined)
	if (type == 'picture')
		await updateUser({
			photoURL: imageURL.value
		})
	await setUserData(user.value, {
		profileBackground: type == 'banner' ? imageURL.value : undefined,
		photoURL: type == 'picture' ? imageURL.value : undefined
	})
	close()
}

function close() {
	emit('close')
}
async function back() {
	if (step.value > 1) step.value = 1
	c.value.destroy()

}

function dataURLtoFile(dataurl, filename) {

	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
}
async function sleep(s) {
	return new Promise(resolve => setTimeout(resolve, s * 1000));
}

</script>