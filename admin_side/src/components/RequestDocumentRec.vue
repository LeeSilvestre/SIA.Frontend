<template>
  <div>
    <v-stepper alt-labels :items="['Student Details', 'Request Detail']">
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
        <h3 class="section-title">Request Detail</h3>
        <hr>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="Full Name" v-model="student.full_name" outlined readonly hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Type of Document" v-model="student.document_type" outlined readonly
                hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Purpose of Request" v-model="student.reason" outlined readonly
                hide-details></v-text-field>
            </v-col>
            <!-- <v-col cols="12" sm="6">
              <v-text-field label="Status" v-model="student.status" outlined readonly hide-details></v-text-field>
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
            </v-col> -->
          </v-row>
          <br>
        </v-container>
        <div class="button-container">
            <v-btn class="bg-green large-button">Approve Request</v-btn>
            <v-btn class="bg-red large-button">Cancel Request</v-btn>
          </div>
      </template>
    </v-stepper>
  </div>
</template>






<script>
export default {
  props: {
    student: {
      type: Object,
      required: true
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

.button-container {
  display: flex;
  gap: 10px; /* Adjust the gap as needed */
}
</style>
