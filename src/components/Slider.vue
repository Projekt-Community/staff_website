<template>
	<div
		id="slider"
		class="d-flex justify-center align-center slider"
	>

	</div>
</template>

<script setup lang="ts">
import { resolve } from 'path';
import { onMounted } from 'vue';
const images = [
	{
		src: 'https://media.discordapp.net/attachments/1063237735466418277/1063237860490215596/pjktcom_1.png?width=683&height=683',
		alt: 'Placeholder',
		text: 'Accelerate Your Entire Mobile Team Workflow',
	},
	{
		src: 'https://preview.redd.it/c9cycb9l86u81.png?width=640&crop=smart&auto=webp&s=d8955e5bd23bef4ec70a2d7c20beb6f3726376ba',
		alt: 'Placeholder',
		text: 'The Most Comprehenive Bug Reporting Tool for Mobile Apps',
	},
	{
		src: 'https://i.redd.it/y1yif8ajuy461.jpg',
		alt: 'Placeholder',
		text: 'Secure Crash Reporting With Real-Time Alerts',
	},
	{
		src: 'https://i.ytimg.com/vi/NOhXVFYairc/maxresdefault.jpg',
		alt: 'Placeholder',
		text: 'Secure Crash Reporting With Real-Time Alerts',
	},
]

function setImage(img: string) {
	const slider = document.getElementById('slider')
	slider?.setAttribute("style", `background-image: url("${img}")`)

	var i = 0
	const interval = setInterval(() => {
		i = i >= images.length - 1 ? 0 : i + 1
		slider?.setAttribute("style", `background-image: url("${images[i].src}")`)
	}, 7500)
}

onMounted(() => {
	setImage(images[0].src)
})
</script>

<style>
.slider {
	height: 100%;
	width: 100%;

	background-position: center, center;
	background-size: cover;
	background-repeat: no-repeat;
	opacity: 1;
	overflow: hidden;
	-webkit-transition: background 2s ease-in-out;
	-moz-transition: background 2s ease-in-out;
	-o-transition: background 2s ease-in-out;
	-ms-transition: background 2s ease-in-out;
	transition: background 2s ease-in-out;
}
</style>