// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { firebaseAuth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
	{
		path: '/' || '*',
		name: 'Dashboard',
		component: () => import('@/views/Dashboard.vue'),
		meta: {
			public: false
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Authentication/Login.vue'),
		meta: {
			public: true
		}
	},
	{
		path: '/Profile',
		name: "Profile",
		component: () => import('@/views/Authentication/Profile.vue'),
		meta: {
			public: false
		}
	},
	{
		path: '/MyAccount',
		name: 'My-Account',
		component: () => import('@/views/Authentication/MyAccount.vue'),
		meta: {
			public: false
		}
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeResolve((to, from) => {
	const route = to
	const meta = to.meta
	if (meta.requiresAuth) {
		onAuthStateChanged(firebaseAuth, () => {
			const user = firebaseAuth.currentUser
			if (user == null && route.path != '/login' && meta.public == false) {
				console.log("pushing to Login")
				router.push('/login')
			}
		})
	} else if (route.path == '/login') {
		onAuthStateChanged(firebaseAuth, () => {
			const user = firebaseAuth.currentUser
			if (user != null) router.push('/')
		})
	}
})

export default router
