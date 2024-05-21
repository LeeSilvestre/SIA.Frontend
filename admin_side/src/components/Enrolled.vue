<template>
  <v-data-table :search="search" 
  :headers="headers" 
  :items="displayedStudents"
  :sort-by="[{ key: 'studentId', order: 'asc' }]"
  class="table-with-bold-headers">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-h6 font-weight-black " style="color: #2F3F64">STUDENT MASTER LIST</v-toolbar-title>

        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field v-model="search" class="w-auto mr-1 " density="compact" label="Search"
          prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line></v-text-field>

        <!-- create new popup modal -->
        <!-- <v-dialog v-model="dialog" max-width="1000px">

          <template v-slot:activator="{ props }">
            <v-btn class="mb-2 rounded-l	" color="primary" dark v-bind="props" prepend-icon="mdi-plus">Enroll
              Student</v-btn>
          </template>


          <v-card>
            <v-card-title><span class="text-h5 fw-bold m-2" style="color: #2F3F64;">{{ formTitle }}</span></v-card-title>
            <v-card-text>
              <label class="fw-light">PERSONAL INFORMATION</label>
              <v-container>

                <v-row dense>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.student_lrn" label="LRN" required maxlength="10"
                      @input="validateNumberInput"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">

                    <v-text-field v-model="editedItem.last_name" label="Last Name" required
                      pattern="[A-Za-z .'-]+"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">

                    <v-text-field v-model="editedItem.first_name" label="First Name" required
                      pattern="[A-Za-z .'-]+"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">

                    <v-text-field v-model="editedItem.middle_name" label="Middle Name" required
                      pattern="[A-Za-z .'-]+"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.contact_no" label="Contact no." required
                      pattern="[0-9]+"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.birth_date" label="Date of Birth dd/mm/yy" type="date"
                      required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select v-model="editedItem.sex_at_birth" :items="['Male', 'Female']" label="SEX"
                      required></v-select>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.religion" label="Religion" required
                      pattern="[A-Za-z .'-]+"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select v-model="editedItem.region"
                      :items="['Region I', 'Region II', 'Region III', 'Region IV-A', 'Region IV-B', 'Region V', 'Region VI', 'Region VII', 'Region VIII', 'Region IX', 'Region X', 'Region XI', 'Region XII', 'Region XIII', 'BARMM', 'CAR']"
                      label="Region" required></v-select>

                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.province" label="Province" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.city" label="City" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.barangay" label="Barangay" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.street" label="Street" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.houseNumber" label="House Number" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.zip_code" label="Zip Code" required></v-text-field>
                  </v-col>


                </v-row>
                <hr>
                <label class="fw-light mb-3">ACADEMIC INFORMATION</label>
                <v-row>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.adviser_id" label="Adviser" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select v-model="editedItem.section" :items="['St. Anne', 'St. Bernadette', 'St. Charles', 'St. Elizabeth', 'St. Faustina',
                      'St. George', 'St. Pedro Calungsod', 'St. Lorenzo Ruiz', 'St. Gabriel', 'St. Michael',
                      'St. Raphael', 'St. Patrick', 'St. Scholastica', 'St. Homobonus', 'St. Helena', 'St. Louise',
                      'St. Stephen', 'St. Vincent', 'St. Catherine', 'St. Albertus', 'St. Benedict', 'St. Maximillian',
                      'St. Peter', 'St. Thomas', 'St. Isidore', 'St. Joseph'
                    ]" label="Section" required></v-select>

                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-select v-model="editedItem.grade_level" :items="['7', '8', '9', '10', '11', '12',]" label="Grade"
                      required></v-select>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-select v-model="editedItem.strand" :items="['HUMSS', 'STEM', 'HE', 'ABM', 'GAS']" label="Strand"
                      required :disabled="['7', '8', '9', '10'].includes(editedItem.grade_level)"></v-select>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.year" label="S.Y." required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.guardian" label="Guardian Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.guardian_mobileno" label="Guardian Mobile #" required
                      pattern="[0-9]+" @input="prependCountryCode"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field v-model="editedItem.password" label="Password" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-btn color="primary" @click="triggerFileInput">Attach File</v-btn>
              <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" />
              <v-chip v-if="selectedFile" class="ma-2" color="primary" dark>
                {{ selectedFile.name }}
              </v-chip>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" variant="text" @click="close">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->


      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">

      <tr>
        <td class="start-text">{{ item.student_id }}</td>
        <td class="centered-text">{{ item.first_name }} {{ item.middle_name }} {{ item.last_name }} {{ item.extension }}</td>
        <td class="start-text">{{ item.section }}</td>
        <td class="centered-text">{{ item.enrollment_date }}</td>
        <td class="centered-text">Incoming</td>
        <td :style="{ color: getStatusColor(item.enrollment_status) }" class="centered-text">{{ item.enrollment_status }}</td>
        <td class="centered-text">
          <v-icon class="me-2" size="small" style="color: #2F3F64" @click="openViewDialog(item)">mdi-eye</v-icon>
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

  <v-dialog v-model="viewDialog" max-width="800">
    <v-card>
      <div class="dialog-header pt-3 pb-3 pl-5 pr-4">
        <v-card-title class="dialog-title fs-3 font-weight-black">
          STUDENT INFORMATION
          <v-btn icon @click="closeViewDialog" class="close-button">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </div>

      <v-card-text>
        <div class="d-flex mt-2 p-1">
          <v-card class="right-section w-100">
            <v-card-text>
              <div class="personal-info">
                <div class=" personal-title" >
                <v-title class="fs-4 fw-bold">PERSONAL INFORMATION</v-title>
              </div>
                <div class="info-box">
                  <strong class="info-title">STUDENT ID: </strong>
                  <span class="info-value">{{ selectedStudent.student_id }}</span>
                </div>
                <div class="info-box">
                  <strong class="info-title">Name: </strong>
                  <span class="info-value">{{ selectedStudent.full_name }}</span>
                </div>
                <div class="info-box">
                  <strong class="info-title">LRN: </strong>
                  <span class="info-value">{{ selectedStudent.student_lrn }}</span>
                </div>
                <div class="info-box">
                  <strong class="info-title">BIRTHDATE: </strong>
                  <span class="info-value">{{ selectedStudent.birth_date }}</span>
                </div>
                <div class="info-box">
                  <strong class="info-title">SEX: </strong>
                  <span class="info-value">{{ selectedStudent.sex_at_birth }}</span>
                </div>
                <div class="info-box">
                  <strong class="info-title">ADDRESS: </strong>
                  <span class="info-value">{{ selectedStudent.street }} {{ selectedStudent.barangay }}, {{ selectedStudent.city }} {{ selectedStudent.province }} {{ selectedStudent.zip_code }}</span>
                </div>
                <div class="info-box">
                  <strong class="info-title">GUARDIAN NAME: </strong>
                  <span class="info-value">{{ selectedStudent.guardian }}</span>
                </div>
                <div class="info-box">
                  <strong class="info-title">GUARDIAN CONTACT NUMBER: </strong>
                  <span class="info-value">{{ selectedStudent.guardian_mobileno }}</span>
                </div>

                <div class=" personal-title">
                <v-title class="fs-4 fw-bold">ACADEMIC INFORMATION</v-title>
              </div>
                <div class="info-box">
                  <strong class="info-title">GRADE LEVEL: </strong>
                  <span class="info-value">{{ selectedStudent.grade_level }}</span>
                </div>
                <div class="info-box">
                  <strong class="info-title">SECTION: </strong>
                  <span class="info-value">{{ selectedStudent.section }}</span>
                </div>
                <div class="info-box">
                  <strong class="info-title">REASON: </strong>
                  <span class="info-value">{{ selectedStudent.reason }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- end view user status modal pop -->
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    viewDialog: false,
    selectedStudent: null,
    selectedFile: null,
    status: '',
    headers: [
      { title: 'Student Number', align: 'start', key: 'student_id' },
      { title: 'Full Name', align: 'center', key: 'full_name' },
      { title: 'Section', align: 'center', key: 'section' },
      { title: 'Date Enrolled', align: 'center', key: 'date' },
      { title: 'Student Status', align: 'center', key: 'status' },
      { title: 'Enrollment Status', align: 'center', key: 'status' },
      { title: 'Actions', align: 'center', sortable: false },
    ],

    students: [],
    editedIndex: -1,
    editedItem: {
      student_id: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      extension: '',
      contact_no: '',
      birth_date: '',
      sex_at_birth: '',
      religion: '',
      region: '',
      province: '',
      city: '',
      barangay: '',
      street: '',
      zip_code: '',
      sy: '',
      section: '',
    },
    defaultItem: {
      student_id: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      extension: '',
      contact_no: '',
      birth_date: '',
      birth_place: '',
      sex_at_birth: '',
      religion: '',
      region: '',
      province: '',
      city: '',
      barangay: '',
      street: '',
      zip_code: '',
      year: '',
      section: '',

    },

  }),

  computed: {
  formTitle() {
    return this.editedIndex === -1 ? 'Add Student' : 'Edit Student Information';
  },
  displayedStudents() {
    const searchTerm = this.search.toLowerCase();
    return this.students.filter(student =>
      Object.values(student).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm)
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
    'editedItem.grade_level'(newGrade) {
      if (['7', '8', '9', '10'].includes(newGrade)) {
        this.editedItem.strand = 'N/A';
      } else {

        this.editedItem.strand = ''; 
      }
    }
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get('student').then(res => {
        let tmp = res.data;
        this.students = tmp.student;
        console.log(this.students);

        // Format full name and adjust strand property
        this.students.forEach(student => {
          // Format full name
          student.full_name = `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim();

          // Check grade level and adjust strand property
          if (student.grade_level <= 10) {
            delete student.strand;
          }
        });
      });
    },

    watch: {
      'editedItem.year'(newYear) {
        const pattern = /^\d{4}-\d{4}$/;
        if (pattern.test(newYear)) {
          const years = newYear.split('-');
          const startYear = parseInt(years[0]);
          const endYear = parseInt(years[1]);

          if (endYear - startYear === 1) {
            this.editedItem.year = `${startYear + 1}-${endYear + 1}`;
          }
        }
      }
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
      if (!this.editedItem.guardian_mobileno.startsWith('+63')) {
        this.editedItem.guardian_mobileno = '+63';
      }
    },

    validateForm() {
      for (const key in this.editedItem) {
        if (this.editedItem.hasOwnProperty(key)) {
          if (this.editedItem[key] === '' || this.editedItem[key] === null) {
            return false; 
          }
        }
      }
      return true; 
    },

    save() {
      if (!this.validateForm()) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all required fields!',
          customClass: {
            container: 'sweet-alert-container',
          }
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
        axios.post('student', tmp).then(res => {
          console.log(res);
        }).catch(error => {
          console.error(error);
        });
      }
      this.close();
    },

    goView() {
      this.$router.push('/viewdetails');
    },

getStatusColor(status) {
      if (status === 'Verifying') {
        return 'orange'; // Set color to yellow if status is 'pending'
      } else if (status === 'Enrolled') {
        return 'green'; // Set color to green if status is 'enrolled'
      } else {
        return 'red'; // Default color
      }
    },
    getRouterLink(status) {
      if (status === 'Verifying') {
        return { name: '/Veryfying' }; // Replace 'VerifiedRoute' with your route name
      } else {
        return null;
      }
    }
  }
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
  color: #2F3F64;
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
