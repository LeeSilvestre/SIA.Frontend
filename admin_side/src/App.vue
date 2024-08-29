<template>
    <v-app>
        <template v-if="!isLoginPage"> <!-- Only render sidebar and header if not on login page -->
          <div class="cont">
            <div class="sidecont">
              <Sidebar />
            </div>
            <div class="maincont">
              <div class="header">
                <Header />
              </div>
              <router-view v-slot="{ Component }"style="padding: 20px;">
                <transition name="fade" mode="out-in">
                  <Component :is="Component" />
                </transition>
              </router-view>
            </div>

          </div>


        </template> 





















        <template v-else>
          <!-- Render only the login page content -->
          <router-view />
        </template>
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
        return this.$route.path === '/login' || this.$route.path === '/student';
      },
    },
  };
  </script>

<style lang="scss" >
:root {
    --primary: #727885;
    --grey:#64748b;
    --dark:#2F3F64;
    --dark-alt: #334155;
    --light:#cdd1da;
    --sidebar-width:250px;
    --header-height:70px
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter';
    // max-height: 100vh;
    
}

::-webkit-scrollbar{
        display: none;
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
    flex-direction: column;
    // main {
    //     padding: 2rem;
    //     will-change: transform, opacity;

    //     @media (max-width: 768px){
           
    //         padding-left: 2rem;
    //     }
        
    //     @media (max-width:1047px ){
    //       flex-direction: column ;
    //     }
        
    // }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease-out;
    }    

}

.header{
  position: fixed;
  z-index: 999;
}
.cont{
    position:fixed;
    display: flex;
    width: 100%;
    height: 100vh;
    .sidecont{
      position: sticky !important;

    }
    .maincont{
      overflow: auto;
      margin-top: 8vh;
      width: 100%;
      ::-webkit-scrollbar{
        display: none;
      }
    }
  }


.v-table__wrapper {
    padding: 1rem;
    border-radius: 10px;

    .v-data-table__th {
      font-size: 17px !important; 
      font-weight: 900 !important;
      color: var(--dark);
    }
  }
</style>