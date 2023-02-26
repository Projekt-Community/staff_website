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
		path: '/users/:uid',
		name: "User",
		component: () => import('@/views/Authentication/Profile.vue'),
		meta: {
			public: false
		},
		props: true,
		params: {

		}
	},
	{
		path: '/users/:uid/edit',
		name: 'Account',
		component: () => import('@/views/Authentication/MyAccount.vue'),
		meta: {
			public: false,
			sameUser: true
		}
	},
	{
		path: '/Calendar',
		name: 'Calendar',
		component: () => import('@/views/Calendar.vue'),
		meta: {
			public: false,
		}
	}
]


const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})
router.beforeResolve(async (to, from) => {
	const route = to
	const meta = to.meta
	const params = to.params
	if (!navigator.onLine) {
		router.push('/login')
		return;
	}
	await onAuthStateChanged(firebaseAuth, async () => {
		const user = firebaseAuth.currentUser
		// Handles users not logged in
		if (user == null || !navigator.onLine) {
			if (meta.public == false) router.push("/login")
		}

		// handles users logged in
		else {
			if (route.path == '/login') router.push('/')
			if (route.path.includes('/users') && route.path.includes('/edit') && params.uid != user.uid) {
				router.push(`/users/${user.uid}/edit`)
			}
		}
	})
})

export default router
