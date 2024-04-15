<template>
  <v-app>
    <SidebarMenu v-if="showSidebar" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SidebarMenu from '@/components/sidebar/SidebarMenu'; 

export default {
  name: 'App',

  components: {
    SidebarMenu,
  },

  computed: {
    showSidebar() {
      return this.$route.path.includes('/home');
    }
  }
};
</script>
