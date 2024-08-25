<template>
  <v-container class="studInfo">
      <v-data-table class="left"
        :search="search"
        :headers="headers"
        :items="combinedList"
        :sort-by="[{ key: 'section', order: 'asc' }]"
        style="cursor: pointer; border:3px solid var(--dark);border-radius: 3px;"
      >
        <!-- toolbar  -->
        <template v-slot:top>
          <v-menu transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-toolbar flat class="pt-2">
                <v-toolbar-title
                  class="text-h6 font-weight-black"
                  style="color: #2f3f64"
                >
                  SCHEDULE
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-select
                  clearable
                  label="Grade Level"
                  v-bind="props"
                  :items="gradeLevels"
                  v-model="selectedGrade"
                  variant="solo-filled"
                  class="mr-2 m-auto"
                ></v-select>
  
                <v-select
                  clearable
                  label="Strand"
                  v-bind="props"
                  :items="strandLevels"
                  v-model="selectedStrand"
                  variant="solo-filled"
                  class="mr-2 m-auto"
                  :disabled="isStrandDisabled"
                ></v-select>
              </v-toolbar>
            </template>
          </v-menu>
        </template>
  
        <template v-slot:item="{ item, props }">
          <tr @click="handleRowClick(item)" v-bind="props">
            <td class="text-center">{{ item.grade_level }}</td>
            <td class="text-center">{{ item.section }}</td>
            <td class="text-center" style="padding: 1rem">{{ item.strand }}</td>
            <td class="text-center">{{ item.adviser.full_name }}</td>
            <td class="text-center"><v-btn text @click="openAddDialog(item)" class="bg-green" color="white">ADD</v-btn></td>
          </tr>
        </template>
      </v-data-table>
      
      <div class="right">
        <!-- toolbar  -->
        <v-data-table
        :headers="headers2"
        :items="documentlist  "
        :search="search"
        :sort-by="[{ key: 'section', order: 'asc' }]"
        style=" border:3px solid var(--dark);border-radius: 3px;"
  
      >
        <template v-slot:top>
          <v-menu transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-toolbar flat class="pt-2">
                <v-toolbar-title
                  class="text-h6 font-weight-black"
                  style="color: #2f3f64"
                >
                  SCHEDULE DETAILS
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <div style="width: 19vw;">
            <v-text-field
              v-model="search"
              class="search mr-3"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
            ></v-text-field>
            
          </div>
              </v-toolbar>
            </template>
          </v-menu>
        </template>
  
      <!-- Data Table -->

        <!-- Table Data -->
         
        <template v-slot:item="{ item }">
          <tr>
            <td style="padding: 1rem">{{ item.classcode }}</td>
            <td>{{ item.class_desc }}</td>
            <td>{{ item.day }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.section }}</td>
            <td>{{ item.adviser }}</td>
          </tr>
        </template>
      </v-data-table>
  </div>
    <!-- <ViewScheduleRight v-if="currentItem" :selectedItem="currentItem" /> -->

    <!-- View Dialog -->
    <!-- <v-dialog v-model="viewDialog" max-width="1000px">
      <v-card>
        <v-card-title style="background-color: var(--dark)">
          <span class="fs-5 fw-bold m-2" style="color: white">VIEW SCHEDULE</span>
        </v-card-title>

        <v-container>
          <ViewSchedule :section-id="currentItem.section" />
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="viewDialog = false" class="bg-red" color="white">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <!-- Add Dialog
    <v-dialog v-model="addDialog" max-width="600px">
      <v-card>
        <v-card-title style="background-color: var(--dark)">
          <span class="fs-5 fw-bold m-2" style="color: white">ADD SCHEDULE</span>
        </v-card-title>
        
        <v-card-text>

          <v-form ref="form">
            Grade Level
             <v-row dense>
              <v-col cols="6">
                <v-select
                  v-model="newItem.grade"
                  :items="gradeLevels"
                  label="Grade Level"
                  class="mr-2 m-auto"
                  readonly
                ></v-select>

              </v-col>
              <v-col cols="6">
                 Room
            <v-text-field
              v-model="newItem.section"
              label="Section"
              readonly
            ></v-text-field>


              </v-col>
             </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-select
                v-model="newItem.subject"
                :items="juniorSubjects"
                item-text="title"
                item-value="value"
                label="Subject"
                class="mr-2 m-auto"
                required
              ></v-select>

              </v-col>
              <v-col cols="6">
                Time
                <v-select
                  v-model="newItem.time"
                  :items="schedtime"
                  label="Time"
                  class="mr-2 m-auto"
                  required
                ></v-select>
              </v-col>
            </v-row>

            Room
            <v-text-field
              v-model="newItem.room "
              label="Room"
              required
            ></v-text-field>

            Faculty
            <v-select
              v-model="newItem.faculty"
              :items="facultyName"
              item-text="title"
              item-value="value"
              label="Faculty"
              class="mr-2 m-auto"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="addNewSchedule" class="bg-green" color="white">Add</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="addDialog = false" class="bg-red" color="white">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
</v-container>

<v-dialog v-model="addDialog" max-width="600px">
      <v-card>
        <v-card-title style="background-color: var(--dark)">
          <span class="fs-5 fw-bold m-2" style="color: white">ADD SCHEDULE</span>
        </v-card-title>
        
        <v-card-text>

          <v-form ref="form">
            <!-- Grade Level -->
             <v-row dense>
              <v-col cols="6">
                <v-select
                  v-model="newItem.grade"
                  :items="gradeLevels"
                  label="Grade Level"
                  class="mr-2 m-auto"
                  readonly
                ></v-select>

              </v-col>
              <v-col cols="6">
                 <!-- Room -->
            <v-text-field
              v-model="newItem.section"
              label="Section"
              readonly
            ></v-text-field>


              </v-col>
             </v-row>
            <v-row dense>
              <v-col cols="6">
                <v-select
                v-model="newItem.subject"
                :items="juniorSubjects"
                item-text="title"
                item-value="value"
                label="Subject"
                class="mr-2 m-auto"
                required
              ></v-select>

              </v-col>
              <v-col cols="6">
                <!-- Time -->
                <v-select
                  v-model="newItem.time"
                  :items="schedtime"
                  label="Time"
                  class="mr-2 m-auto"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <!-- Room -->
            <!-- <v-text-field
              v-model="newItem.room "
              label="Room"
              required
            ></v-text-field> -->

            <!-- Faculty -->
            <v-select
              v-model="newItem.faculty"
              :items="facultyName"
              item-text="title"
              item-value="value"
              label="Faculty"
              class="mr-2 m-auto"
            ></v-select>
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
import ViewScheduleRight from "./ViewScheduleRight.vue";
// import api from "../../services/api";
// import ViewScheduleSHS from "./ViewScheduleSHS.vue";
import axios from "axios";
import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";

export default {
  components: {
    ViewScheduleRight,
  },
  data() {
    return {
      selectedSection: null,
      search: "",
      selectedItem:[],
      juniorList: [],
      seniorList: [],
      headers: [
        { title: "Grade Level", align: "center", key: "grade_level" },
        { title: "Section", align: "center", key: "section" },
        { title: "Strand", key: "strand", align: "center" },
        { title: "Adviser", key: "adviser_id", align: "center" },
      ],
      headers2: [
        { title: "Grade Level", align: "center", key: "grade_level" },
        { title: "Subject", align: "center", key: "class_desc" },
        { title: "Day", align: "center", key: "day" },
        { title: "Time", key: "time", align: "center" },
        { title: "Section", key: "section", align: "center" },
        { title: "Adviser", key: "adviser_id", align: "center" },
      ],
      gradeLevels: [
        { value: "7", title: "Grade 7", text: "Grade 7" },
        { value: "8", title: "Grade 8", text: "Grade 8" },
        { value: "9", title: "Grade 9" },
        { value: "10", title: "Grade 10" },
        { value: "11", title: "Grade 11" },
        { value: "12", title: "Grade 12" },
      ],

      strandLevels: [
        { value: "GAS", title: "GAS" },
        { value: "ABM", title: "ABM" },
        { value: "HE", title: "HE" },
        { value: "HUMSS", title: "HUMSS" },
        { value: "STEM", title: "STEM" },
      ],
      selectedGrade: "",
      selectedStrand: "",
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      schedtime: [
        "7 AM TO 8 AM",
        "8 AM TO 9 AM",
        "9:30 AM TO 10:30 AM",
        "10:30 AM TO 11:30 AM",
        "1 PM TO 2 PM",
        "2 PM TO 3 PM",
        "3 PM TO 4 PM",
      ],
      juniorSubjects: [
        { id: 1, title: "Mathematics", value: "Mathematics" },
        { id: 2, title: "Science", value: "Science" },
        { id: 3, title: "English", value: "English" },
        { id: 4, title: "Filipino", value: "Filipino" },
        { id: 5, title: "Araling Panlipunan", value: "Araling Panlipunan" },
        {
          id: 6,
          title: "Technology and Livelihood Education (TLE)",
          value: "TLE",
        },
        { id: 7, title: "Chirstian Living", value: "CL" },
        {
          id: 8,
          title: "Physical Education (PE)",
          value: "PE",
        },
      ],
      documentlist: [],
      allFaculty: [],
      facultyName: [],
      selectedSTud: [],
      viewDialog: false,
      addDialog: false,
      currentItem: null,
      selectedStrand: "",
      newItem: {
        section: "",
        subject: null,
        grade: "",
        classCode: "",
        day: "",
        time: "",
        room: "",
        faculty: "",
        strand: "",
      },
      // newItem: {
      //   classCode: "",
      //   day: "",
      //   time: "",
      //   room: "",
      //   faculty: ""
      // }
    };
  },
  watch: {
    "newItem.subject"(newSubject) {
      // Filter faculty based on the selected subject
      this.facultyName = this.allFaculty.filter(
        (faculty) => faculty.department === newSubject
      );
    },
  },

  computed: {
    // filteredJuniorList() {
    //   if (!Array.isArray(this.juniorList)) {
    //     console.error("juniorList is not an array");
    //     return [];
    //   }
    //   if (!this.selectedGrade) {
    //     return this.juniorList;
    //   }
    //   return this.juniorList.filter((item) => item.grade_level === this.selectedGrade);
    // },
    // filteredSeniorList() {
    //   console.log("Selected strand:", this.selectedStrand);
    //   console.log(
    //     "Senior List strands:",
    //     this.seniorList.map((item) => item.strand)
    //   );
    //   if (!Array.isArray(this.seniorList)) {
    //     console.error("SeniorList is not an array");
    //     return [];
    //   }
    //   if (!this.selectedStrand) {
    //     return this.seniorList;
    //   }
    //   return this.seniorList.filter(
    //     (item) => item.strand === this.selectedStrand
    //   );
    // },
    combinedList() {
      const filteredJuniorList = this.juniorList.filter((item) => {
        return (
          (!this.selectedGrade || item.grade_level === this.selectedGrade) &&
          (!this.selectedStrand || item.strand === this.selectedStrand)
        );
      });

      const filteredSeniorList = this.seniorList.filter((item) => {
        return (
          (!this.selectedGrade || item.grade_level === this.selectedGrade) &&
          (!this.selectedStrand || item.strand === this.selectedStrand)
        );
      });

      return [...filteredJuniorList, ...filteredSeniorList];
    },
    isStrandDisabled() {
      return ["7", "8", "9", "10"].includes(this.selectedGrade);
    },
    isStrandDisabled() {
      return ["7", "8", "9", "10"].includes(this.selectedGrade);
    }
  },

  mounted() {
    this.getSched();
    this.getFaculty();
    this.getDocx();
  },
  // Disable to test the static data
  //   mounted(){
  //   this.getJuniorData();
  //   },

  methods: {
    async getSched() {
      try {
        const res = await axios.get("getSec");
        const data = res.data.data;
        this.juniorList = data.filter(
          (item) => item.grade_level < 11 && item.grade_level > 6
        );
        this.seniorList = data.filter((item) => item.grade_level >= 11);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    async getFaculty() {
      const res = await axios.get("faculty");
      this.allFaculty = res.data.faculty.map((faculty) => ({
        title: `${faculty.fname} ${faculty.mname} ${faculty.lname} ${faculty.extension}`,
        value: faculty.id,
        department: faculty.department,
      }));
      console.log(this.allFaculty);
    },
    getDocx() {
    },
    resetGrade() {
      this.selectedGrade = ""; // Reset selectedGrade to clear the v-select
    },

    openViewDialog(item) {
      this.currentItem = item;
      this.viewDialog = true;
    },

    handleRowClick(item) {
      console.log(item.section);
      this.selectedSTud = item.section;
      axios.get(`getSched/${this.selectedSTud}`).then(res => {
        this.documentlist = res.data.sched.map((sched)=>({
          ...sched,
          adviser: `${sched.faculty.fname} ${sched.faculty.lname}`
        }));
        console.log(this.documentlist);
      }).catch(error => {
        console.error("Error fetching data:", error);
      });

    },

    openAddDialog(item) {
      console.log(item);
      this.newItem.grade = item.grade_level;
      this.newItem.section = item.section;

      this.addDialog = true;
    },

    addNewSchedule() {
      console.log(this.newItem.subject);
      if (
        this.newItem.subject &&
        this.newItem.grade &&
        this.newItem.time &&
        this.newItem.faculty
      ) {
        let dt = {
          grade_level: this.newItem.grade,
          section: this.newItem.section,
          adviser_id: this.newItem.faculty,
          time: this.newItem.time,
          day: "Weekdays",
        };
        axios
          .post("createSched", dt)
          .then((res) => {
            if (res) {
              console.log(res);
              this.newItem = {
                subject: null,
                classCode: "",
                day: "",
                time: "",
                room: "",
                faculty: "",
              };
              Swal.fire({
                icon: "success",
                title: "Schedule Added",
                text: "The new schedule has been added successfully!",
              });
            }
          })
          .catch((error) => {
            console.log(error.response);
            let err = error.response.data;
            this.newItem = {
              subject: null,
              classCode: "",
              day: "",
              time: "",
              room: "",
              faculty: "",
            };
            Swal.fire({
              icon: "error",
              title: err.Message,
              text: `${err.status} ${error.response.statusText}`,
            });
          });
        this.addDialog = false;
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill out all fields before adding a new schedule.",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.studInfo{
  display: flex;
  gap: 2rem;
  .left{
    flex: 0.5;
  }
  .right {
    flex: 0.5;
  }
}

.v-data-table {
  height: 100%;
  .v-table__wrapper {
    padding: 1.5rem;
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
      padding: 0.5rem;
      border-radius: 5px;
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
