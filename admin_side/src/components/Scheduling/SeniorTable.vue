<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="filteredSeniorList"
    :sort-by="[{ key: 'section', order: 'asc' }]"
  >
    <!-- toolbar  -->
    <template v-slot:top>
      <v-menu transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-toolbar flat class="pt-2">
            <v-toolbar-title class="text-h6 font-weight-black" style="color: #2f3f64">
              SENIOR HIGH SCHEDULE
            </v-toolbar-title>
            
            <v-select
              clearable
              label="Strand"
              v-bind="props"
              :items="strandLevels"
              v-model="selectedStrand"
              variant="solo-filled"
              class="mr-2 m-auto"
            ></v-select>
          </v-toolbar>
        </template>
      </v-menu>
    </template>

    <template v-slot:item="{ item }">
      <tr :key="item.senior_id">
        <td>{{ item.strand }}</td>
        <td style="padding: 1rem">{{ item.section }}</td>
        <td>{{ item.adviser }}</td>
        <td>
          <div class="icon">
            <span @click="openViewDialog(item)" class="view"><v-icon>mdi-eye</v-icon>View</span>
            <span @click="openAddDialog(item)" class="add"><v-icon>mdi-plus-circle</v-icon>Add</span>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>

  <!-- View Schedule Dialog -->
  <v-dialog v-model="viewDialog" max-width="1000px">
    <v-card>
      <v-card-title style="background-color: var(--dark)">
        <span class="fs-5 fw-bold m-2" style="color: white">VIEW SCHEDULE</span>
      </v-card-title>
      <v-container>
        <ViewScheduleSHS />
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="viewDialog = false" class="bg-red" color="white">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Add Schedule Dialog -->
  <v-dialog v-model="addDialog" max-width="600px">
    <v-card>
      <v-card-title style="background-color: var(--dark)">
        <span class="fs-5 fw-bold m-2" style="color: white">ADD SCHEDULE</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <!-- Strand -->
          <v-select
            v-model="newItem.strand"
            :items="strandLevels"
            label="Strand"
            required
          ></v-select>

          <!-- Class Code -->
          <v-text-field
            v-model="newItem.classCode"
            label="Class Code"
            required
          ></v-text-field>

          <v-row dense>
            <!-- Day -->
            <v-col cols="6" sm="">
              <v-select
                v-model="newItem.day"
                :items="daysOfWeek"
                label="Day"
                required
              ></v-select>
            </v-col>

            <!-- Time -->
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="newItem.time"
                label="Time"
                type="time"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Room -->
          <v-text-field
            v-model="newItem.room"
            label="Room"
            required
          ></v-text-field>

          <!-- Faculty -->
          <v-text-field
            v-model="newItem.faculty"
            label="Faculty"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="addNewSchedule" class="bg-green" color="white">Add</v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="addDialog = false" class="bg-red" color="white">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ViewScheduleSHS from "./ViewScheduleSHS.vue";

export default {
  components: {
    ViewScheduleSHS,
  },
  data() {
    return {
      search: "",
      seniorList: [
        {
          senior_id: 1,
          section: "St. Michael",
          adviser: "John Doe",
          strand: "STEM",
        },
        {
          senior_id: 2,
          section: "St. Catherine",
          adviser: "Jane Smith",
          strand: "GAS",
        },
        {
          senior_id: 3,
          section: "St. Joseph",
          adviser: "Robert Brown",
          strand: "HUMMS",
        },
        {
          senior_id: 4,
          section: "St. Francis",
          adviser: "Emily Davis",
          strand: "ABM",
        },
        {
          senior_id: 5,
          section: "St. Michael",
          adviser: "Michael Johnson",
          strand: "TVL",
        },
      ],
      headers: [
        { title: "Strand", key: "strand" },
        { title: "Section", key: "section" },
        { title: "Adviser", key: "adviser" },
        { title: "Schedule", align: "center", sortable: false },
      ],
      strandLevels: [
        { value: "GAS", title: "GAS" },
        { value: "ABM", title: "ABM" },
        { value: "HE", title: "HE" },
        { value: "HUMSS", title: "HUMSS" },
        { value: "STEM", title: "STEM" },
        { value: "TVL", title: "TVL" },
      ],
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      juniorSubjects: [
        { id: 1, title: "Mathematics", subject: "Mathematics" },
        { id: 2, title: "Science", subject: "Science" },
        { id: 3, title: "English", subject: "English" },
        { id: 4, title: "Filipino", subject: "Filipino" },
        { id: 5, title: "Araling Panlipunan", subject: "Araling Panlipunan" },
        {
          id: 6,
          title: "Technology and Livelihood Education (TLE)",
          subject: "Technology and Livelihood Education (TLE)",
        },
        { id: 7, title: "Health Education", subject: "Health Education" },
        { id: 8, title: "Music", subject: "Music" },
        { id: 9, title: "Arts", subject: "Arts" },
        {
          id: 10,
          title: "Physical Education (PE)",
          subject: "Physical Education (PE)",
        },
      ],
      viewDialog: false,
      addDialog: false,
      selectedStrand: "",
      newItem: {
        strand: "",
        classCode: "",
        day: "",
        time: "",
        room: "",
        faculty: ""
      }
    };
  },

  computed: {
    filteredSeniorList() {
      console.log("Selected strand:", this.selectedStrand);
      console.log(
        "Senior List strands:",
        this.seniorList.map((item) => item.strand)
      );
      if (!Array.isArray(this.seniorList)) {
        console.error("SeniorList is not an array");
        return [];
      }
      if (!this.selectedStrand) {
        return this.seniorList;
      }
      return this.seniorList.filter(
        (item) => item.strand === this.selectedStrand
      );
    },
  },

  methods: {
    openViewDialog(item) {
      this.currentItem = item;
      this.viewDialog = true;
    },

    openAddDialog() {
      this.addDialog = true;
    },

    addNewSchedule() {
      if (this.newItem.strand && this.newItem.classCode && this.newItem.day && this.newItem.time && this.newItem.room && this.newItem.faculty) {
        // You would normally send this data to your API to save it
        // For now, we'll just add it to the seniorList array

        this.seniorList.push({
          senior_id: this.seniorList.length + 1,
          section: this.newItem.section,
          adviser: this.newItem.faculty,
          strand: this.newItem.strand,
        });

        Swal.fire({
          icon: "success",
          title: "Schedule Added",
          text: "The new schedule has been added successfully!",
        });

        // Reset the newItem object
        this.newItem = {
          strand: "",
          classCode: "",
          day: "",
          time: "",
          room: "",
          faculty: ""
        };

        this.addDialog = false;
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill out all fields before adding a new schedule.",
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-data-table {
  .v-table__wrapper {
    padding: 1.5rem;

    .v-data-table__th {
      font-size: 17px;
      font-weight: 800;
      text-align: center;
    }
  }
  .icon {
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 0.5rem;

    .view {
      display: flex;
      gap: 0.3rem;
      align-items: center;
      margin-right: 1rem;
      color: white;
      background-color: var(--dark);
      padding: 0.5rem;
      border-radius: 5px;
    }

    .add {
      display: flex;
      gap: 0.3rem;
      align-items: center;
      color: white;
      background-color: green;
      padding: 0.5rem;
      border-radius: 5px;
    }
  }
}
</style>
