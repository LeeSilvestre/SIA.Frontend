<template>
    <main>
        <div class="top-container">
            <h1 class="bg-title">DOCUMENT</h1>
        <div class="inventory">
            <span class="material-icons">edit_document</span>
            <span class="text">DOCUMENT</span>
        </div>
        </div>  
        <hr>

    <div class="main-content">
        <div class="masterlist-table">
          <RequestDocument @view-student="handleViewStudent" />
        </div>
      <div class="student-table">
        <RequestDocumentRec v-if="selectedStudent" :document="selectedStudent" />
        <div v-else class="norecfound">
          <v-card >
            <h1>No request selected</h1>
          </v-card>
        </div>
      </div>
    </div>
        
</main>

</template>

<script>
import RequestDocument from '../components/Registrar/RequestDocument.vue';
import RequestDocumentRec from '../components/Registrar/RequestDocumentRec.vue';

export default {
  data() {
    return {
      activeTab: 'MasterList', // Default active tab
      showStudentRecordTab: false, // Control the visibility of the Student Record tab
      selectedStudent: null // Store the selected student data
    };
  },
  methods: {
    handleTabClick(tab) {
      this.activeTab = tab; // Update active tab
      this.$emit('tab-clicked', tab); // Emit event with tab name
    },
    handleViewStudent(student) {
      this.selectedStudent = student; // Set the selected student
      this.showStudentRecordTab = true; // Show the Student Record tab
      this.activeTab = 'Information'; // Switch to the Student Record tab
    },
    closeStudentRecordTab() {
      this.showStudentRecordTab = false; // Hide the Student Record tab
      this.activeTab = 'MasterList'; // Switch back to the Master List tab
    }
  },
  components: {
    RequestDocument,
    RequestDocumentRec
  }
};
</script>

<style lang="scss" scoped>
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
  gap: 1rem;

  .student-table {
    flex: 0.5;
    border-radius: 10px;
    background-color: #f0f0f0;
    padding: 0.5rem;
    height: calc(100vh - 10rem); 
    overflow: auto;
    margin: 0;
  }
  .masterlist-table {
    flex: 0.5;
    border-radius: 10px;
    background-color: #f0f0f0;
    padding: 0.5rem;
    height: calc(100vh - 10rem); 
    overflow: auto;
    margin: 0;
  }
}

.bg-title {
  z-index: -1;
  position: absolute;
  opacity: 4%;
  margin-top: -40px;
  font-size: 100px;
  font-family: Impact, fantasy;
}

.top-container {
  display: flex;
  margin: 0.5rem;

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
      bottom: 0.3rem;
      left: 0.5rem;
    }
  }
}

.tab-container {
  padding: 1rem;
}

.tab-content {
  display: flex;
  gap: 0.5rem;
  padding: 0; 
  margin: 0;
}

.tab-content button {
  position: relative;
  color: var(--dark);
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 10px 10px 0 0;
  transition: background-color 0.2s;
  display: flex;    
  align-items: center;
  margin-left: 0.5rem;
}

.tab-content button:hover,
.tab-content button:active,
.tab-content button.active {
  background-color: lightgray;
}


.norecfound{
  height: 100%;
}
.norecfound h1 {
  font-size: 30px;
  text-align: center;
  margin: 20px 0; 
  font-weight: 300; 
}
.tab-wrapper {
  display: flex;
  align-items: center;
  border-radius: 10px 10px 0 0;
  background-color: lightgray; // Change this to the desired active background color
}

.tab-wrapper.active {
  background-color: lightgray; // Change this to the desired active background color
}

.close-icon {
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 1rem;
}

</style>