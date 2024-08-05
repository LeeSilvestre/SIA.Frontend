<template>
    <main>
      <div class="top-container">
        <h1 class="bg-title">SUBJECT SCHEDULING</h1>
        <div class="studentProfile">
          <span class="material-icons">edit_calendar</span>
          <span class="text fw-bolder">SUBJECT SCHEDULING</span>
        </div>
      </div>
      <hr />
  
      <div class="bottom-container">
        <div class="jhs-container">
          <h3><span class="material-icons"> school</span>Junior High</h3>
  
          <JuniorTable />
        </div>
  
        <div class="shs-container">
          <h3><span class="material-icons"> school</span>Senior High</h3>
  
          <SeniorTable />
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import JuniorTable from "../components/Scheduling/JuniorTable.vue";
  import SeniorTable from "../components/Scheduling/SeniorTable.vue";
  export default {
    components: {
      SeniorTable,
      JuniorTable,
    },
  };
  </script>
  
  <style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: column;
  }
  
  .top-container {
    margin: 0.5rem;
  
    .bg-title {
      z-index: -1;
      position: absolute;
      opacity: 0.04; 
      margin-top: -40px;
      font-size: 100px;
      font-family: Impact, fantasy;
    }
    .studentProfile {
      display: flex; 
      align-items: center;
  
      .material-icons {
        color: var(--dark);
        font-size: 2.5rem;
      }
      .text {
        color: var(--dark);
        font-size: 2.5rem;
        font-weight: 900;
        margin-left: 0.5rem; 
      }
    }
  }
  
  .bottom-container{
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 2rem;
          h3 {
              text-shadow: 0 0 1px;
              font-size: 20px;
              flex: 1;
              color: var(--dark);
              margin-bottom: 1fr;
  
      .material-icons {
        font-size: 35px;
        margin-right: 5px; 
      }
    }
  
    .jhs-container,
    .shs-container {
      flex: 1;
      padding: 1rem; 
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
  
      &:nth-of-type(1) {
        border-left: 4px solid var(--dark-alt);
      }
  
      &:nth-of-type(2) {
        border-right: 4px solid var(--dark-alt);
      }
    }
  }
  
  @media (max-width: 768px) {
    .bottom-container {
      flex-direction: column;
      gap: 1rem;
    }
  }
  </style>
  