<template>
    <v-app>
      <v-stepper :items="['GUIDELINES', 'FORM']">
        <template v-slot:item.1>
          <v-card flat>
            <v-card-title>
              PRE-REGISTRATION GUIDELINES
            </v-card-title>
            <v-card-text>
              <h1>Here are the guidelines...</h1>
            </v-card-text>
          </v-card>
        </template>
  
        <template v-slot:item.2>
          <v-card flat>
            <v-card-title>
              PRE-REGISTRATION FORM
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <div class="academic">
                    <h1>
                      PERSONAL INFORMATION
                    </h1>
                  </div>
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="lastname" :counter="10" :rules="nameRules" label="Last name" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="firstname" :counter="10" :rules="nameRules" label="First name" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="middlename" :counter="10" :rules="nameRules" label="Middle name" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="age" :rules="ageRules" label="Age" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="contactNumber" :rules="contactNumberRules" label="Contact Number" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-select v-model="sex" :items="['Male', 'Female']" label="Sex" clearable outlined></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="birthdate" :rules="birthdateRules" label="Birthdate" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="email" :rules="emailRules" label="E-mail" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="houseNumber" :rules="houseNumberRules" label="House Number" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="street" :rules="streetRules" label="Street" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="barangay" :rules="barangayRules" label="Barangay" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="city" :rules="cityRules" label="City" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="province" :rules="provinceRules" label="Province" hide-details required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="zipCode" :rules="zipCodeRules" label="Zip Code" hide-details required outlined></v-text-field>
                    </v-col>
                  </v-row>
                  <div class="academic">
                    <h1>
                      ACADEMIC INFORMATION
                    </h1>
                  </div>
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-select v-model="gradeLevel" :items="['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']" label="Grade Level" clearable outlined></v-select>
                    </v-col>
                    <v-col v-if="showSection" cols="12" md="3">
                      <v-select v-model="section" :items="[
                        'St. Anne', 'St. Bernadette', 'St. Charles', 'St. Elizabeth', 'St. Faustina',
                        'St. George', 'St. Pedro Calungsod', 'St. Lorenzo Ruiz', 'St. Gabriel', 'St. Michael',
                        'St. Raphael', 'St. Patrick', 'St. Scholastica', 'St. Homobonus', 'St. Helena', 'St. Louise',
                        'St. Stephen', 'St. Vincent', 'St. Catherine', 'St. Albertus', 'St. Benedict', 'St. Maximillian',
                        'St. Peter', 'St. Thomas', 'St. Isidore', 'St. Joseph'
                      ]" label="Section" clearable outlined></v-select>
                    </v-col>
                    <v-col v-if="showStrand" cols="12" md="3">
                      <v-select v-model="strand" :items="['HUMSS', 'STEM', 'HE', 'ABM', 'GAS']" label="Strand" clearable outlined></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </template>
      </v-stepper>
    </v-app>
  </template>
  
  

  <script>
  export default {
    data: () => ({
      valid: false,
      firstname: '',
      lastname: '',
      middlename: '',
      age: '',
      contactNumber: '',
      sex: '',
      birthdate: '',
      email: '',
      houseNumber: '',
      street: '',
      barangay: '',
      city: '',
      province: '',
      zipCode: '',
      gradeLevel: '',
      section: '',
      strand: '',
      nameRules: [
        value => !!value || 'Name is required.',
        value => (value && value.length <= 10) || 'Name must be less than 10 characters.'
      ],
      ageRules: [
        value => !!value || 'Age is required.',
        value => (value && !isNaN(Number(value))) || 'Age must be a number.'
      ],
      contactNumberRules: [
        value => !!value || 'Contact Number is required.',
        value => (value && value.length <= 10) || 'Contact Number must be less than 10 characters.'
      ],
      birthdateRules: [
        value => !!value || 'Birthdate is required.'
      ],
      emailRules: [
        value => !!value || 'E-mail is required.',
        value => /.+@.+\..+/.test(value) || 'E-mail must be valid.'
      ],
      houseNumberRules: [
        value => !!value || 'House Number is required.'
      ],
      streetRules: [
        value => !!value || 'Street is required.'
      ],
      barangayRules: [
        value => !!value || 'Barangay is required.'
      ],
      cityRules: [
        value => !!value || 'City is required.'
      ],
      provinceRules: [
        value => !!value || 'Province is required.'
      ],
      zipCodeRules: [
        value => !!value || 'Zip Code is required.'
      ]
    }),
    computed: {
      showSection() {
        return this.gradeLevel === 'Grade 7' || this.gradeLevel === 'Grade 8' || this.gradeLevel === 'Grade 9' || this.gradeLevel === 'Grade 10' || this.gradeLevel === 'Grade 11' || this.gradeLevel === 'Grade 12';
      },
      showStrand() {
        return this.gradeLevel === 'Grade 11' || this.gradeLevel === 'Grade 12';
      }
    }
  }
  </script>
  
  

<style lang="scss" scoped>
.v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.academic h1 {
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>