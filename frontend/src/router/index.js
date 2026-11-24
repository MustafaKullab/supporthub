import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Login",
      path: '/auth/login',
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      name: "Signup",
      path: '/auth/signup',
      component: () => import("@/views/SignupPage.vue"),
    },
    {
      name: "ForgotPassword",
      path: '/auth/forgot-password',
      component: () => import("@/views/ForgotPassword.vue"),
    },
  ],
})

export default router
