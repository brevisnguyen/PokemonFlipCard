<script setup>
import { ref } from 'vue'
import frontCardImg from '@/assets/images/icon_back.png'

const isFlipped = ref(false);
const isDisabled = ref(false);
const emit = defineEmits(['onFlip']);
const props = defineProps({
	imgBackUrl: {
		type: String,
		required: true,
	},
	card: {
		type: [String, Number, Array, Object],
	},
	rules: {
		type: Array,
	},
	cardW: {
		type: Number
	},
	cardH: {
		type: Number
	}
})

function onToggleFlipCard() {
	if (props.rules.length >= 2) return
	if (isDisabled.value) return

	isFlipped.value = !isFlipped.value
	if (isFlipped.value) {
		emit('onFlip', props.card)
	}
}
const onFlipBackCard = () => {
	isFlipped.value = false
}
const onActiveDisableMode = () => {
	isDisabled.value = true
}

defineExpose({
	onFlipBackCard,
	onActiveDisableMode
})
</script>

<template>
	<div class="card text-center">
		<div class="card-inner cursor-pointer text-center relative shadow-lg shadow-cyan-800"
			:style="{
				width: `${props.cardW}px`,
				height: `${props.cardH}px`
			}"
			v-bind:class="{'is-flipped': isFlipped, 'cursor-default' : isDisabled}"
			v-on:click="onToggleFlipCard"
		>
			<div class="card-font w-full h-full border my-auto border-gray-300 bg-cyan-900 rounded-lg text-center absolute overflow-hidden flex justify-center" style="backface-visibility: visible;">
				<img :src="frontCardImg" alt="" class="object-contain">
			</div>
			<div class="card-back w-full h-full border my-auto border-gray-300 bg-cyan-900 rounded-lg text-center absolute overflow-hidden flex justify-center" style="backface-visibility: hidden;">
				<img :src="props.imgBackUrl" alt="" class="object-contain">
			</div>
		</div>
	</div>
</template>
