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
        <v-toolbar-title style="color: #2f3f64"
          >
          <v-btn  color="#28a745" variant="flat" dark @click="downloadXLS()">
            <v-icon left>mdi-download</v-icon>
            GENERATE REPORT
          </v-btn>
          </v-toolbar-title
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
      <tr
          :class="{ 'selected-row': selectedRows.includes(item.student_lrn) }"
          @click="toggleSelection(item.student_lrn, item)"
          style="cursor: pointer"
        >
        <td>{{ index + 1 }}</td>
        <td>{{ item.student_lrn }}</td>
        <td class="text-center">
          {{ item.last_name }} , {{ item.first_name }} {{ item.middle_name }}
          {{ item.extension }}
        </td>
        <td class="text-center">{{ item.grade_level }}</td>
        <td class="text-center">Incoming</td>
        <td class="text-center" :style="{ color: getStatusColor(item.enrollment_status) }">
          <v-chip>
            {{
            item.enrollment_status == "Verified" ||item.enrollment_status == "Assessed" ||item.enrollment_status == "Enrolled"
              ? item.enrollment_status
              : "For Assessement"
          }}
          </v-chip>
        </td>

        <td class="text-center">
          <v-btn
            color="success"
            dark
            v-bind="props"
            @click="assessItem(item, 'Confirm')"
            :disabled="item.enrollment_status === 'Assessed'"
            size="small"
          >
            <v-icon icon="mdi-check" start></v-icon>
            Assess
          </v-btn>
          <!-- <v-btn>Assessed</v-btn> -->
          <!-- <v-icon class="me-2" size="small" style="color: #2F3F64" @click="openViewDialog(item)">mdi-eye</v-icon> -->
          <!-- Archive Icon -->
          <!-- <v-icon class="me-2 " size="small" color="warning" @click="archiveItem(item)">mdi-archive</v-icon> -->
        </td>
      </tr>
    </template>

    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
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
          </v-col>
        </v-row>
      </v-card>
  </div>
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
    selectedRows: [],
    headers: [
      { title: "#", align: "start", key: "index" },
      { title: "Student LRN", align: "start", key: "student_lrn" },
      { title: "Full Name", align: "center", key: "full_name" },
      { title: "Grade Level", align: "center", key: "grade_lvl" },
      { title: "Student Status", align: "center", key: "stud_status" },
      { title: "Enrollment Status", align: "center", key: "enrollment_status" },
      { title: "Actions", sortable: false, align: "center" },
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
    },
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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add Student"
        : "Edit Student Information";
    },
    displayedStudents() {
      const searchTerm = this.search.toLowerCase();
      return this.students.filter((student) => student.enrollment_status == "Verified" 
        )
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
      }
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
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

    initialize() {
      axios.get("jhs").then((res) => {
        let tmp = res.data;
        this.students = tmp.student.map((stud)=>({
          ...stud,
          full_name: `${stud.first_name} ${(stud.middle_name ?? ' ')} ${stud.last_name} ${(stud.extension ?? ' ')}`,
          address:
          `${stud.houseNumber} ${stud.street} ${stud.barangay} ${stud.city} ${stud.province} ${stud.zip_code} ${stud.region}`.trim(),
        }));
        console.log(this.students);
      });
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    assessItem(item, action) {
      this.editedIndex = this.students.indexOf(item);
      console.log(this.editedIndex);
      Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, " + action + " it!",
        customClass: {
          container: "sweet-alert-container",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          if (action === "Confirm") {
            axios
              .put(`student/editstat/${item.student_recno}`, {
                enrollment_status: "Assessed",
              })
              .then((res) => {
                console.log(res.data);
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
                console.error(err);
              });
          }
        }
      });
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
      } else {
        return "#FFD35A"; // Default color
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
          "Student ID",
          "Student LRN",
          "Full Name",
          "Gender",
          "Grade Level",
          "Date Enrolled",
          "Student Status",
        ]);

        // Add data rows
        data.forEach((item) => {
          worksheet.addRow([
            item.student_id,
            item.student_lrn,
            item.full_name,
            item.sex_at_birth,
            item.grade_level,
            item.date_enrolled,
            item.stud_status,

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
        const data = this.students; // yung data nyo dito nyo lagay
        const excel = await this.convertExcel(data); // Make sure convertExcel is awaited

        if (excel instanceof ExcelJS.Workbook) {
          const buffer = await excel.xlsx.writeBuffer();
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Inventory.xlsx";
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
          "Student ID",
          "Student LRN",
          "Full Name",
          "Gender",
          "Grade Level",
          "Date Enrolled",
          "Student Status",
        ]);

        // Add data rows
        data.forEach((item) => {
          worksheet.addRow([
            item.student_id,
            item.student_lrn,
            item.full_name,
            item.sex_at_birth,
            item.grade_level,
            item.date_enrolled,
            item.stud_status,

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
        const data = this.students; // yung data nyo dito nyo lagay
        const excel = await this.convertExcel(data); // Make sure convertExcel is awaited

        if (excel instanceof ExcelJS.Workbook) {
          const buffer = await excel.xlsx.writeBuffer();
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Inventory.xlsx";
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
