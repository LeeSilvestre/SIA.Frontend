import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter ({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/AdminLogin.vue')

        },
        {
            path: '/studentrecords',
            component: () => import('../views/StudentRecords.vue')
        },
        {
            path: '/examination',
            component: () => import('../views/Examination.vue')
        },
              
    ]
})

export default router