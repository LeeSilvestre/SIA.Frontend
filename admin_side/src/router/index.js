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
        {
            path: '/juniorhigh',
            component: () => import('../components/JuniorHigh.vue'), // Import the component for the first tab
          },
          {
            path: '/seniorhigh',
            component: () => import('../components/SeniorHigh.vue'), // Import the component for the second tab
          },
          {
            path: '/alumni',
            component: () => import('../components/Alumni.vue'), // Import the component for the third tab
          },
          {
            path: '/faculty',
            component: () => import('../components/Faculty.vue'), // Import the component for the fourth tab
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