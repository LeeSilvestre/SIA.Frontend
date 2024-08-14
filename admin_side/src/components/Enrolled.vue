<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="displayedStudents"
    :sort-by="[{ key: 'studentId', order: 'asc' }]"
    class="table-with-bold-headers"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          class="text-h6 font-weight-black"
          style="color: #2f3f64"
          >STUDENT MASTER LIST</v-toolbar-title
        >

        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field
          v-model="search"
          class="w-auto mr-1"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>

        <!-- create new popup modal -->
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td class="text-center">{{ item.student_id }}</td>
        <td class="text-center">
          {{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}
          {{ item.extension }}
        </td>
        <td class="text-center">{{ item.section }}</td>
        <td class="text-center">{{ item.enrollment_date }}</td>
        <td class="text-center">Incoming</td>
        <td
          :style="{ color: getStatusColor(item.enrollment_status) }"
          class="text-center"
        >
          {{ item.enrollment_status }}
        </td>
        <td class="text-center">
          <v-btn class="ma-2" color="primary" @click="openViewDialog(item)" size="small">
            <v-icon icon="mdi-eye" start></v-icon>
            View
          </v-btn>
          <!-- <v-icon class="me-2" size="small" color="warning" @click="archiveItem(item)">mdi-archive</v-icon> -->
        </td>
      </tr>
    </template>

    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>

  <!-- view user status modal pop -->
  <!-- <v-dialog v-model="viewDialog" max-width="800px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5 fw-bold m-1" style="color: #2F3F64">
          STUDENT DETAILS
        </span>
        <v-btn icon @click="closeViewDialog" class="close-button">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">Student ID: </v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.student_id }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">Full Name: </v-list-item-title>
                  <v-list-item-subtitle>{{ students.full_name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">Contact Number: </v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.contact_no }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">Birthplace: </v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.birth_place }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">Sex: </v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.sex_at_birth }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">Religion: </v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.religion }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <hr>

            <v-row>
              <v-col cols="12" sm="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-subtitle-1">Address: </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ selectedStudent.street }} {{ selectedStudent.barangay }},
                      {{ selectedStudent.city }} {{ selectedStudent.province }}
                      {{ selectedStudent.zip_code }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>

          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog> -->

  <!-- <v-dialog v-model="viewDialog" max-width="800">
    <v-card>
      <div class="dialog-header">
        <v-card-title class="dialog-title fs-3 font-weight-black">
          STUDENT INFORMATION
        </v-card-title>
      </div>

      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.student_id"
                label="Student ID"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.student_lrn"
                label="LRN"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                v-model="selectedStudent.full_name"
                label="Full Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.contact_no"
                label="Contact Number"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.sex_at_birth"
                label="Sex"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                v-model="selectedStudent.birth_place"
                label="Birthplace"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                v-model="selectedStudent.street"
                label="Address"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.religion"
                label="Religion"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="bg-red"
          color="white"
          variant="text"
          @click="closeViewDialog"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog> -->

  <v-dialog v-model="viewDialog" max-width="1000px">
    <v-card>
      <div style="background-color: var(--dark); color: white">
        <v-card-title class="dialog-title fs-3 font-weight-black">
          STUDENT INFORMATION
        </v-card-title>
      </div>
      <v-card-text>
        <label class="fw-regular fs-5">Personal Information</label>
        <v-container>
          <v-row dense>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.student_lrn"
                label="LRN"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.last_name"
                label="Last Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.first_name"
                label="First Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.middle_name"
                label="Middle Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.contact_no"
                label="Contact no."
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.birth_date"
                label="Date of Birth dd/mm/yy"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.sex_at_birth"
                label="Sex"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.religion"
                label="Religion"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.region"
                label="Region"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.province"
                label="Province"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.city"
                label="City"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.barangay"
                label="Barangay"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.street"
                label="Street"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.houseNumber"
                label="House Number"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.zip_code"
                label="Zip Code"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <hr />
          <label class="fw-regular mb-3 fs-5">Academic Information</label>
          <v-row>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.adviser_id"
                label="Adviser"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-select
                v-model="selectedStudent.section"
                :items="[
                  'St. Anne',
                  'St. Bernadette',
                  'St. Charles',
                  'St. Elizabeth',
                  'St. Faustina',
                  'St. George',
                  'St. Pedro Calungsod',
                  'St. Lorenzo Ruiz',
                  'St. Gabriel',
                  'St. Michael',
                  'St. Raphael',
                  'St. Patrick',
                  'St. Scholastica',
                  'St. Homobonus',
                  'St. Helena',
                  'St. Louise',
                  'St. Stephen',
                  'St. Vincent',
                  'St. Catherine',
                  'St. Albertus',
                  'St. Benedict',
                  'St. Maximillian',
                  'St. Peter',
                  'St. Thomas',
                  'St. Isidore',
                  'St. Joseph',
                ]"
                label="Section"
                readonly
              ></v-select>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.grade_level"
                label="Grade level"
                readonly
              ></v-text-field>
            </v-col>
            <v-col
              v-if="selectedStudent.grade_level > 10"
              cols="12"
              md="3"
              sm="6"
            >
              <v-select
                v-model="selectedStudent.strand"
                :items="['HUMSS', 'STEM', 'HE', 'ABM', 'GAS']"
                label="Strand"
                readonly
              ></v-select>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.password"
                label="Password"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <hr />
          <label class="fw-regular mb-3 fs-5">Document Information</label>
          <v-row>
            <v-col cols="12" md="12" sm="6">
              <v-row align="center">
                <v-col>
                  <v-file-input
                    v-model="selectedStudent.psa"
                    label="PSA/Birth Certificate"
                    counter
                    multiple
                    show-size
                    readonly
                  ></v-file-input>
                </v-col>
                <v-col>
                  <!-- <v-icon @click="openViewFile">mdi-eye</v-icon> -->
                  <v-icon @click="openViewFile(BGImage)">mdi-eye</v-icon>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-row align="center">
                <v-col>
                  <v-file-input
                    v-model="selectedStudent.goodMoral"
                    label="Good Moral"
                    counter
                    multiple
                    show-size
                    readonly
                  ></v-file-input>
                </v-col>
                <v-col>
                  <!-- <v-icon @click="openViewFile">mdi-eye</v-icon> -->
                  <v-icon @click="openViewFile(BGImage)">mdi-eye</v-icon>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-row align="center">
                <v-col>
                  <v-file-input
                    v-model="selectedStudent.tor"
                    label="Form 137/Transcript of Record"
                    counter
                    multiple
                    show-size
                    readonly
                  ></v-file-input>
                </v-col>
                <v-col>
                  <!-- <v-icon @click="openViewFile">mdi-eye</v-icon> -->
                  <v-icon @click="openViewFile(BGImage)">mdi-eye</v-icon>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- View File Dialog -->
      <v-dialog v-model="viewFileDialog" max-width="800px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center" style="background-color: var(--dark); color: white">
        <span class="fs-5 font-weight-black">DOCUMENT</span>
        <v-btn
          icon
          @click="closeViewFile"
          class="red--text"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-img :src="fileUrl" height="600px" contain></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="bg-red"
          color="white"
          variant="text"
          @click="closeViewDialog"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- end view user status modal pop -->
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    viewDialog: false,
    selectedStudent: null,
    selectedFile: null,
    status: "",
    headers: [
      { title: "Student Number", align: "center", key: "student_id" },
      { title: "Full Name", align: "center", key: "full_name" },
      { title: "Section", align: "center", key: "section" },
      { title: "Date Enrolled", align: "center", key: "date" },
      { title: "Student Status", align: "center", key: "status" },
      { title: "Enrollment Status", align: "center", key: "status" },
      { title: "Actions", align: "center", sortable: false },
    ],

    students: [],
    editedIndex: -1,
    editedItem: {
      student_id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      extension: "",
      contact_no: "",
      birth_date: "",
      sex_at_birth: "",
      religion: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
      street: "",
      zip_code: "",
      sy: "",
      section: "",
    },
    defaultItem: {
      student_id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      extension: "",
      contact_no: "",
      birth_date: "",
      birth_place: "",
      sex_at_birth: "",
      religion: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
      street: "",
      zip_code: "",
      year: "",
      section: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add Student"
        : "Edit Student Information";
    },
    displayedStudents() {
      const searchTerm = this.search.toLowerCase();
      return this.students.filter((student) =>
        Object.values(student).some((value) => value === "Enrolled")
      );
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  watch: {
    "editedItem.grade_level"(newGrade) {
      if (["7", "8", "9", "10"].includes(newGrade)) {
        this.editedItem.strand = "N/A";
      } else {
        this.editedItem.strand = "";
      }
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("student").then((res) => {
        let tmp = res.data;
        this.students = tmp.student;
        console.log(this.students);

        // Format full name and adjust strand property
        this.students.forEach((student) => {
          // Format full name
          student.full_name =
            `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim();

          // Check grade level and adjust strand property
          if (student.grade_level <= 10) {
            delete student.strand;
          }
        });
      });
    },

    watch: {
      "editedItem.year"(newYear) {
        const pattern = /^\d{4}-\d{4}$/;
        if (pattern.test(newYear)) {
          const years = newYear.split("-");
          const startYear = parseInt(years[0]);
          const endYear = parseInt(years[1]);

          if (endYear - startYear === 1) {
            this.editedItem.year = `${startYear + 1}-${endYear + 1}`;
          }
        }
      },
    },

    // triggerFileInput() {
    //   this.$refs.fileInput.click();
    // },

    // handleFileUpload(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     this.selectedFile = file;
    //   }
    // },
    close() {
      this.dialog = false;
      this.selectedFile = null;
    },
    save() {
      console.log(this.selectedFile);
      this.dialog = false;
      this.selectedFile = null;
    },

    openViewDialog(item) {
      this.selectedStudent = item;
      this.viewDialog = true;
    },

    closeViewDialog() {
      console.log("selectedStudent:", this.selectedStudent);
      this.viewDialog = false;
      // Clear the selected student data
    },

    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    archiveItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.students.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    prependCountryCode() {
      if (!this.editedItem.guardian_mobileno.startsWith("+63")) {
        this.editedItem.guardian_mobileno = "+63";
      }
    },

    validateForm() {
      for (const key in this.editedItem) {
        if (this.editedItem.hasOwnProperty(key)) {
          if (this.editedItem[key] === "" || this.editedItem[key] === null) {
            return false;
          }
        }
      }
      return true;
    },

    save() {
      if (!this.validateForm()) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all required fields!",
          customClass: {
            container: "sweet-alert-container",
          },
        });
        return;
      }

      console.log(this.editedItem);
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
      } else {
        let tmp = this.editedItem;
        this.students.push(this.editedItem);
        tmp.image = this.selectedFile;
        // console.log(this.tmp);
        axios
          .post("student", tmp)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      this.close();
    },

    goView() {
      this.$router.push("/viewdetails");
    },

    getStatusColor(status) {
      if (status === "Verifying") {
        return "orange"; // Set color to yellow if status is 'pending'
      } else if (status === "Enrolled") {
        return "green"; // Set color to green if status is 'enrolled'
      } else {
        return "red"; // Default color
      }
    },
    getRouterLink(status) {
      if (status === "Verifying") {
        return { name: "/Veryfying" }; // Replace 'VerifiedRoute' with your route name
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss">
.v-data-table {
  height: 100%;
}

.student-popup {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.v-card-title {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.v-list-item-title {
  font-weight: bold;
}

.v-list-item-subtitle {
  font-size: 1rem;
  color: #2f3f64;
}

.close-button:hover {
  color: red;
}

.sweet-alert-container {
  z-index: 9999 !important;
}

.centered-text {
  text-align: center;
}
.dialog-header {
  background-color: var(--dark);
}
.dialog-title {
  color: white;
  position: relative;
  margin: 0;
}
.close-button {
  position: absolute;
  top: 0;
  right: 0;
}
.info-box {
  margin-top: 1rem;
  justify-content: space-between;
  margin-bottom: 10px;
}
.info-title {
  font-weight: bold;
  margin-right: 10px;
  font-size: 1rem;
}
.info-value {
  flex-grow: 1;
  text-align: right;
  font-size: 1rem;
}
.fs-3 {
  font-size: 1.75rem;
}
.fs-4 {
  font-size: 1.5rem;
}
.fw-bold {
  font-weight: bold;
}

.personal-title {
  margin-bottom: 1rem;
  margin-top: 1rem;
  color: var(--dark);
}
</style>
