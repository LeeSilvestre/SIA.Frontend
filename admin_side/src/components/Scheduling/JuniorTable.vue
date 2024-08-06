<template>
  <v-container>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="filteredJuniorList"
      :sort-by="[{ key: 'section', order: 'asc' }]"
    >
      <!-- toolbar  -->
      <template v-slot:top>
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-toolbar flat class="pt-2">
              <v-toolbar-title
                class="text-h6 font-weight-black"
                style="color: #2f3f64"
                >JUNIOR HIGH SCHEDULE</v-toolbar-title
              >
              
              <v-select
                clearable
                label="Grade Level"
                v-bind="props"
                :items="gradeLevels"
                v-model="selectedGrade"
                variant="solo-filled"
                class="mr-2 m-auto"
              ></v-select>
            </v-toolbar>
          </template>
        </v-menu>
      </template>

      <template v-slot:item="{ item }">
        <tr :key="item.junior_id">
          <td>{{ item.grade }}</td>
          <td style="padding: 1rem">{{ item.section }}</td>
          <td>{{ item.adviser }}</td>
          <td>
            <div class="icon">
              <span @click="openViewDialog(item)" class="view"
                ><v-icon>mdi-eye</v-icon>View</span
              >
              <span @click="openAddDialog(item)" class="add" color="success"
                ><v-icon>mdi-plus-circle</v-icon>Add</span
              >
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- View Dialog -->
    <v-dialog v-model="viewDialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">View Schedule</span>
        </v-card-title>

        <v-container>
          <ViewSchedule />
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="viewDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Dialog -->
    <v-dialog v-model="addDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Schedule</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="newItem.subject"
            :items="juniorSubjects"
            label="Subject"
            variant="solo-filled"
            class="mr-2 m-auto"
          ></v-select>
          <!-- Form for adding details -->
          <v-form ref="form">
            <!-- Class Code -->
            <v-text-field
              v-model="newItem.classCode"
              label="Class Code"
              required
            ></v-text-field>

            <v-row dense>
              <v-col cols="6" sm="">
                <v-select
                  v-model="newItem.day"
                  :items="daysOfWeek"
                  label="Day"
                  required
                ></v-select>
              </v-col>
              <!-- Day -->

              <v-col cols="6" sm="6">
                <!-- Time -->
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
          <v-btn color="blue darken-1" text @click="addNewSchedule">Add</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="addDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ViewSchedule from "./ViewSchedule.vue";
// import api from "../../services/api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
  components: {
    ViewSchedule,
  },
  data() {
    return {
      search: "",
      juniorList: [
        {
          junior_id: 1,
          section: "St. George",
          adviser: "Denise Lou Punzalan",
          grade: "Grade 7",
        },
        {
          junior_id: 2,
          section: "St. Anne",
          adviser: "Rachel Gomez",
          grade: "Grade 8",
        },
        {
          junior_id: 3,
          section: "St. Patrick",
          adviser: "Michael Smith",
          grade: "Grade 7",
        },
        {
          junior_id: 4,
          section: "St. Teresa",
          adviser: "Anna Johnson",
          grade: "Grade 9",
        },
        {
          junior_id: 5,
          section: "St. Jude",
          adviser: "James Brown",
          grade: "Grade 8",
        },
      ],
      headers: [
        { title: "Grade", key: "grade" },
        { title: "Section", key: "section" },
        { title: "Adviser", key: "adviser" },
        { title: "Schedule", align: "center", sortable: false },
      ],
      gradeLevels: [
        { value: "Grade 7", title: "Grade 7", text: "Grade 7" },
        { value: "Grade 8", title: "Grade 8", text: "Grade 8" },
        { value: "Grade 9", title: "Grade 9" },
        { value: "Grade 10", title: "Grade 10" },
      ],
      selectedGrade: "",
      juniorData: {
        junior_id: null,
        section: "",
        adviser: "",
        grade: "",
      },
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
      currentItem: {},
      newItem: {
        subject: null,
        classCode: "",
        classDescription: "",
        day: "",
        time: "",
        section: "",
        room: "",
        faculty: "",
      },
    };
  },

  computed: {
    filteredJuniorList() {
      console.log("Selected Grade:", this.selectedGrade);
      console.log(
        "Junior List Grades:",
        this.juniorList.map((item) => item.grade)
      );
      if (!Array.isArray(this.juniorList)) {
        console.error("juniorList is not an array");
        return [];
      }
      if (!this.selectedGrade) {
        return this.juniorList;
      }
      return this.juniorList.filter(
        (item) => item.grade === this.selectedGrade
      );
    },
  },

  // Disable to test the static data
  //   mounted(){
  //   this.getJuniorData();
  //   },

  methods: {
    async getJuniorData() {
      try {
        const response = await api.get("/student");
        this.juniorList = response.data;
        console.log(this.juniorList);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },

    resetGrade() {
      this.selectedGrade = ""; // Reset selectedGrade to clear the v-select
    },

    openViewDialog(item) {
      this.currentItem = item;
      this.viewDialog = true;
    },

    openAddDialog() {
      this.addDialog = true;
    },
    addNewSchedule() {
      // Here, you would add logic to handle the new schedule addition
      // For now, we will just close the dialog and clear newItem

      this.addDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-data-table {
  height: 100%;
  .v-table__wrapper {
    padding: 1.5rem;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .v-data-table__th {
      font-size: 17px;
      font-weight: 800;
      text-align: center;
      color: white;
      padding: 1rem;
    }

    .v-data-table__td {
      text-align: center;
      padding: 1rem;
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
      margin-left: 1rem;
    }

    .add:hover {
      background-color: darkgreen;
    }
  }
}

.v-toolbar {
  // background-color: #007bff;
  color: white;

  .v-select {
    color: white;
    border-color: white;

    .v-input__control {
      color: white;

      .v-input__slot {
        color: white;
      }
    }
  }

  .v-btn {
    color: white;
  }

}

.v-dialog {
  .v-card {
    border-radius: 10px;
  }
}

.v-card-title {
  background-color: #007bff;
  color: white;
  padding: 1rem;
}

.v-card-actions {
  padding: 1rem;

  .v-btn {
    color: #007bff;
  }
}
</style>
