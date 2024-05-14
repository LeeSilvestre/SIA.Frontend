<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="displayedStudents"
    :sort-by="[{ key: 'studentId', order: 'asc' }]"
    
    
  >
    <template v-slot:top >
      <v-toolbar flat >
        <v-toolbar-title class="text-h6 font-weight-black" style="color: #2F3F64">SENIOR HIGH MASTER LIST</v-toolbar-title>
        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field
        v-model="search"
        class="w-auto mr-1 "
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details  
        single-line
      ></v-text-field>
      
        <v-dialog v-model="dialog" max-width="1000px">
          
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2 rounded-l	" color="primary" dark v-bind="props" prepend-icon="mdi-plus">Add Student</v-btn>
          </template>
          
          <v-card >
            <v-card-title ><span class="text-h6 m-2" style="color: #2F3F64"  >{{ formTitle }}</span></v-card-title>
            <v-card-text > 
              <v-container >
                <v-row dense >
                  <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.student_lrn"
                    label="LRN"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.last_name"
                    label="Last Name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.first_name"
                    label="First Name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.middle_name"
                    label="Middle Name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.contact_no"
                    label="Contact no."
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.birth_date"
                    label="Date of Birth"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.birth_place"
                    label="Birth of Place"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.civil_status"
                    :items="['Single', 'Married', 'In a Relationship', 'Widowed', 'Divorce' ]"
                    label="Civil Status"
                    required
                  ></v-select>
                </v-col>
                
                <v-col
                  cols="12"
                  md="2"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.sex_at_birth"
                    :items="['Male', 'Female' ]"
                    label="SEX"
                    required
                  ></v-select>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.citizenship"
                    label="Citizenship"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.religion"
                    label="Religion"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.region"
                    :items="['Region I', 'Region II', 'Region III', 'Region IV-A', 'Region IV-B', 'Region V', 'Region VI', 'Region VII', 'Region VIII', 'Region IX', 'Region X', 'Region XI', 'Region XII', 'Region XIII', 'BARMM', 'CAR']"
                    label="Region"
                    required
                  ></v-select>

                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.province"
                    label="Province"  
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.city"
                    label="City"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.barangay"
                    label="Barangay"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.street"
                    label="Address"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.zip_code"
                    label="Zip Code"
                    required
                  ></v-text-field>
                </v-col>
                
          </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
          <v-icon size="small" style="color: #2F3F64; margin: 1.4rem" @click="viewDetails(item)">mdi-eye</v-icon>
        </td>
      </tr>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>

  
  <v-card v-if="selectedStudent" class="student-card mt-10 mb-5" style="max-height: 100%; overflow: hidden;">
  <v-card-title class="fs-5 font-weight-black" style="color: white; background-color: var(--dark);">STUDENT DETAILS</v-card-title>
  <v-card-text>
    <div class="d-flex mt-2">
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
      <v-card style="flex-grow: 1">
        <v-card-text>
          <h3 class="fw-bold">Student Information</h3>
          <hr>
          <!-- Display family information -->
          <div class="student-family">
            <strong>Father Name: </strong> {{ selectedStudent.father_name }}<br>
            <strong>Occupation: </strong> {{ selectedStudent.father_occupation }}<br>
            <strong>Mobile Number: </strong> {{ selectedStudent.father_mobile }}<br>
            <strong>Mother Name: </strong> {{ selectedStudent.mother_name }}<br>
            <strong>Occupation: </strong> {{ selectedStudent.mother_occupation }}<br>
            <strong>Mobile Number: </strong> {{ selectedStudent.mother_mobile }}<br>
            <strong>Guardian Name: </strong> {{ selectedStudent.guardian_name }}<br>
            <strong>Occupation: </strong> {{ selectedStudent.guardian_occupation }}<br>
            <strong>Mobile Number: </strong> {{ selectedStudent.guardian_mobile }}<br>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-card-text>
</v-card>




</template>

<script>
import axios from 'axios';
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

  mounted(){
    this.initialize();
    this.getData();
  },
  methods: {
    getData(){
      axios.get('jhs').then(res=>{
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
      axios.get('shs').then(res => {
        console.log(res.data);
        let tmp = res.data;
        this.students =tmp.student;
        console.log(this.students);
        this.students.forEach(student => {
          student.full_name = `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim();
          student.imageSrc = student.image ? `http://127.0.0.1:8000/uploads/profile/${student.image.image}` : '';
          });
      })
      .catch(error => {
        console.error('Error loading students:', error);
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
.card {
  box-sizing: border-box;
  width: w-auto;
  height: 254px;
  border: 1px solid white;
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(6px);
  border-radius: 17px;
  text-align: start;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  user-select: none;
  font-weight: bolder;
  color: black;
}

.card:hover {
  transform: scale(1);
  transition: 0.2s;
}


</style>