import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlayView from '../views/PlayView.vue';
import RecordView from '../views/RecordView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/record",
      name: "record",
	  component: RecordView,
    },
	{
		path: "/play/:mode",
		name: "play",
		component: PlayView,
		props: true,
	},
  ],
});

export default router;
