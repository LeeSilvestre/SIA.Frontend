<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title class="text-h6 font-weight-black" style="color: #2f3f64">
        SCHEDULE DETAILS
      </v-toolbar-title>
      <v-text-field v-model="search" class="w-auto mr-1" density="compact" label="Search"
          prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line>
        </v-text-field>
      <!-- <v-btn @click="refreshData" class="bg-blue" color="white">Refresh</v-btn> -->
      <!-- Add more buttons or controls as needed -->
    </v-toolbar>

    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="[selectedItem]"
      :search="search"
      :sort-by="[{ key: 'section', order: 'asc' }]"

    >
      <!-- Table Data -->
       
      <template v-slot:item="{ item }">
        <tr>
          <td style="padding: 1rem">{{ item.classcode }}</td>
          <td>{{ item.subject }}</td>
          <td>{{ item.day }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.grade_level }}</td>
          <td>{{ item.section }}</td>
          <td>{{ item.adviser }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  props: {
    selectedItem: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      headers: [
        { title: "Class Code", key: "classcode" },
        { title: "Subject", key: "subject" },
        { title: "Day", key: "day" },
        { title: "Time", key: "time" },
        { title: "Grade Level", key: "grade_level" },
        { title: "Section", key: "section" },
        { title: "Strand", key: "strand" },
        { title: "Adviser", key: "adviser" },
      ],
    };
  },

  mounted() {
    console.log('Selected Item:', this.selectedItem);
    // Ensure sectionId is set correctly if needed
    // this.getDocx();
  },

  methods: {
    getDocx() {
      console.log(this.sectionId);
      axios.get(`getSched/${this.sectionId}`).then(res => {
        this.documentlist = res.data.sched.map((sched)=>({
          ...sched,
          adviser: `${sched.faculty.fname} ${sched.faculty.lname}`
        }));
        console.log(this.documentlist);
      }).catch(error => {
        console.error("Error fetching data:", error);
      });
    }
  },
};
</script>

<style lang="scss">
.v-data-table {
  .v-table__wrapper {
    color: var(--dark);
    padding: 1.5rem;

    .v-data-table__th {
      font-size: 17px;
      font-weight: 800;
    }
  }
}
</style>
