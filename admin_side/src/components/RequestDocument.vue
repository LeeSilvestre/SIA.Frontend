<template>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="displayedStudents"
      :sort-by="[{ key: 'studentId', order: 'asc' }]"
      
      
    >
      <template v-slot:top >
        <v-toolbar flat >
          <v-toolbar-title class="text-h6 font-weight-black" style="color: #2F3F64">REQUEST LIST</v-toolbar-title>
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
        
        <v-dialog v-model="viewDialog" max-width="800px" :z-index="1000">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5 fw-bold" style="color: #2F3F64">
          REQUEST DETAILS
        </span>
        <v-btn icon @click="closeViewDialog" class="close-button">
          <v-icon>mdi-close</v-icon>
        </v-btn>    
      </v-card-title>
      <hr class="m-0">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">STUDENT ID: </v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.student_id }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">NAME: </v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.full_name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">TYPE OF DOCUMENT REQUEST:  </v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.document_type}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">STATUS:  </v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.status }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1 ">PURPOSE OF REQUEST:  </v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.reason }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
        </v-row>
        <div class="text-sm-end p-1">
            <v-btn class="p-2 g-col-6 mr-2" color="bg-danger" variant="text" @click="confirmAction('decline')">Decline</v-btn>
            <v-btn class="p-2 g-col-6" color="bg-success" variant="text" @click="confirmAction('approve')">Approve</v-btn>
        </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.student_id }}</td>
          <td>{{ item.first_name }} {{ item.middle_name }} {{ item.last_name }} {{ item.extension }}</td>
          <td>{{ item.document_type }}</td>
          <td>{{ item.status }}</td>
          <td>
            <!-- <v-icon class="me-2" size="small" style="color: #2F3F64" @click="editItem(item)">mdi-pencil</v-icon> -->
            <v-icon size="small" style="color: #2F3F64; align-items: start;" @click="openViewDialog(item)">mdi-eye</v-icon>
          </td>
        </tr>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
      </template> -->
    </v-data-table>
  
  
  
  </template>
  
  <script>
  import Swal from 'sweetalert2'

  export default {
    
    data: () => ({
      search: '',
      dialog: false,
      selectedStudent: null,
      viewDialog: false,
      headers: [
        { title: 'Student ID', key: 'student_id' },
        { title: 'Name', align: 'start', align: 'start',key:'full_name'},
        { title: 'Type of Document', align: 'start',key: 'document_type' },
        { title: 'Status', align: 'start',key: 'status' },
        { title: 'View Detail', align: 'start', sortable: false },
      ],
      students: [],
      editedIndex: -1,
      editedItem: {
        first_name: '',
        last_name: '',
        middle_name: '',
        extension: '',
        student_id: '',
        document_type: '',
        status: '',
        reason: '',
      },
      defaultItem: {
        first_name: '',
        last_name: '',
        middle_name: '',
        extension: '',
        student_id: '',
        document_type: '',
        status: '',
        reason: '',
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
        grade_level: '10', 
        strand: 'STEM', 
        email: 'john.doe@example.com',
        first_name: 'John',
        middle_name: '',
        last_name: 'Doe',
        extension: '',
        document_type: 'Transcript of Record',
        status: 'pending',
        reason: 'Educational Assitance'
        },
      ];
    },
    confirmAction(action) {
      Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, " + action + " it!",
        customClass: {
          container: 'sweet-alert-container',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.performAction(action);
        }
      });
    },

    performAction(action) {
        if (action === "approve") {
        Swal.fire({
          title: "Approved!",
          text: "Your action has been approved.",
          icon: "success"
        });
      } else if (action === "decline") {
        Swal.fire({
          title: "Declined!",
          text: "Your action has been declined.",
          icon: "success"
        });
      };
    //   { 
    //     student_id: '2021002', 
    //     student_lrn: '0987654321', 
    //     grade_level: '11', 
    //     strand: 'ABM', 
    //     email: 'jane.smith@example.com',
    //     first_name: 'Jane',
    //     middle_name: 'Elizabeth',
    //     last_name: 'Smith',
    //     extension: '',
    //     sex_at_birth: 'Female',
    //     birth_date: '2000-03-25',
    //     birth_place: 'Los Angeles',
    //     civil_status: 'Single',
    //     citizenship: 'American',
    //     religion: 'Christianity',
    //     street: 'Oak Avenue',
    //     barangay: 'San Antonio',
    //     city: 'Los Angeles',
    //     province: 'California',
    //     region: 'California',
    //     zip_code: '90001'
    //   },
    //     student_id: '2021003',
    //     student_lrn: '1234567890',
    //     grade_level: '10',
    //     strand: 'STEM',
    //     email: 'john.johnson@example.com',
    //     first_name: 'John',
    //     middle_name: 'William',
    //     last_name: 'Johnson',
    //     extension: '',
    //     sex_at_birth: 'Male',
    //     birth_date: '2001-02-15',
    //     birth_place: 'Chicago',
    //     civil_status: 'Single',
    //     citizenship: 'American',
    //     religion: 'Christianity',
    //     street: 'Maple Street',
    //     barangay: 'San Andres',
    //     city: 'Chicago',
    //     province: 'Illinois',
    //     region: 'Illinois',
    //     zip_code: '60601'
    //   },
    //   // Add more students here...
    //   { 
    //     student_id: '2021004',
    //     student_lrn: '0987654321',
    //     grade_level: '11',
    //     strand: 'ABM',
    //     email: 'mary.brown@example.com',
    //     first_name: 'Mary',
    //     middle_name: 'Ann',
    //     last_name: 'Brown',
    //     extension: '',
    //     sex_at_birth: 'Female',
    //     birth_date: '2000-07-10',
    //     birth_place: 'Houston',
    //     civil_status: 'Single',
    //     citizenship: 'American',
    //     religion: 'Christianity',
    //     street: 'Pine Street',
    //     barangay: 'San Roque',
    //     city: 'Quezon City',
    //     province: 'Metro Manila',
    //     region: 'National Capital Region (NCR)',
    //     zip_code: '1235'
   

    // Your other methods...

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
        console.log("selectedStudent:", this.selectedStudent); // Check the value of selectedStudent
        this.viewDialog = false;
        // Clear the selected student data
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
  
  .sweet-alert-container {
  z-index: 9999 !important;
}


  
  
  </style>