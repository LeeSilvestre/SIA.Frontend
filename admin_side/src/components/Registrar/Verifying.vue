<template>
  <v-container class="studentInfCon">
    <v-data-table
      class="studentTable"
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
          >
            STUDENT MASTER LIST
          </v-toolbar-title>

          <div style="width: 25vw">
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
          </div>
          
        </v-toolbar>
      </template>
      <template v-slot:item="{ item, index }">
        <tr
          :class="{ 'selected-row': selectedRows.includes(item.student_lrn) }"
          @click="toggleSelection(item.student_lrn, item)"
          style="cursor: pointer"
        >
          <td>{{ index + 1 }}</td>
          <td style="text-align: center">{{ item.full_name }}</td>
          <td style="text-align: center">{{ item.grade_level }}</td>
          <td style="text-align: center">{{ item.student_type }}</td>
          <td
            :style="{ color: getStatusColor(item.enrollment_status) }"
            style="text-align: center"
          >
            <v-chip>
              {{
                item.enrollment_status == "Verified" ||
                item.enrollment_status == "Enrolled"
                  ? item.enrollment_status
                  : "For Enrollment"
              }}
            </v-chip>
          </td>
          <td style="text-align: center">
            <v-btn color="success" size="small" @click="openViewDialog(item)">
              <v-icon icon="mdi-check" start></v-icon>
              Enroll
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    
    <div class="studentInfo">
      <v-card class="pa-4">
        <v-row>
          <v-col cols="12">
            <!-- Personal Information Section -->
            <v-divider class="my-4"></v-divider>
            <h1
              class="fw-bold fs-4 d-flex align-items-center mb-5"
              style="color: var(--dark)"
            >
              <v-icon class="mr-2" style="color: var(--dark)"
                >mdi-account</v-icon
              >
              Personal Information
            </h1>
            <v-text-field
              v-model="selectedStudent.full_name"
              label="Student Name"
              readonly
              variant="outlined"
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedStudent.sex_at_birth"
                  label="Gender"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedStudent.birth_date"
                  label="Birthdate"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="selectedStudent.address"
              label="Address"
              readonly
              variant="outlined"
            ></v-text-field>

            <!-- Contact Information Section -->
            <v-divider class="my-4"></v-divider>
            <h1
              class="fw-bold fs-4 d-flex align-items-center mb-5"
              style="color: var(--dark)"
            >
              <v-icon class="mr-2" style="color: var(--dark)">mdi-phone</v-icon>
              Contact Information
            </h1>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedStudent.contact_no"
                  label="Contact No."
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedStudent.email"
                  label="Email"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Academic Information Section -->
            <v-divider class="my-4"></v-divider>
            <h1
              class="fw-bold fs-4 d-flex align-items-center mb-5"
              style="color: var(--dark)"
            >
              <v-icon class="mr-2" style="color: var(--dark)"
                >mdi-school</v-icon
              >
              Academic Infomation
            </h1>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedStudent.grade_level"
                  label="Grade"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6" v-if="selectedStudent.grade_level > 10">
                <v-text-field
                  v-model="selectedStudent.strand"
                  label="Strand"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Document List Section -->
            <v-divider class="my-4"></v-divider>
            <h1
              class="fw-bold fs-4 d-flex align-items-center mb-5"
              style="color: var(--dark)"
            >
              <v-icon class="mr-2" style="color: var(--dark)"
                >mdi-file-document</v-icon
              >
              Document List
            </h1>
            <v-table>
              <thead>
                <tr>
                  <th
                    class="text-left"
                    style="background-color: var(--dark); color: white"
                  >
                    Document
                  </th>
                  <th
                    class="text-left"
                    style="background-color: var(--dark); color: white"
                  >
                    Remark
                  </th>
                  <!-- <th class="text-left">Actions</th> -->
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Good Moral / PSA</td>
                  <td>{{ selectedStudent.psa }}</td>
                  <!-- <td @click="openViewFile(imgDocs.tor)" style="cursor: pointer; color: blue;">View</td> -->
                </tr>
                <tr>
                  <td>Form 137</td>
                  <td>{{ selectedStudent.tor }}</td>
                  <!-- <td @click="openViewFile(imgDocs.tor)" style="cursor: pointer; color: blue;">View</td> -->
                </tr>
                <tr>
                  <td>Good Moral</td>
                  <td>{{ selectedStudent.goodmoral }}</td>
                  <!-- <td @click="openViewFile(imgDocs.tor)" style="cursor: pointer; color: blue;">View</td> -->
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>

  <v-dialog v-model="viewDialog" max-width="1000px">
    <v-card>
      <div style="background-color: var(--dark); color: white">
        <v-card-title class="dialog-title fs-3 font-weight-black">
          STUDENT INFORMATION
        </v-card-title>
      </div>
      <v-card-text>
        <v-container>
          <h1
              class="fw-bold fs-4 d-flex align-items-center mb-5"
              style="color: var(--dark)"
            >
              <v-icon class="mr-2" style="color: var(--dark)"
                >mdi-account</v-icon
              >
              Personal Information
            </h1>
          <v-row dense>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.last_name"
                label="Last Name"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.first_name"
                label="First Name"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.middle_name"
                label="Middle Name"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.extension"
                label="Extension"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="selectedStudent.birth_date"
                label="Date of Birth dd/mm/yy"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="selectedStudent.sex_at_birth"
                label="Sex"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="selectedStudent.religion"
                label="Religion"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-row dense>
              <v-col cols="12" md="12" sm="6">
              <h1
              class="fw-bold fs-6 d-flex align-items-center"
              style="color: var(--dark)"
            >
              Current Address
            </h1>
          </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.region"
                label="Region"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.province"
                label="Province"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.city"
                label="City"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.barangay"
                label="Barangay"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.street"
                label="Street"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.houseNumber"
                label="House Number"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.zip_code"
                label="Zip Code"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          </v-row>
          <hr />
          <h1
              class="fw-bold fs-4 d-flex align-items-center mb-5"
              style="color: var(--dark)"
            >
              <v-icon class="mr-2" style="color: var(--dark)"
                >mdi-phone</v-icon
              >
              Contact Information
            </h1>
            <v-row>
              <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.contact_no"
                label="Contact no."
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.email"
                label="Email"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            </v-row>
            <hr />

            <h1
              class="fw-bold fs-4 d-flex align-items-center mb-5"
              style="color: var(--dark)"
            >
              <v-icon class="mr-2" style="color: var(--dark)"
                >mdi-school</v-icon
              >
              Academic Information
            </h1>          <v-row>
              <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.student_lrn"
                label="LRN"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="selectedStudent.grade_level"
                label="Grade level"
                readonly
                variant="outlined"
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
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-select
                v-model="editedItem.section"
                :items="sectionList"
                label="Section"
                variant="outlined"
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
                variant="outlined"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.password"
                label="Password"
                readonly
                variant="outlined"
                required
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
          @click="
            markEnrolled(
              selectedStudent.student_recno,
              selectedStudent.password
            )
          "
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

  <!-- <v-dialog v-model="viewFileDialog" max-width="600px">
    <v-card>
      <v-card-title>View Document</v-card-title>
      <v-card-text>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="viewFileDialog = false" color="primary">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->
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
    selectedStudent: {},
    selectedFile: null,
    viewFileDialog: false,
    props: [],
    // fileUrl: '',
    fileUrl: BGImage, // Use your local image here
    headers: [
      { title: "#", key: "index" },
      { title: "Full Name", align: "center", key: "full_name" },
      { title: "Grade Level", align: "center", key: "grade_level" },
      { title: "Student Status", align: "center", key: "student_type" },
      { title: "Enrollment Status", align: "center", key: "enrollment_status" },
      { title: "Actions", align: "center", sortable: false },
    ],
    lname: "",
    students: [],
    editedIndex: -1,
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
    imgDocs: [],
    selectedRows: [],
  }),

  computed: {
    displayedStudents() {
      const searchTerm = this.search.toLowerCase();
      return this.students.filter(
        (student) => student.enrollment_status == "Assessed"
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
        .filter((val) => val.grade_level == newGrade)
        .map((val) => val.section);
    },
    "editedItem.section"(section) {
      // Filter faculty based on the selected subject
      this.facultyName = this.allFaculty.filter(
        (faculty) => faculty.section === section
      );
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
      const year = new Date().getFullYear();
      axios
        .get("student")
        .then((res) => {
          // this.lname = res.data.student.last_name;
          this.students = res.data.student.map((student) => ({
            ...student,
            full_name:
              `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim(),
            address:
              `${student.houseNumber} ${student.street} ${student.barangay} ${student.city} ${student.province} ${student.zip_code} ${student.region}`.trim(),
            image: student.image.map((image) => ({
              docuType: image.file_type,
              image: `http://192.168.16.165:8000/uploads/profile/${image.image}`,
            })),
            password: `${student.last_name}SNA${year}`,
          }));
          console.log(this.students);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    },
    async getFaculty() {
      const res = await axios.get("getSec");
      this.allFaculty = res.data.data.map((faculty) => ({
        ...faculty,
        title: faculty.adviser.full_name,
        value: faculty.adviser_id,
        department: faculty.adviser.department,
      }));
    },

    toggleSelection(studentLrn, item) {
      console.log(item);
      this.selectedStudent = item;
      const index = this.selectedRows.indexOf(studentLrn);
      if (index > -1) {
        this.selectedRows.splice(index, 1); // Deselect if already selected
      } else {
        this.selectedRows.push(studentLrn); // Select if not selected
      }
    },

    markEnrolled(item, item2) {
      axios
        .put(`create/${item}`, {
          enrollment_status: "Enrolled",
          adviser_id: this.editedItem.adviser_id,
          password: item2,
          section: this.editedItem.section,
        })
        .then((res) => {
          let mess = res.data.message;
          Swal.fire({
            title: "Approved!",
            text: mess,
            icon: "success",
            customClass: {
              container: "sweet-alert-container",
            },
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000); //
          this.viewDialog = false;
        })
        .catch((err) => {
          this.viewDialog = false;
          console.error(err);
          Swal.fire({
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
        goodmoral: null,
      };

      // Map through item.image to populate imgDocs
      item.image.forEach((res) => {
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
          .then((res) => {})
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
      } else if (status === "Pending") {
        return "#FFB200"; // Default color
      } else {
        return "grey";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.studentInfCon {
  display: flex;
  gap: 2rem;
  .studentTable {
    flex: 0.5;
  }
  .studentInfo {
    flex: 0.5;
  }
}
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

.button-container {
  // display: flex;
  gap: 7px;
  align-items: center;
}
.button-container .v-btn:nth-child(1) {
  left: 0;
}
.button-container .v-btn:nth-child(2) {
  left: calc(100% / 50);
}
.button-container .v-btn:nth-child(3) {
  left: calc(200% / 50);
}
// .search{
//   width: 12vh;
// }
.v-table__wrapper {
  font-size: 0.6rem;
  .v-data-table-header__content {
    span {
      font-size: 12px !important;
    }
  }
}

.studentInfo {
  padding: 16px;
}

.v-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.v-divider {
  border-color: #e0e0e0;
}

.v-table {
  width: 100%;
  border-collapse: collapse;
}

.v-table th,
.v-table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.v-table th {
  background-color: #f1f1f1;
  text-align: left;
}

.v-table td {
  background-color: #ffffff;
}

.v-table tr:hover td {
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
}
</style>
