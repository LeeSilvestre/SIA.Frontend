<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="displayedStudents"
    :sort-by="[{ key: 'studentId', order: 'asc' }]"
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
        <td style="text-align: center"> 
          <!-- {{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}
          {{ item.extension }} -->
          {{ item.full_name }}
        </td>
        <td style="text-align: center">Incoming</td>
        <td style="text-align: center">{{item.grade_level}}</td>
        <td
          :style="{
            color: getStatusColor(item.enrollment_status),
            textAlign: 'center',
          }"
        >
          {{ item.enrollment_status }}
        </td>
        <td style="text-align: center">
          <v-btn color="success" size="small" @click="openViewDialog(item)"
            >
            <v-icon icon="mdi-check-circle" start></v-icon>
            Enroll</v-btn
          >
        </td>
      </tr>
    </template>

    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>

  <!-- start of enroll dialog -->
  <v-dialog v-model="viewDialog" max-width="1000px">
    <v-card>
      <div style="background-color: var(--dark); color: white;">
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
                v-model="editedItem.adviser_id"
                label="Adviser"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-select
                v-model="editedItem.section"
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
              ></v-select>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.grade_level"
                label="Grade level"
                readonly
              ></v-text-field>
            </v-col>
            <v-col v-if="selectedStudent.grade_level > 10" cols="12" md="3" sm="6">
              <v-select 
                v-model="editedItem.strand"
                :items="['HUMSS', 'STEM', 'HE', 'ABM', 'GAS']"
                label="Strand"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="editedItem.password"
                label="Password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="bg-green"
          color="white"
          variant="text"
          @click="markEnrolled(selectedStudent.student_recno)"
          >Mark as Enrolled</v-btn
        >
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
  <!-- end enroll dialog modal pop -->
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
    headers: [
      { title: "Full Name", align: "center", key: "full_name" },
      { title: "Grade", align: "center", key: "grade_level" },
      { title: "Student Status", align: "center", key: "stud_status" },
      { title: "Enrollment Status", align: "center", key: "enrollment_status" },
      { title: "Actions", align: "center", sortable: false },
    ],
    lname: "",

    // displayedStudents: [
    //     {
    //       student_id: '1', 
    //       full_name:"Jaja",
    //       section:'St. Anne',
    //       date:'',
    //       stud_status:'',
    //       date:'enroll_status',
    //     }
    students: [],
    editedIndex: -1,
    students: [],
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
    fixedPass: "",
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
    itemView: {},
    formTitle: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "ENROLL NEW STUDENT"
        : "Edit Student Information";
    },
    displayedStudents() {
      const searchTerm = this.search.toLowerCase();
      return this.students.filter((student) =>
        Object.values(student).some((value) => value === "Assessed")
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
    "selectedStudent.grade_level"(newGrade) {
      if (["7", "8", "9", "10"].includes(newGrade)) {
        this.editedItem.strand = "N/A";
      } else {
        this.editedItem.strand = "";
      }
    },
  },

  mounted() {
    const year  = new Date().getFullYear()  // returns the current year
    this.initialize();
    // this.fixedPass = selectedStudent.last_name + 'SNA' + year ;
  },

  methods: {
    initialize() {
      axios
        .get("student")
        .then((res) => {
          this.lname = res.data.student.last_name;
          console.log(this.lname);
          this.students = res.data.student.map((student) => ({
            ...student,
            full_name:
              `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim(),
          }));
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    },

    markEnrolled(item){
      console.log(item);
      axios
        .put(`create/${item}`, {
          enrollment_status: "Enrolled",
          adviser_id : this.editedItem.adviser_id,
          password : this.editedItem.password
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            title: "Approved!",
            text: "Your action has been approved.",
            icon: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000); //
        })
        .catch((err) => {
          console.error(err);
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

    viewItem(item) {
      this.itemView = item;
      this.viewDialog = true;
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
      // if (!this.validateForm()) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Please fill in all required fields!',
      //     customClass: {
      //       container: 'sweet-alert-container',
      //     }
      //   });
      //   return;
      // }

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
        return "yellow"; // Set color to yellow if status is 'pending'
      } else if (status === "Enrolled") {
        return "green"; // Set color to green if status is 'enrolled'
      } else {
        return "red"; // Default color
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
