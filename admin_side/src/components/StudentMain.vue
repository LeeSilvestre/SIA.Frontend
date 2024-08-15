<template>
  <v-app>
    <v-stepper :items="['GUIDELINES', 'FORM']">
      <template v-slot:item.1>
        <v-card flat class="stepper-card">
          <v-card-title>
            <v-icon class="mr-2">mdi-book-open</v-icon>
            <span class="card-title fw-bold fs-4">PRE-REGISTRATION INSTRUCTIONS</span>
          </v-card-title>
          <v-divider></v-divider>
          <div class="pa-1">
            <v-card-text class="instructions" style="max-width:1000px">
              <!-- New Instructions Content -->
              <div v-for="(instruction, index) in instructions" :key="index" class="mb-5">
                <div class="d-flex align-items-center mb-2">
                  <v-icon class="mr-2">{{ instruction.icon }}</v-icon>
                  <h4 class="fw-bold">{{ instruction.title }}</h4>
                </div>
                <ul>
                  <li v-for="(detail, detailIndex) in instruction.details" :key="detailIndex">
                    {{ detail }}
                  </li>
                </ul>
              </div>
              <!-- Policy Section -->
            </v-card-text>
          </div>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card flat>
          <v-card-title>
            <v-icon class="mr-2">mdi-form-textbox</v-icon>
            <span class="card-title fw-bold fs-4">PRE-REGISTRATION FORM</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-container>
                <div class="academic">
                  <h1 class="fw-bold fs-5 mb-3 d-flex align-items-center">
                    <v-icon class="mr-2">mdi-account</v-icon>
                    Personal Information
                  </h1>
                </div>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="student_lrn"
                      :rules="studentLrnRules"
                      label="Student LRN"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="lastname"
                      :rules="nameRules"
                      label="Last name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="firstname"
                      :rules="nameRules"
                      label="First name"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="middlename"
                      label="Middle name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="extension"
                      label="Extension"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="sex"
                      :items="['Male', 'Female']"
                      label="Sex"
                      clearable
                      required
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="birthdate"
                      :rules="birthdateRules"
                      label="Birthdate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="religion"
                      label="Religion"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="houseNumber"
                      :rules="houseNumberRules"
                      label="House Number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="street"
                      :rules="streetRules"
                      label="Street"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="barangay"
                      :rules="barangayRules"
                      label="Barangay"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="city"
                      :rules="cityRules"
                      label="City"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="province"
                      :rules="provinceRules"
                      label="Province"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="region"
                      :rules="provinceRules"
                      label="Region"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="zipCode"
                      :rules="zipCodeRules"
                      label="Zip Code"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="academic">
                  <h1 class="fw-bold fs-5 mb-3 d-flex align-items-center">
                    <v-icon class="mr-2">mdi-phone</v-icon>
                    Contact Information
                  </h1>
                </div>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="contactNumber"
                      :rules="contactNumberRules"
                      label="Contact Number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="academic">
                  <h1 class="fw-bold fs-5 mb-3 d-flex align-items-center">
                    <v-icon class="mr-2">mdi-school</v-icon>
                    Academic Information
                  </h1>
                </div>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="studentType"
                      :items="['Incoming', 'Returning']"
                      label="Student Type"
                      clearable
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="gradeLevel"
                      :items="gradeLevels"
                      label="Grade Level"
                      clearable
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col v-if="showStrand" cols="12" md="4">
                    <v-select
                      v-model="strand"
                      :items="['HUMSS', 'STEM', 'HE', 'ABM', 'GAS']"
                      label="Strand"
                      clearable
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-row justify="end">
              <v-col cols="auto">
                <v-btn class="bg-green large-button" @click="enroll"
                  >Submit</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
    </v-stepper>
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data: () => ({
    valid: false,
    student_lrn: "",
    studentType: "",
    firstname: "",
    lastname: "",
    middlename: "",
    religion: "",
    contactNumber: "",
    sex: "",
    birthdate: "",
    email: "",
    houseNumber: "",
    street: "",
    barangay: "",
    city: "",
    province: "",
    zipCode: "",
    region: "",
    gradeLevel: "",
    strand: "",
    student_lrn: "",
    nameRules: [
      (value) => !!value || "Name is required.",
      (value) =>
        (value && value.length <= 10) ||
        "Name must be less than 10 characters.",
    ],
    studentLrnRules: [
      (value) => !!value || "Student LRN is required."
    ],
    contactNumberRules: [
      (value) => !!value || "Contact Number is required.",
      (value) =>
        (value && value.length <= 11) ||
        "Contact Number must be less than 12 digit.",
    ],
    birthdateRules: [(value) => !!value || "Birthdate is required."],
    emailRules: [
      (value) => !!value || "E-mail is required.",
      (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
    ],
    houseNumberRules: [(value) => !!value || "House Number is required."],
    streetRules: [(value) => !!value || "Street is required."],
    barangayRules: [(value) => !!value || "Barangay is required."],
    cityRules: [(value) => !!value || "City is required."],
    provinceRules: [(value) => !!value || "Province is required."],
    zipCodeRules: [(value) => !!value || "Zip Code is required."],
    gradeLevels: [],
    instructions: [
        {
          icon: "mdi-account",
          title: "Step 1: Personal Information",
          details: [
            "Enter your Learner Reference Number (LRN).",
            "Fill out your last name, first name, and middle name accurately.",
            "Select your gender from the options available (Male/Female).",
            "Provide your date of birth in the correct format (MM/DD/YYYY).",
            "Enter a valid email address where you can be contacted.",
            "Specify your religion.",
          ],
        },
        {
          icon: "mdi-home",
          title: "Step 2: Address Information",
          details: [
            "Provide your complete house number and street address.",
            "Ensure these fields are filled with accurate details about your residence.",
            "Enter the correct postal code for your area.",
          ],
        },
        {
          icon: "mdi-phone",
          title: "Step 3: Contact Information",
          details: [
            "Provide a valid contact number where you or your guardian can be reached.",
          ],
        },
        {
          icon: "mdi-school",
          title: "Step 4: Academic Information",
          details: [
            "Choose whether you are an incoming or returning student.",
            "Select the grade level you are applying for. If you are entering Grade 11 or 12, select the strand (e.g., HUMSS, STEM) that applies to you.",
          ],
        },
        {
          icon: "mdi-check-circle",
          title: "Step 5: Submission",
          details: [
            "After filling out all required fields, review your entries to ensure accuracy.",
            'Click the "Submit" button to complete your pre-registration. Ensure that all the required documents are ready for submission to avoid any delays in processing your enrollment.',
          ],
        },
      ],
  }),
  computed: {
    showStrand() {
      return this.gradeLevel === "Grade 11" || this.gradeLevel === "Grade 12";
    },
  },
  watch: {
    studentType(newType) {
      if (newType === "returning") {
        this.gradeLevels = ["8", "9", "10", "11", "12"];
        if (!this.gradeLevels.includes(this.gradeLevel)) {
          this.gradeLevel = "";
        }
      } else {
        this.gradeLevels = ["7", "8", "9", "10", "11", "12"];
        if (!this.gradeLevels.includes(this.gradeLevel)) {
          this.gradeLevel = "";
        }
      }
    },
  },
  methods: {
    enroll() {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to submit the form?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, submit!",
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            student_lrn: this.student_lrn,
            first_name: this.firstname,
            middle_name: this.middlename,
            last_name: this.lastname,
            sex_at_birth: this.sex,
            birth_date: this.birthdate,
            email: this.email,
            region: this.region,
            province: this.province,
            city: this.city,
            barangay: this.barangay,
            street: this.street,
            zip_code: this.zipCode,
            religion: this.religion,
            contact_no: this.contactNumber,
            strand: this.strand,
            grade_level: this.gradeLevel,
          };
          axios
            .post("student", data)
            .then((res) => {
              console.log(res);
              // Clear the form
              this.resetForm();
              Swal.fire(
                "Submitted!",
                "Your form has been submitted.",
                "success"
              );
            })
            .catch((error) => {
              console.error(error);
              Swal.fire(
                "Error!",
                "There was a problem submitting your form.",
                "error"
              );
            });
        }
      });
    },
  //   enroll() {
  //   // Trigger form validation
  //   if (this.$refs.form.validate()) {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "Do you want to submit the form?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, submit!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const data = {
  //           student_lrn: this.student_lrn,
  //           first_name: this.firstname,
  //           middle_name: this.middlename,
  //           last_name: this.lastname,
  //           sex_at_birth: this.sex,
  //           birth_date: this.birthdate,
  //           email: this.email,
  //           region: this.region,
  //           province: this.province,
  //           city: this.city,
  //           barangay: this.barangay,
  //           street: this.street,
  //           zip_code: this.zipCode,
  //           religion: this.religion,
  //           contact_no: this.contactNumber,
  //           strand: this.strand,
  //           grade_level: this.gradeLevel,
  //         };
  //         axios
  //           .post("student", data)
  //           .then((res) => {
  //             console.log(res);
  //             // Clear the form
  //             this.resetForm();
  //             Swal.fire(
  //               "Submitted!",
  //               "Your form has been submitted.",
  //               "success"
  //             );
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //             Swal.fire(
  //               "Error!",
  //               "There was a problem submitting your form.",
  //               "error"
  //             );
  //           });
  //       }
  //     });
  //   } else {
  //     Swal.fire(
  //       "Incomplete Form!",
  //       "Please fill out all required fields before submitting.",
  //       "error"
  //     );
  //   }
  // },
    resetForm() {
      this.student_lrn = "";
      this.studentType = "";
      this.firstname = "";
      this.lastname = "";
      this.middlename = "";
      this.religion = "";
      this.contactNumber = "";
      this.sex = "";
      this.birthdate = "";
      this.email = "";
      this.houseNumber = "";
      this.street = "";
      this.barangay = "";
      this.city = "";
      this.province = "";
      this.zipCode = "";
      this.region = "";
      this.gradeLevel = "";
      this.strand = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card-title {
  display: flex;
  align-items: center; /* Align items vertically */
  font-size: 1.5rem;
  font-weight: bold;
}

.title-icon {
  font-size: 4rem; /* Adjust icon size if needed */
  color: var(--dark); /* Color for the icon */
}

.title-text {
  font-size: 1.8rem; /* Increase the title size */
  font-weight: bold;
  color: var(--dark); /* Title color */
}

.instructions {
  font-size: 1.2rem; /* Increase the instruction text size */
  line-height: 1.6;
}

.mb-5 {
  margin-bottom: 3rem !important;
}

h4 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--dark); /* Title color */
}

.stepper-card {
  background-color: #f7f7f7;
  padding: 2rem;
  border-radius: 8px;
}

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.75rem;
}
</style>
