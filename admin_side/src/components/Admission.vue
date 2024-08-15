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
          >STUDENT ADMISSION LIST
          <v-btn class="ml-5" color="#28a745" variant="flat" dark @click="downloadXLS()">
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
    <template v-slot:item="{ item }">
      <tr>
        <td class="text-center">{{ item.student_recno }}</td>
        <td class="text-center">{{ item.student_lrn }}</td>
        <td class="text-center">
          {{ item.last_name }} , {{ item.first_name }} {{ item.middle_name }}
          {{ item.extension }}
        </td>
        <td class="text-center">{{ item.sex_at_birth }}</td>
        <td class="text-center">{{ item.grade_level }}</td>
        <td class="text-center">Incoming</td>
        <td :style="{ color: getStatusColor(item.enrollment_status) }" class="text-center">
          {{
            item.enrollment_status == "Verified" || "Assessed" || "Enrolled"
              ? item.enrollment_status
              : "For Verification"
          }}
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
            Verify</v-btn
          >
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

  <!-- view user status modal pop -->
  <v-dialog v-model="viewDialog" max-width="800px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5 fw-bold m-1" style="color: #2f3f64">
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
                  <v-list-item-title class="text-subtitle-1"
                    >Student ID:</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    selectedStudent.student_id
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1"
                    >Full Name:</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    students.full_name
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1"
                    >Contact Number:</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    selectedStudent.contact_no
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1"
                    >Birthplace:
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    selectedStudent.birth_place
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1"
                    >Sex:
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    selectedStudent.sex_at_birth
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1"
                    >Religion:
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    selectedStudent.religion
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <hr />

            <v-row>
              <v-col cols="12" sm="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-subtitle-1"
                      >Address:
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ selectedStudent.street }}
                      {{ selectedStudent.barangay }},
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
  </v-dialog>
  <!-- end view user status modal pop -->
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    viewDialog: false,
    selectedStudent: null,
    selectedFile: null,
    editedItem: {
      grade_level: "",
      strand: "",
    },

    headers: [
      { title: "Student ID", align: "center", key: "student_id" },
      { title: "Student Lrn", align: "center", key: "lrn" },
      { title: "Full Name", align: "center", key: "full_name" },
      { title: "Gender", align: "center", key: "grade_lvl" },
      { title: "Grade Level", align: "center", key: "grade_lvl" },
      { title: "Student Status", align: "center", key: "status" },
      { title: "Status", align: "center", key: "status" },
      { title: "Actions", align: "center", sortable: false },
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
        ? "ADD STUDENT"
        : "Edit Student Information";
    },
    displayedStudents() {
      const searchTerm = this.search.toLowerCase();
      return this.students.filter((student) =>
        Object.values(student).some(
          (value) => value === "Pending" || value === "Assessed"
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
    "editedItem.grade_level"(newGrade) {
      if (["7", "8", "9", "10"].includes(newGrade)) {
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
                enrollment_status: "Verified",
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
            Swal.fire({
              title: "Approved!",
              text: "Your action has been approved.",
              icon: "success",
            });
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
        return "blue"; // Set color to yellow if status is 'pending'
      } else if (status == "Assessed" || "Enrolled") {
        return "green"; // Set color to green if status is 'enrolled'
      } else {
        return "red"; // Default color
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
            item.enrollement_status,
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
  color: #2f3f64;
}

.close-button:hover {
  color: red;
}

.button-container {
  // display: flex;
  gap: 7px;
  align-items: center
}
.button-container .v-btn:nth-child(1) { left: 0; }
.button-container .v-btn:nth-child(2) { left: calc(100% / 50); }
.button-container .v-btn:nth-child(3) { left: calc(200% / 50); }
</style>
