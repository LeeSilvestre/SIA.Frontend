
<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-item
        title="Guidelines"
        :value="1"
        complete
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Personal Information"
        :value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Document Uploading"
        :value="3"
      ></v-stepper-item>
    </v-stepper-header>
  </v-stepper>
  <br>
  <v-card>
    <v-window v-model="step">
      <v-window-item :value="1">
          <Guidelines/>
      </v-window-item>

      <v-window-item :value="2">
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
                  <h1 class="fw-bold fs-4 d-flex align-items-center mb-3" style="color: var(--dark)" >
                    <v-icon class="mr-2" style="color: var(--dark)" >mdi-account</v-icon > Personal Information </h1>
                </div>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field v-model="firstname" :rules="nameRules" label="First name" required variant="outlined" ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field v-model="middlename" label="Middle name" variant="outlined" ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="3">
                    <v-text-field v-model="lastname" :rules="nameRules" label="Last name" required variant="outlined" dense outlined
                    ></v-text-field>
                  </v-col>


                  <v-col cols="12" md="3">
                    <v-select v-model="extension" :items="['Jr', 'Sr', 'II', 'III']" label="Extension Name" clearable required variant="outlined" ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select v-model="sex":items="['Male', 'Female']" label="Sex" clearable required variant="outlined" ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field v-model="birthdate" :rules="birthdateRules" label="Birthdate" placeholder="YYYY-MM-DD" variant="outlined" ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select v-model="religion"
                      :items="[
                        'Catholic',
                        'Islam',
                        'Iglesia ni Cristo',
                        'Born Again',
                        'Christianity',
                        'Buddhism',
                        'Others',
                      ]" label="Religion" clearable required variant="outlined" ></v-select>
                  </v-col>
                </v-row>
                
                <!-- ############## ADDRESS  INFO ########################-->
                <v-row>
                  <v-col cols="12">
                    <h1 class="fw-bold fs-6 d-flex align-items-center" style="color: var(--dark)">Current Address</h1>
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-select v-model="region"
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
                      ]" label="Region" :rules="provinceRules" clearable required variant="outlined" ></v-select>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-select v-model="province" :items="filteredProvinces" :rules="provinceRules" label="Province" variant="outlined"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field v-model="city" :rules="cityRules" label="City/Municipality" variant="outlined"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field v-model="barangay" :rules="barangayRules" label="Barangay" variant="outlined"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-text-field v-model="houseNumber" :rules="houseNumberRules" label="House #" variant="outlined"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field v-model="street" :rules="streetRules" label="Street" variant="outlined"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-text-field v-model="zipCode" :rules="zipCodeRules" label="Zip Code" variant="outlined"></v-text-field>
                  </v-col>
                </v-row>


                <!-- ##################### CONTACT INFO  #################################### -->
                <div class="academic">
                  <h1 class="fw-bold fs-4 d-flex align-items-center mb-3" style="color: var(--dark)">
                    <v-icon class="mr-2" style="color: var(--dark)">mdi-phone</v-icon>Contact Information
                  </h1>
                </div>

                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field v-model="contactNumber" :rules="contactNumberRules" label="Contact Number" variant="outlined"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" variant="outlined"></v-text-field>
                  </v-col>
                </v-row>

              <!-- ##################### ACAD INFO  #################################### -->
                <div class="academic">
                  <h1 class="fw-bold fs-4 d-flex align-items-center mb-3" style="color: var(--dark)" >
                    <v-icon class="mr-2" style="color: var(--dark)">mdi-school</v-icon>
                    Academic Information
                  </h1>
                </div>

                <v-row>

                  <v-col cols="12" md="3">
                    <v-text-field  v-model="student_lrn"  :rules="studentLrnRules"  label="Student LRN"  variant="outlined"  maxlength="12" ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select v-model="gradeLevel" :items="gradeLevels" label="Grade Level" clearable variant="outlined"></v-select>
                  </v-col>

                  <v-col v-if="showStrand" cols="12" md="3">
                    <v-select v-model="strand" :items="['HUMSS', 'STEM', 'HE', 'ABM', 'GAS']" label="Strand" clearable variant="outlined"></v-select>
                  </v-col>
                </v-row>

              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-window-item>
<!-- ########################## THIRD STEP (DOCUMENT UPLOADING)################################## -->
      <v-window-item :value="3">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <div class="academic">
                  <h1 class="fw-bold fs-4 d-flex align-items-center mb-4" style="color: var(--dark)">
                    <v-icon class="mr-2" style="color: var(--dark)">mdi-school</v-icon>
                    Initial File Uploading
                  </h1>
                </div>

                <v-row dense>
                  <!-- PSA UPLOADER -->
                  <v-col cols="12" sm="4" class="d-flex align-items-center mb-4">
                    <v-file-input v-model="editedItem.psa" label="PSA/Birth Certificate" counter multiple show-size @change="handleFileUpload('psa', $event)" class="flex-grow-1" variant="outlined"></v-file-input>
                    <v-btn @click="upload('PSA')" class="ml-4 bg-green mb-4">Upload</v-btn>
                  </v-col>

                  <!-- GOOD MORAL UPLOADER -->
                  <v-col cols="12" sm="4" class="d-flex align-items-center mb-4">
                    <v-file-input v-model="editedItem.goodMoral" label="Good Moral" counter multiple show-size @change="handleFileUpload('goodmoral', $event)" class="flex-grow-1" variant="outlined"></v-file-input>
                    
                    <v-btn @click="upload('Good Moral')" class="ml-4 bg-green mb-4" >Upload</v-btn>
                  </v-col>

                  <!-- TOR UPLOADER -->
                  <v-col cols="12" sm="4" class="d-flex align-items-center mb-4">
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
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <!-- ############################################################################# -->
      <!-- GUIDELINES -->
      <v-checkbox v-model="doAgree" v-if="step == 1" label="I understand the Guidelines above" value="True"
      ></v-checkbox>
      <v-btn :disabled="!doAgree" v-if="step == 1" color="primary" variant="flat" @click="step++">Accept & Continue</v-btn>
      <!-- ############################################################################# -->
      <!-- FORM INPUTS -->
      <v-btn v-if="step > 1" variant="text" @click="step--"> Back </v-btn>
      <v-spacer></v-spacer>
      <v-btn  v-if="step == 2" class="bg-green large-button"  @click="enroll">Submit</v-btn>
      <!-- ############################################################################# -->
      <!-- DOCUMENT UPLOAD -->
      <v-btn :disabled="!isfinished" v-if="step == 3" color="primary" variant="flat" @click=""> Finish </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
  import axios from "axios";
  import Swal from "sweetalert2";
  import Guidelines from "./Guidelines.vue";
  import provinces from "../../../providers/provinces.json";

  
  export default {
    data: () => ({
      doAgree: false,
      step: 1,
      isfinished: false,
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
      showStrand: false,
      provinces: provinces,
      psaFile: null,
      goodMoralFile: null,
      torFile: null,
    }),
    components: {
      Guidelines
    },
    computed: {
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
          this.editedItem.goodmoral
        ) {
          const formData = new FormData();

          formData.append("student_lrn", this.student_lrn);
          let file = this.editedItem.psa ? this.psaFile  : this.editedItem.tor  ? this.torFile  : this.editedItem.goodmoral  ? this.goodMoralFile  : this.editedItem.psa;
          formData.append("image", file);
          formData.append("file_type", type);

          axios
            .post("imageStud", formData, { headers: { "Content-Type": "multipart/form-data",}})
            .then((res) => {
              Swal.fire({
                title: "Upload Success!",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {this.viewDialog = false});
            }) .catch((error) => {
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
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Please review your information before submitting the form to ensure all fields are correctly filled out.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, save changes!",
          customClass: {container: "sweet-alert-container"},
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
            houseNumber: this.houseNumber,
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
              }).then(() => {this.step = 3;})
            })
            .catch((error) => {
              let err = error.response
              console.error(err);
              Swal.fire({
                title: "Missing field inputs!",
                text: "Please fill out missing fields",
                icon: "warning",
              })
            });
        }
        this.editDialog = false;
      },
    },
  }
</script>


<style lang="scss" scoped>

.sweet-alert-container{
  z-index: 999;
}
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
