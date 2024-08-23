<template>
  <v-data-table :search="search" :headers="headers" :items="displayedStudents"
    :sort-by="[{ key: 'studentId', order: 'asc' }]">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-h6 font-weight-black" style="color: #2F3F64">REQUEST LIST</v-toolbar-title>
        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field v-model="search" class="w-20 mr-16 " density="compact" label="Search"
          prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line></v-text-field>

      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr class="selectRow" @click="handleViewIconClick(item)">
        <td >{{ item.request_id }}</td>
        <td >{{ item.student_id }}</td>
        <td class="text-center">{{ item.full_name }}</td>
        <td class="text-center">{{ item.document_type }}</td>
        <td class="text-center" >
          <v-chip :color="getStatusColor(item.document_remarks)">
            {{ item.document_remarks }}
          </v-chip>
        </td>
        <td class="text-center">
          {{ formatTimestamp(item.created_at)}}
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
import axios from 'axios';

export default {

  data: () => ({
    search: '',
    dialog: false,
    selectedStudent: null,
    viewDialog: false,
    headers: [
      { title: 'Control No.', key: 'request_id' },
      { title: 'Student ID', key: 'student_id' },
      { title: 'Full Nmae', align: 'center', key: 'full_name' },
      { title: 'Type of Document', align: 'center', key: 'document_type' },
      { title: 'Status', align: 'center', key: 'document_remarks' },
      { title: 'Request Date', align: 'center', key: 'created_at' },
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
    filterStat(){
      return
    }
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

    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };

      return date.toLocaleString('en-US', options);
    },
    getStatusColor(status) {
      if (status == 'Received') {
        return 'green';
      } else if (status == 'Pending') {
        return 'orange';
      } else if (status == 'For Receive') {
        return 'cyan';
      } else if (status == 'Pending') {
        return 'orange';
      } else  {
        return 'red';
      }
    },
    initialize() {
      axios.get('docreq').then(res=>{
        this.students = res.data.data.filter(res=> res.document_remarks != 'Declined');
        console.log(this.students);
      })
      // res.data.dat.map((res)=>({
      //   student_name : res.full_name,
      //   status: res.consultation_record.filter(val=> val.follow_up_time_in  > )
      // }))
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

    handleViewIconClick(item) {
      this.$emit('view-student', item);
    },

    performAction(action) {
      action === 'Confirm' ? (Swal.fire({ title: "Approved!", text: "Your action has been approved.", icon: "success" })) : Swal.fire({
        title: "Approved!",
        text: "Your action has been approved.",
        icon: "success"
      });
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

.button-container {
  display: flex;
  gap: 10px; 
}

.selectRow:hover{
  background-color: rgba(26, 21, 21, 0.062);
}
</style>