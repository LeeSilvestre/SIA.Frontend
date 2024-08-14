<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="displayedStudents"
    :sort-by="[{ key: 'studentId', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          class="text-h6 font-weight-black"
          style="color: #2f3f64"
          >DOCUMENT LIST</v-toolbar-title
        >

        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field
          v-model="search"
          class="w-auto mr-1"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>

        <!-- create new popup modal -->
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td style="text-align: center">{{ item.student_lrn }}</td>
        <td style="text-align: center">
          {{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}
          {{ item.extension }}
          <!-- {{ item.full_name }} -->
        </td>
        <td style="text-align: center">
          <!-- edit later for proper status  -->
          {{item.student_type}}
        </td>
        <td
          :style="{
            color: getStatusColor(item.enrollment_status),
            textAlign: 'center',
          }"
        >
        <v-chip>{{ item.enrollment_status }}</v-chip>
        </td>
        <td style="text-align: center">
          <v-btn color="success" size="small" @click="openViewDialog(item)"
            >
            <v-icon icon="mdi-paperclip" start></v-icon>
            Upload</v-btn
          >
        </td>
      </tr>
    </template>

    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>

  <!-- start of enroll dialog -->
  <v-dialog v-model="viewDialog" max-width="900px">
    <v-card>
      <div style="background-color: var(--dark); color: white;">
        <v-card-title class="dialog-title fs-3 font-weight-black">
          UPLOAD DOCUMENT
        </v-card-title>
      </div>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" md="12" sm="6">
              <v-file-input
              v-model="editedItem.psa"
              label="PSA/Birth Certificate"
              counter
              multiple
              show-size
              @change="handleFileUpload"
            ></v-file-input>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-file-input
              v-model="editedItem.goodMoral"
              label="Good Moral"
              counter
              multiple
              show-size
            ></v-file-input>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-file-input
              v-model="editedItem.tor"
              label="Form 137/Transcript of Record"
              counter
              multiple
              show-size
            ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="bg-green"
          color="white"
          variant="text"
          @click="upload"
          >Save</v-btn
        >
        <v-btn
          class="bg-red"
          color="white"
          variant="text"
          @click="closeViewDialog"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- end enroll dialog modal pop -->
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    viewDialog: false,
    selectedStudent: null,
    selectedFile: null,
    headers: [
      { title: "Student LRN.", align: "center", key: "student_lrn" },
      { title: "Full Name", align: "center", key: "full_name" },
      { title: "Student Status", align: "center"  , key: "stud_status" },
      { title: "Enrollment Status", align: "center", key: "enrollment_status" },
      { title: "Actions", align: "center", sortable: false },
    ],

    // displayedStudents: [
    students: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      student_id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      extension: "",
      contact_no: "",
      birth_date: "",
      birth_place: "",
      sex_at_birth: "",
      religion: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
      street: "",
      zip_code: "",
      year: "",
      section: "",
    },
    viewItem: {},
    formTitle: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "ENROLL NEW STUDENT"
        : "Edit Student Information";
    },
    displayedStudents() {
      const searchTerm = this.search.toLowerCase();
      return this.students.filter((student) => student.enrollment_status != 'Enrolled' && student.student_type == 'incoming'
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
    "editedItem.grade_level"(newGrade) {
      if (["7", "8", "9", "10"].includes(newGrade)) {
        this.editedItem.strand = "N/A";
      } else {
        this.editedItem.strand = "";
      }
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get("student")
        .then((res) => {
          this.students = res.data.student.map((student) => ({
            ...student,
            full_name:
              `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim(),
          }));
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    },

    watch: {
      "editedItem.year"(newYear) {
        const pattern = /^\d{4}-\d{4}$/;
        if (pattern.test(newYear)) {
          const years = newYear.split("-");
          const startYear = parseInt(years[0]);
          const endYear = parseInt(years[1]);

          if (endYear - startYear === 1) {
            this.editedItem.year = `${startYear + 1}-${endYear + 1}`;
          }
        }
      },
    },

    handleFileUpload(event) {
      this.editedItem.psa = event.target.files[0];
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

    upload(){ 
      console.log(this.editedItem.psa); 
      let formData = new FormData();

      formData.append('student_lrn', this.selectedStudent);
      formData.append('image', this.editedItem.psa);
      console.log(formData[0]);
      axios.post('imageStud', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
      }) 
      .then(res=>{
        console.log(res);
      })
      .catch(error=>{
        console.error (error.response);
      })
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
      this.selectedStudent = item.student_lrn;
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

    viewItem(item) {
      this.viewItem = item;
      this.viewDialog = true;
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
      if (!this.editedItem.guardian_mobileno.startsWith("+63")) {
        this.editedItem.guardian_mobileno = "+63";
      }
    },

    validateForm() {
      for (const key in this.editedItem) {
        if (this.editedItem.hasOwnProperty(key)) {
          if (this.editedItem[key] === "" || this.editedItem[key] === null) {
            return false;
          }
        }
      }
      return true;
    },

    save() {
      // if (!this.validateForm()) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Please fill in all required fields!',
      //     customClass: {
      //       container: 'sweet-alert-container',
      //     }
      //   });
      //   return;
      // }

      console.log(this.editedItem);
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
      } else {
        let tmp = this.editedItem;
        this.students.push(this.editedItem);
        tmp.image = this.selectedFile;
        // console.log(this.tmp);
        axios
          .post("student", tmp)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      this.close();
    },

    goView() {
      this.$router.push("/viewdetails");
    },
    getStatusColor(status) {
      if (status === "Verified") {
        return "#6EACDA"; // Set color to yellow if status is 'pending'
      } else if (status === "Assessed") {
        return "#FFAD60"; // Set color to green if status is 'enrolled'
      } else if(status === "Pending") {
        return "#FFB200"; // Default color
      } else {
        return "grey"
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  color: #2f3f64;
}

.close-button:hover {
  color: red;
}

.sweet-alert-container {
  z-index: 9999 !important;
}
</style>
