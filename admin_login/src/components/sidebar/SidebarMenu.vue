<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    fixed
    :width="sidebarWidth"
  >
    <v-list dense>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              <span v-if="collapsed">S</span>
              <span v-else>Welcome to SNA</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.to" link :class="{ 'active': $route.path === item.to }">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-btn class="collapse-icon" icon @click="toggleSidebar">
      <v-icon>{{ collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true, // Controls the state of the sidebar drawer
      collapsed: false,
      sidebarWidth: 220, // Initial width of the sidebar
      menuItems: [ // Define your sidebar menu items
        { title: 'Dashboard', to: '/dashboard', icon: 'mdi-home' },
        { title: 'Enrollment Summary', to: '/enrollment', icon: 'mdi-chart-bar' },
        { title: 'Academic Record', to: '/academics', icon: 'mdi-book-open-variant' },
        // Add more menu items as needed
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
      this.sidebarWidth = this.collapsed ? 60 : 220; // Adjust sidebar width based on collapsed state
    }
  }
};
</script>
  
  <style>
  :root {
      --sidebar-bg-color: #c2c0c0;
      --sidebar-item-hover: #38a169;
      --sidebar-item-active: #276749;
  }
  </style>
  
  <style scoped>
  .sidebarMenu {
    background-color: var(--sidebar-bg-color);
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  .collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.100em;
    color: black;
    transition: 0.2s linear;
  }
  .rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
  }
  </style>
  