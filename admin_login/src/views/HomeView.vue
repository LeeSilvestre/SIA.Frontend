<template>
    <v-app>
      <SidebarMenu />
  
      <v-main>
        <router-view>
          
        </router-view>
      </v-main>
    </v-app>
  </template>
<script>
import SidebarMenu from '@/components/sidebar/SidebarMenu'; 

export default {
  name: 'App',

  data: () => ({
    //
  }),

  components: {
    SidebarMenu, // Update the component name in the components object
  },
};
</script>
