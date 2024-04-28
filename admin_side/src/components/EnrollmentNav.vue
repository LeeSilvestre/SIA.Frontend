<template>
    <v-tabs v-model="tab">
      <v-tab v-for="(tab, index) in tabs" :key="index">
        {{ tab }}
      </v-tab>
      <v-tab-item v-for="(tab, index) in tabs" :key="index">
        {{ tabContent[index] }}
      </v-tab-item>
    </v-tabs>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tab: null,
        tabs: ['Enrollment', 'Scheduling'], // Array of tab names
        tabContent: ['Content for Tab 1', 'Content for Tab 2'] // Array of corresponding tab content
      };
    }
  };
  </script>
  