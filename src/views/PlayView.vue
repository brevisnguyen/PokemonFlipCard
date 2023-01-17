<script setup>
import { ref, reactive, onBeforeMount, onBeforeUpdate, onMounted } from 'vue'
import Card from '@/components/Card.vue'

const images = import.meta.glob('../assets/images/*.png', { as: "url", eager: true })

const emit = defineEmits(['onFinish', 'onChangeStage']);

const modes = reactive({
	isEasy: false,
	isNormal: false,
	isHard: false,
	isSuperHard: false,
})

const cardSize = reactive({
	width: '',
	height: ''
})

const timer = reactive({
	hour: '00',
	min: '00',
	sec: '00',
})

const totalSeconds = ref(0)
const rules = ref([])
const cards = ref([])
const correctCards = ref(0)
const props = defineProps({
	mode: {
		type: String,
		validator(value) {
			return ['easy', 'normal', 'hard', 'super-hard'].includes(value)
		}
	},
	cardsContext: {
		type: Array,
		default: () => {
			return []
		}
	}
})

onBeforeUpdate(() => {
	cards.value = []
})

onBeforeMount(() => {
	if (props.cardsContext.length == 16) {
		modes.isEasy = true
	} else if (props.cardsContext.length == 36) {
		modes.isNormal = true
	} else if (props.cardsContext.length == 64) {
		modes.isHard = true
	} else if (props.cardsContext.length == 100) {
		modes.isSuperHard = true
	}

	var screenW = window.innerWidth
	var screenH = window.innerHeight - 130
	var cardPerRow = Math.sqrt(props.cardsContext.length)
	var totalSpace = 8 * (cardPerRow - 1)
	cardSize.width = (screenW - totalSpace) / cardPerRow
	cardSize.height = (screenH - totalSpace) / cardPerRow
})

onMounted(() => {
	setInterval(setTimer, 1000)
})

function setTimer() {
	++totalSeconds.value
	var time = new Date(totalSeconds.value * 1000).toISOString()
	timer.hour = time.substring(11, 13)
	timer.min = time.substring(14, 16)
	timer.sec = time.substring(17, 19)
}

function onGoHome() {
	emit("onChangeStage", "home")
}

function getImgUrl(subPath) {
	return images[subPath];
}

function flipHandle(card) {
	if (rules.value.length === 2) {
		return false
	}
	rules.value.push(card)
	if (
		rules.value.length == 2 &&
		rules.value[0].value === rules.value[1].value
	) {
		cards.value[`card-${rules.value[0].idx}`].onActiveDisableMode()
		cards.value[`card-${rules.value[1].idx}`].onActiveDisableMode()
		rules.value = []
		correctCards.value += 2
		if (correctCards.value === props.cardsContext.length) {
			setTimeout(() => {
				emit("onFinish")
			}, 800)
		}
	} else if (
		rules.value.length == 2 &&
		rules.value[0].value !== rules.value[1].value
	) {
		setTimeout(() => {
			cards.value[`card-${rules.value[0].idx}`].onFlipBackCard()
			cards.value[`card-${rules.value[1].idx}`].onFlipBackCard()
			rules.value = []
		}, 800)
	} else {
		return false
	}
}

</script>

<template>
  	<div class="relative flex flex-col justify-between bg-gray-900 text-gray-50 max-h-screen">
		<div class="container mx-auto grid grid-cols-8 pt-2">
			<button class="bg-gray-600 rounded-lg col-start-2 py-2 md:col-span-2 md:col-start-2" v-on:click="onGoHome">Return Home</button>
			<div class="md:col-start-5 col-start-4 flex text-lg"><span class="my-auto sm:mr-2 mr-5">Timer: </span><span class="my-auto">{{ timer.hour }}:{{ timer.min }}:{{ timer.sec }}</span></div>
		</div>
		<div class="m-auto py-3 px-2 sm:px-0 text-center grid gap-2" :class="{ 'grid-cols-4': modes.isEasy, 'grid-cols-6': modes.isNormal, 'grid-cols-8': modes.isHard, 'grid-cols-10': modes.isSuperHard }">
			<Card 
			v-for="(card, idx) in props.cardsContext"
			:key="idx"
			:ref="card => { cards[`card-${idx}`] = card }"
			:imgBackUrl="getImgUrl(`../assets/images/${card}.png`)"
			:card="{ idx, value: card }"
			:rules="rules"
			:cardW="cardSize.width"
			:cardH="cardSize.height"
			v-on:onFlip="flipHandle"
			></Card>
		</div>
	</div>
</template>
