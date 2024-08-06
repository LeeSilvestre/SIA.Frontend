<template>
  <div>
    <v-stepper alt-labels :items="['Student Details', 'Personal Information', 'Academic Information']">
      <template v-slot:item.1>
        <div class="step-card">
          <img :src="student.imageSrc" alt="Student Image" class="student-image"><br>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="STUDENT ID" v-model="student.student_id" outlined readonly
                hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="FULL NAME" v-model="student.full_name" outlined readonly hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="LRN" v-model="student.student_lrn" outlined readonly hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Grade Level" v-model="student.grade_level" outlined readonly
                hide-details></v-text-field>
            </v-col>
          </v-row>
        </div>
      </template>

      <template v-slot:item.2>
        <h3 class="section-title">PERSONAL INFORMATION</h3>
        <hr>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="Full Name" v-model="student.full_name" outlined readonly hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Contact #" v-model="student.contact_no" outlined readonly
                hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Birthdate" v-model="student.birth_date" outlined readonly
                hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Sex" v-model="student.sex_at_birth" outlined readonly hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Religion" v-model="student.religion" outlined readonly hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field label="Address" v-model="formattedAddress" outlined readonly hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Guardian Name" v-model="student.guardian" outlined readonly
                hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Guardian Contact #" v-model="student.guardian_mobileno" outlined readonly
                hide-details></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:item.3>
        <h3 class="section-title">ACADEMIC INFORMATION</h3>
        <hr>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="Section" v-model="student.section" outlined readonly hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Grade Level" v-model="student.grade_level" outlined readonly
                hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="School Year" v-model="student.year" outlined readonly hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Password" v-model="student.password" outlined readonly hide-details></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-stepper>
  </div>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true,
      default: () => ({
        student_id: '',
        full_name: '',
        student_lrn: '',
        grade_level: '',
        imageSrc: '',
        contact_no: '',
        birth_date: '',
        sex_at_birth: '',
        religion: '',
        houseNumber: '',
        street: '',
        barangay: '',
        city: '',
        province: '',
        zip_code: '',
        guardian: '',
        guardian_mobileno: '',
        section: '',
        year: '',
        password: ''
      })
    }
  },
  computed: {
    formattedAddress() {
      return `${this.student.houseNumber} ${this.student.street} ${this.student.barangay} ${this.student.city}, ${this.student.province} ${this.student.zip_code}`;
    }
  }
};
</script>

<style scoped>
.step-card {
  width: 100%;
  max-width: 800px;
  margin: auto;
  height: auto;
}

.student-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
  /* Adjust margin if necessary */
}
</style>
