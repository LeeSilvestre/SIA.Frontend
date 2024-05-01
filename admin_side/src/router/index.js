import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter ({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: 'login'

        },
        {
            path: '/login',
            component: () => import('../views/AdminLogin.vue')

        },
        {
            path: '/dashboard',
            component: () => import('../views/Dashboard.vue')
        },
        {
            path: '/studentprofile',
            component: () => import('../views/Student Profile.vue')
        },
        
        
        
        //     path: '/subjectschedule',
        //     component: () => import('../views/SubjectSchedule.vue')
        // },
        // {
        //     path: '/subjectschedule',
        //     component: () => import('../views/SubjectSchedule.vue')
        // },
        // {
        //     path: '/subjectschedule',
        //     component: () => import('../views/SubjectSchedule.vue')
        
    ]
})

export default router