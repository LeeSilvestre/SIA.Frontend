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
          >SENIOR HIGH MASTER LIST
          <v-btn class="ml-5" color="#28a745" variant="flat" dark @click="downloadXLS()">
            <v-icon left>mdi-download</v-icon>
            GENERATE REPORT
          </v-btn>
          </v-toolbar-title
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
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td class="text-center">{{ item.student_id }}</td>
        <td class="text-center">
          {{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}
          {{ item.extension }}
        </td>
        <td class="text-center">{{ item.student_lrn }}</td>
        <td class="text-center">{{ item.grade_level }}</td>
        <td class="text-center">{{ item.strand }}</td>
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
</template>

<script>
import axios from "axios";
import ExcelJS from "exceljs";
export default {
  data: () => ({
    search: "",
    dialog: false,
    selectedStudent: null,
    viewDialog: false,
    headers: [
      { title: "Student ID", align: "center", key: "student_id" },
      { title: "Full Name", align: "center", key: "full_name" },
      { title: "Student LRN", align: "center", key: "student_lrn" },
      { title: "Grade Level", align: "center", key: "grade_level" },
      { title: "Strand", align: "center", key: "strand" },
      { title: "Actions", align: "center", sortable: false },
    ],
    students: [],
    value: [],
    editedIndex: -1,
    editedItem: {
      student_id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      extension: "",
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
      student_id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      extension: "",
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
    displayedStudents() {
      const searchTerm = this.search.toLowerCase(); // Convert search input to lowercase for case-insensitive comparison
      return this.students.filter((student) =>
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
  },

  mounted() {
    this.initialize();
    // this.getData();
  },
  methods: {
    getData() {
      axios.get("jhs").then((res) => {
        let tmp = res.data;
        console.log(tmp);
        // TO PASS THE VALUE OF DATA
        /*
          tmp =  res.data = {
            "status": 200
            "student" : {
              0: {id: 1, student_id: 202110239},
              1: {id: 2, student_id: 202110240},
              2: {id: 3, student_id: 202110241},
            }
          }
        */
        this.value = tmp.student;
        console.log(this.value);
        /* 
          STRUCTURE
        tmp = student ={ 
          0: {id: 1, student_id: 202110239},
          1: {id: 2, student_id: 202110240},
          2: {id: 3, student_id: 202110241},
        }
        */

        console.log(this.value[0].student_id);
        console.log(this.defaultItem);
      });
    },
    initialize() {
      axios
        .get("shs")
        .then((res) => {
          console.log(res.data);
          let tmp = res.data;
          this.students = tmp.student;
          console.log(this.students);
          this.students.forEach((student) => {
            student.full_name =
              `${student.first_name} ${student.middle_name} ${student.last_name} ${student.extension}`.trim();
            student.imageSrc = student.image
              ? `http://127.0.0.1:8000/uploads/profile/${student.image.image}`
              : "";
          });
        })
        .catch((error) => {
          console.error("Error loading students:", error);
        });
    },

    // openViewDialog(item) {
    //   this.selectedStudent = item;
    //   this.viewDialog = true;
    // },

    // closeViewDialog() {
    //     this.viewDialog = false;
    // },
    handleViewIconClick(item) {
      this.$emit("view-student", item);
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
          "Full Name",
          "Student LRN",
          "Grade Level",
          "Strand",
        ]);

        // Add data rows
        data.forEach((item) => {
          worksheet.addRow([
            item.student_id,
            item.full_name,
            item.student_lrn,
            item.grade_level,
            item.strand,
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
