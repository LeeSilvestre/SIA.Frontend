<template>
  <v-data-table :search="search" :headers="headers" :items="displayedStudents"
    :sort-by="[{ key: 'studentId', order: 'asc' }]">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-h6 font-weight-black" style="color: #2F3F64">SUBJECT SCHEDULE
          LIST</v-toolbar-title>
        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field v-model="search" class="w-20 mr-16 " density="compact" label="Search"
          prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line></v-text-field>

        <v-dialog v-model="dialog" max-width="1000px">

          <template v-slot:activator="{ props }">
            <v-btn class="mb-2 rounded-l	" color="primary" dark v-bind="props" prepend-icon="mdi-plus">Add Subject</v-btn>
          </template>


          <v-card>
            <v-card-title><span class="text-h5 fw-bold m-2" style="color: #2F3F64;">{{ formTitle
                }}</span></v-card-title>
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

                  <!-- other info -->
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
              <!-- <v-btn color="primary" @click="triggerFileInput">Attach File</v-btn>
<input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" />
<v-chip v-if="selectedFile" class="ma-2" color="primary" dark>
{{ selectedFile.name }}
</v-chip> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="bg-green" color="bwhite" variant="text" @click="save">Save</v-btn>
              <v-btn class="bg-red" color="white" variant="text" @click="close">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>



    </template>
    <!--student table header-->
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.section }}</td>
        <td>{{ item.grade_level }}</td>
        <td>
          <!-- <v-icon class="me-2" size="small" style="color: #2F3F64" @click="editItem(item)">mdi-pencil</v-icon> -->
          <v-icon size="small" style="color: #2F3F64; margin: 0.5rem;"
            @click="handleViewIconClick(item)">mdi-eye</v-icon>
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
                <strong class="text-padding">FULL NAME:</strong> {{ selectedStudent.first_name }} {{
                  selectedStudent.middle_name }} {{ selectedStudent.last_name }} {{ selectedStudent.extension }}<br>
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                <strong class="text-padding">LRN:</strong> {{ selectedStudent.student_lrn }}<br>
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                <strong class="text-padding">Grade Level:</strong> {{ selectedStudent.grade_level }}<br>
              </div>
            </v-card-text>
          </v-card>

          <!--student table details-->
          <div class="parent-container">
            <v-card class="right-section w-100" style="box-shadow: 5px 10px #888888;">
              <v-card-text>
                <h3 class="section-title">PERSONAL INFORMATION</h3>
                <hr>
                <div class="personal-info">
                  <!-- Personal information details -->
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
                    <span class="info-value">{{ selectedStudent.houseNumber }} {{ selectedStudent.street }} {{
                      selectedStudent.barangay }}
                      {{ selectedStudent.city }} ,{{ selectedStudent.province }} {{ selectedStudent.zip_code }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Guardian Name: </strong>
                    <span class="info-value">{{ selectedStudent.guardian }}</span>
                  </div>
                  <div class="info-box">
                    <strong class="info-title">Guardian Contact #: </strong>
                    <span class="info-value">{{ selectedStudent.guardian_mobileno }}</span>
                  </div>
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
import Swal from 'sweetalert2';
import axios from 'axios';
export default {

  data: () => ({
    search: '',
    dialog: false,
    selectedStudent: null,
    viewDialog: false,
    headers: [
      { title: 'Section', key: 'section' },
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

    close() {
      this.dialog = false;
      this.selectedFile = null;
    },

    save() {
      console.log(this.selectedFile);
      this.dialog = false;
      this.selectedFile = null;
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

    //modal dialog to view the student record
    // openViewDialog(item) {
    //   this.selectedStudent = item;
    //   this.viewDialog = true;
    // },

    // closeViewDialog() {
    //     this.viewDialog = false;
    // },

    handleViewIconClick(item) {
      this.$emit('view-student', item);
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

.sweet-alert-container {
  z-index: 9999 !important;
}
</style>