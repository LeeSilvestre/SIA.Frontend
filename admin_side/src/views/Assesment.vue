<template>
    <main>
        <div class="top-container">
            <h1 class="bg-title">ASSESSMENT</h1>
        <div class="inventory">
            <span class="material-icons">feed</span>
            <span class="text">ASSESSMENT</span>
        </div>
            
        </div>  
        <hr>
        <div class="tab-content">
      <button @click="handleTabClick('JuniorHigh')" :class="{ active: activeTab === 'JuniorHigh' }">Junior High</button>
      <button @click="handleTabClick('SeniorHigh')" :class="{ active: activeTab === 'SeniorHigh' }">Senior High</button>
    </div>
        <div class="main-content">
            <div v-if="activeTab === 'JuniorHigh'">
                <div class="student-table">
                    <JHSassessmentTable/>
                </div>
            </div>
            <div v-if="activeTab === 'SeniorHigh'">
                <div class="student-table">
                    <SHSassessmentTable/>
                </div>
            </div>
        </div>

        
</main>

</template>

<script>
// import AddStudent from '../components/AddStudent.vue';
import JHSassessmentTable from '../components/Assessor/Assestment.vue';
import SHSassessmentTable from '../components/Assessor/AssestmentSHS.vue';

export default {
    data() {
    return {
      activeTab: 'JuniorHigh' // Default active tab
    };
  },
  methods: {
    handleTabClick(tab) {
      this.activeTab = tab; // Update active tab
      this.$emit('tab-clicked', tab); // Emit event with tab name
    }
  },
  components: {
    // AddStudent,
    JHSassessmentTable,
    SHSassessmentTable
  }
};
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

.main-content {
    display: flex;
    flex-direction: column;

    .student-table{
        border-radius: 10px;
        background-color: #f0f0f0;
        padding: 0.5rem;
        // height: 100vh;
    }
}

.bg-title{
    z-index: -1;
    position: absolute;
    opacity: 4%;
    margin-top: -40px;
    font-size: 100px;
    font-family: Impact, fantasy;
}
.top-container{
    display: flex;
    margin: 0.5rem;
    .inventory{
        flex: 1;
        
        .material-icons{
            color: var(--dark);
            font-size: 2.5rem;
        }
        .text{
            position: relative;
            color: var(--dark);
            font-size: 2.5rem;
            font-weight: 900;
            bottom: 0.6rem;
            left: 0.5rem;
        }
    }

} 

.tab-container {
  padding: 1rem;
}

.tab-content {
  display: flex;
  gap: 2rem; // Gap between buttons
  padding: 1rem;
}

.tab-content button {
  position: relative;
  color: var(--dark);
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  background: none;
  cursor: pointer;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid transparent;
  transition: border-bottom 0.2s;
}

.tab-content button:hover,
.tab-content button:active,
.tab-content button.active {
  border-bottom: 3px solid black;
}

.tab-content-display {
  margin-top: 2rem;
}

</style>