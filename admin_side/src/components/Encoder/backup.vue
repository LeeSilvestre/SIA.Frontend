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
          <v-toolbar-title class="font-weight-black" style="color: #2f3f64">
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn color="primary" style="margin: 10px;" variant="flat" dark v-bind="props">
                  GENERATE REPORT <v-icon right>mdi-download</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item @click="prepareReport('PDF')">
                  <v-icon left>mdi-download</v-icon>
                  PDF
                </v-list-item>
                <v-list-item @click="prepareReport('EXCEL')">
                  <v-icon left>mdi-download</v-icon>
                  EXCEL
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar-title>
          <div style="width: 25vw">
            <v-text-field
              v-model="search"
              class="search mr-1"
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
          <!-- <td>{{ index + 1 }}</td> -->
          <td class="text-center">{{ item.student_lrn }}</td>
          <td class="text-center">
            {{ item.last_name }} , {{ item.first_name }} {{ item.middle_name }}
            {{ item.extension }}
          </td>
          <!-- <td class="text-center">{{ item.sex_at_birth }}</td> -->
          <td class="text-center">{{ item.grade_level }}</td>
          <td class="text-center">Incoming</td>
          <td
            class="text-center"
            :style="{ color: getStatusColor(item.enrollment_status) }"
          >
            <v-chip>
              {{ item.enrollment_status }}
            </v-chip>
          </td>

          <td class="text-center">
            <v-btn
              color="success"
              dark
              v-bind="props"
              @click="assessItem(item, 'Confirm')"
              :disabled="
                item.enrollment_status === 'Assessed' ||
                item.enrollment_status === 'Verified'
              "
              size="small"
            >
              <v-icon icon="mdi-check" start></v-icon>
              <span
                v-if="
                  item.enrollment_status == 'Assessed' ||
                  item.enrollment_status === 'Verified'
                "
                >Admitted</span
              >
              <span v-else>Admit</span>
            </v-btn>
          </td>
          <!-- <v-icon class="me-2" size="small" style="color: #2F3F64" @click="openViewDialog(item)">mdi-eye</v-icon> -->
          <!-- Archive Icon -->
          <!-- <v-icon class="me-2 " size="small" color="warning" @click="archiveItem(item)">mdi-archive</v-icon> -->
        </tr>
      </template>

      <!-- <template v-slot:no-data>
        <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
      </template> -->
    </v-data-table>

    
    <v-dialog v-model="filterDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Filter Report</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="filter.selectedGrade"
            :items="gradeLevels"
            label="Filter by Grade"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="generateReport">Generate Report</v-btn>
          <v-btn text @click="filterDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


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
                  <td>Good Moral / PSA</td>
                  <td>{{ selectedStudent.psa }}</td>
                  <td>
                    <v-btn
                      @click="openDocument"
                      size="small"
                      style="background-color: var(--dark); color: white"
                    >
                      <v-icon icon="mdi-eye" start></v-icon>
                      View</v-btn
                    >
                  </td>
                  <!-- <td @click="openViewFile(imgDocs.tor)" style="cursor: pointer; color: blue;">View</td> -->
                </tr>
                <tr class="text-center">
                  <td>Form 137</td>
                  <td>{{ selectedStudent.tor }}</td>
                  <td>
                    <v-btn
                      @click="openDocument"
                      size="small"
                      style="background-color: var(--dark); color: white"
                    >
                      <v-icon icon="mdi-eye" start></v-icon>
                      View</v-btn
                    >
                  </td>
                  <!-- <td @click="openViewFile(imgDocs.tor)" style="cursor: pointer; color: blue;">View</td> -->
                </tr>
                <tr class="text-center">
                  <td>Good Moral</td>
                  <td>{{ selectedStudent.goodmoral }}</td>
                  <td>
                    <v-btn
                      @click="openDocument"
                      size="small"
                      style="background-color: var(--dark); color: white"
                    >
                      <v-icon icon="mdi-eye" start></v-icon>
                      View</v-btn
                    >
                  </td>
                  <!-- <td @click="openViewFile(imgDocs.tor)" style="cursor: pointer; color: blue;">View</td> -->
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
  <!-- view user status modal pop -->
  <!-- <v-dialog v-model="viewDialog" max-width="800px">
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
  </v-dialog> -->
  <!-- end view user status modal pop -->

</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as ExcelJS from 'exceljs';

export default {
  data: () => ({
    download: null,
    gradeLevels: [
        'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
        'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
      ],
    filterDialog: false,
    search: "",
    dialog: false,
    dialogDelete: false,
    viewDialog: false,
    selectedStudent: {},
    selectedFile: null,
    props: [],
    editedItem: {
      grade_level: "",
      strand: "",
    filter: {
      selecedGrad: null
    }
  },

    headers: [
      // { title: "#", align: "start", key: "index" },
      { title: "Student Lrn", align: "start", key: "student_lrn" },
      { title: "Full Name", align: "center", key: "full_name" },
      // { title: "Gender", align: "center", key: "sex_at_birth" },
      { title: "Grade Level", align: "center", key: "grade_level" },
      { title: "Student Status", align: "center", key: "student_type" },
      { title: "Status", align: "center", key: "enrollment_status" },
      // { title: "Actions", align: "center",sortable: false },
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
      houseNumber: "",
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
      houseNumber: "",
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
    hoverRow: null,
    selectedRows: [],
    filter: {
        selectedGrade: "",
      },
  }),

  methods: {
    prepareReport(format) {
      if (format === 'PDF') {
        this.generatePDF();
      } else if (format === 'EXCEL') {
        this.generateExcel();
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "ADD STUDENT"
        : "Edit Student Information";
    },
    displayedStudents() {
      const searchTerm = this.search.toLowerCase();
      return this.students.filter(
        (student) => student.enrollment_status == "Pending"
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

        "editedItem.grade_level"(newGrade) {
      if (["7", "8", "9", "10"].includes(newGrade)) {
      }
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
      axios
        .get("student")
        .then((res) => {
          this.students = res.data.student.map((student) => ({
            ...student,
            full_name:
              `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim(),
            address:
              `${student.houseNumber} ${student.street} ${student.barangay} ${student.city} ${student.province} ${student.zip_code} ${student.region}`.trim(),
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

    prepareReport(item) {
      this.reportType = item;
      this.filterDialog = true; // Open the filter dialog
    },
    
    prepareReport(type) {
      this.reportType = type;
      this.filterDialog = true;
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

    handleViewIconClick(item) {
      this.$emit("view-student", item);
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

    prepareReport(type) {
          this.reportType = type;
          this.filterDialog = true; 
        },

    async generateReport() {
      if (this.reportType === 'PDF') {
        await this.downloadPDF();
      } else if (this.reportType === 'EXCEL') {
        await this.downloadXLS();
      }
      this.filterDialog = false;
    },


    async downloadXLS() {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Student Report');


        const imageResponse = await fetch('/src/assets/SNA Logo no BG.png');
        const imageBlob = await imageResponse.blob();
        const imageBase64 = await this.blobToBase64(imageBlob);

        const imageId = workbook.addImage({
            base64: imageBase64,
            extension: 'png',
        });
        worksheet.addImage(imageId, {
            tl: { col: 0, row: 0 },
            ext: { width: 150, height: 150 },
            editAs: "absolute",
        });

        worksheet.mergeCells('A2:E2');
        worksheet.getCell('A2').value = 'Saint Nicholas Academy';
        worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('A2').font = { size: 16, bold: true };


        worksheet.mergeCells('A3:E3');
        worksheet.getCell('A3').value = 'Address';
        worksheet.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('A3').font = { size: 12 };


        worksheet.mergeCells('A4:E4');
        worksheet.getCell('A4').value = 'Contact No';
        worksheet.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('A4').font = { size: 12 };


        worksheet.mergeCells('A5:E5');
        worksheet.getCell('A5').value = `As of: ${new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila', year: 'numeric', month: 'long', day: 'numeric' })}`;
        worksheet.getCell('A5').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('A5').font = { size: 12 };

        worksheet.addRow([]);


        worksheet.getRow(8).values = [
            'Student LRN',
            'Full Name',
            'Grade Level',
            'Student Status',
            'Status'
        ];
    
        worksheet.getRow(9).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4F81BD' }
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

        worksheet.columns = [
            { key: 'student_lrn', width: 20 },
            { key: 'full_name', width: 30 },
            { key: 'grade_level', width: 15 },
            { key: 'student_type', width: 20 },
            { key: 'enrollment_status', width: 15 },
        ];

        // Add rows with alternating colors starting from row 14
        this.displayedStudents.forEach((student, index) => {
            const row = worksheet.addRow({
                student_lrn: student.student_lrn,
                full_name: student.full_name,
                grade_level: student.grade_level,
                student_type: student.student_type,
                enrollment_status: student.enrollment_status,
            });

            const fillColor = index % 2 === 0 ? 'FFDBE5F1' : 'FFFFFFFF'; // Alternating row color
            row.eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: fillColor }
                };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });
        });

        worksheet.views = [{ state: 'frozen', ySplit: 9 }];

        // Create a buffer and save the Excel file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Student_Report.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);

        Swal.fire({
            title: 'Download Success!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error('Error in downloadXLS:', error);
    }
},


    async  downloadPDF() {
      const doc = new jsPDF();

      const imageResponse = await fetch('/src/assets/SNA Logo no BG.png');
      const imageBlob = await imageResponse.blob();
      const imageBase64 = await this.blobToBase64(imageBlob);

      // Add the image
      doc.addImage(imageBase64, 'PNG', 25, 10, 40, 40); 


      // Add the school name and other info
      doc.setFontSize(12);
      doc.text('Saint Nicholas Academy', 105, 20, null, null, 'center');
      doc.setFontSize(12);
      doc.text('Address', 105, 30, null, null, 'center');
      doc.text('Contact No', 105, 35, null, null, 'center');
      doc.text(`As of: ${new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila', year: 'numeric', month: 'long', day: 'numeric' })}`, 105, 40, null, null, 'center');


      // Create table data
      const tableData = this.displayedStudents.map(student => [
        student.student_lrn,
        student.full_name,
        student.grade_level,
        student.student_type,
        student.enrollment_status,
      ]);

      // Define table columns
      const tableColumns = [
        { header: "Student LRN", dataKey: "student_lrn" },
        { header: "Full Name", dataKey: "full_name" },
        { header: "Grade Level", dataKey: "grade_level" },
        { header: "Student Status", dataKey: "student_type" },
        { header: "Status", dataKey: "enrollment_status" },
      ];

      // Add a table to the PDF
      doc.autoTable({
        head: [tableColumns.map(col => col.header)],
        body: tableData,
        startY: 60, // Adjust the Y position to avoid overlap with title
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        margin: { horizontal: 14 },
      });

      // Save the PDF
      doc.save("Student_Report.pdf");

      Swal.fire({
          title: 'Download Success!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
    },

    blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // Split to get base64 part
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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
