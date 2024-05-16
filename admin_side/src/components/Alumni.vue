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
        <td>{{ item.first_name }} {{ item.middle_name }} {{ item.last_name }} {{ item.extension }}</td>
        <td>{{ item.student_id }}</td>
        <td>{{ item.student_lrn }}</td>
        <td>{{ item.grade_level }}</td>
        <td>{{ item.strand }}</td>
        <td>
          <!-- <v-icon class="me-2" size="small" style="color: #2F3F64" @click="editItem(item)">mdi-pencil</v-icon> -->
          <v-icon size="small" style="color: #2F3F64; margin: 0.5rem;" @click="viewDetails(item)">mdi-eye</v-icon>
        </td>
      </tr>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>

  
  <v-card v-if="selectedStudent" class="student-card mt-3 mb-5" style="max-height: 100%; overflow: hidden;">
  <v-card-title class="fs-5 font-weight-black" style="color: white; background-color: var(--dark);">STUDENT DETAILS</v-card-title>
  <v-card-text>
    <div class="d-flex mt-2 p-1">
      <v-card class="mr-3" style="width: 30%; background-color: #f0f0f0;">
        <v-card-text class="student-leftinfo">
          <!-- Display student image -->
          <img :src="selectedStudent.imageSrc" alt="Student Image" style="max-width: 100%; height: auto; margin-bottom: 3rem;"><br>
          <!-- Display student details -->
          <div class="d-flex flex-column mb-3">
          <strong>Student ID:</strong> {{ selectedStudent.student_id }} <br>
          <strong>Name:</strong> {{ selectedStudent.first_name }} {{ selectedStudent.middle_name }} {{ selectedStudent.last_name }} {{ selectedStudent.extension }}<br>
          <strong>LRN:</strong> {{ selectedStudent.student_lrn }}<br>
          <strong>Grade Level:</strong> {{ selectedStudent.grade_level }}<br>
          <strong>Strand:</strong> {{ selectedStudent.strand }}<br>
        </div>
        </v-card-text>
      </v-card>

      <!-- Right side card for other student details -->
       <!-- Right side card for other student details -->
       <v-card style="flex-grow: 1">
              <v-card-text>
                <h3>Family Information</h3>
                <hr>
                <!-- Display family information -->
                <div class="student-family">
                  <v-row>
                    <v-col cols="6">
                      <strong>Father Name:</strong> {{ selectedStudent.father_name }}<br>
                      <strong>Occupation:</strong> {{ selectedStudent.father_occupation }}<br>
                      <strong>Mobile Number:</strong> {{ selectedStudent.father_mobile }}<br>
                    </v-col>
                    <v-col cols="6">
                      <strong>Mother Name:</strong> {{ selectedStudent.mother_name }}<br>
                      <strong>Occupation:</strong> {{ selectedStudent.mother_occupation }}<br>
                      <strong>Mobile Number:</strong> {{ selectedStudent.mother_mobile }}<br>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <strong>Guardian Name:</strong> {{ selectedStudent.guardian_name }}<br>
                      <strong>Occupation:</strong> {{ selectedStudent.guardian_occupation }}<br>
                      <strong>Mobile Number:</strong> {{ selectedStudent.guardian_mobile }}<br>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
    </div>
  </v-card-text>
</v-card>



</template>

<script>

export default {
  
  data: () => ({
    search: '',
    dialog: false,
    selectedStudent: null,
    headers: [
      { title: 'Name', align: 'start', key:'full_name'},
      { title: 'Student ID', key: 'student_id' },
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
    { 
      student_id: '2021002', 
      student_lrn: '0987654321', 
      grade_level: '11', 
      strand: 'ABM', 
      email: 'jane.smith@example.com',
      first_name: 'Jane',
      middle_name: 'Elizabeth',
      last_name: 'Smith',
      extension: '',
      sex_at_birth: 'Female',
      birth_date: '2000-03-25',
      birth_place: 'Los Angeles',
      civil_status: 'Single',
      citizenship: 'American',
      religion: 'Christianity',
      street: 'Oak Avenue',
      barangay: 'San Antonio',
      city: 'Los Angeles',
      province: 'California',
      region: 'California',
      zip_code: '90001'
    },
    { 
      student_id: '2021003',
      student_lrn: '1234567890',
      grade_level: '10',
      strand: 'STEM',
      email: 'john.johnson@example.com',
      first_name: 'John',
      middle_name: 'William',
      last_name: 'Johnson',
      extension: '',
      sex_at_birth: 'Male',
      birth_date: '2001-02-15',
      birth_place: 'Chicago',
      civil_status: 'Single',
      citizenship: 'American',
      religion: 'Christianity',
      street: 'Maple Street',
      barangay: 'San Andres',
      city: 'Chicago',
      province: 'Illinois',
      region: 'Illinois',
      zip_code: '60601'
    },
    // Add more students here...
    { 
      student_id: '2021004',
      student_lrn: '0987654321',
      grade_level: '11',
      strand: 'ABM',
      email: 'mary.brown@example.com',
      first_name: 'Mary',
      middle_name: 'Ann',
      last_name: 'Brown',
      extension: '',
      sex_at_birth: 'Female',
      birth_date: '2000-07-10',
      birth_place: 'Houston',
      civil_status: 'Single',
      citizenship: 'American',
      religion: 'Christianity',
      street: 'Pine Street',
      barangay: 'San Roque',
      city: 'Quezon City',
      province: 'Metro Manila',
      region: 'National Capital Region (NCR)',
      zip_code: '1235'
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

    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    viewDetails(item) {
    this.selectedStudent = item;
  },


    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
      } else {
        this.students.push(this.editedItem);
      }
      this.close();
    },
    
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



</style>