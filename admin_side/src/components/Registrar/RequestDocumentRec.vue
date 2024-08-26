<!-- <template>
  <div> -->
      <template>
        <v-card class="container">
          <h1
              class="fw-bold fs-4 d-flex align-items-center mb-5"
              style="color: var(--dark)"
            >
              <v-icon class="mr-2" style="color: var(--dark)"
                >mdi-account</v-icon
              >
              Personal Information
            </h1>          <div class="step-card">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Student ID"
                  v-model="document.student_id"
                  outlined
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Full Name"
                  v-model="document.full_name"
                  outlined
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="LRN"
                  v-model="document.student_lrn"
                  outlined
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Grade Level"
                  v-model="document.grade_level"
                  outlined
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <hr />
          <v-container>
            <h1
              class="fw-bold fs-4 d-flex align-items-center mb-5"
              style="color: var(--dark)"
            >
              <v-icon class="mr-2" style="color: var(--dark)"
                >mdi-clipboard-text</v-icon
              >
              Request Detail
            </h1>            <v-row>
              <!-- <v-col cols="12" sm="6">
                <v-text-field
                  label="Full Name"
                  v-model="document.full_name"
                  outlined
                  readonly
                  hide-details
                ></v-text-field>
              </v-col> -->
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Type of Document"
                  v-model="document.document_type"
                  outlined
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Purpose of Request"
                  v-model="document.purpose"
                  outlined
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <br />
          </v-container>
          <hr />
          <div class="button-container">
            
            <v-btn v-if="document.document_remarks == 'Pending'" class="bg-blue large-button" @click="assessItem(document.request_id, 'Confirm')">Approve Request</v-btn>
            <v-btn v-if="document.document_remarks == 'For Receive'" class="bg-green large-button" @click="assessItem(document.request_id, 'Received')">Mark as Received</v-btn>
            <div v-if="document.document_remarks != 'Received'">
              <!-- <v-btn class="bg-red large-button" @click="assessItem(document.request_id, 'Decline')">Cancel Request</v-btn> -->
            </div>
          </div>
          <v-card v-if="document.document_remarks == 'Received'" class="p-3 mb-3 shadow-sm bg-light rounded">
  <div class="row">
    <div class="col-md-6">
      <h4 class="mb-2">
        <strong>Status:</strong>
        <v-chip :color="getStatusColor(document.document_remarks)">
          {{document.document_remarks}}
        </v-chip>
      </h4>
    </div>
    <div class="row">
    <div class="col-md-6">
      <h4 class="mb-2">
        <strong>Control No.:</strong>
        {{document.request_id}}
      </h4>
    </div>
  </div>
  </div>
  <div class="row">
    <div class="col">
      <h4 class="mb-0">
        <strong>Release Date:</strong>
        {{document.document_release_date}}
      </h4>
    </div>
  </div>
</v-card>

          
        </v-card>
      </template>
  <!-- </div>
</template> -->

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {

  data: () => ({

  }),
  props: {
    document: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedAddress() {
      return `${this.document.houseNumber} ${this.document.street} ${this.document.barangay} ${this.document.city}, ${this.document.province} ${this.document.zip_code}`;
    },
  },
  mounted(){

  },
  methods:{
    getStatusColor(status) {
      if (status == 'Received') {
        return 'green';
      } else if (status == 'Pending') {
        return 'orange';
      } else if (status == 'For Receive') {
        return 'cyan';
      } else if (status == 'Pending') {
        return 'orange';
      } else  {
        return 'red';
      }
    },
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
                document_remarks: "For Receive",
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
          } else if(action === "Received"){
            axios
              .put(`approve/${item}`, {
                document_remarks: "Received",
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
          
          else{
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
.container{
  height: 100%;
  padding: 1rem;
}
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
