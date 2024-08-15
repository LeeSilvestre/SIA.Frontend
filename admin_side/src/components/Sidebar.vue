<template>
  <aside :class="`${is_expanded && 'is_expanded'}`">
    <img class="sna-logo" src="/src/assets/SNA Logo with BG.png" alt="">
    <h2 class="sp-text fs-3">Saint Nicholas Academy</h2>
    <br>
    <hr>
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">
          keyboard_double_arrow_right
        </span>
      </button>
    </div>

    <!-- ADMIN TAB -->
    <div class="menu" v-if="this.role == 'admin'">
      <router-link class="button" to="/dashboard">
        <span class="material-icons">dashboard</span>
        <span class="text">Dashboard</span>
      </router-link>
      <!-- <router-link class="button" to="/account">
        <span class="material-icons">manage_accounts</span>
        <span class="text">Accounts</span>
      </router-link>
      
       -->
      <!-- ENCODER TAB -->
      <div class="submenu" @click="toggleSubmenu1">
        <router-link class="button" to="/enlistment">
          <span class="material-icons">keyboard</span>
          <span class="text">Encoding</span> 
          <span class="material-icons dropdown-icon">{{ submenuVisible1 ? 'expand_less' : 'expand_more' }}</span>
        </router-link>
        <ul class="submenu-content" v-show="submenuVisible1" @click.stop>
          <li>
          </li>
          <li>
            <router-link class="button" to="/enlistment"><span class="text">
              Enlistment</span></router-link>
          </li>
          <li>
            <router-link class="button" to="/admission"><span class="text">Admission</span></router-link>
          </li>
          <li>
            <router-link class="button" to="/upload"><span class="text">Document Uploading</span></router-link>
          </li>
        </ul> 
      </div>

      <!-- TREASURER TAB -->
      <!-- <router-link class="button" to="/assestment">
        <span class="material-icons">assessment</span>
        <span class="text">Assessment</span>
      </router-link> -->

      <!-- REGISTRATION -->
      <router-link class="button" to="/enrollment">
        <span class="material-icons">feed</span>
        <span class="text">Enrollment</span>
      </router-link>
      <div class="submenu" @click="toggleSubmenu">
        <router-link class="button" to="/juniorhigh">
          <span class="material-icons">person</span>
          <span class="text">Records</span> 
          <span class="material-icons dropdown-icon">{{ submenuVisible ? 'expand_less' : 'expand_more' }}</span>
        </router-link>
        <ul class="submenu-content" v-show="submenuVisible" @click.stop>
          <li><router-link class="button" to="/juniorhigh" exact active-class="active">Junior High</router-link></li>
          <li><router-link class="button" to="/seniorhigh" exact active-class="active">Senior High</router-link></li>
          <!-- <li><router-link class="button" to="/alumni" exact active-class="active">Alumni</router-link></li> -->
          <li><router-link class="button" to="/faculty" exact active-class="active">Faculty</router-link></li>
        </ul>

      </div>
      <router-link class="button" to="/request">
        <span class="material-icons">edit_document</span>
        <span class="text">Document Request</span>
      </router-link>
      <router-link class="button" to="/scheduling">
        <span class="material-icons">schedule</span>
        <span class="text">Subject Scheduling</span>  
      </router-link>
    </div>
    
    <!-- ENCODER TAB -->
    <div class="menu" v-if="this.role == 'encoder'">
      <router-link class="button" to="/dashboard">
        <span class="material-icons">dashboard</span>
        <span class="text">Dashboard</span>
      </router-link>
      
      <router-link class="button" to="/student">
        <span class="material-icons">app_registration</span>
        <span class="text">Pre-Registration</span>
      </router-link>
        
      <div class="submenu" @click="toggleSubmenu1">
        <router-link class="button" to="/enlistment">
          <span class="material-icons">keyboard</span>
          <span class="text">Encoding</span> 
          <span class="material-icons dropdown-icon">{{ submenuVisible1 ? 'expand_less' : 'expand_more' }}</span>
        </router-link>
        <ul class="submenu-content" v-show="submenuVisible1" @click.stop>
          <li>
            <router-link class="button" to="/enlistment"><span class="text">Enlistment</span></router-link>
          </li>
          <li>
            <router-link class="button" to="/admission"><span class="text">Admission</span></router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- TREASURER TABS-->
    <div class="menu" v-if="this.role == 'assessor'">
      <router-link class="button" to="/assestment">
        <span class="material-icons">assessment</span>
        <span class="text">Assessment</span>
      </router-link>
    </div>
  
    <div class="menu-logout">
      <div class="button" @click="logout" style="cursor: pointer">
        <span class="material-icons">logout</span>
        <span class="text">Logout</span>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
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
aside {
  display: flex;
  flex-direction: column;
  width: calc(2.5rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;
  background-color: var(--dark);
  color: var(--light);
  position: -webkit-sticky;
  position: sticky;
  transition: 0.2s ease-out;

  .sna-logo {
    height: 2.5rem;
    width: 2.5rem;
    transition: 0.2s ease-out;
    border-radius: 1.1rem;
  }

  .sp-text {
    display: none;
    transition: 0.2s ease-out;
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    position: relative;
    top: 0;
    transition: 0.2s ease-out;
    margin: 5px;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
    margin-top: 0px;
  }

  .menu {
    margin: -0 -1rem;
    margin-top: auto;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.8rem 1rem;
      margin-bottom: 0.5rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover, &.router-link-exact-active {
        background-color: #fff;
        margin-left: 0.5rem;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;

        .material-icons, .text {
          color: var(--dark);
        }
      }
    }
  }

  .menu-logout {
    margin: -0 -1rem;
    transition: 0.2s ease-out;
    flex: 1;
    display: flex;
    align-items: flex-end;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.8rem 1rem;
      margin-bottom: 0.5rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover, &.router-link-exact-active {
        .material-icons, .text {
          color: var(--primary);
        }
      }
    }
  }

  &.is_expanded {
    width: var(--sidebar-width);

    .menu-logout {
      display: flex;
      align-items: flex-end;
      margin: -0 2rem;
      transition: 0.2s ease-out;
    }

    .sna-logo {
      height: 9rem;
      width: 9rem;
      transition: 0.2s ease-out;
      align-self: center;
      border-radius: 5rem;
    }

    .sp-text {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      color: #fff;
      opacity: 1;
      display: block;
      transition: 0.2s ease-out;
      text-align: center;
    }

    .menu-toggle-wrap {
      top: -4rem;
      left: 0.5rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    z-index: 99;
  }
}

.submenu-content {
  display: none;
  position: absolute;
  left: calc(2.5rem + 32px);
  background-color: var(--dark);
  border-radius: 0.5rem;
  transition: 0.2s ease-out;
  z-index: 1;

  li {
    list-style-type: none;
    margin: 0;
    padding: 0;

    a {
      display: block;
      color: var(--light);
      text-decoration: none;
      padding: 0.5rem;
    }

    a:hover {
      background-color: #fff;
      margin-left: 1rem;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      transition: 0.2s;
      color: var(--dark);
    }
  }
}

aside.is_expanded .submenu-content {
  display: block;
  position: relative;
  left: 0;
}

.submenu-content.v-show {
  display: block;
}
</style>
