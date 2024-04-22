<template>
    <v-app>
      <div class="app">
        <template v-if="!isLoginPage"> <!-- render sidebar if not login page -->
          <Sidebar />
          <div class="headerAndContent">
            <Header />
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <Component :is="Component" />
              </transition>
            </router-view>
          </div>
        </template>
        <template v-else>
          <!-- Render only the login page content -->
          <router-view />
        </template>
      </div>
    </v-app>
  </template>

<script>
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    Header,
  },
  computed: {
    isLoginPage() {
      // Check if the current route is the login page
      return this.$route.path === '/login';
    },
  },
};
</script>

<style lang="scss" >
:root {
    --primary: #727885;
    --grey:#64748b;
    --dark:#29166F;
    --dark-alt: #29166fec;
    --light:#cdd1da;
    --text-color: #29166F;
    --sidebar-width:300px;
    --header-height:70px
    
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter';
}

body {
    background: #e2e2e2;
}

button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
}

.app {
    display:flex;
    main {
        flex: 1 1 0;
        padding: 2rem;
        will-change: transform, opacity;

        @media (max-width: 768px){
          
            padding-left: 7rem;
        }
    }
    .headerAndContent {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease-out;
    }    

}
</style>