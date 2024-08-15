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
          >STUDENT ASSESMENT LIST
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
        <v-dialog v-model="dialog" max-width="1000px">
          <v-card>
            <v-card-title
              ><span class="text-h5 fw-bold m-2" style="color: #2f3f64">{{
                formTitle
              }}</span></v-card-title
            >
            <v-card-text>
              <label class="fw-light">PERSONAL INFORMATION</label>
              <v-container>
                <v-row dense>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.student_lrn"
                      label="LRN"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.last_name"
                      label="Last Name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.first_name"
                      label="First Name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.middle_name"
                      label="Middle Name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.contact_no"
                      label="Contact no."
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.birth_date"
                      label="Date of Birth dd/mm/yy"
                      type="date"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.sex_at_birth"
                      :items="['Male', 'Female']"
                      label="SEX"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.religion"
                      label="Religion"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.region"
                      :items="[
                        'Region I',
                        'Region II',
                        'Region III',
                        'Region IV-A',
                        'Region IV-B',
                        'Region V',
                        'Region VI',
                        'Region VII',
                        'Region VIII',
                        'Region IX',
                        'Region X',
                        'Region XI',
                        'Region XII',
                        'Region XIII',
                        'BARMM',
                        'CAR',
                      ]"
                      label="Region"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.province"
                      label="Province"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.city"
                      label="City"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.barangay"
                      :items="[
                        'East Bajac-Bajac',
                        'West Bajac-Bajac',
                        'Sta. Rita',
                        ' Pag-asa',
                        'Kalalake',
                        'Kababae',
                        'Mabayuan',
                      ]"
                      label="Barangay"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.street"
                      label="Street"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.houseNumber"
                      label="House Number"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.zip_code"
                      label="Zip Code"
                      required
                    ></v-text-field>
                  </v-col>

                  <!-- other info -->
                </v-row>
                <hr />
                <label class="fw-light mb-3">ACADEMIC INFORMATION</label>
                <v-row>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.adviser_id"
                      label="Adviser"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.section"
                      :items="[
                        'St. Anne',
                        'St. Bernadette',
                        'St. Charles',
                        'St. Elizabeth',
                        'St. Faustina',
                        'St. George',
                        'St. Pedro Calungsod',
                        'St. Lorenzo Ruiz',
                        'St. Gabriel',
                        'St. Michael',
                        'St. Raphael',
                        'St. Patrick',
                        'St. Scholastica',
                        'St. Homobonus',
                        'St. Helena',
                        'St. Louise',
                        'St. Stephen',
                        'St. Vincent',
                        'St. Catherine',
                        'St. Albertus',
                        'St. Benedict',
                        'St. Maximillian',
                        'St. Peter',
                        'St. Thomas',
                        'St. Isidore',
                        'St. Joseph',
                      ]"
                      label="Section"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.strand"
                      :items="['HUMSS', 'STEM', 'HE', 'ABM', 'GAS']"
                      label="Strand"
                      required
                      :disabled="
                        ['7', '8', '9', '10'].includes(editedItem.grade_level)
                      "
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-select
                      v-model="editedItem.grade_level"
                      :items="['7', '8', '9', '10', '11', '12']"
                      label="Grade"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.year"
                      label="S.Y."
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.guardian"
                      label="Guardian Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.guardian_mobileno"
                      label="Guardian Mobile #"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="6">
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-btn color="primary" @click="triggerFileInput"
                >Attach File</v-btn
              >
              <input
                type="file"
                ref="fileInput"
                @change="handleFileUpload"
                style="display: none"
              />
              <v-chip v-if="selectedFile" class="ma-2" color="primary" dark>
                {{ selectedFile.name }}
              </v-chip>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"
                >Cancel</v-btn
              >
              <v-btn color="blue-darken-1" variant="text" @click="save"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item, index}">
      <tr>
        <td class="text-center">{{ index + 1 }}</td>
        <td class="text-center">{{ item.student_lrn }}</td>
        <td class="text-center">
          {{ item.last_name }} , {{ item.first_name }} {{ item.middle_name }}
          {{ item.extension }}
        </td>
        <td class="text-center">{{ item.grade_level }}</td>
        <td class="text-center">Incoming</td>
        <td :style="{ color: getStatusColor(item.enrollment_status) }">
          <v-chip>
            {{
            item.enrollment_status == "Verified" ||item.enrollment_status == "Assessed" ||item.enrollment_status == "Enrolled"
              ? item.enrollment_status
              : "For Assessement"
          }}
          </v-chip>
        </td>

        <td class="text-center">
          <v-btn class="ma-2" color="primary" @click="openViewDialog" size="small">
            <v-icon icon="mdi-eye" start></v-icon>
            View
          </v-btn>
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

  <!-- view user status modal pop -->
  <v-dialog v-model="viewDialog" max-width="800">
    <v-card>
      <div style="background-color: var(--dark); color: white">
        <v-card-title class="dialog-title fs-3 font-weight-black">
          STUDENT INFORMATION
        </v-card-title>
      </div>

      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="selectedStudent.student_id"
                label="Student ID"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="selectedStudent.student_lrn"
                label="LRN"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="selectedStudent.grade_level"
                label="Grade Level"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                v-model="selectedStudent.full_name"
                label="Full Name"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.contact_no"
                label="Contact Number"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.sex_at_birth"
                label="Sex"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.birth_place"
                label="Birthplace"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="selectedStudent.religion"
                label="Religion"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                v-model="selectedStudent.street"
                label="Address"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

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
  <!-- end view user status modal pop -->
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
    selectedStudent: null,
    selectedFile: null,
    headers: [
      { title: "#", align: "center", key: "index" },
      { title: "Student LRN", align: "center", key: "student_lrn" },
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
      return this.students.filter((student) =>
        Object.values(student).some(
          (value) => value === "Verified" || value === "Assessed"
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
        this.editedItem.strand = "N/A";
      }
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("jhs").then((res) => {
        let tmp = res.data;
        this.students = tmp.student;
        console.log(this.students);
      });
      this.students.forEach((student) => {
        student.full_name =
          `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim();
        if (student.grade_level < 11 || student.grade_level > 12) {
          // Remove the strand property
          student.strand = "N/A";
        }
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
