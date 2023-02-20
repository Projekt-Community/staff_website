import { ref as vueRef, Ref, UnwrapRef } from "vue";
import { firebaseStorage } from '@/firebase/config'
import { ref as storageRef, getDownloadURL, StorageReference, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage'

export const storageStore = () => {

	const progress: Ref<number | undefined> = vueRef()

	const imageURL: Ref<string | undefined> = vueRef()

	async function uploadFile(file: File, folder_Path: string, fileName: string, extension: string) {

		console.log("Saving to: ", `${folder_Path}/${fileName}${extension}`)
		const storeageReference = storageRef(firebaseStorage, `${folder_Path}/${fileName}${extension}`)
		const uploadTask = uploadBytesResumable(storeageReference, file)

		const next = (snapshot: UploadTaskSnapshot) => {
			progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			console.log('Upload is ' + progress.value + '% done')
			switch (snapshot.state) {
				case 'paused':
					console.log('Upload Paused')
					break;
				default:
					break;
			}
		}
		uploadTask.on('state_changed',
			next,
			null,
			async () => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((downloadURL) => {
						console.log('File available at ', downloadURL)
						imageURL.value = downloadURL
					})
			}
		)
	}

	return { progress, imageURL, uploadFile }
}