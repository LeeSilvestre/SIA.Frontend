<template>
  <v-container>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="documentlist"
      :sort-by="[{ key: 'items_name', order: 'asc' }]"
    >
      <!-- Toolbar -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            class="text-h6 font-weight-black"
            style="color: #2f3f64"
          >
            Schedule Details
          </v-toolbar-title>
          <v-text-field
            v-model="search"
            class="w-auto mr-4"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-toolbar>
      </template>

      <!-- Table Data -->
      <template v-slot:item="{ item, index }">
        <tr >
          <td style="padding: 1rem">{{ index + 1 }}</td>
          <td>{{ item.classcode }}</td>
          <td>{{ item.class_desc }}</td>
          <td>{{ item.day }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.section }}</td>
          <td>{{ item.adviser }}</td>

          <!-- Add other columns as needed -->
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    sectionId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      search: "",
      documentlist: [],
      headers: [
        { title: "#", key: "index" },
        { title: "Class Code", key: "classcode" },
        { title: "Class Description", key: "class_desc" },
        { title: "Day", key: "day" },
        { title: "Time", key: "time" },
        { title: "Section", key: "section" },
        { title: "Faculty", key: "faculty" },
      ],
    };
  },

  mounted() {
    this.getDocx();
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
