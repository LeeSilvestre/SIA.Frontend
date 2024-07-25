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
    };
  },
  mounted() {
    this.getUserRole();
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
    }
  }
};

</script>

<style lang="scss" scoped>
.header {
    display: flex;
    background: #374974;
    height: var(--header-height);
    width: 100%;
    
    .sna-label{
        flex: 1;
        color: #e2e2e2;
        align-self: center;
        margin-left: 1rem;
    }
 
}

</style>