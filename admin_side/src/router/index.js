import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "login",
    },
    {
      path: "/login",
      component: () => import("../views/AdminLogin.vue"),
    },
    {
      path: "/dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/enrollment",
      component: () => import("../views/Enrollment.vue"),
    },
    {
      path: "/viewdetails",
      component: () => import("../views/ViewDetails.vue"),
    },

    {
    path: '/juniorhigh',
      component: () => import('../views/JuniorHighRec.vue'),
    },
    {
      path: '/seniorhigh',
      component: () => import('../views/SeniorHighRec.vue'),
    },
    {
      path: '/alumni',
      component: () => import('../views/AlumniRec.vue'),
    },
    {
      path: '/faculty',
      component: () => import('../views/FacultyRec.vue'),
    },


    {
      path: "/studentinfo",
      component: () => import("../components/StudentInfo.vue"),
    },
    {
      path: "/infodocuments",
      component: () => import("../components/InfoDocuments.vue"),
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
  ],
});

export default router