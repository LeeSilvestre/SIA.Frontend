import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter ({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/StudentLogin.vue')

        },
        {
            path: '/dashboard',
            component: () => import('../views/Dashboard.vue')
        }
    ]
})

export default router