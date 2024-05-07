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
          path: '/viewdetails',
          component: () => import('../views/ViewDetails.vue')
        },
        
        /*Records Tab*/
          // {
          //   path: '/juniorhigh',
          //   component: () => import('../components/JuniorHigh.vue'), 
          // },
          // {
          //   path: '/seniorhigh',
          //   component: () => import('../components/SeniorHigh.vue'), 
          // },
          // {
          //   path: '/alumni',
          //   component: () => import('../components/Alumni.vue'),
          // },
          // {
          //   path: '/faculty',
          //   component: () => import('../components/Faculty.vue'), 
          // },
          {
            path: '/studentinfo',
            component: () => import('../components/StudentInfo.vue'), 
          },
          {
            path: '/infodocuments',
            component: () => import('../components/InfoDocuments.vue'), 
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