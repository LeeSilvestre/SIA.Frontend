<template>
  <v-app>
    <v-stepper editable v-model="step" :items="['GUIDELINES', 'FORM', 'UPLOADING']">
      <template :complete="step > 1" v-slot:item.1 >
        <v-card flat class="stepper-card">
          <v-card-title>
            <v-icon class="mr-2">mdi-book-open</v-icon>
            <span class="card-title fw-bold fs-3"
              >PRE-REGISTRATION INSTRUCTIONS</span
            >
          </v-card-title>
          <hr>
          <div class="pa-1">
            <v-card-text class="instructions" style="max-width: 1000px">
              <!-- New Instructions Content -->
              <div
                v-for="(instruction, index) in instructions"
                :key="index"
                class="mb-5"
              >
                <div class="d-flex align-items-center mb-2">
                  <v-icon class="mr-2">{{ instruction.icon }}</v-icon>
                  <h4 class="fw-bold">{{ instruction.title }}</h4>
                </div>
                <ul>
                  <li
                    v-for="(detail, detailIndex) in instruction.details"
                    :key="detailIndex"
                  >
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </template>

      <!-- FORM Step -->
      <template :complete="step > 2" v-slot:item.2>
        <v-card flat>
          <v-card-title>
            <v-icon class="mr-2">mdi-form-textbox</v-icon>
            <span class="card-title fw-bold fs-3">PRE-REGISTRATION FORM</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-container>
                <div class="academic">
                  <h1
                    class="fw-bold fs-4 d-flex align-items-center mb-3"
                    style="color: var(--dark)"
                  >
                    <v-icon class="mr-2" style="color: var(--dark)"
                      >mdi-account</v-icon
                    >
                    Personal Information
                  </h1>
                </div>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="lastname"
                      :rules="nameRules"
                      label="Last name"
                      required
                      variant="outlined"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="firstname"
                      :rules="nameRules"
                      label="First name"
                      required
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="middlename"
                      label="Middle name"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="extension"
                      :items="['Jr', 'Sr', 'II', 'III']"
                      label="Extension Name"
                      clearable
                      required
                      variant="outlined"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="sex"
                      :items="['Male', 'Female']"
                      label="Sex"
                      clearable
                      required
                      variant="outlined"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="birthdate"
                      :rules="birthdateRules"
                      label="Birthdate"
                      placeholder="YYYY-MM-DD"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="religion"
                      :items="[
                        'Catholic',
                        'Islam',
                        'Iglesia ni Cristo',
                        'Born Again',
                        'Christianity',
                        'Buddhism',
                        'Others',
                      ]"
                      label="Religion"
                      clearable
                      required
                      variant="outlined"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <h1
                      class="fw-bold fs-6 d-flex align-items-center"
                      style="color: var(--dark)"
                    >
                      Current Address
                    </h1>
                  </v-col>

                  <!-- ADDRESS -->
                  <v-col cols="12" md="2">
                    <v-select
                      v-model="region"
                      :items="[
                        'REGION I (ILOCOS REGION)',
                        'REGION II (CAGAYAN VALLEY)',
                        'REGION III (CENTRAL LUZON)',
                        'REGION IV-A(CALABARZON)',
                        'REGION V(BICOL REGION)',
                        'REGION VI(WESTERN VISAYAS)',
                        'REGION VII(CENTRAL VISAYAS)',
                        'REGION VIII (EASTERN VISAYAS)',
                        'REGION IX (ZAMBOANGA PENINSULA)',
                        'REGION X (NORTHERN MINDANAO)',
                        'REGION XI (DAVAO REGION)',
                        'REGION XII (SOCCSKSARGEN)',
                        'NATIONAL CAPITAL REGION (NCR)',
                        'CORDILLERA ADMINISTRATIVE REGION',
                        'AUTONOMOUS REGION IN MUSLIM MINDANAO (ARMM)',
                        'REGION XIII (Caraga)',
                      ]"
                      label="Region"
                      :rules="provinceRules"
                      clearable
                      required
                      variant="outlined"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-select
                      v-model="province"
                      :items="filteredProvinces"
                      :rules="provinceRules"
                      label="Province"
                      variant="outlined"
                    ></v-select>
                    ]
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="city"
                      :rules="cityRules"
                      label="City/Municipality"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="barangay"
                      :rules="barangayRules"
                      label="Barangay"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-text-field
                      v-model="houseNumber"
                      :rules="houseNumberRules"
                      label="House #"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="street"
                      :rules="streetRules"
                      label="Street"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-text-field
                      v-model="zipCode"
                      :rules="zipCodeRules"
                      label="Zip Code"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <div class="academic">
                  <h1
                    class="fw-bold fs-4 d-flex align-items-center mb-3"
                    style="color: var(--dark)"
                  >
                    <v-icon class="mr-2" style="color: var(--dark)"
                      >mdi-phone</v-icon
                    >
                    Contact Information
                  </h1>
                </div>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="contactNumber"
                      :rules="contactNumberRules"
                      label="Contact Number"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <div class="academic">
                  <h1
                    class="fw-bold fs-4 d-flex align-items-center mb-3"
                    style="color: var(--dark)"
                  >
                    <v-icon class="mr-2" style="color: var(--dark)"
                      >mdi-school</v-icon
                    >
                    Academic Information
                  </h1>
                </div>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="student_lrn"
                      :rules="studentLrnRules"
                      label="Student LRN"
                      variant="outlined"
                      maxlength="12"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="gradeLevel"
                      :items="gradeLevels"
                      label="Grade Level"
                      clearable
                      variant="outlined"
                    ></v-select>
                  </v-col>
                  <v-col v-if="showStrand" cols="12" md="3">
                    <v-select
                      v-model="strand"
                      :items="['HUMSS', 'STEM', 'HE', 'ABM', 'GAS']"
                      label="Strand"
                      clearable
                      variant="outlined"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row justify="end">
                  <v-col cols="auto">
                    <v-btn class="bg-green large-button" @click="enroll"
                      >Submit</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </template>

      <!-- UPLOADING Step -->
      <template :complete="step > 3" v-slot:item.3>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <div class="academic">
                  <h1
                    class="fw-bold fs-4 d-flex align-items-center mb-4"
                    style="color: var(--dark)"
                  >
                    <v-icon class="mr-2" style="color: var(--dark)"
                      >mdi-school</v-icon
                    >
                    Initial File Uploading
                  </h1>
                </div>

                <v-row dense>
                  <!-- PSA UPLOADER -->
                  <v-col
                    cols="12"
                    sm="4"
                    class="d-flex align-items-center mb-4"
                  >
                    <v-file-input
                      v-model="editedItem.psa"
                      label="PSA/Birth Certificate"
                      counter
                      multiple
                      show-size
                      @change="handleFileUpload('psa', $event)"
                      class="flex-grow-1"
                      variant="outlined"
                    ></v-file-input>
                    <v-btn @click="upload('PSA')" class="ml-4 bg-green mb-4"
                      >Upload</v-btn
                    >
                  </v-col>

                  <!-- GOOD MORAL UPLOADER -->
                  <v-col
                    cols="12"
                    sm="4"
                    class="d-flex align-items-center mb-4"
                  >
                    <v-file-input
                      v-model="editedItem.goodMoral"
                      label="Good Moral"
                      counter
                      multiple
                      show-size
                      @change="handleFileUpload('goodmoral', $event)"
                      class="flex-grow-1"
                      variant="outlined"
                    ></v-file-input>
                    <v-btn
                      @click="upload('Good Moral')"
                      class="ml-4 bg-green mb-4"
                      >Upload</v-btn
                    >
                  </v-col>

                  <!-- TOR UPLOADER -->
                  <v-col
                    cols="12"
                    sm="4"
                    class="d-flex align-items-center mb-4"
                  >
                    <v-file-input
                      v-model="editedItem.tor"
                      label="Form 137/Transcript of Record"
                      counter
                      multiple
                      show-size
                      @change="handleFileUpload('tor', $event)"
                      class="flex-grow-1"
                      variant="outlined"
                    ></v-file-input>
                    <v-btn @click="upload('TOR')" class="ml-4 bg-green mb-4"
                      >Upload</v-btn
                    >
                  </v-col>
                </v-row>
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
// import pdf from "vue-pdf";
import Swal from "sweetalert2";

export default {
  // components: {
  //   pdf,
  // },
  data: () => ({
    editedItem: {
      psa: null,
      goodmoral: null,
      tor: null,
    },
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
      (value) => !!value || "Student LRN is required.",
      (value) =>
        (value && value.length <= 12) ||
        "Student LRN must be 12 characters or less.",
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
    showStrand: false,
    provinces: {
      "REGION I (ILOCOS REGION)": [
        "Ilocos Norte",
        "Ilocos Sur",
        "La Union",
        "Pangasinan",
      ],
      "REGION II (CAGAYAN VALLEY)": [
        "Batanes",
        "Cagayan",
        "Isabela",
        "Nueva Vizcaya",
        "Quirino",
      ],
      "REGION III (CENTRAL LUZON)": [
        "Aurora",
        "Bataan",
        "Bulacan",
        "Nueva Ecija",
        "Pampanga",
        "Tarlac",
        "Zambales",
      ],
      "REGION IV-A(CALABARZON)": [
        "Batangas",
        "Cavite",
        "Laguna",
        "Quezon",
        "Rizal",
      ],
      "REGION V(BICOL REGION)": [
        "Albay",
        "Camarines Norte",
        "Camarines Sur",
        "Catanduanes",
        "Masbate",
        "Sorsogon",
      ],
      "REGION VI(WESTERN VISAYAS)": [
        "Aklan",
        "Antique",
        "Capiz",
        "Guimaras",
        "Iloilo",
        "Negros Occidental",
      ],
      "REGION VII(CENTRAL VISAYAS)": [
        "Bohol",
        "Cebu",
        "Negros Oriental",
        "Siquijor",
      ],
      "REGION VIII (EASTERN VISAYAS)": [
        "Biliran",
        "Eastern Samar",
        "Leyte",
        "Northern Samar",
        "Southern Leyte",
        "Western Samar",
      ],
      "REGION IX (ZAMBOANGA PENINSULA)": [
        "Zamboanga del Norte",
        "Zamboanga del Sur",
        "Zamboanga Sibugay",
      ],
      "REGION X (NORTHERN MINDANAO)": [
        "Bukidnon",
        "Camiguin",
        "Lanao del Norte",
        "Misamis Occidental",
        "Misamis Oriental",
      ],
      "REGION XI (DAVAO REGION)": [
        "Davao de Oro",
        "Davao del Norte",
        "Davao del Sur",
        "Davao Occidental",
        "Davao Oriental",
      ],
      "REGION XII (SOCCSKSARGEN)": [
        "Cotabato",
        "Sarangani",
        "South Cotabato",
        "Sultan Kudarat",
      ],
      "NATIONAL CAPITAL REGION (NCR)": [
        "City of Manila",
        "Caloocan",
        "Las Piñas",
        "Makati",
        "Malabon",
        "Mandaluyong",
        "Manila",
        "Marikina",
        "Muntinlupa",
        "Navotas",
        "Parañaque",
        "Pasig",
        "Pateros",
        "Quezon City",
        "San Juan",
        "Taguig",
        "Valenzuela",
      ],
      "CORDILLERA ADMINISTRATIVE REGION": [
        "Abra",
        "Apayao",
        "Benguet",
        "Ifugao",
        "Kalinga",
        "Mountain Province",
      ],
      "AUTONOMOUS REGION IN MUSLIM MINDANAO (ARMM)": [
        "Basilan",
        "Lanao del Sur",
        "Maguindanao",
        "Sulu",
        "Tawi-Tawi",
      ],
      "REGION XIII (Caraga)": [
        "Agusan del Norte",
        "Agusan del Sur",
        "Dinagat Islands",
        "Surigao del Norte",
        "Surigao del Sur",
      ],
    },

    showStrand: false,
    provinces: {
      "REGION I (ILOCOS REGION)": [
        "Ilocos Norte",
        "Ilocos Sur",
        "La Union",
        "Pangasinan",
      ],
      "REGION II (CAGAYAN VALLEY)": [
        "Batanes",
        "Cagayan",
        "Isabela",
        "Nueva Vizcaya",
        "Quirino",
      ],
      "REGION III (CENTRAL LUZON)": [
        "Aurora",
        "Bataan",
        "Bulacan",
        "Nueva Ecija",
        "Pampanga",
        "Tarlac",
        "Zambales",
      ],
      "REGION IV-A(CALABARZON)": [
        "Batangas",
        "Cavite",
        "Laguna",
        "Quezon",
        "Rizal",
      ],
      "REGION V(BICOL REGION)": [
        "Albay",
        "Camarines Norte",
        "Camarines Sur",
        "Catanduanes",
        "Masbate",
        "Sorsogon",
      ],
      "REGION VI(WESTERN VISAYAS)": [
        "Aklan",
        "Antique",
        "Capiz",
        "Guimaras",
        "Iloilo",
        "Negros Occidental",
      ],
      "REGION VII(CENTRAL VISAYAS)": [
        "Bohol",
        "Cebu",
        "Negros Oriental",
        "Siquijor",
      ],
      "REGION VIII (EASTERN VISAYAS)": [
        "Biliran",
        "Eastern Samar",
        "Leyte",
        "Northern Samar",
        "Southern Leyte",
        "Western Samar",
      ],
      "REGION IX (ZAMBOANGA PENINSULA)": [
        "Zamboanga del Norte",
        "Zamboanga del Sur",
        "Zamboanga Sibugay",
      ],
      "REGION X (NORTHERN MINDANAO)": [
        "Bukidnon",
        "Camiguin",
        "Lanao del Norte",
        "Misamis Occidental",
        "Misamis Oriental",
      ],
      "REGION XI (DAVAO REGION)": [
        "Davao de Oro",
        "Davao del Norte",
        "Davao del Sur",
        "Davao Occidental",
        "Davao Oriental",
      ],
      "REGION XII (SOCCSKSARGEN)": [
        "Cotabato",
        "Sarangani",
        "South Cotabato",
        "Sultan Kudarat",
      ],
      "NATIONAL CAPITAL REGION (NCR)": [
        "City of Manila",
        "Caloocan",
        "Las Piñas",
        "Makati",
        "Malabon",
        "Mandaluyong",
        "Manila",
        "Marikina",
        "Muntinlupa",
        "Navotas",
        "Parañaque",
        "Pasig",
        "Pateros",
        "Quezon City",
        "San Juan",
        "Taguig",
        "Valenzuela",
      ],
      "CORDILLERA ADMINISTRATIVE REGION": [
        "Abra",
        "Apayao",
        "Benguet",
        "Ifugao",
        "Kalinga",
        "Mountain Province",
      ],
      "AUTONOMOUS REGION IN MUSLIM MINDANAO (ARMM)": [
        "Basilan",
        "Lanao del Sur",
        "Maguindanao",
        "Sulu",
        "Tawi-Tawi",
      ],
      "REGION XIII (Caraga)": [
        "Agusan del Norte",
        "Agusan del Sur",
        "Dinagat Islands",
        "Surigao del Norte",
        "Surigao del Sur",
      ],
    },

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
    step: 1,
    step: 1,
    psaFile: null,
    goodMoralFile: null,
    torFile: null,
  }),

  computed: {
    filteredProvinces() {
      return this.provinces[this.region] || [];
    },
    filteredProvinces() {
      return this.provinces[this.region] || [];
    },
    showStrand() {
      return this.gradeLevel === "11" || this.gradeLevel === "12";
    },
  },

  methods: {
    // type of data
    handleFileUpload(type, event) {
      const file = event.target.files[0];
      if (file) {
        if (type === "psa") {
          this.psaFile = file;
        } else if (type === "goodmoral") {
          this.goodMoralFile = file;
        } else if (type === "tor") {
          this.torFile = file;
        }
      }
    },

    upload(type) {
      if (
        this.editedItem.tor ||
        this.editedItem.psa ||
        this.editedItem.tor ||
        this.editedItem.goodmoral
      ) {
        const formData = new FormData();

        formData.append("student_lrn", this.student_lrn);
        let file = this.editedItem.psa
          ? this.psaFile
          : this.editedItem.tor
          ? this.torFile
          : this.editedItem.goodmoral
          ? this.goodMoralFile
          : this.editedItem.psa;
        console.log(file);
        formData.append("image", file);
        formData.append("file_type", type);

        axios
          .post("imageStud", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.viewDialog = false;
            Swal.fire({
              title: "Upload Success!",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((error) => {
            console.error(error.response);
            let err = error.response.data;
            Swal.fire({
              icon: "error",
              title: "Bad Request",
              text: err.message,
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "No file is selected",
          text: "Select file before upload.",
        });
      }
    },

    async enroll() {
      //     if (!this.psaFile || !this.torFile) {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Missing Files",
      //     text: "Please upload both the TOR and PSA files before submitting the form.",
      //   });
      //   return; // di muna maipapasa kapag walang TOR at PSA na provided
      // }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Please review your information before submitting the form to ensure all fields are correctly filled out.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save changes!",
        customClass: {
          container: "sweet-alert-container",
        },
      });

      if (result.isConfirmed) {
        const data = {
          student_lrn: this.student_lrn,
          first_name: this.firstname,
          middle_name: this.middlename,
          last_name: this.lastname,
          extension: this.extension,
          sex_at_birth: this.sex,
          birth_date: this.birthdate,
          email: this.email,
          region: this.region,
          province: this.province,
          city: this.city,
          barangay: this.barangay,
          street: this.street,
          // houseNumber: this.houseNumber,
          zip_code: this.zipCode,
          religion: this.religion,
          contact_no: this.contactNumber,
          strand: this.strand ? this.strand : "N/A",
          grade_level: this.gradeLevel,
        };
        axios
          .post("student", data)
          .then((res) => {
            Swal.fire({
              title: "Approved!",
              text: "Your action has been approved.",
              icon: "success",
            })
              .then(() => {
                // Navigate to the third step after successful submission
                this.step = 3;
              })
              .then(() => {
                // Navigate to the third step after successful submission
                this.step = 3;
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }

      // Save changes logic here
      this.editDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.fileinput {
  width: 12vh !important;
}
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
