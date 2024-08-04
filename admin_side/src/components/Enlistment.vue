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
          >STUDENT ENLISTMENT LIST</v-toolbar-title
        >
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
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ props }">
            <v-btn
              class="mb-2"
              color="primary"
              dark
              v-bind="props"
              prepend-icon="mdi-plus"
            >
              Enlist Student
            </v-btn>
          </template>

          <v-card>
            <div style="background-color: var(--dark)">
              <v-card-title
                ><span class="fs-3 fw-bold m-2" style="color: white">{{
                  formTitle
                }}</span></v-card-title
              >
            </div>
            <v-card-text>
              <v-container>
                <label class="fw-regular fs-4 mb-3">Personal Information</label>
                <v-row dense>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.last_name"
                      label="Last Name"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.first_name"
                      label="First Name"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.middle_name"
                      label="Middle Name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.extension"
                      label="Extension Name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.birth_date"
                      label="Date of Birth dd/mm/yy"
                      type="date"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.sex_at_birth"
                      :items="['Male', 'Female']"
                      label="SEX"
                      :rules="[rules.required]"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.religion"
                      label="Religion"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.houseNumber"
                      label="House Number"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.street"
                      label="Street"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.barangay"
                      label="Barangay"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.city"
                      label="City/Municipality"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.province"
                      label="Province"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.region"
                      :items="[
                        'Region I',
                        'Region II',
                        'Region III',
                        'Region IV-A',
                        'Region IV-B',
                        'Region V',
                        'Region VI',
                        'Region VII',
                        'Region VIII',
                        'Region IX',
                        'Region X',
                        'Region XI',
                        'Region XII',
                        'Region XIII',
                        'BARMM',
                        'CAR',
                      ]"
                      label="Region"
                      :rules="[rules.required]"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.zip_code"
                      label="Zip Code"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-container>
                    <label class="fw-regular fs-4 mb-3"
                      >Contact Information</label
                    >

                    <v-row dense>
                      <v-col cols="12" md="6" sm="6">
                        <v-text-field
                          v-model="editedItem.contact_no"
                          label="Contact no."
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-container>
                    <label class="fw-regular fs-4 mb-3"
                      >Academic Information</label
                    >

                    <v-row dense>
                      <v-col cols="12" md="6" sm="6">
                        <v-select
                          v-model="editedItem.grade_level"
                          :items="['7', '8', '9', '10']"
                          label="Grade Level Applying"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-text-field
                          v-model="editedItem.student_lrn"
                          label="LRN"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>

                  <!-- other info -->
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="bg-green"
                color="bwhite"
                variant="text"
                @click="save"
                >Apply</v-btn
              >
              <v-btn class="bg-red" color="white" variant="text" @click="close"
                >Cancel</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.student_id }}</td>
        <td>{{ item.student_lrn }}</td>
        <td>
          {{ item.last_name }} , {{ item.first_name }} {{ item.middle_name }}
          {{ item.extension }}
        </td>
        <td>{{ item.sex_at_birth }}</td>
        <td>{{ item.grade_level }}</td>
        <td>Incoming</td>
        <!-- <td :style="{ color: getStatusColor(item.enrollment_status) }">{{ item.enrollment_status}}</td> -->
        <td>Pending</td>

        <td>
          <div class="button-container">
            <v-btn
              class="no-gap-button"
              size="small"
              color="primary"
              @click="openViewDialog"
            >
              <v-icon icon="mdi-eye" start></v-icon>
              View
            </v-btn>
            <v-btn
              class="no-gap-button"
              size="small"
              color="success"
              @click="verify"
            >
              <v-icon icon="mdi-check" start></v-icon>
              Verify
            </v-btn>
            <v-btn
              class="no-gap-button"
              size="small"
              color="#D6E200"
              @click="edit"
            >
              <v-icon icon="mdi-pencil" start></v-icon>
              Edit
            </v-btn>
          </div>
          <!-- <v-icon class="me-2" size="small" style="color: #2F3F64" @click="openViewDialog(item)">mdi-eye</v-icon> -->
          <!-- Archive Icon -->
          <!-- <v-icon class="me-2 " size="small" color="warning" @click="archiveItem(item)">mdi-archive</v-icon> -->
        </td>
      </tr>
    </template>

    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>

  <!-- view user status modal pop -->
  <v-dialog v-model="viewDialog" max-width="800">
    <v-card>
      <div style="background-color: var(--dark); color: white">
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
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.birth_place"
                label="Birthplace"
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
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                v-model="selectedStudent.street"
                label="Address"
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
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
      { title: "Student No.", align: "start", key: "student_id" },
      { title: "Student Lrn", align: "start", key: "lrn" },
      { title: "Full Name", align: "start", key: "full_name" },
      { title: "Gender", align: "start", key: "grade_lvl" },
      { title: "Grade Level", align: "start", key: "grade_lvl" },
      { title: "Student Status", align: "start", key: "status" },
      { title: "Status", align: "start", key: "status" },
      { title: "Actions", align: "start", sortable: false },
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
    rules: {
      required: (value) => !!value || "Field is required", //required fields
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "ENLIST STUDENT"
        : "Edit Student Information";
    },
    displayedStudents() {
      const searchTerm = this.search.toLowerCase();
      return this.students.filter((student) =>
        Object.values(student).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm)
        )
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
      }
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get("student")
        .then((res) => {
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

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    },
    close() {
      this.dialog = false;
      this.selectedFile = null;
    },
    save() {
      // Handle the save action, including the selected file if needed
      console.log(this.selectedFile);
      this.dialog = false;
      this.selectedFile = null;
    },

    openViewDialog(item) {
      this.selectedStudent = item;
      this.viewDialog = true;
    },

    closeViewDialog() {
      console.log("selectedStudent:", this.selectedStudent); // Check the value of selectedStudent
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

    save() {
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
    applyChanges() {
      // Handle the action to apply changes here
      console.log("Applying changes:", this.selectedStudent);
      this.originalStudent = { ...this.selectedStudent }; // Update the original data after applying changes
      this.viewDialog = false; // Close the view dialog
    },

    edit() {
      // Set the fields to be editable
      this.$nextTick(() => {
        const textFields = this.$el.querySelectorAll(".v-text-field");
        textFields.forEach((textField) => {
          const input = textField.querySelector("input");
          if (input) {
            input.removeAttribute("readonly");
          }
        });
      });
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
.button-container {
  display: flex;
  gap: 7px;
}
</style>
