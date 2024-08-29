<template>
    <main>
        <div class="headcont" style="border-bottom: 2px solid grey;">
          <div class="top-container">
              <h1 class="bg-title">ENROLLMENT</h1>
          <div class="inventory">
              <span class="material-icons">feed</span>
              <span class="text">ENROLLMENT</span>
          </div>
        </div>
            
        </div>  
        <div class="tab-content">
      <button @click="handleTabClick('Verifying')" :class="{ active: activeTab === 'Verifying' }">Verifying</button>
      <button @click="handleTabClick('Enrolled')" :class="{ active: activeTab === 'Enrolled' }">Officially Enrolled</button>
    </div>
        <div class="main-content">
            <div v-if="activeTab === 'Verifying'">
                <div class="student-table">
                    <Verifying />
                </div>
            </div>
            <div v-if="activeTab === 'Enrolled'">
                <div class="student-table">
                    <Enrolled />
                </div>
            </div>
        </div>

        
</main>

</template>

<script>
// import AddStudent from '../components/AddStudent.vue';
import Verifying from '../components/Registrar/Verifying.vue';
import Enrolled from '../components/Encoder/Enrolled.vue';

export default {
    data() {
    return {
      activeTab: 'Verifying' // Default active tab
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
    Verifying,
    Enrolled
  }
};
</script>

<style lang="scss" scoped>
main{
  max-height: 100%;
  padding: 0;
}
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
          height: 75vh;
    }
}

.bg-title{
    z-index: -1;
    position: absolute;
    opacity: 4%;
    margin-top: -40px;
    font-size: 80px;
    font-family: Impact, fantasy;
}
.top-container{
    display: flex;
    margin: 0.5rem;
    .inventory{
        flex: 1;
        
        .material-icons{
            color: var(--dark);
            font-size: 1.8rem;
        }
        .text{
            position: relative;
            color: var(--dark);
            font-size: 1.8rem;
            font-weight: 900;
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