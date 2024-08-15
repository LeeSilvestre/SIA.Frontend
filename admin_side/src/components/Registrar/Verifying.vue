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
          >STUDENT MASTER LIST</v-toolbar-title
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
    <template v-slot:item="{ item, index}">
      <tr>
        <td style="text-align: center">{{ index + 1 }}</td>
        <td style="text-align: center">
          <!-- {{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}
          {{ item.extension }} -->
          {{ item.full_name }}
        </td>
        <td style="text-align: center">{{ item.grade_level }}</td>
        <td style="text-align: center">{{ item.student_type }}</td>
        <td :style="{ color: getStatusColor(item.enrollment_status)}" style="text-align: center"> <v-chip >
          {{
            item.enrollment_status == "Verified" ||item.enrollment_status == "Enrolled"
              ? item.enrollment_status
              : "For Enrollment"
          }}
        </v-chip></td>
        <td style="text-align: center">
          <v-btn
            color="primary"
            size="small"
            class="mr-2"
            @click="openEditDialog(item)"
          >
            <v-icon icon="mdi-eye" start></v-icon>
            View</v-btn
          >
          <v-btn color="success" size="small" @click="openViewDialog(item)">
            <v-icon icon="mdi-check" start></v-icon>
            Enroll</v-btn
          >
        </td>
      </tr>
    </template>

    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>

  <!-- start of enroll dialog -->
  <v-dialog v-model="viewDialog" max-width="1000px">
    <v-card>
      <div style="background-color: var(--dark); color: white">
        <v-card-title class="dialog-title fs-3 font-weight-black">
          STUDENT INFORMATION
        </v-card-title>
      </div>
      <v-card-text>
        <v-container>
          <label class="fw-bold fs-5 mb-3">Personal Information</label>
          <v-row dense>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.student_lrn"
                label="LRN"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.last_name"
                label="Last Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.first_name"
                label="First Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.middle_name"
                label="Middle Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.contact_no"
                label="Contact no."
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.birth_date"
                label="Date of Birth dd/mm/yy"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.sex_at_birth"
                label="Sex"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.religion"
                label="Religion"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.region"
                label="Region"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.province"
                label="Province"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.city"
                label="City"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.barangay"
                label="Barangay"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.street"
                label="Street"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.zip_code"
                label="Zip Code"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <hr />
          <label class="fw-regular mb-3 fs-5">Academic Information</label>
          <v-row>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.grade_level"
                label="Grade level"
                readonly
              ></v-text-field>
            </v-col>
            <v-col
              v-if="selectedStudent.grade_level > 10"
              cols="12"
              md="3"
              sm="6"
            >
            <v-text-field
                v-model="selectedStudent.strand"
                label="Strand"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-select
                v-model="editedItem.section"
                :items= sectionList
                label="Section"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-select
              v-model="editedItem.adviser_id"
              :items="facultyName"
              item-text="title"
              item-value="value"
              label="Adviser"
              class="mr-2 m-auto"
            ></v-select>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="editedItem.password"
                label="Password"
              ></v-text-field>
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
          @click="markEnrolled(selectedStudent.student_recno)"
          >Mark as Enrolled</v-btn
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

  <v-dialog v-model="editDialog" max-width="1000px">
    <v-card>
      <div style="background-color: var(--dark); color: white">
        <v-card-title class="dialog-title fs-3 font-weight-black">
          STUDENT INFORMATION
        </v-card-title>
      </div>
      <v-card-text>
        <label class="fw-regular fs-5">Personal Information</label>
        <v-container>
          <v-row dense>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.student_lrn"
                label="LRN"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.last_name"
                label="Last Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.first_name"
                label="First Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.middle_name"
                label="Middle Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.contact_no"
                label="Contact no."
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.birth_date"
                label="Date of Birth dd/mm/yy"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.sex_at_birth"
                label="Sex"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.religion"
                label="Religion"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.region"
                label="Region"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.province"
                label="Province"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.city"
                label="City"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.barangay"
                label="Barangay"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.street"
                label="Street"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.zip_code"
                label="Zip Code"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <hr />
          <label class="fw-regular mb-3 fs-5">Academic Information</label>
          <v-row>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.grade_level"
                label="Grade level"
                readonly
              ></v-text-field>
            </v-col>
            <v-col
              v-if="selectedStudent.grade_level > 10"
              cols="12"
              md="3"
              sm="6"
            >
              <v-select
                v-model="selectedStudent.strand"
                :items="['HUMSS', 'STEM', 'HE', 'ABM', 'GAS']"
                label="Strand"
                readonly
              ></v-select>
            </v-col>
          </v-row>
          <hr />
          <label class="fw-regular mb-3 fs-5">Document Information</label>
          <v-row>
            <v-col cols="12" md="12" sm="6">
              <v-row align="center">
                <v-col>
                  <v-text-field
                    v-model="selectedStudent.psa"
                    label="PSA"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <!-- <v-icon @click="openViewFile">mdi-eye</v-icon> -->
                  <v-icon @click="openViewFile(imgDocs.psa)">mdi-eye</v-icon>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-row align="center">
                <v-col>
                  <v-text-field
                    v-model="selectedStudent.goodmoral"
                    label="Good Moral"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <!-- <v-icon @click="openViewFile">mdi-eye</v-icon> -->
                  <v-icon @click="openViewFile(imgDocs.goodmoral)">mdi-eye</v-icon>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-row align="center">
                <v-col>
                  <v-text-field
                    v-model="selectedStudent.tor"
                    label="Form 137/Transcript of Record"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <!-- <v-icon @click="openViewFile">mdi-eye</v-icon> -->
                  <v-icon @click="openViewFile(imgDocs.tor)">mdi-eye</v-icon>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- View File Dialog -->
      <v-dialog v-model="viewFileDialog" max-width="800px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center" style="background-color: var(--dark); color: white">
        <span class="fs-5 font-weight-black">DOCUMENT</span>
        <v-btn
          icon
          @click="closeViewFile"
          class="red--text"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-img :src="fileUrl" height="600px" contain></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="bg-red"
          color="white"
          variant="text"
          @click="closeEditDialog"
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
import BGImage from "../../assets/BG.png";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    viewDialog: false,
    editDialog: false,
    selectedStudent: null,
    selectedFile: null,
    viewFileDialog: false,
    // fileUrl: '',
    fileUrl: BGImage, // Use your local image here
    headers: [
      { title: "#", align: "center", key: "index" },
      { title: "Full Name", align: "center", key: "full_name" },
      { title: "Grade Level", align: "center", key: "grade_level" },
      { title: "Student Status", align: "center", key: "student_type" },
      { title: "Enrollment Status", align: "center", key: "enrollment_status" },
      { title: "Actions", align: "center", sortable: false },
    ],
    lname: "",
    students: [],
    editedIndex: -1,
    students: [],
    editedItem: {
      student_id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      extension: "",
      contact_no: "",
      birth_date: "",
      sex_at_birth: "",
      religion: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
      street: "",
      zip_code: "",
      sy: "",
      section: "",
    },
    fixedPass: "",
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
    itemView: {},
    allFaculty: [],
    facultyName: [],
    sectionList: [],
    imgDocs:[]
  }),

  computed: {
    displayedStudents() {
      const searchTerm = this.search.toLowerCase();
      return this.students.filter((student) => student.enrollment_status == 'Assessed'
      );
    },
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
    "selectedStudent.grade_level"(newGrade) {
      this.sectionList = this.allFaculty
        .filter(val => val.grade_level == newGrade)
        .map(val => val.section);
    },
    'editedItem.section'(section) {
      // Filter faculty based on the selected subject
      this.facultyName = this.allFaculty.filter(faculty => faculty.section === section);
    },
  },

  mounted() {
    const year = new Date().getFullYear(); // returns the current year
    this.initialize();
    this.getFaculty();
    // this.getSection();
    // this.fixedPass = selectedStudent.last_name + 'SNA' + year ;
  },

  methods: {
    //####################FETCH FUNCTIONS#####################
    initialize() {
      axios
        .get("student")
        .then((res) => {
          // this.lname = res.data.student.last_name;
          this.students = res.data.student.map((student) => ({
            ...student,
            full_name:
              `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim(),
            image:  student.image.map((image)=>({
              docuType: image.file_type,
              image:  `http://26.81.173.255:8000/uploads/profile/${image.image}`
            }))
          }));
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    },
    async getFaculty(){
      const res = await axios.get('getSec');
      this.allFaculty  = res.data.data.map((faculty)=>({
        ...faculty,
        title: faculty.adviser.full_name,
        value: faculty.adviser_id,
        department: faculty.adviser.department
      }));
    },

    markEnrolled(item) {
      axios
        .put(`create/${item}`, {
          enrollment_status: "Enrolled",
          adviser_id : this.editedItem.adviser_id,
          password : this.editedItem.password,
          section : this.editedItem.section
        })
        .then((res) => { 
          // SUCCESS
          Swal.fire({
            title: "Approved!",
            text: "Your action has been approved.",
            icon: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000); //
        })
        .catch((err) => {
          this.viewDialog = false
          console.error(err);
          Swal.fire ({
          title: "Error",
          text: "Please fill out all fields before enrolling the student.",
          icon: "error",
          showConfirmButton: false,
          Timer: 3000,
          });
        });
    },


    // ############ DIALOG FUNCTIONS #################





    openViewFile(fileUrl) {
      // this.fileUrl = fileUrl;
      this.viewFileDialog = true;
      this.fileUrl = fileUrl || BGImage;
    },
    closeViewFile() {
      this.viewFileDialog = false;
      this.fileUrl = "";
    },
    close() {
      this.dialog = false;
      this.selectedFile = null;
    },
    save() {
      this.dialog = false;
      this.selectedFile = null;
    },

    openViewDialog(item) {
      this.selectedStudent = item;
      this.viewDialog = true;
    },

    openEditDialog(item) {
        console.log(item);
        this.selectedStudent = item;

        // Initialize imgDocs with null values for each document type
        this.imgDocs = {
            tor: null,
            psa: null,
            goodmoral: null
        };

        // Map through item.image to populate imgDocs
        item.image.forEach(res => {
            if (res.docuType === "TOR") {
                this.imgDocs.tor = res.image;
            } else if (res.docuType === "PSA") {
                this.imgDocs.psa = res.image;
            } else if (res.docuType === "Good Moral") {
                this.imgDocs.goodmoral = res.image;
            }
        });

        console.log(this.imgDocs);
        this.editDialog = true;
    },


    closeEditDialog() {
      this.editDialog = false;
      // Clear the selected student data
    },

    closeViewDialog() {
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

      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
      } else {
        let tmp = this.editedItem;
        this.students.push(this.editedItem);
        tmp.image = this.selectedFile;
        axios
          .post("student", tmp)
          .then((res) => {
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
.sweet-alert-container{
  z-index: 9999;
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

.v-btn.red--text {
  color: white; /* Red color */
  background-color: rgba(255, 0, 0, 0.705);
}
.v-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
