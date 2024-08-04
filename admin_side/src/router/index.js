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
      path: "/account",
      component: () => import("../views/Account.vue"),
    },
    {
      path: "/enrollment",
      component: () => import("../views/Enrollment.vue"),
    },
    {
      path: "/enlistment",
      component: () => import("../views/Enlistment.vue"),
    },
    {
      path: "/admission",
      component: () => import("../views/Admission.vue"),
    },
    {
      path: "/assestment",
      component: () => import("../views/Assesment.vue"),
    },

    {
      path: '/request',
      component: () => import('../views/Document.vue'),
    },
    {
    path: '/juniorhigh',
      component: () => import('../views/JuniorHighRec.vue'),
    },
    {
      path: '/seniorhigh',
      component: () => import('../views/SeniorHighRec.vue'),
    },
    // {
    //   path: '/alumni',
    //   component: () => import('../views/AlumniRec.vue'),
    // },
    {
      path: '/faculty',
      component: () => import('../views/FacultyRec.vue'),
    },
    {
      path: '/test',
      component: () => import('../views/Test.vue'),
    },
    {
      path: '/student',
      component: () => import('../views/Student.vue'),
    },
    { path: '/junior-high-record/:id', 
      component: () => import('../components/JuniorHighRecord.vue'), 
      props: true 
    },
    { path: '/senior-high-record/:id', 
      component: () => import('../components/SeniorHighRecord.vue'), 
      props: true 
    },

    { path: '/faculty-record/:id', 
      component: () => import('../components/FacultyRecord.vue'), 
      props: true 
    },
    { path: '/request-document:id', 
      component: () => import('../components/RequestDocumentRec.vue'), 
      props: true 
    },
    {
      path: '/scheduling',
      component: () => import('../views/SubjectScheduling.vue'),
    }

  

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