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
            path: '/enrollment',
            component: () => import('../views/Enrollment.vue')
        },
        {
            path: '/records',
            component: () => import('../views/Records.vue')
        },
        
        /*Records Tab*/
          {
            path: '/juniorhigh',
            component: () => import('../components/JuniorHigh.vue'), 
          },
          {
            path: '/seniorhigh',
            component: () => import('../components/SeniorHigh.vue'), 
          },
          {
            path: '/alumni',
            component: () => import('../components/Alumni.vue'),
          },
          {
            path: '/faculty',
            component: () => import('../components/Faculty.vue'), 
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