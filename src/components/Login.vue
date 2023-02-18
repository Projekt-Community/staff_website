<template>
	<v-form @submit.prevent="login">
		<v-text-field
			v-model="email"
			label="Email"
			required
		></v-text-field>
		<v-text-field
			v-model="password"
			label="Password"
			type="text"
			required
		></v-text-field>
		<v-btn
			type="submit"
			color="primary"
		>Login</v-btn>
	</v-form>
</template>

<script>

export default {
	name: "Login"
}
</script>
