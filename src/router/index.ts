import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/services', name: 'Services', component: () => import('@/views/Services.vue') },
    { path: '/caregivers', name: 'Caregivers', component: () => import('@/views/Caregivers.vue') },
    { path: '/booking', name: 'Booking', component: () => import('@/views/Booking.vue') },
    { path: '/profile', name: 'Profile', component: () => import('@/views/Profile.vue') },
    { path: '/contact', name: 'Contact', component: () => import('@/views/Contact.vue') }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
