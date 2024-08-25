<template>
    <div class="student-container">
      <Header />
      <main class="main-content">
        <div class="top-container">
          <div class="studentProfile">
            <div class="text">PRE-REGISTRATION PROCESS</div>
          </div>
        </div>
        <div class="student-table">
          <StudentMain />
        </div>
      </main>
    </div> 
  </template>
   
  <script>
  import Header from '../components/StudentHeader.vue';
  import StudentMain from '../components/Encoder/Pre-reg/StudentMain.vue'
  export default {
    components: {
      Header,
      StudentMain
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .student-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; /* Ensure it takes the full height */
  }
  
  .top-container {
    display: flex;
    margin: 0.5rem;
  
    .studentProfile {
      flex: 1;
  
      .material-icons {
        color: var(--dark);
        font-size: 2.5rem;
      }
  
      .text {
        position: relative;
        color: var(--dark);
        font-size: 2rem;
        font-weight: 900;
        bottom: 0.5rem;
      }
    }
  }
  
  .main-content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    flex: 1; 
  }
  
  .student-table {
    border-radius: 10px;
    background-color: #f0f0f0;
    padding: 0.5rem;
    width: auto;
  }
  
  .bg-title {
    z-index: -1;
    position: absolute;
    opacity: 4%;
    margin-top: -40px;
    font-size: 100px;
    font-family: Impact, fantasy;
  }
  
  .inventory {
    flex: 1;
  
    .material-icons {
      color: var(--dark);
      font-size: 2.5rem;
    }
  
    .text {
      position: relative;
      color: var(--dark);
      font-size: 2.5rem;
      font-weight: 900;
      bottom: 0.6rem;
      left: 0.5rem;
    }
  }
  </style>
  