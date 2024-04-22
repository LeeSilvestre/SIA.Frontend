import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter ({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/StudentLogin.vue')

        },
        {
            path: '/studentprofile',
            component: () => import('../views/Student Profile.vue')
        }
    ]
})

export default router