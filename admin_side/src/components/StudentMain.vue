<template>
  <v-app>
    <v-stepper :items="['GUIDELINES', 'FORM']">
      <template v-slot:item.1>
        <v-card flat class="stepper-card">
          <v-card-title>
            <v-icon class="mr-2">mdi-book-open</v-icon>
            <span class="card-title fw-bold fs-4">PRE-REGISTRATION GUIDELINES</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list lines="one">
              <v-list-item v-for="(item, index) in instructions" :key="index">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="item-title">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <ul>
                      <li v-for="(detail, i) in item.details" :key="i">
                        {{ detail }}
                      </li>
                    </ul>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-alert type="info" class="mt-4">
              <v-icon left>mdi-calendar-start</v-icon>
              Classes for the school year 2024-2025 begin on July 29, 2024.
              Orientation for new students and parents will be held on August
              1-2, 2024.
            </v-alert>
          </v-card-text>
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
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
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
                </v-row>
                <div class="academic">
                  <h1 class="fw-bold fs-5 mb-3 d-flex align-items-center">
                    <v-icon class="mr-2">mdi-school</v-icon>
                    Academic Information
                  </h1>
                </div>
                <v-row>
                  <v-col cols="12" md="3">
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
import axios from 'axios';
// import pdf from "vue-pdf";
import Swal from "sweetalert2";

export default {
  // components: {
  //   pdf,
  // },
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
        (value && value.length <= 30) ||
        "Name must be less than 30 characters.",
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
    gradeLevels: ["7", "8", "9", "10", "11", "12"],
    instructions: [
      {
        icon: "mdi-account",
        title: "Step 1: Personal Information",
        details: [
          "Enter your 10-digit Learner Reference Number (LRN) provided by your previous school.",
          "Fill out your last name, first name, and middle name accurately. Ensure each field is less than 10 characters.",
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
      return this.gradeLevel === "11" || this.gradeLevel === "12";
    },
  },
  // watch: {
  //   studentType(newType) {
  //       this.gradeLevels = [
  //         "8",
  //         "9",
  //         "10",
  //         "11",
  //         "12",
  //       ];
  //       // Optionally, reset the gradeLevel if it is not in the new set
  //       if (!this.gradeLevels.includes(this.gradeLevel)) {
  //         this.gradeLevel = "";
  //       }
  //       this.gradeLevels = [
  //         "7",
  //         "8",
  //         "9",
  //         "10",
  //         "11",
  //         "12",
  //       ];
  //       // Optionally, reset the gradeLevel if it is not in the new set
  //       if (!this.gradeLevels.includes(this.gradeLevel)) {
  //         this.gradeLevel = "";
  //       }
  //     }
  //   },
  // },
  mounted(){
  },
  methods: {
    enroll(){
      const data = {
        student_lrn : this.student_lrn,
        first_name : this.firstname,
        middle_name : this.middlename,
        last_name : this.lastname,
        extension : this.extension,
        sex_at_birth : this.sex,
        birth_date : this.birthdate,
        email :this.email,
        region : this.region,
        province : this.province,
        city : this.city,
        barangay : this.barangay,
        street : this.street,
        zip_code : this.zipCode,
        religion : this.religion,
        contact_no : this.contactNumber,
        strand : this.strand ? this.strand : 'N/A' ,
        grade_level: this.gradeLevel,
      }
      axios.post('student', data).then(res=>{
        Swal.fire({
          title: "Approved!",
          text: "Your action has been approved.",
          icon: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000); //
      }).catch(error =>{
        console.error(error); 
      })
    }

  }
};
</script>

<style lang="scss" scoped>
.v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.academic h1 {
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
}

.stepper-card {
  max-height: fit-content;
  overflow-y: auto;
}

.item-title {
  font-weight: bold;
}
</style>
