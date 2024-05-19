<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="displayedFaculty"
    :sort-by="[{ key: 'id', order: 'asc' }]"
    
    
  >
    <template v-slot:top >
      <v-toolbar flat >
        <v-toolbar-title class="text-h6 font-weight-black" style="color: #2F3F64">FACULTY MASTER LIST</v-toolbar-title>
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
      
      
      <v-dialog v-model="dialog" max-width="1000px">

<template v-slot:activator="{ props }">
  <v-btn class="mb-2 rounded-l	border" color="primary" dark v-bind="props" prepend-icon="mdi-plus">Add New Faculty</v-btn>
</template>


<v-card>
  <v-card-title><span class="text-h5 fw-bold m-2" style="color: #2F3F64">{{ formTitle }}</span></v-card-title>
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
    <v-btn color="red" variant="text" @click="close">Cancel</v-btn>
    <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>

      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.faculty_id }}</td>
        <td>{{ item.fname }} {{ item.mname }} {{ item.lname }} {{ item.extension }}</td>
        <td>{{ item.position }}</td>
        <td>{{ item.department }}</td>
        <td>{{ item.email }}</td>
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
          FACULTY DETAILS
          <v-btn icon @click="closeViewDialog" class="close-button " style="position: absolute; top: 0; right: 0;">
            <v-icon>mdi-close</v-icon>
          </v-btn>  
        </v-card-title>
      </div>
        
      <v-card-text>
        <div class="d-flex mt-2 p-1">
          <v-card class="mr-3" style="width: 30%; background-color: #f0f0f0;">
            <v-card-text class="student-leftinfo">
              <img :src="selectedFaculty.imageSrc" alt="Faculty Image"
                style="max-width: 100%; height: auto; margin-bottom: 3rem;"><br>
                <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">FACULTY ID:</strong> {{ selectedFaculty.faculty_id }} <br>
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">FULL NAME:</strong> {{ selectedFaculty.fname }} {{ selectedFaculty.mname }} {{ selectedFaculty.lname}} {{ selectedFaculty.extension }}<br>
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">Position:</strong> {{ selectedFaculty.position }}<br>
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">Department:</strong> {{ selectedFaculty.department }}<br>
              </div>
            </v-card-text>
          </v-card>

          <v-card style="flex-grow: 1">
            <v-card-text>
              <h3 class="fs-5 fw-bold">PERSONAL INFORMATION</h3>
              <hr>
              <div class="student-family">
                <v-row>

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
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  
  data: () => ({
    search: '',
    dialog: false,
    selectedFaculty: null,
    viewDialog: false,
    headers: [
      { title: 'Faculty ID', align: 'start', key:'faculty_id'},
      { title: 'Name', align: 'start', key:'full_name'},
      { title: 'Position', align: 'start', key: 'position' },
      { title: 'Department', align: 'start', key: 'department' },
      { title: 'Email', align: 'start', key: 'email' },
      { title: 'Actions', sortable: false },
    ],
    students: [],
    faculty: [],
    editedIndex: -1,
    editedItem: {
      faculty_id: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      extension: '',
      position: '',
      department: '',
      email: '',
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
      faculty_id: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      extension: '',
      position: '',
      department: '',
      email: '',
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
    displayedFaculty() {
      const searchTerm = this.search.toLowerCase(); // Convert search input to lowercase for case-insensitive comparison
    return this.faculty.filter(student =>
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

    watch: {
    'editedItem.grade_level'(newGrade) {
      if (['7', '8', '9', '10'].includes(newGrade)) {
        this.editedItem.strand = 'N/A';
      } else {

        this.editedItem.strand = ''; 
      }
    }
  },

 mounted(){
  this.initialize();
 },

  methods: {
    initialize() {
      axios.get('faculty').then(res => {
        console.log(res.data);
        let tmp = res.data;
       tmp.full_name 
        this.faculty =tmp.faculty;
        console.log(this.faculty);
        this.faculty.forEach(faculty => {
          faculty.full_name = `${faculty.fname} ${faculty.mname} ${faculty.lname} ${faculty.extension}`.trim();
          faculty.imageSrc = faculty.image ? `http://127.0.0.1:8000/uploads/profile/${faculty.image.image}` : '';
          });
          console.log(this.faculty);
      })
      .catch(error => {
        console.error('Error loading facultys:', error);
      });
    },

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

.text-padding {
  padding: 0.5rem;
  font-size: 1rem;
}
.faculty-details-item {
  border-bottom: 1px solid #ccc; 
  padding: 8px 0; 
}
</style>