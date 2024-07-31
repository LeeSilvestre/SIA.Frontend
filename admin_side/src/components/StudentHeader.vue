<template>
    <nav class="navbar">
        <a class="navbar-brand" href="#">
            <img src="/src/assets/SNA Logo with BG.png" width="50" height="50" class="ml-2 d-inline-block" alt="">
            ST. NICHOLAS ACADEMY OF CASTILLEJOS INC.
        </a>
        <div class="button">
      <button @click="goBack" class="back-button">
        <span class="material-icons" alt="Back">keyboard_return</span>
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
.navbar {
  background-color: var(--dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;

  .navbar-brand {
    color: white;
    display: flex;
    align-items: center;

    img {
      border-radius: 2rem;
      margin-right: 1rem;
    }
  }

  .button {
    .back-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      transition: color 0.3s, transform 0.3s;

      &:hover {
        color: var(--light);
        transform: scale(1.1);
      }

      .material-icons {
        font-size: 30px;
      }
    }
  }
}
  </style>
  