<template>
  <v-app>
    <v-stepper :items="['GUIDELINES', 'FORM']">
      <template v-slot:item.1>
        <v-card flat>
          <v-card-title>PRE-REGISTRATION GUIDELINES</v-card-title>
          <v-card-text>
            <h1>Here are the guidelines...</h1>
            <pdf src="../assets/enrollment.pdf" />
          </v-card-text>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card flat>
          <v-card-title>PRE-REGISTRATION FORM</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form v-model="valid">
              <v-container>
                <div class="academic">
                  <h1>PERSONAL INFORMATION</h1>
                </div>
                <v-row>
                  <!-- <v-col cols="12" md="3">
                    <v-select
                      v-model="studentType"
                      :items="['incoming', 'returning']"
                      label="Student Type"
                      clearable
                      outlined
                    ></v-select>
                  </v-col> -->
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="student_lrn"
                      :counter="10"
                      label="Student LRN"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="lastname"
                      :counter="10"
                      :rules="nameRules"
                      label="Last name"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="firstname"
                      :counter="10"
                      :rules="nameRules"
                      label="First name"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="middlename"
                      :counter="10"
                      :rules="nameRules"
                      label="Middle name"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="sex"
                      :items="['Male', 'Female']"
                      label="Sex"
                      clearable
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="birthdate"
                      :rules="birthdateRules"
                      label="Birthdate"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="religion"
                      :rules="emailRules"
                      label="Religion"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="houseNumber"
                      :rules="houseNumberRules"
                      label="House Number"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="street"
                      :rules="streetRules"
                      label="Street"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="barangay"
                      :rules="barangayRules"
                      label="Barangay"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="city"
                      :rules="cityRules"
                      label="City"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="province"
                      :rules="provinceRules"
                      label="Province"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="region"
                      :rules="provinceRules"
                      label="Region"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="zipCode"
                      :rules="zipCodeRules"
                      label="Zip Code"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="academic">
                  <h1>CONTACT INFORMATION</h1>
                </div>
                <v-row>
                <v-col cols="12" md="3">
                    <v-text-field
                      v-model="contactNumber"
                      :rules="contactNumberRules"
                      label="Contact Number"
                      hide-details
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="academic">
                  <h1>ACADEMIC INFORMATION</h1>
                </div>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="studentType"
                      :items="['incoming', 'returning']"
                      label="Student Type"
                      clearable
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="gradeLevel"
                      :items="gradeLevels"
                      label="Grade Level"
                      clearable
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col v-if="showStrand" cols="12" md="3">
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
            <v-btn class="bg-green large-button" @click="enroll">Submit</v-btn>
          </v-card-text>
        </v-card>
      </template>
    </v-stepper>
  </v-app>
</template>

<script>
import axios from 'axios';
import pdf from "vue-pdf";

export default {
  components: {
    pdf,
  },
  data: () => ({
    valid: false,
    studnet_lrn: "",
    studentType: "",
    firstname: "",
    lastname: "",
    middlename: "",
    age: "",
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
    gradeLevel: "", // To store the selected grade level
    section: "",
    strand: "",
    nameRules: [
      (value) => !!value || "Name is required.",
      (value) =>
        (value && value.length <= 10) ||
        "Name must be less than 10 characters.",
    ],
    contactNumberRules: [
      (value) => !!value || "Contact Number is required.",
      (value) =>
        (value && value.length <= 10) ||
        "Contact Number must be less than 10 characters.",
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
    gradeLevels: [], // To store available grade levels based on studentType
  }),
  computed: {
    showStrand() {
      return this.gradeLevel === "Grade 11" || this.gradeLevel === "Grade 12";
    },
  },
  watch: {
    studentType(newType) {
      if (newType === "returning") {
        this.gradeLevels = [
          "8",
          "9",
          "10",
          "11",
          "12",
        ];
        // Optionally, reset the gradeLevel if it is not in the new set
        if (!this.gradeLevels.includes(this.gradeLevel)) {
          this.gradeLevel = "";
        }
      } else {
        this.gradeLevels = [
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ];
        // Optionally, reset the gradeLevel if it is not in the new set
        if (!this.gradeLevels.includes(this.gradeLevel)) {
          this.gradeLevel = "";
        }
      }
    },
  },
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
        strand : this.strand,
        grade_level: this.gradeLevel,
      }
      axios.post('student', data).then(res=>{
        console.log(res);

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

.academic h1 {
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: regular;
}
</style>
