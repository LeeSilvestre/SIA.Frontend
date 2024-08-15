<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="displayedFaculty"
    :sort-by="[{ key: 'id', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          class="text-h6 font-weight-black"
          style="color: #2f3f64"
          >FACULTY MASTER LIST
          
          <v-btn class="ml-5" color="#28a745" variant="flat" dark @click="downloadXLS()">
            <v-icon left>mdi-download</v-icon>
            GENERATE REPORT
          </v-btn></v-toolbar-title
        >
        <!-- <v-divider class="mx-2" inset vertical></v-divider> -->

        <v-text-field
          v-model="search"
          class="w-20 mr-16"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>

        <v-dialog v-model="dialog" max-width="1000px">
          <v-dialog v-model="viewDialog" max-width="800">
            <v-card>
              <div
                class="pt-3 pb-3 pl-5 pr-4"
                style="background-color: var(--dark)"
              >
                <v-card-title
                  class="fs-3 font-weight-black"
                  style="color: white; position: relative; margin: 0"
                >
                  FACULTY DETAILS
                  <v-btn
                    icon
                    @click="closeViewDialog"
                    class="close-button"
                    style="position: absolute; top: 0; right: 0"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
              </div>

              <v-card-text>
                <div class="d-flex mt-2 p-1">
                  <v-card
                    class="mr-3"
                    style="width: 50%; background-color: #f0f0f0"
                  >
                    <v-card-text class="student-leftinfo">
                      <img
                        :src="selectedStudent.imageSrc"
                        alt="Faculty Image"
                        style="
                          max-width: 100%;
                          height: auto;
                          margin-bottom: 3rem;
                        "
                      /><br />
                      <div class="d-flex flex-column mb-3 faculty-details-item">
                        <strong class="text-padding">FACULTY ID:</strong>
                        {{ selectedStudent.student_id }} <br />
                      </div>
                      <div class="d-flex flex-column mb-3 faculty-details-item">
                        <strong class="text-padding">FULL NAME:</strong>
                        {{ selectedStudent.first_name }}
                        {{ selectedStudent.middle_name }}
                        {{ selectedStudent.last_name }}
                        {{ selectedStudent.extension }}<br />
                      </div>
                      <div class="d-flex flex-column mb-3 faculty-details-item">
                        <strong class="text-padding">POSITION:</strong>
                        {{ selectedStudent.position }}<br />
                      </div>
                      <div class="d-flex flex-column mb-3 faculty-details-item">
                        <strong class="text-padding">DEPARTMENT:</strong>
                        {{ selectedStudent.department }}<br />
                      </div>
                    </v-card-text>
                  </v-card>

                  <div class="parent-container">
                    <v-card
                      class="right-section w-100"
                      style="box-shadow: 5px 10px #888888"
                    >
                      <v-card-text>
                        <h3 class="section-title">PERSONAL INFORMATION</h3>
                        <hr />
                        <div class="personal-info">
                          <!-- Personal information details -->
                          <!-- Mother's details -->
                          <div class="info-box">
                            <strong class="info-title">Full Name: </strong>
                            <span class="info-value"
                              >{{ selectedStudent.first_name }}
                              {{ selectedStudent.middle_name }}</span
                            >
                          </div>
                          <div class="info-box">
                            <strong class="info-title">Contact #: </strong>
                            <span class="info-value">{{
                              selectedStudent.contact_no
                            }}</span>
                          </div>
                          <div class="info-box">
                            <strong class="info-title">Birthdate: </strong>
                            <span class="info-value">{{
                              selectedStudent.birth_date
                            }}</span>
                          </div>
                          <div class="info-box">
                            <strong class="info-title">Sex: </strong>
                            <span class="info-value">{{
                              selectedStudent.sex_at_birth
                            }}</span>
                          </div>
                          <div class="info-box">
                            <strong class="info-title">Religion: </strong>
                            <span class="info-value">{{
                              selectedStudent.religion
                            }}</span>
                          </div>
                          <div class="info-box">
                            <strong class="info-title">Address: </strong>
                            <span class="info-value"
                              >{{ selectedStudent.houseNumber }}
                              {{ selectedStudent.street }}
                              {{ selectedStudent.barangay }}
                              {{ selectedStudent.city }} ,{{
                                selectedStudent.province
                              }}
                              {{ selectedStudent.zip_code }}</span
                            >
                          </div>
                          <div class="info-box">
                            <strong class="info-title">Guardian Name: </strong>
                            <span class="info-value">{{
                              selectedStudent.guardian
                            }}</span>
                          </div>
                          <div class="info-box">
                            <strong class="info-title"
                              >Guardian Contact #:
                            </strong>
                            <span class="info-value">{{
                              selectedStudent.guardian_mobileno
                            }}</span>
                          </div>
                          <!-- Father's details -->
                          <!-- Add other personal information details here -->
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td class="text-center">{{ item.id }}</td>
        <td class="text-center">
          {{ item.fname }} {{ item.mname }} {{ item.lname }}
          {{ item.extension }}
        </td>
        <td class="text-center">{{ item.position }}</td>
        <td class="text-center">{{ item.department }}</td>
        <td class="text-center">{{ item.email }}</td>
        <td class="text-center">
          <v-btn color="primary" size="small" @click="handleViewIconClick(item)"
              >
              <v-icon icon="mdi-eye" start></v-icon>View</v-btn
            >
          <!-- <v-icon size="small" style="color: #2F3F64; margin: 0.5rem;"
            @click="handleViewIconClick(item)">mdi-eye</v-icon> -->
        </td>
      </tr>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn class="text-h2" color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>

  <v-dialog v-model="viewDialog" max-width="800">
    <v-card>
      <div class="pt-3 pb-3 pl-5 pr-4" style="background-color: var(--dark)">
        <v-card-title
          class="fs-3 font-weight-black"
          style="color: white; position: relative; margin: 0"
        >
          FACULTY DETAILS
          <v-btn
            icon
            @click="closeViewDialog"
            class="close-button"
            style="position: absolute; top: 0; right: 0"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </div>

      <v-card-text>
        <div class="d-flex mt-2 p-1">
          <v-card class="mr-3" style="width: 30%; background-color: #f0f0f0">
            <v-card-text class="student-leftinfo">
              <img
                :src="selectedFaculty.imageSrc"
                alt="Faculty Image"
                style="max-width: 100%; height: auto; margin-bottom: 3rem"
              /><br />
              <div class="d-flex flex-column mb-3 faculty-details-item">
                <strong class="text-padding">FACULTY ID:</strong>
                {{ selectedFaculty.id }} <br />
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                <strong class="text-padding">FULL NAME:</strong>
                {{ selectedFaculty.fname }} {{ selectedFaculty.mname }}
                {{ selectedFaculty.lname }} {{ selectedFaculty.extension
                }}<br />
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                <strong class="text-padding">Position:</strong>
                {{ selectedFaculty.position }}<br />
              </div>
              <div class="d-flex flex-column mb-3 faculty-details-item">
                <strong class="text-padding">Department:</strong>
                {{ selectedFaculty.department }}<br />
              </div>
            </v-card-text>
          </v-card>

          <v-card style="flex-grow: 1">
            <v-card-text>
              <h3 class="fs-5 fw-bold">PERSONAL INFORMATION</h3>
              <hr />
              <div class="student-family">
                <v-row> </v-row>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";

export default {
  data: () => ({
    search: "",
    dialog: false,
    selectedFaculty: null,
    viewDialog: false,
    headers: [
      { title: "Faculty ID", align: "center", key: "faculty_id" },
      { title: "Full Name", align: "center", key: "full_name" },
      { title: "Position", align: "center", key: "position" },
      { title: "Department", align: "center", key: "department" },
      { title: "Email", align: "center", key: "email" },
      { title: "Actions", align: "center",sortable: false },
    ],
    students: [],
    faculty: [],
    editedIndex: -1,
    editedItem: {
      faculty_id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      extension: "",
      position: "",
      department: "",
      email: "",
      contact_no: "",
      birth_date: "",
      birth_place: "",
      civil_status: "",
      sex_at_birth: "",
      citizenship: "",
      religion: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
      street: "",
      zip_code: "",
    },
    defaultItem: {
      faculty_id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      extension: "",
      position: "",
      department: "",
      email: "",
      contact_no: "",
      birth_date: "",
      birth_place: "",
      civil_status: "",
      sex_at_birth: "",
      citizenship: "",
      religion: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
      street: "",
      zip_code: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add Student"
        : "Edit Student Information";
    },
    displayedFaculty() {
      const searchTerm = this.search.toLowerCase(); // Convert search input to lowercase for case-insensitive comparison
      return this.faculty.filter((student) =>
        Object.values(student).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm)
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
        .get("faculty")
        .then((res) => {
          console.log(res.data);
          let tmp = res.data;
          tmp.full_name;
          this.faculty = tmp.faculty;
          console.log(this.faculty);
          this.faculty.forEach((faculty) => {
            faculty.full_name =
              `${faculty.fname} ${faculty.mname} ${faculty.lname} ${faculty.extension}`.trim();
            faculty.imageSrc = faculty.image
              ? `http://127.0.0.1:8000/uploads/profile/${faculty.image.image}`
              : "";
          });
          console.log(this.faculty);
        })
        .catch((error) => {
          console.error("Error loading faculties:", error);
        });
    },

    // initialize() {
    //   axios.get("student").then((res) => {
    //     let tmp = res.data;
    //     this.students = tmp.student;
    //     console.log(this.students);

    //     // Format full name and adjust strand property
    //     this.students.forEach((student) => {
    //       // Format full name
    //       student.full_name =
    //         `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim();

    //       // Check grade level and adjust strand property
    //       if (student.grade_level <= 10) {
    //         delete student.strand;
    //       }
    //     });
    //   });
    // },

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
      this.selectedStudent = item;
      this.viewDialog = true;
    },

    closeViewDialog() {
      console.log("selectedStudent:", this.selectedStudent);
      this.viewDialog = false;
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
          "Faculty ID",
          "Full Name",
          "Position",
          "Department",
          "Email",
        ]);

        // Add data rows
        data.forEach((item) => {
          worksheet.addRow([
            item.student_id,
            item.full_name,
            item.position,
            item.department,
            item.email,
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

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.students[this.editedIndex], this.editedItem);
    //   } else {
    //     this.students.push(this.editedItem);
    //   }
    //   this.close();
    // },
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
</style>
