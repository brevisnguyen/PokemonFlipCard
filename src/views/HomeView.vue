<script setup>
const emit = defineEmits(['start'])

const onStart = (count) => {
	emit('start', count)
}
</script>

<template>
	<div class="relative flex justify-center bg-gray-900 text-gray-50 h-screen">
		<div class="max-w-6xl sm:px-6 lg:px-8 text-center m-auto">
			<h1 class="text-4xl font-bold uppercase">Pokemon Flip Card Game</h1>
			<h3 class="mt-3">Select mode to start game</h3>
			<div class="mt-6">
				<button v-on:click="onStart(16)" class="bg-gray-800 text-white hover:bg-white hover:text-gray-900 w-32 h-32 m-2 rounded-xl border border-gray-50 mr-3 transition-colors duration-300 ease-in-out">
					<div class="flex flex-col"><span>4x4</span><span>Easy</span></div>
				</button>
				<button v-on:click="onStart(36)" class="bg-gray-800 text-white hover:bg-white hover:text-gray-900 w-32 h-32 m-2 rounded-xl border border-gray-50 mr-3 transition-colors duration-300 ease-in-out">
					<div class="flex flex-col"><span>6x6</span><span>Normal</span></div>
				</button>
				<button v-on:click="onStart(64)" class="bg-gray-800 text-white hover:bg-white hover:text-gray-900 w-32 h-32 m-2 rounded-xl border border-gray-50 mr-3 transition-colors duration-300 ease-in-out">
					<div class="flex flex-col"><span>8x8</span><span>Hard</span></div>
				</button>
				<button v-on:click="onStart(100)" class="bg-gray-800 text-white hover:bg-white hover:text-gray-900 w-32 h-32 m-2 rounded-xl border border-gray-50 mr-3 transition-colors duration-300 ease-in-out">
					<div class="flex flex-col"><span>10x10</span><span>Super Hard</span></div>
				</button>
			</div>
		</div>
	</div>
</template>
