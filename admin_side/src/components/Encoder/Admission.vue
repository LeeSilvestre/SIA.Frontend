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

          <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

          <!-- create new popup modal -->
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
                  <td>Birth Certificate / PSA</td>
                  <td>{{ selectedStudent.psa }}</td>
                  <td>
                    <v-btn
                      @click="openViewFile(imgDocs.psa)"
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
                      @click="openViewFile(imgDocs.tor)"
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
                      @click="openViewFile(imgDocs.goodmoral)"
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

  <v-dialog v-if="download == 'PDF'" v-model="filterDialog" max-width="500">
      <v-card>
        <v-card-title>Filter Report by Grade Level</v-card-title>
        <v-card-text>
          <v-form ref="filterForm">
            <v-combobox
              v-model="filter.selectedGrade"
              :items="gradeLevels"
              label="Grade Level"
            ></v-combobox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="generateReport">Generate Report</v-btn>
          <v-btn color="error" @click="filterDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
// import ExcelJS from "exceljs";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
  data: () => ({
    download: "",
    gradeLevels: ["Grade 1", "Grade 2", "Grade 3", "Grade 4"],
    filterDialog: false,
    search: "",
    dialog: false,
    dialogDelete: false,
    viewDialog: false,
    viewFileDialog: false,
    selectedStudent: {},
    selectedFile: null,
    props: [],
    editedItem: {
      grade_level: "",
      strand: "",
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
    imgDocs: [],
    fileUrl: null,
  }),

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
    openViewFile(fileUrl) {
      // this.fileUrl = fileUrl;
      console.log(fileUrl);
      this.viewFileDialog = true;
      this.fileUrl = fileUrl || BGImage;
    }, 

    toggleSelection(studentLrn, item) {
      console.log(item);

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
            full_name: `${student.first_name} ${(student.middle_name ?? ' ')} ${student.last_name} ${(student.extension ?? ' ')}`,
            address:
              `${student.houseNumber} ${student.street} ${student.barangay} ${student.city} ${student.province} ${student.zip_code} ${student.region}`.trim(),
            image: student.image.map((image) => ({
              docuType: image.file_type,
              image: `http://192.168.181.165:8000/uploads/profile/${image.image}`,
              // image: `http://192.168.16.165:8000/uploads/profile/${image.image}`,
              // image: `http://192.168.181.165:8000/uploads/profile/${image.image}`,
              // image: `http://26.81.173.255:8000/uploads/profile/${image.image}`,
            })),
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
    
    async generateReport() {
      if (this.reportType === 'PDF') {
        await this.downloadPDF();
      } else if (this.reportType === 'EXCEL') {
        await this.downloadXLS();
      }
      this.filterDialog = false;
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

    async convertExcel(data) {
      const excel = new ExcelJS.Workbook();
      const worksheet = excel.addWorksheet("Items");

      try {
        // Fetch image and convert to base64
        const imageResponse = await fetch('/src/assets/SNA Logo no BG.png');
        const imageBlob = await imageResponse.blob();
        const imageBase64 = await this.blobToBase64(imageBlob);

        const logo = excel.addImage({
          base64: imageBase64,
          extension: 'png'
        });

        worksheet.getCell('A6').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF' } // White background color
        };

        for (let col = 1; col <= 9; col++) { // Columns A to I
          const cell = worksheet.getCell(6, col);
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF' } // White background color
          };
        }

        // Make sure other parts of the code remain unchanged
        worksheet.addImage(logo, {
          tl: { col: 1, row: 0 }, // Starting at B1 (col: 1, row: 0)
          ext: { width: 180, height: 120 },
          editAs: 'absolute'
        });

        worksheet.addImage(logo, {
          tl: { col: 7, row: 0 }, // Starting at H1 (col: 7, row: 0)
          ext: { width: 180, height: 120 },
          editAs: 'absolute'
        });

        worksheet.mergeCells('B1:C4');  // Left logo space
        worksheet.mergeCells('H1:I4');  // Right logo space
        worksheet.mergeCells('D1:G2');  // Title space
        worksheet.mergeCells('D3:G4');  // Subtitle space
        worksheet.mergeCells('D5:G6');  // Date space

        const titleCell = worksheet.getCell('D1');
        titleCell.value = "School Name";
        titleCell.font = { size: 16, bold: true };
        titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

        const subtitleCell = worksheet.getCell('D3');
        subtitleCell.value = "Items Report";
        subtitleCell.font = { size: 12, bold: true };
        subtitleCell.alignment = { horizontal: 'center', vertical: 'middle' };

        const dateCell = worksheet.getCell('D5');
        dateCell.value = `As of: ${new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila', year: 'numeric', month: 'long', day: 'numeric' })}`;
        dateCell.font = { size: 12, bold: true };
        dateCell.alignment = { horizontal: 'center', vertical: 'middle' };

        worksheet.getRow(1).height = 40; // Adjust as needed
        worksheet.getRow(3).height = 40; // Adjust as needed
        worksheet.getRow(5).height = 40; // Adjust as needed
        worksheet.addRow();

        // Define starting row for items
        const startRow = 7;  // You can adjust this as needed

        // Add column headers for items
        const headers = [
          'Student LRN',
          'Full Name',
          'Grade Level',
          'Student Status',
        ];

        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '4167B8' }
          };
          cell.font = { color: { argb: 'FFFFFF' }, bold: true };
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        // Add data rows starting from the defined row
        data.forEach((item) => {
          const row = worksheet.addRow([
            item.studentLrn,
            item.full_name,
            item.grade_level,
            item.student_type,
          ]);
        });

        // Adjust column widths based on the data
        worksheet.columns.forEach((column) => {
          const maxLength = column.values.reduce((acc, val) => {
            const length = val ? val.toString().length : 0;
            return Math.max(acc, length);
          }, 5);
          column.width = Math.min(maxLength + 2, 15); // Reduce padding and set a maximum width
        });

        return excel; // Return the excel workbook
      } catch (error) {
        console.error('Error in convertExcel:', error);
      }
    },


    async downloadXLS() {
      try {
        const data = this.applyFilters(this.itemsList);
        const excel = await this.convertExcel(data); // Make sure convertExcel is awaited
        if (excel instanceof ExcelJS.Workbook) {
          const buffer = await excel.xlsx.writeBuffer();
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Inventory.xlsx';
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Invalid ExcelJS.Workbook instance');
        }
      } catch (error) {
        console.error('Error downloading XLS:', error);
      }
    },

    async convertPDF(data) {
      const doc = new jsPDF();

      // Fetch image and convert to base64
      const imageResponse = await fetch('/src/assets/schoolLogo3.png');
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



      const headers = [
        ['Student LRN',
          'Full Name',
          'Grade Level',
          'Student Status',]
      ];

      const rows = data.map(item => [
            item.studentLrn,
            item.full_name,
            item.grade_level,
            item.student_type,
      ]);

      // Add the table to the PDF
      doc.autoTable({
        head: headers,
        body: rows,
        startY: 90,
        theme: 'striped',

        startY: 50, 
      });

      return doc;
    },




    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Split to get base64 part
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    },

    async downloadPDF() {
      try {
        const data = this.applyFilters(this.itemsList);
        const pdf = await this.convertPDF(data);
        pdf.save('ItemsReport.pdf');

        Swal.fire({
          title: 'Download Success!',
          icon: 'success',
          confirmButtonText: 'OK'
        });

      } catch (error) {
        console.error('Error in downloadPDF:', error);
      }
    },

  }
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
