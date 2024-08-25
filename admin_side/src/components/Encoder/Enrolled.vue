<template>
    <v-container class="studentInfCon">
    <v-data-table
      :search="search"
      :headers="headers"
      :items="displayedStudents"
      :sort-by="[{ key: 'studentId', order: 'asc' }]"
      class="studentTable"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title
            class="text-h6 font-weight-black m-1 mr-3"
            style="color: #2f3f64"
            >STUDENT MASTER LIST
          </v-toolbar-title> -->

          <div style="width: 15vw">
            <v-text-field
              v-model="search"
              class="w-auto mr-5"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
            ></v-text-field>
          </div>
          <!-- <v-divider class="mx-2" inset vertical></v-divider> -->
        
        <v-select
          clearable
          label="Grade Level"
          :items="gradeLevels"
          v-model="selectedGrade"
          variant="solo-filled"
          class="mr-2 m-auto"
          @update:modelValue="onGradeLevelChange"
        ></v-select>

        <v-select
          clearable
          label="Section"
          :items="currentSections"
          v-model="selectedSection"
          variant="solo-filled"
          class="mr-2 m-auto"
        ></v-select>

        <v-btn class="ml-5" color="#28a745" variant="flat" dark @click="downloadXLS()">
            <v-icon left>mdi-download</v-icon>
            GENERATE REPORT
          </v-btn>

          <!-- create new popup modal -->
        </v-toolbar>
      </template>
      <template v-slot:item="{ item, index }">
        <tr
          :class="{ 'selected-row': selectedRows.includes(item.student_lrn) }"
          @click="toggleSelection(item.student_lrn, item)"
          style="cursor: pointer"
        >
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ item.student_id }}</td>
          <td class="text-center">
              {{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}
              {{ item.extension }}
          </td>
          <td class="text-center">{{ item.section }}</td>
          <td class="text-center">{{ item.grade_level }}</td>
          <td class="text-center">{{ item.student_type }}</td>
          <td class="text-center" :style="{ color: getStatusColor(item.enrollment_status) }">
            <v-chip>
              {{ item.enrollment_status }}
            </v-chip>
          </td>
          <td class="text-center">{{ item.enrollment_date }}</td>
          <!-- <td class="text-center">
            <v-btn class="bg-blue small-button" @click="openViewDialog(item)">
              <v-icon icon="mdi-eye" start></v-icon>View</v-btn
            >
          </td> -->
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
              <v-col cols="3">
                <v-text-field
                  v-model="selectedStudent.sex_at_birth"
                  label="Gender"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="selectedStudent.birth_date"
                  label="Birthdate"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="5">
              <v-text-field
                v-model="selectedStudent.religion"
                label="Religion"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            </v-row>
            <h1
              class="fw-regular fs-5 d-flex align-items-center mt-4 mb-4"
              style="color: var(--dark)"
            >
              Current Address
            </h1>
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
                v-model="selectedStudent.student_lrn"
                label="LRN"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="selectedStudent.grade_level"
                  label="Grade level"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
              <v-text-field
                v-model="selectedStudent.section"               
                label="Section"
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
            <v-col cols="12">
              <v-text-field
                v-model="selectedStudent.adviser_id"
                label="Adviser"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12">
              <v-text-field
                v-model="selectedStudent.password"
                label="Password"
                readonly
                variant="outlined"
              ></v-text-field>
            </v-col> -->
          </v-row>
            <v-row>
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
                    class="text-center fs-6 fw-bold"
                    style="background-color: var(--dark); color: white"
                  >
                    Document
                  </th>
                  <th
                    class="text-center fs-6 fw-bold"
                    style="background-color: var(--dark); color: white"
                  >
                    Status
                  </th>
                  <th
                    class="text-center fs-6 fw-bold"
                    style="background-color: var(--dark); color: white"
                  >
                    Action
                  </th>
                  <!-- <th class="text-left">Actions</th> -->
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td>Birth Certificate / PSA</td>
                  <td>{{ selectedStudent.psa }}</td>
                  <td @click="openViewFile(imgDocs.psa)" class="fs-6 fw-bolder" style="color: var(--dark);cursor: pointer;">
                    View
                  </td>
                  <!-- <td @click="openViewFile(imgDocs.tor)" style="cursor: pointer; color: blue;">View</td> -->
                </tr>
                <tr class="text-center">
                  <td>Form 137</td>
                  <td>{{ selectedStudent.tor }}</td>
                  <td @click="openViewFile(imgDocs.tor)" class="fs-6 fw-bolder" style="color: var(--dark);cursor: pointer;">
                    View
                  </td>
                  <!-- <td @click="openViewFile(imgDocs.tor)" style="cursor: pointer; color: blue;">View</td> -->
                </tr>
                <tr class="text-center">
                  <td>Good Moral</td>
                  <td>{{ selectedStudent.goodmoral }}</td>
                  <td @click="openViewFile(imgDocs.goodmoral)" class="fs-6 fw-bolder" style="color: var(--dark);cursor: pointer;">
                    View
                  </td>
                  <!-- <td @click="openViewFile(imgDocs.tor)" style="cursor: pointer; color: blue;">View</td> -->
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <v-dialog v-model="viewFileDialog" max-width="1000px">
    <v-card>
      <v-card-title style="background-color: var(--dark);color: white;">DOCUMENT</v-card-title>
      <v-card-text>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="viewFileDialog = false" class="bg-red">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-container>


</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import ExcelJS from "exceljs";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    viewDialog: false,
    selectedStudent: {},
    selectedFile: null,
    viewFileDialog: false,
    status: "",
    headers: [
      { title: "#", key: "index" },
      { title: "Student ID.", align: "center",key: "student_id" },
      { title: "Full Name", align: "center", key: "full_name" },
      { title: "Section", align: "center", key: "section" },
      { title: "Grade", align: "center", key: "grade_level" },
      { title: "Student Status", align: "center", key: "status" },
      { title: "Enrollment Status", align: "center", key: "status" },
      { title: "Date Enrolled", align: "center", key: "date" },
      // { title: "Actions", align: "center", sortable: false },
    ],

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
      password: "",
    },
    imgDocs: [],
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
      password: "",
    },
    selectedRows: [],
    facultyName : [],
    selectedGrade: null,
    gradeLevels: [
        { value: "7", title: "Grade 7", text: "Grade 7" },
        { value: "8", title: "Grade 8", text: "Grade 8" },
        { value: "9", title: "Grade 9" },
        { value: "10", title: "Grade 10" },
        { value: "11", title: "Grade 11" },
        { value: "12", title: "Grade 12" },
      ],
    selectedSection: null, 
    currentSections: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add Student"
        : "Edit Student Information";
    },
    displayedStudents() {
      // const searchTerm = this.search.toLowerCase();
      var students = this.students.filter((student) => student.enrollment_status == 'Enrolled');

      if(this.selectedGrade) {
        students = students.filter((student) => student.grade_level == this.selectedGrade);
      }

      if(this.selectedSection) {
        students = students.filter((student) => student.section == this.selectedSection);
      }

      return students
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
    this.getFaculty();
  },

  methods: {
    initialize() {
      axios.get("student").then((res) => {
        let tmp = res.data;
        this.students = tmp.student;
        console.log(this.students);

        // Format full name and adjust strand property
        this.students.forEach((student) => {
          // Format full name
          student.full_name =
            `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim();
          student.address =
          `${student.houseNumber} ${student.street} ${student.barangay} ${student.city} ${student.province} ${student.zip_code} ${student.region}`.trim();
          // Check grade level and adjust strand property
          if (student.grade_level <= 10) {
            delete student.strand;
          }
        });
      });
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

    async getFaculty(){
      const res = await axios.get('faculty');
      this.allFaculty  = res.data.faculty.map((faculty)=>({
        title: `${faculty.fname} ${faculty.mname} ${faculty.lname} ${faculty.extension}`,
        value: faculty.id,
        department: faculty.department
      }));
      console.log(this.facultyName);
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

    // triggerFileInput() {
    //   this.$refs.fileInput.click();
    // },

    // handleFileUpload(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     this.selectedFile = file;
    //   }
    // },
    close() {
      this.dialog = false;
      this.selectedFile = null;
    },
    openViewFile(fileUrl) {
      // this.fileUrl = fileUrl;
      this.viewFileDialog = true;
      this.fileUrl = fileUrl || BGImage;
    },
    save() {
      console.log(this.selectedFile);
      this.dialog = false;
      this.selectedFile = null;
    },

    onGradeLevelChange() {
      this.selectedSection = null
      switch (this.selectedGrade) {
        case '7':
          this.currentSections = [
            { value: "St. Anne", title: "St. Anne" },
            { value: "St. Whacky", title: "St. Whacky" }
          ]
          break;
        case '8':
          this.currentSections = [
            { value: "St. Maximillian", title: "St. Maximillian" },
            { value: "St. Denris", title: "St. Denris" }
          ]
          break;
        case '9':
          this.currentSections = [
            { value: "St. Pedro Calungsod", title: "St. Pedro Calungsod" },
            { value: "St. Matthew", title: "St. Matthew" }
          ]
          break;
        case '10':
          this.currentSections = [
            { value: "St. Kevin", title: "St. Kevin" },
            { value: "St. Matthew", title: "St. Matthew" }
          ]
          break;
        case '11':
          this.currentSections = [
            { value: "St. Helena", title: "St. Helena" },
            { value: "St. Joseph", title: "St. Joseph" }
          ]
          break;
        case '12':
          this.currentSections = [
            { value: "St. Segrewel", title: "St. Segrewel" },
            { value: "St. Peter", title: "St. Peter" },
            { value: "St. Joseph", title: "St. Joseph" }
          ]
          break;
      
        default:
          this.currentSections = []
          break;
      }
    },


    openViewDialog(item) {
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
      if (!this.validateForm()) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all required fields!",
          customClass: {
            container: "sweet-alert-container",
          },
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
        return "green"
      }
    },
    getRouterLink(status) {
      if (status === "Verifying") {
        return { name: "/Veryfying" }; // Replace 'VerifiedRoute' with your route name
      } else {
        return null;
      }
    },

    async convertExcel(data) {
      const excel = new ExcelJS.Workbook();
      const worksheet = excel.addWorksheet("Account");

      try {
        const imageResponse = await fetch("/src/assets/schoolLogo.png");
        const imageBlob = await imageResponse.blob();
        const imageBase64 = await this.blobToBase64(imageBlob);

        const logo = excel.addImage({
          base64: imageBase64,
          extension: "png",
        });

        worksheet.addImage(logo, {
          tl: { col: 0, row: 0 },
          ext: { width: 180, height: 120 },
          editAs: "absolute",
        });

        worksheet.addImage(logo, {
          tl: { col: 7, row: 0 },
          ext: { width: 180, height: 120 },
          editAs: "absolute",
        });

        worksheet.mergeCells("A2:J2");
        worksheet.getCell("A2").value = "Saint Nicholas Academy";
        worksheet.getCell("A2").alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("A2").font = { size: 16, bold: true };

        worksheet.addRow();

        worksheet.mergeCells("A3:J3");
        worksheet.getCell("A3").value = "Address";
        worksheet.getCell("A3").alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("A3").font = { size: 12 };

        worksheet.mergeCells("A4:J4");
        worksheet.getCell("A4").value = "Contact No";
        worksheet.getCell("A4").alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("A4").font = { size: 12 };

        worksheet.addRow(); // Add an empty row for separation

        // Add column headers
        worksheet.addRow([
          "Student Number",
          "Full Name",
          "Section",
          "Date Enrolled",
          "Student Status",
        ]);

        // Add data rows
        data.forEach((item) => {
          worksheet.addRow([
            item.student_id,
            item.full_name,
            item.section,
            item.enrollment_date,
            item.enrollment_status,
          ]);
        });

        return excel; // Return the excel workbook
      } catch (error) {
        console.error("Error in convertExcel:", error);
      }
    },

    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]); // Split to get base64 part
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    },

    async downloadXLS() {
      try {
        var students = this.students.filter((student) => student.enrollment_status == 'Enrolled');

        if(this.selectedGrade) {
          students = students.filter((student) => student.grade_level == this.selectedGrade);
        }
        
        if(this.selectedSection) {
          students = students.filter((student) => student.section == this.selectedSection);
        }

        const data = students; // yung data nyo dito nyo lagay
        const excel = await this.convertExcel(data); // Make sure convertExcel is awaited

        if (excel instanceof ExcelJS.Workbook) {
          const buffer = await excel.xlsx.writeBuffer();
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Student_OfficialyEnrolled_Masterlist.xlsx";
          a.click();
          window.URL.revokeObjectURL(url);

          Swal.fire({
            title: "Download Success!",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          console.error("Invalid ExcelJS.Workbook instance");
        }
      } catch (error) {
        console.error("Error downloading XLS:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.studentInfCon {
  display: flex;
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
