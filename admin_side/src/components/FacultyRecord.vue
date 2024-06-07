<template>
    <div>
      <v-stepper alt-labels :items="['Faculty Details', 'Personal Information']">
        <template v-slot:item.1>
          <v-card flat>
            <v-card class="step-card">
              <v-card-text class="student-leftinfo">
                <img :src="student.imageSrc" alt="Student Image" class="student-image"><br>
                <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">STUDENT ID:</strong> {{ student.student_id }} <br>
                </div>
                <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">FULL NAME:</strong> {{ student.first_name }} {{ student.middle_name }} {{ student.last_name }} {{ student.extension }}<br>
                </div>
                <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">POSITION:</strong> {{ student.position }}<br>
                </div>
                <div class="d-flex flex-column mb-3 faculty-details-item">
                  <strong class="text-padding">DEPARTMENT:</strong> {{ student.department }}<br>
                </div>
              </v-card-text>
            </v-card>
          </v-card>
        </template>
  
        <template v-slot:item.2>
          <v-card flat>
            <!-- Add content for Personal Information -->
          </v-card>
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
    }
  };
  </script>
  
  <style scoped>
  .step-card {
    width: 50%;
    background-color: #f0f0f0;
    overflow: hidden; 
  }
  
  .student-leftinfo {
    max-width: 100%;
    height: auto;
  }
  
  .student-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem; /* Adjust margin if necessary */
  }

  
  .text-padding {
    padding-right: 0.5rem; /* Adjust padding if necessary */
  }
  </style>
  