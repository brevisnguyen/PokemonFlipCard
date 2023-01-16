<script setup>
import { ref, toRef } from 'vue';

const emit = defineEmits(['onChangeStage'])

const props = defineProps({
	finishTime: {
		type: Number,
		default: 0
	}
})

function onGoHome() {
	emit("onChangeStage", "home")
}

</script>

<template>
	<div class="min-h-screen relative flex justify-center text-gray-50">
		<div class="m-auto max-w-6xl sm:px-6 lg:px-8 text-center">
			<h1 class="text-6xl font-bold uppercase">✨ Congratulations ✨</h1>
			<h3 class="my-4 text-4xl">{{ props.finishTime }} seconds</h3>
			<button v-on:click="onGoHome" class="my-4 bg-cyan-900 py-2 px-6 rounded-lg text-lg border border-gray-100">Play again</button>
		</div>
	</div>
</template>
