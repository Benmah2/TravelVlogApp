import { createRouter, createWebHistory } from '@ionic/vue-router';



import HomePage from '../views/HomePage.vue';
import NewImage from '../views/NewImage.vue';
import DetailPage from "@/views/DetailPage.vue";
import tabs from "../components/tabs.vue";



const routes  = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: tabs,
    children: [
      {
        path: '',
        redirect: '/home',
      },

      {
        path: '/home',
        name: 'Home',
        component: HomePage
      },
      {
        path: "/new-image",
        name: "NewImage",
        component: NewImage,
      },
      {
        path: "/detail/:id",
        name: "Detail",
        component: DetailPage,
      }
    ]
  }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
