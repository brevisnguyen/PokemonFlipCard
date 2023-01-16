<script setup>
import { ref, reactive } from "vue";
import Footer from "./components/Footer.vue"
import HomeView from "./views/HomeView.vue";
import RecordView from "./views/RecordView.vue"
import PlayView from './views/PlayView.vue'
import shuffled from "./utils/array"

const stage = ref('home')
const finishedTime = ref(0)
const settings = reactive({
	totalOfBlock: 0,
	cardsContext: [],
	startedAt: null,
	widthCard: 'w-32',
	heightCard: 'h-48',
})

function handleStart(totalOfBlock) {
	settings.totalOfBlock = totalOfBlock
	const firstCards = Array.from({ length: settings.totalOfBlock / 2 }, (_, i) => i + 1)
	const secondCards = [...firstCards]
	const cards = [...firstCards, ...secondCards]
	settings.cardsContext = shuffled(shuffled(shuffled(shuffled(cards))))
	settings.startedAt = new Date().getTime()
	stage.value = 'play'
}
function handleFinish() {
	var now = new Date().getTime()
	finishedTime.value = (now - settings.startedAt) / 1000
	stage.value = 'record'
}
function handleChangeStage(newStage) {
	if (['home', 'play', 'record'].includes(newStage)) {
		settings.cardsContext = []
		settings.totalOfBlock = 0
		settings.startedAt = null
		stage.value = newStage
	}
}
</script>

<template>
	<HomeView v-if="stage == 'home'" v-on:start="handleStart"></HomeView>
	<PlayView
		v-if="stage == 'play'"
		:cardsContext="settings.cardsContext"
		v-on:onFinish="handleFinish"
		v-on:onChangeStage="handleChangeStage"
	></PlayView>
	<RecordView
		v-if="stage == 'record'"
		:finishTime="finishedTime"
		v-on:onChangeStage="handleChangeStage"
	></RecordView>
	<Footer></Footer>
</template>
