<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="displayedStudents"
    :sort-by="[{ key: 'studentId', order: 'asc' }]"
    
    
  >
    <template v-slot:top >
      <v-toolbar flat >
        <v-toolbar-title class="text-h6 font-weight-black" style="color: #2F3F64">ALUMNI MASTER LIST</v-toolbar-title>
        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field
        v-model="search"
        class="w-20 mr-16 "
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
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.student_id }}</td>
        <td>{{ item.first_name }} {{ item.middle_name }} {{ item.last_name }} {{ item.extension }}</td>
        <td>{{ item.student_lrn }}</td>
        <td>{{ item.grade_level }}</td>
        <td>{{ item.strand }}</td>
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
          <v-card class="mr-3" style="width: 30%; background-color: #f0f0f0;">
            <v-card-text class="student-leftinfo">
              <img :src="selectedStudent.imageSrc" alt="Faculty Image"
                style="max-width: 100%; height: auto; margin-bottom: 3rem;"><br>
                <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">FACULTY ID:</strong> {{ selectedStudent.student_id }} <br>
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

          <v-card style="flex-grow: 1">
            <v-card-text>
              <h3 class="fs-5 fw-bold">FAMILY INFORMATION</h3>
              <hr>
              <div class="student-family">
                <v-row>
                  <v-col cols="4">
                    <div class="info-box">
                      <strong class="info-title">Mother Name:</strong>
                      <span>{{ selectedStudent.mother_name }}</span>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div class="info-box">
                      <strong class="info-title">Mobile Number:</strong>
                      <span>{{ selectedStudent.mother_mobile }}</span>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div class="info-box">
                      <strong class="info-title">Occupation:</strong>
                      <span>{{ selectedStudent.mother_occupation }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <div class="info-box">
                      <strong class="info-title">Father Name:</strong>
                      <span>{{ selectedStudent.father_name }}</span>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div class="info-box">
                      <strong class="info-title">Mobile Number:</strong>
                      <span>{{ selectedStudent.father_mobile }}</span>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div class="info-box">
                      <strong class="info-title">Occupation:</strong>
                      <span>{{ selectedStudent.father_occupation}}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <div class="info-box">
                      <strong class="info-title">Guardian Name:</strong>
                      <span>{{ selectedStudent.guardian_name }}</span>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div class="info-box">
                      <strong class="info-title">Mobile Number:</strong>
                      <span>{{ selectedStudent.guardian_mobile }}</span>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div class="info-box">
                      <strong class="info-title">Occupation:</strong>
                      <span>{{ selectedStudent.guardian_occupation }}</span>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>



</template>

<script>

export default {
  
  data: () => ({
    search: '',
    dialog: false,
    selectedStudent: null,
    viewDialog: false,
    headers: [
      { title: 'Student ID', key: 'student_id' },
      { title: 'Name', align: 'start', key:'full_name'},
      { title: 'LRN', key: 'student_lrn' },
      { title: 'Grade Level', key: 'grade_level' },
      { title: 'Strand', key: 'strand' },
      { title: 'View Detail', sortable: false },
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.students = [
        { 
      student_id: '2021001', 
      student_lrn: '1234567890', 
      grade_level: '10', 
      strand: 'STEM', 
      email: 'john.doe@example.com',
      first_name: 'John',
      middle_name: '',
      last_name: 'Doe',
      extension: '',
      sex_at_birth: 'Male',
      birth_date: '1999-05-15',
      birth_place: 'New York',
      civil_status: 'Single',
      citizenship: 'American',
      religion: 'Christianity',
      street: 'Main Street',
      barangay: 'San Juan',
      city: 'Makati',
      province: 'Metro Manila',
      region: 'National Capital Region (NCR)',
      zip_code: '1234'
    },
    
      ];
      this.students.forEach(student => {
  student.full_name = `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim();
    if (student.grade_level < 11 || student.grade_level > 12) {
        // Remove the strand property
        student.strand = "N/A";
    }
      });
    },

    openViewDialog(item) {
      this.selectedStudent = item;
      this.viewDialog = true;
    },

    closeViewDialog() {
        this.viewDialog = false;
    },


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

</style>