<script setup lang="ts">
//#region Imports
import { ref } from 'vue';
import { defineProps } from 'vue';
import { User } from 'firebase/auth'
import { useTheme } from 'vuetify/lib/framework.mjs';
import router from '@/router'
import AccountMenu from './props/AccountMenu.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

</script>

<template>
	<v-footer class="py-16 text-center">


		<v-row justify="center">
			<v-col cols="2">
				<!-- TODO: Fix why navbar is going over footer -->
			</v-col>
			<v-col cols="10">
				<v-row justify="center">
					<v-col cols="4">
						<v-row justify="center" class="align-center">
							<v-col cols="3">
								<v-img src="@/assets/logo.svg" cover></v-img>
							</v-col>
							<v-col cols="4">
								Projekt Community
							</v-col>
						</v-row>
					</v-col>
					<v-col cols="8">
						<v-row>
							<v-col cols="12">
								Thank you everyone who helped make Projekt Community a reality!
							</v-col>
							<v-col cols="12">
								&copy; 2023 Projekt Community
								<br />
								Website by SenpaiVR and Fieldform
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-footer>
</template>

