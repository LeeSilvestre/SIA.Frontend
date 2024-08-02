<template>
  <header class="header sticky-lg-top">
      <div v-if="this.role == 'admin'">
          <h2 class="sna-label fs-3">REGISTRAR PANEL</h2>
      </div>
      <div v-if="this.role == 'assessor'">
          <h2 class="sna-label fs-3">TREASURER PANEL</h2>
      </div>
      <div v-if="this.role == 'encoder'">
          <h2 class="sna-label fs-3">ENCODER PANEL</h2>
      </div>
      <div class="current-time">{{ currentTime }}</div>
  </header>
</template>

<script>
export default {
data() {
  return {
    name: 'Header',
    role: '', // Initialize role here
    is_expanded: localStorage.getItem("is_expanded") === "true",
    submenuVisible: false,
    submenuVisible1: false,
    currentTime: '' // Add currentTime data property
  };
},
mounted() {
  this.getUserRole();
  this.updateTime(); // Update time immediately on mount
  this.timer = setInterval(this.updateTime, 1000); // Update time every second
},
beforeDestroy() {
  clearInterval(this.timer); // Clear the interval when the component is destroyed
},
methods: {
  getDataFromLocalStorage() {
    // Retrieve data from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Assuming userInfo is stored as a JSON string

    // Log data to the console (or use it as needed)
    return userInfo;
  },
  getUserRole() {
    const user = this.getDataFromLocalStorage();
    if (user) {
      this.role = user.role;
    } else {
      console.error('User data not found in localStorage.');
    }
  },
  ToggleMenu() {
    this.is_expanded = !this.is_expanded;
    localStorage.setItem("is_expanded", this.is_expanded);
  },
  toggleSubmenu() {
    this.submenuVisible = !this.submenuVisible;
  },
  toggleSubmenu1() {
    this.submenuVisible1 = !this.submenuVisible1;
  },
  logout() {
    // Clear authentication token and user info
    localStorage.removeItem('user');
    // Redirect to login page or home page
    this.$router.push('/login');
  },
  updateTime() {
    const now = new Date();
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    this.currentTime = now.toLocaleDateString('en-US', options);
  }
}
};
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #374974;
    height: var(--header-height);
    width: 100%;
    padding: 0 1rem;

    .title-container {
        flex-grow: 1;
    }

    .sna-label {
        color: #e2e2e2;
    }

    .current-time {
        color: #e2e2e2;
    }
}
</style>
