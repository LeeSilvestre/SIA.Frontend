<template>
  <div class="tab-container">
    <div class="tab-content">
      <button @click="handleTabClick('JuniorHigh')" :class="{ active: activeTab === 'JuniorHigh' }">Junior High</button>
      <button @click="handleTabClick('SeniorHigh')" :class="{ active: activeTab === 'SeniorHigh' }">Senior High</button>
      <button @click="handleTabClick('Alumni')" :class="{ active: activeTab === 'Alumni' }">Alumni</button>
      <button @click="handleTabClick('Faculty')" :class="{ active: activeTab === 'Faculty' }">Faculty</button>
    </div>
    <div class="tab-content-display">
      <div v-if="activeTab === 'JuniorHigh'">
        <!-- Junior High content goes here -->
        <p>This is the Junior High section.</p>
      </div>
      <div v-else-if="activeTab === 'SeniorHigh'">
        <!-- Senior High content goes here -->
        <p>This is the Senior High section.</p>
      </div>
      <div v-else-if="activeTab === 'Alumni'">
        <!-- Alumni content goes here -->
        <p>This is the Alumni section.</p>
      </div>
      <div v-else-if="activeTab === 'Faculty'">
        <!-- Faculty content goes here -->
        <p>This is the Faculty section.</p>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
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
