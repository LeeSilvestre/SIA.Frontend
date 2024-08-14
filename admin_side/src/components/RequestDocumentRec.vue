<template>
  <div>
    <v-stepper alt-labels :items="['Student Details', 'Request Detail']">
      <template v-slot:item.1>
        <div class="step-card">
          <img
            :src="student.imageSrc"
            alt="Student Image"
            class="student-image"
          /><br />
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Student ID"
                v-model="student.student_id"
                outlined
                readonly
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Full Name"
                v-model="student.full_name"
                outlined
                readonly
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="LRN"
                v-model="student.student_lrn"
                outlined
                readonly
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Grade Level"
                v-model="student.grade_level"
                outlined
                readonly
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </template>

      <template v-slot:item.2>
        <h3 class="section-title">Request Detail</h3>
        <hr />
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Full Name"
                v-model="student.full_name"
                outlined
                readonly
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Type of Document"
                v-model="student.document_type"
                outlined
                readonly
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Purpose of Request"
                v-model="student.purpose"
                outlined
                readonly
                hide-details
              ></v-text-field>
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
          <br />
        </v-container>
        <hr />
        <div class="button-container">
          <v-btn class="bg-green large-button" @click="assessItem(student.request_id, 'Confirm')">Approve Request</v-btn>
          <v-btn class="bg-red large-button" @click="assessItem(student.request_id, 'Decline')">Cancel Request</v-btn>
        </div>
      </template>
    </v-stepper>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {

  data: () => ({

  }),
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedAddress() {
      return `${this.student.houseNumber} ${this.student.street} ${this.student.barangay} ${this.student.city}, ${this.student.province} ${this.student.zip_code}`;
    },
  },
  mounted(){

  },
  methods:{
    assessItem(item, action) {
      console.log(item);
      Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes "+ action  +" it!",
        customClass: {
          container: "sweet-alert-container",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          if (action === "Confirm") {
            axios
              .put(`approve/${item}`, {
                document_remarks: "For Recieved",
              })
              .then((res) => {
                console.log(res.data);
                Swal.fire({
                  title: "Approved!",
                  text: "Your action has been approved.",
                  icon: "success",
                });
                setTimeout(() => {
                  window.location.reload();
                }, 3000); //
              })
              .catch((err) => {
                console.error(err);
              });
          } else{
            axios
              .put(`approve/${item}`, {
                document_remarks: "Declined",
              })
              .then((res) => {
                console.log(res.data);
                Swal.fire({
                  title: "Approved!",
                  text: "Your action has been approved.",
                  icon: "success",
                });
                setTimeout(() => {
                  window.location.reload();
                }, 3000); //
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
      });
    },

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
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
