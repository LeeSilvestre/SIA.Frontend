<template>
  <div class=''>
    <div class="tab-content">
      <button @click="handleTabClick('JuniorHigh')" :class="{ active: activeTab === 'JuniorHigh' }">Junior High</button>
      <button @click="handleTabClick('SeniorHigh')" :class="{ active: activeTab === 'SeniorHigh' }">Senior High</button>
      <button @click="handleTabClick('Alumni')" :class="{ active: activeTab === 'Alumni' }">Alumni</button>
      <button @click="handleTabClick('Faculty')" :class="{ active: activeTab === 'Faculty' }">Faculty</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: null 
    };
  },
  methods: {
    handleTabClick(tab) {
      this.activeTab = tab; // active tab 
      this.$emit('tab-clicked', tab); 
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-content { 
    display: flex;
    gap: 2rem; /* buttons gap */
    padding: 1rem;
}

.tab-content button {
    position: relative;
    color: var(--dark);
    font-size: 1.2rem;
    font-weight: 600;
    bottom: 0.5rem;
    border-width: 20px;
    border-bottom: 3px solid transparent;
}
.tab-content button:hover,
.tab-content button:active,
.tab-content button.active {
    transition: 0.2s;
    border-bottom: 2.5px solid black;
} 
</style>
