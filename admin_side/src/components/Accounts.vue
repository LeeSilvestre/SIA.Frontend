<template>
  <v-data-table :search="search" :headers="headers" :items="displayedStudents"
    :sort-by="[{ key: 'studentId', order: 'asc' }]">

    <!-- content of the table (top) -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title 
          class="text-h6 font-weight-black " 
          style="color: #2F3F64">USER ACCOUNTS LIST
        </v-toolbar-title>

        <v-text-field 
          v-model="search" 
          class="w-auto mr-1 " 
          density="compact" 
          label="Search"
          prepend-inner-icon="mdi-magnify" 
          variant="solo-filled" 
          flat hide-details single-line>
        </v-text-field>
    <!-- content of the table (top) -->

        <!-- create new popup modal -->
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ props }">
            <!-- card header content -->
            <v-btn 
              class="mb-2 rounded-l" 
              color="primary" dark 
              v-bind="props" 
              prepend-icon="mdi-plus"
              >ADD USERS
            </v-btn>
            <!-- end of card header content -->
          </template>

          <v-card>
            <div style="background-color: var(--dark);">
              <v-card-title><span class="fs-3 fw-bold m-2" style="color: white">{{ formTitle }}</span></v-card-title>
            </div>
            <v-card-text>
              <label class="fw-regular fs-5">User Information</label>
              <v-container>
                <v-row dense>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field 
                      v-model="editedItem.last_name" 
                      :rules="[rules.required]"
                      label="Last Name" 
                      required
                      pattern="[A-Za-z .'-]+">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field 
                    v-model="editedItem.first_name" 
                    label="First Name" required
                    :rules="[rules.required]"
                    pattern="[A-Za-z .'-]+">
                  </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field 
                      v-model="editedItem.middle_name" 
                      label="Middle Name"
                      pattern="[A-Za-z .'-]+">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field 
                      v-model="editedItem.extension_name" 
                      label="Extension Name"
                      pattern="[A-Za-z .'-]+">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Email Address"
                      model-value="Doe"
                      suffix="@sna.edu.ph"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="password"
                      :rules="[rules.required, rules.min]"
                      hint="At least 8 characters"
                      label="Password"
                      name="input-10-1"
                      counter
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-divider></v-divider>
                <!-- checkbox -->
              <label class="fw-regular fs-5">Roles and Department</label><br>
              <label class="fw-light fs-6"><strong>Instruction: </strong>Select all the roles you want to assign to the user by clicking the checkboxes.</label>
              <v-row>
                <v-col cols="12" md="4" sm="4">
                  <v-checkbox
                    color="success"
                    label="Admin"
                    value="success"
                  ></v-checkbox>
                  <v-checkbox
                    color="success"
                    label="Faculty"
                    value="success"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" md="4" sm="4">
                  <v-checkbox
                    color="success"
                    label="Student Personnel"
                    value="success"
                  ></v-checkbox>
                  <v-checkbox
                    color="success"
                    label="Encoder"
                    value="success"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" md="4" sm="4">
                  <v-checkbox
                    color="success"
                    label="Verifier"
                    value="success"
                  ></v-checkbox>
                  <v-checkbox
                    color="success"
                    label="Accessor"
                    value="success"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <!-- checkbox -->
              </v-container>
            </v-card-text>
            
            <!-- card buttons -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="bg-green" color="bwhite" variant="text" @click="confirmSave">Apply</v-btn>
              <v-btn class="bg-red" color="white" variant="text" @click="close">Cancel</v-btn>
            </v-card-actions>
            <!-- card buttons -->
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!-- header content -->
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.employee_id }}</td>
        <td>
          {{ item.last_name }}, 
          {{ item.first_name }} 
          {{ item.middle_name }} 
          {{ item.extension}}
        </td>
        <td >{{ item.account_role }}</td>
        <td>{{ item.account_dpt }}</td>

        <td>
          <v-btn class="bg-blue small-button">View</v-btn>
        </td>
      </tr>
    </template>
    <!-- end of header content -->
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
                  <v-list-item-title class="text-subtitle-1">Student ID:</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedStudent.student_id }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">Full Name:</v-list-item-title>
                  <v-list-item-subtitle>{{ students.full_name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1">Contact Number:</v-list-item-title>
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
  <!-- end view user status modal pop -->
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  data: () => ({
    search: '',
    dialog: false,
    email: '', // for email input
    dialogDelete: false,
    viewDialog: false,
    selectedStudent: null,
    selectedFile: null,
    headers: [
      { title: 'Employee ID', align: 'start', key: 'employee_id' },
      { title: 'Full Name', align: 'start', key: 'full_name' },
      { title: 'Role', align: 'start', key: 'account_role' },
      { title: 'Department', align: 'start', key: 'account_dpt' },
      { title: 'Actions', align: 'start', sortable: false },
    ],

    students: [],
    editedIndex: -1,
    editedItem: {
      employee_id: '',
      full_name: '',
      email: '',
      password: '',
      account_role: '',
      account_dpt: '',
    },
    defaultItem: {
      employee_id: '',
      full_name: '',
      email: '',
      password: '',
      account_role: '',
      account_dpt: '',

    },
    rules: {
        required: value => !!value || 'Field is required', //required fields
      },
      
    email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
      },
  }),
  


  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'ADD USER ACCOUNT' : 'Edit Student Information';
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
  },
  
  mounted() {
    this.initialize();
  },


  methods: {
    
    initialize() {
      axios.get('student').then(res => {
        this.students = res.data.student.map(student => ({
          ...student,
          full_name: `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim(),
        }));
      }).catch(error => {
        console.error('Error fetching students:', error);
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

    confirmSave() {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to save this user?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'No, cancel!',
        customClass: {
          container: 'sweet-alert-container',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.save();
          Swal.fire(
            'Saved!',
            'User has been saved.',
            'success'
          );
        } else {
          Swal.fire(
            'Cancelled',
            'User was not saved.',
            'error'
          );
        }
      });
    },
    save() {
      console.log('User saved:', this.editedItem);
      this.dialog = false;
    },
    openViewDialog(item) {
      this.selectedStudent = item;
      this.viewDialog = true;
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
      console.log(this.editedItem)
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
        return 'yellow'; // Set color to yellow if status is 'pending'
      } else if (status === 'Enrolled') {
        return 'green'; // Set color to green if status is 'enrolled'
      } else {
        return 'red'; // Default color
      }
    },

    prependCountryCode() {
      if (!this.editedItem.guardian_mobileno.startsWith('+63')) {
        this.editedItem.guardian_mobileno = '+63';
      }
    },

    validateNumberInput(event) {
      const input = event.target.value;
      event.target.value = input.replace(/\D/g, '');
    },

    formatDate(event) {
      const input = event.target.value;
      const [year, month, day] = input.split('-');
      if (year && month && day) {
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December'
        ];
        this.editedItem.birth_date = `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
      }
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
  color: #2F3F64;
}

.close-button:hover {
  color: red;
}

.small-button {
  font-size: 11px;
  padding: 1px 4px;
  min-width: 60px;
}
.sweet-alert-container {
  z-index: 9999 !important; /* Ensures the alert is on top of other elements */
}
</style>
