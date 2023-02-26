import { ref as vueRef, Ref, UnwrapRef } from "vue";
import { firebaseStorage } from '@/firebase/config'
import { ref as storageRef, getDownloadURL, StorageReference, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage'

export const storageStore = () => {

	const progress: Ref<number | undefined> = vueRef()

	const imageURL: Ref<string | undefined> = vueRef()

	async function uploadFile(file: File, folder_Path: string, fileName: string, extension: string) {

		const storeageReference = storageRef(firebaseStorage, `${folder_Path}/${fileName}${extension}`)
		const uploadTask = uploadBytesResumable(storeageReference, file)

		const next = (snapshot: UploadTaskSnapshot) => {
			progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			switch (snapshot.state) {
				case 'paused':
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
						imageURL.value = downloadURL
					})
			}
		)
	}

	return { progress, imageURL, uploadFile }
}