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
      
      <div class="menu">
        
          <router-link class="button" to="/dashboard">
              <span class="material-icons">dashboard</span>
              <span class="text">Dashboard</span>
          </router-link>
          <router-link class="button" to="/account"><span class="material-icons">manage_accounts</span><span class="text">Accounts</span></router-link>

          <!-- ENCODER TAB -->
          <div class="submenu" @click="toggleSubmenu">
                <router-link class="button" to="/enlistment">
                <span class="material-icons">keyboard</span>
                <span class="text">Encoding</span> <span class="material-icons dropdown-icon">{{ submenuVisible ? 'expand_less' : 'expand_more' }}</span></router-link>
                
                
                <ul class="submenu-content" v-show="submenuVisible" @click.stop>
                  <li>
                    <router-link class="button" to="/enlistment"><span class="material-icons">edit_note</span><span class="text">Enlistment</span></router-link>
                  </li>
                  <li>
                    <router-link class="button" to="/admission"><span class="material-icons">person_add</span><span class="text">Admission</span></router-link>
                  </li>
                </ul>
            </div>




          <!-- TRESURER TAB -->
          <router-link class="button" to="/assestment">
              <span class="material-icons">assessment</span>
              <span class="text">Assesstment</span>
          </router-link>
          <!-- REGSITRATION -->
          <router-link class="button" to="/enrollment">
              <span class="material-icons">feed</span>
              <span class="text">Enrollment</span>
          </router-link>
            <div class="submenu" @click="toggleSubmenu">
                <router-link class="button" to="/juniorhigh">
                <span class="material-icons">person</span>
                <span class="text">Records</span> <span class="material-icons dropdown-icon">{{ submenuVisible ? 'expand_less' : 'expand_more' }}</span></router-link>
                
                
                <ul class="submenu-content" v-show="submenuVisible" @click.stop>
                    <li><router-link class="button" to="/juniorhigh">Junior High</router-link></li>
                    <li><router-link class="button" to="/seniorhigh">Senior High</router-link></li>
                    <li><router-link class="button" to="/alumni">Alumni</router-link></li>
                    <li><router-link  class="button"to="/faculty">Faculty</router-link></li>
                </ul>
            </div>
            <router-link class="button" to="/request">
              <span class="material-icons">edit_document</span>
              <span class="text">Document Request</span>
          </router-link>
      </div>
  
      <div class="menu-logout">
          <router-link class="button" to="/">
              <span class="material-icons">logout</span>
              <span class="text">Logout</span>
          </router-link>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const is_expanded = ref(localStorage.getItem("is_expanded") === "true")
  const is_encoding = ref(localStorage.getItem("is_encoding") === "true")
  const submenuVisible = ref(false)
  const ToggleMenu = () => {
      is_expanded.value = !is_expanded.value
  
      localStorage.setItem("is_expanded", is_expanded.value)
  }
    
    const toggleSubmenu = () => { //records menu toggle submenu
        submenuVisible.value = !submenuVisible.value
    }
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
  top: 100%;
  left: 0;
  background-color: var(--dark); 
  border-radius: 0.5rem;
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: 0;
  transition: 0.2s ease-out;
}

.submenu .submenu-content {
  display: block;
}

.submenu-content li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.submenu-content li a {
  display: block;
  color: var(--light);
  text-decoration: none;
  padding: 0.5rem;
}

.submenu-content li a:hover {
  background-color: #fff;
  margin-left: 1rem;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  transition: 0.2s;
  color: var(--dark);
}
</style>
