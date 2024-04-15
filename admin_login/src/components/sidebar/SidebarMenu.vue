<template>
    <div class="sidebarMenu" :style="{ width: sidebarWidth }">
      <h1>
        <span v-if="collapsed">
          <div>S</div>
        </span>
        <span v-else>Welcome to SNA</span>
      </h1>
  
      <router-link to="/dashboard" class="link" :class="{ 'active': $route.path === '/' }">
        <i class="icon fas fa-home"></i>
        <transition name="fade">
          <span v-if="!collapsed">Dashboard</span>
        </transition>
      </router-link>
      <router-link to="/enrollment" class="link" :class="{ 'active': $route.path === '/dashboard' }">
        <i class="icon fas fa-home"></i>
        <transition name="fade">
          <span v-if="!collapsed">Enrollment Summary</span>
        </transition>
      </router-link>
      <router-link to="/academics" class="link" :class="{ 'active': $route.path === '/academics' }">
        <i class="icon fas fa-home"></i>
        <transition name="fade">
          <span v-if="!collapsed">Academic Record</span>
        </transition>
      </router-link>
  
      <span class="collapse-icon" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar">
        <i class="fas fa-angle-double-left"></i>
      </span>
    </div>
  </template>
  
  <script>
  import { collapsed, toggleSidebar, sidebarWidth } from './state'
  
  export default {
    data() {
      return {
        collapsed: collapsed,
        sidebarWidth: sidebarWidth
      }
    },
    methods: {
      toggleSidebar: toggleSidebar
    }
  }
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
  