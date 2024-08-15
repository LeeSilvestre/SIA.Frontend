<template>
  <main>
    <div class="top-container">
      <h1 class="bg-title">RECORDS</h1>
      <div class="inventory">
        <span class="material-icons">person</span>
        <span class="text">RECORDS</span>
      </div>
    </div>
    <hr>
    <div class="tab-content">
      <button @click="handleTabClick('MasterList')" :class="{ active: activeTab === 'MasterList' }">Master List</button>
      <div v-for="tab in tabs" :key="tab.id" class="student-record-tab">
        <div class="tab-wrapper" :class="{ active: activeTab === tab.id }">
          <button @click="handleTabClick(tab.id)" :class="{ active: activeTab === tab.id }">
            {{ tab.student.full_name || 'Unknown' }}
            <span class="close-icon material-icons" @click.stop="closeTab(tab.id)">close</span>
          </button>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div v-if="activeTab === 'MasterList'">
        <div class="student-table">
          <JuniorHigh @view-student="handleViewStudent" />
        </div>
      </div>
      <div v-for="tab in tabs" :key="tab.id">
        <div v-if="activeTab === tab.id" class="student-table">
          <JuniorHighRecord :student="tab.student" />
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import JuniorHigh from '../components/JuniorHigh.vue';
import JuniorHighRecord from '../components/Registrar/JuniorHighRecord.vue';

export default {
  data() {
    return {
      activeTab: 'MasterList', 
      tabs: [],
    };
  },
  methods: {
    handleViewStudent(student) {
      console.log('Viewing student:', student);
      const existingTab = this.tabs.find(tab => tab.student.student_id === student.student_id);
      if (existingTab) {
        this.activeTab = existingTab.id; // Switch to the existing tab
      } else {
        if (this.tabs.length < 4) {
          const newTab = {
            id: `Information-${student.student_id || new Date().getTime()}`, // Ensure id is unique
            student: student
          };
          this.tabs.push(newTab); // Add a new tab
          this.activeTab = newTab.id; // Switch to the new tab
        } else {
          alert("You can only open up to 4 tabs at a time."); // Show alert if the maximum number of tabs is reached
        }
      }
    },
    handleTabClick(tabId) {
      this.activeTab = tabId;
    },
    closeTab(tabId) {
      this.tabs = this.tabs.filter(tab => tab.id !== tabId); // Remove the tab
      if (this.activeTab === tabId) {
        if (this.tabs.length > 0) {
          // Switch to the first tab if the active tab is closed
          this.activeTab = this.tabs[0].id;
        } else {
          // Switch to 'MasterList' if no other tabs are open
          this.activeTab = 'MasterList';
        }
      }
    }
  },
  components: {
    JuniorHigh,
    JuniorHighRecord
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
  flex-direction: column;

  .student-table {
    border-radius: 10px;
    background-color: #f0f0f0;
    padding: 0.5rem;
    height: calc(100vh - 10rem); // Adjust height as needed
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
  padding: 0; // Remove padding
  margin: 0; // Remove margin
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
  background-color: lightgray; // Change this to the desired active background color
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
