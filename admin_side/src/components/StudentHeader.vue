<template>
    <nav class="navbar">
        <a class="navbar-brand" href="#">
            <img src="/src/assets/SNA Logo with BG.png" width="50" height="50" class="ml-2 d-inline-block" alt="">
            ST. NICHOLAS ACADEMY OF CASTILLEJOS INC.
        </a>
        <div class="button">
            <button  @click="goBack" class="back-button">
              <span class="material-icons" width="30" height="30" alt="Back">keyboard_return</span>
            </button>
        </div>
    </nav>
  </template>
  

    <script>
    export default {
        methods: {
            goBack() {
            window.history.back();
            }
        }
    }
    </script>
  
  <style lang="scss" scoped>
    .navbar{
        background-color: var(--dark);
        
        .navbar-brand{
            color: white;

            img{
                border-radius: 2rem;
            }
        }
    }
    .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
    margin-top: 0px;
  }
  </style>
  