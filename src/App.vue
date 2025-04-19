<script setup>
	// This starter template is using Vue 3 <script setup> SFCs
	// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
	import NavBar from './layout/components/Navbar.vue'
	import SideTools from './layout/components/sideTools/SideTools.vue'
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
</script>

<template>
	<NavBar></NavBar>
	<SideTools></SideTools>
</template>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

	}
</style>