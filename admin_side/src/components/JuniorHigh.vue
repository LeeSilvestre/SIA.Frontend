<template>
  <v-data-table :search="search" :headers="headers" :items="displayedStudents"
    :sort-by="[{ key: 'studentId', order: 'asc' }]">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-h6 font-weight-black" style="color: #2F3F64">JUNIOR HIGH MASTER
          LIST</v-toolbar-title>
        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field v-model="search" class="w-20 mr-16 " density="compact" label="Search"
          prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line></v-text-field>


      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.student_id }}</td>
        <td>{{ item.first_name }} {{ item.middle_name }} {{ item.last_name }} {{ item.extension }}</td>
        <td>{{ item.student_lrn }}</td>
        <td>{{ item.grade_level }}</td>
        <td>
          <!-- <v-icon class="me-2" size="small" style="color: #2F3F64" @click="editItem(item)">mdi-pencil</v-icon> -->
          <v-icon size="small" style="color: #2F3F64; margin: 0.5rem;" @click="openViewDialog(item)">mdi-eye</v-icon>
        </td>
      </tr>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>

  <v-dialog v-model="viewDialog" max-width="800">
    <v-card>
      <div class="pt-3 pb-3 pl-5 pr-4" style="background-color: var(--dark)">
        <v-card-title class="fs-3 font-weight-black" style="color: white; position: relative; margin: 0;">
          STUDENT DETAILS
          <v-btn icon @click="closeViewDialog" class="close-button " style="position: absolute; top: 0; right: 0;">
            <v-icon>mdi-close</v-icon>
          </v-btn>  
        </v-card-title>
      </div>
        
      <v-card-text>
        <div class="d-flex mt-2 p-1">
          <v-card class="mr-3" style="width: 50%; background-color: #f0f0f0;">
            <v-card-text class="student-leftinfo">
              <img :src="selectedStudent.imageSrc" alt="Faculty Image"
                style="max-width: 100%; height: auto; margin-bottom: 3rem;"><br>
                <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">STUDENT ID:</strong> {{ selectedStudent.student_id }} <br>
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">FULL NAME:</strong> {{ selectedStudent.first_name }} {{ selectedStudent.middle_name}} {{ selectedStudent.last_name}} {{ selectedStudent.extension }}<br>
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">LRN:</strong> {{ selectedStudent.student_lrn }}<br>
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">Grade Level:</strong> {{ selectedStudent.grade_level }}<br>
              </div>
            </v-card-text>
          </v-card>

          <div class="parent-container">
          <v-card class="right-section w-100" style="box-shadow: 5px 10px #888888;">
              <v-card-text>
                <h3 class="section-title">PERSONAL INFORMATION</h3>
                <hr>
                <div class="personal-info">
                  <!-- Personal information details -->
                  <!-- Mother's details -->
                  <div class="info-box">
                    <strong class="info-title">Full Name: </strong>
                    <span class="info-value">{{ selectedStudent.first_name }} {{ selectedStudent.middle_name }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Contact #: </strong>
                    <span class="info-value">{{ selectedStudent.contact_no }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Birthdate: </strong>
                    <span class="info-value">{{ selectedStudent.birth_date }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Sex: </strong>
                    <span class="info-value">{{ selectedStudent.sex_at_birth }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Religion: </strong>
                    <span class="info-value">{{ selectedStudent.religion }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Address: </strong>
                    <span class="info-value">{{ selectedStudent.houseNumber}} {{ selectedStudent.street}} {{ selectedStudent.barangay}}
                      {{ selectedStudent.city}} ,{{ selectedStudent.province}} {{ selectedStudent.zip_code}}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Guardian Name: </strong>
                    <span class="info-value">{{ selectedStudent.guardian }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Guardian Contact #: </strong>
                    <span class="info-value">{{ selectedStudent.guardian_mobileno }}</span>
                  </div>
                  <!-- Father's details -->
                  <!-- Add other personal information details here -->
                </div>
              </v-card-text>
            </v-card>
            <v-card class="lower-section w-100" style="box-shadow: 5px 10px #888888;">
              <v-card-text>
                <h3 class="section-title">ACADEMIC INFORMATION</h3>
                <hr>
                <div class="personal-info">
                  <!-- Personal information details -->
                  <!-- Mother's details -->
                  <div class="info-box">
                    <strong class="info-title">Section: </strong>
                    <span class="info-value">{{ selectedStudent.section }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Grade Level: </strong>
                    <span class="info-value">{{ selectedStudent.grade_level }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">School Year: </strong>
                    <span class="info-value">{{ selectedStudent.year }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Password: </strong>
                    <span class="info-value">{{ selectedStudent.password }}</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
export default {

  data: () => ({
    search: '',
    dialog: false,
    selectedStudent: null,
    viewDialog: false,
    headers: [
      { title: 'Student ID', key: 'student_id' },
      { title: 'Name', align: 'start', key: 'full_name' },
      { title: 'LRN', key: 'student_lrn' },
      { title: 'Grade Level', key: 'grade_level' },
      { title: 'Actions', sortable: false },
    ],
    students: [],
    value: [],
    editedIndex: -1,
    editedItem: {
      student_id: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      extension: '',
      contact_no: '',
      birth_date: '',
      birth_place: '',
      civil_status: '',
      sex_at_birth: '',
      citizenship: '',
      religion: '',
      region: '',
      province: '',
      city: '',
      barangay: '',
      street: '',
      zip_code: '',
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
      civil_status: '',
      sex_at_birth: '',
      citizenship: '',
      religion: '',
      region: '',
      province: '',
      city: '',
      barangay: '',
      street: '',
      zip_code: '',

    },

  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add Student' : 'Edit Student Information';
    },
    displayedStudents() {

      const searchTerm = this.search.toLowerCase(); // Convert search input to lowercase for case-insensitive comparison
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
  },

  mounted() {
    this.initialize();
    this.getData();
  },
  methods: {
    getData() {
      axios.get('jhs').then(res => {
        let tmp = res.data;
        console.log(tmp);
        // TO PASS THE VALUE OF DATA
        /*
          tmp =  res.data = {
            "status": 200
            "student" : {
              0: {id: 1, student_id: 202110239},
              1: {id: 2, student_id: 202110240},
              2: {id: 3, student_id: 202110241},
            }
          }
        */
        this.value = tmp.student;
        console.log(this.value);
        /* 
          STRUCTURE
        tmp = student ={ 
          0: {id: 1, student_id: 202110239},
          1: {id: 2, student_id: 202110240},
          2: {id: 3, student_id: 202110241},
        }
        */

        console.log(this.value[0].student_id);
        console.log(this.defaultItem);

      })

    },
    initialize() {
      axios.get('jhs').then(res => {
        console.log(res.data);
        let tmp = res.data;
        this.students = tmp.student;
        console.log(this.students);
        this.students.forEach(student => {
          student.full_name = `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim();
          student.imageSrc = student.image ? `http://127.0.0.1:8000/uploads/profile/${student.image}` : '';
        });
      })
        .catch(error => {
          console.error('Error loading students:', error);
        });
    },

    //modal dialog to view the student record
    openViewDialog(item) {
      this.selectedStudent = item;
      this.viewDialog = true;
    },

    closeViewDialog() {
        this.viewDialog = false;
    },
    // end ofmodal dialog to view the student record


    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.students[this.editedIndex], this.editedItem);
    //   } else {
    //     this.students.push(this.editedItem);
    //   }
    //   this.close();
    // },

  },
};
</script>

<style lang="scss">
.v-data-table {
  height: 100%;

}
.student-card {
  width: w-auto;
  border-radius: 17px;
  text-align: start;
  transition: all 0.5s;
  font-weight: bolder;
  color: black;
}

.student-family {
  text-align: left;
}

.student-leftinfo {
  justify-content: center;
  text-align: center;
  padding: 1rem;
}

.student-family {
  text-align: left;
  padding: 1rem;
}
.close-button:hover {
  color: red;
}


.info-title {
  font-weight: bold;
}

.dialog-header {
  background-color: var(--dark);
  padding: 0.75rem 1rem;
}

.dialog-title {
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  position: relative;
  margin: 0;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
}

.section-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 1rem;
}

.personal-info {
  border: 1px solid #e0e0e0;
  padding: 1rem;
  border-radius: 5px;
}

.info-box {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.info-value {
  color: var(--dark);
  opacity: 75%;
}
.faculty-details-item {
  padding: 8px 0; 
  justify-content: left;
  text-align: left;
  align-items: start;
}

.parent-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>