import { createRouter, createWebHistory } from '@ionic/vue-router';
import {getAuth, onAuthStateChanged} from "firebase/auth";

const auth = getAuth();

import HomePage from '../views/HomePage.vue';
import NewImage from '../views/NewImage.vue';
import DetailPage from "@/views/DetailPage.vue";
import tabs from "../components/tabs.vue";
import LogIn from '../views/SignIn.vue';
import {push} from "ionicons/icons";



const router = createRouter({


  history: createWebHistory(),
  routes: [
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
          component: HomePage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/new-image",
          name: "NewImage",
          component: NewImage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/detail/:id",
          name: "Detail",
          component: DetailPage,
          meta: {
            requiresAuth: true,
          },
        },

      ]
    },
    {
      path: "/sign-in",
      component: LogIn
    },
  ],
})

let isAuthResolved = false;

onAuthStateChanged(auth, (user) => {
  isAuthResolved = true; // Auth state is resolved
});

router.beforeEach(async (to, from, next) => {
  // Wait until the auth state is resolved
  if (!isAuthResolved) {
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, () => {
        unsubscribe();
        resolve();
      });
    });
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next('/sign-in'); // Redirect to sign-in page if not authenticated
  }
  else {
    next(); // Proceed to the desired route
  }
});

export default router;
