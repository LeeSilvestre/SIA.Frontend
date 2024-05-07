<template>
    <main>
      <div class="top-container">
        <div class="studentProfile">
          <span class="material-icons">summarize</span>
          <span class="text"> RECORDS AND REPORTS</span>
        </div>
      </div>  
  
      <hr>
      <!-- <div>
        <RecordsTab @tab-clicked="handleTabClicked"/>
      </div>
      <div class="main-content">
        <div v-if="activeTab === 'JuniorHigh'">
          <JuniorHigh/>
        </div>
        <div v-else-if="activeTab === 'SeniorHigh'">
          <SeniorHigh/>
        </div>
        <div v-else-if="activeTab === 'Alumni'">
          <Alumni/>
        </div>
        <div v-else>
          <Faculty/>
        </div>
      </div> -->
    </main>
  </template>
  
  <script>
  // import RecordsTab from '../components/RecordsTab.vue';
  // import JuniorHigh from '../components/JuniorHigh.vue';
  // import SeniorHigh from '../components/SeniorHigh.vue';
  // import Alumni from '../components/Alumni.vue';
  // import Faculty from '../components/Faculty.vue';
  
  // export default {
  //   components: {
  //     RecordsTab,
  //     JuniorHigh,
  //     SeniorHigh,
  //     Alumni,
  //     Faculty
  //   },
  //   data() {
  //     return {
  //       activeTab: 'JuniorHigh',  // Set default active tab
  //     };
  //   },
  //   methods: {
  //     handleTabClicked(tab) {
  //       this.activeTab = tab;
  //     }
  //   }
  // };
  </script>

<style lang="scss" scoped>
.top-container{
    display: flex;
    margin: 0.5rem;
    .studentProfile{
        flex: 1;
        
        .material-icons{
            color: var(--dark);
            font-size: 2.5rem;
        }
        .text{
            position: relative;
            color: var(--dark);
            font-size: 2rem;
            font-weight: 900;
            bottom: 0.5rem;
        }
    }

} 

</style>