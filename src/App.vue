<script setup>
import { RouterLink, RouterView } from "vue-router";
import Footer from "./components/Footer.vue";

const handleStart = (config) => {
	console.log(config.number);
}
</script>

<template>
	<RouterView v-on:start="handleStart" />
	<footer class="mb-3 mx-auto fixed inset-x-0 bottom-0">
		<Footer></Footer>
	</footer>
</template>
