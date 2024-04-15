<template>
  <v-card class="enrollment-card" elevation="10">
    <v-card-title>Enrollment Summary</v-card-title>
    
    <!-- Senior High Section -->
    <v-card-text>
      <h2>Senior High</h2>
      <v-data-table
        :headers="seniorHighHeaders"
        :items="seniorHighCourses"
        class="elevation-1"
      >
        <template v-slot:[`item.enrolled`]="{ item }">
          <td>{{ item.enrolled }}</td>
        </template>
      </v-data-table>
    </v-card-text>
    
    <!-- Junior High Section -->
    <v-card-text>
      <h2>Junior High</h2>
      <v-data-table
        :headers="juniorHighHeaders"
        :items="juniorHighCourses"
        class="elevation-1"
      >
        <template v-slot:[`item.enrolled`]="{ item }">
          <td>{{ item.enrolled }}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      seniorHighHeaders: [
        { text: 'Strand', value: 'name' },
        { text: 'Enrolled Students', value: 'enrolled' },
      ],
      juniorHighHeaders: [
        { text: 'Grade', value: 'grade' },
        { text: 'Enrolled Students', value: 'enrolled' },
      ],
      seniorHighCourses: [
        { name: 'ABM', enrolled: 120 },
        { name: 'ICT', enrolled: 100 },
        { name: 'HUMSS', enrolled: 90 },
        { name: 'STEM', enrolled: 110 },
        { name: 'GAS', enrolled: 80 },
        { name: 'HE', enrolled: 70 },
        // Add more senior high strands as needed
      ],
      juniorHighCourses: [
        { grade: 'Grade 7', enrolled: 150 },
        { grade: 'Grade 8', enrolled: 140 },
        { grade: 'Grade 9', enrolled: 130 },
        { grade: 'Grade 10', enrolled: 125 },
        // Add more junior high grades as needed
      ]
    };
  }
};
</script>

<style scoped>
.enrollment-card {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
