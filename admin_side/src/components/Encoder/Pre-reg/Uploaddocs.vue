<template>
  <v-card style="height: 65vh;">
    <v-card-text>
      <div class="d-flex flex-row">
        <v-tabs v-model="tab" color="primary" direction="vertical">
          <v-tab prepend-icon="mdi-account" text="PSA / BIRTH CERTIFICATE " :value="1"></v-tab>
          <v-tab prepend-icon="mdi-lock" text="FORM 138 / Transcript of Record" :value="2"></v-tab>
          <v-tab prepend-icon="mdi-access-point" text="GOOD MORAL" :value="3"></v-tab>
        </v-tabs>

        <v-card-text >

          <!-- PSA FORM -->
          <v-window v-model="tab" direction="vertical" style="border: 3px solid var(--dark); height: 60vh; overflow-y: auto;" >
            <v-window-item :value="1" style="height: 50vh;">
              <v-card style=" display: flex; align-items: center; justify-content: center;">
                <v-row >
                  <v-col cols="6" style="display: flex; flex-direction: column; align-items: center;">
                    <div class="academic" style="border-bottom: 2px solid var(--dark)">
                      <h1 class="fw-bold fs-4 d-flex align-items-center mb-4" style="color: var(--dark)">
                        <v-icon class="mr-2" style="color: var(--dark)">mdi-image</v-icon>
                        Front side
                      </h1>
                    </div>
                    <div style="overflow: auto; height: 100%;">
                      <Dropzone @file-dropped="handleFileUpload('psaf', $event)" />
                      <v-file-input
                        v-model="editedItem.psaf"
                        label="PSA/Birth Certificate"
                        counter
                        accept=".jpg, .jpeg, .png"
                        show-size
                        class="flex-grow-1"
                        variant="outlined"
                        :disabled="!psafFile"
                        ></v-file-input>
                        
                        <v-btn :disabled="!psafFile" @click="upload('psaf')" class="ml-4 bg-green mb-4">Upload</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="6" style="display: flex; flex-direction: column; align-items: center;">
                    <div class="academic" style="border-bottom: 2px solid var(--dark)">
                      <h1 class="fw-bold fs-4 d-flex align-items-center mb-4" style="color: var(--dark)">
                        <v-icon class="mr-2" style="color: var(--dark)">mdi-image</v-icon>
                        Back side
                      </h1>
                    </div>
                    <div style="overflow: auto; height: 100%;">
                      <Dropzone @file-dropped="handleFileUpload('psab', $event)" />
                      <v-file-input
                        v-model="editedItem.psab"
                        label="PSA/Birth Certificate"
                        counter
                        accept=".jpg, .jpeg, .png"
                        show-size
                        class="flex-grow-1"
                        variant="outlined"
                        :disabled="!psabFile"
                        ></v-file-input>
                        
                        <v-btn :disabled="!psabFile" @click="upload('psab')" class="ml-4 bg-green mb-4">Upload</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-window-item>

            <v-window-item :value="2">
              <v-card>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="8">
                      
                      <Dropzone @file-dropped="handleFileUpload('tor', $event)" />
                    </v-col>
                    <v-col cols="12" sm="4" class="d-flex align-items-center mb-4">
                      <span>Filename: {{ editedItem.tor ? editedItem.tor.name : '' }}</span>
                      <v-file-input
                        v-model="editedItem.tor"
                        label="Form 138/Transcript of Record"
                        counter
                        accept=".jpg, .jpeg, .png"
                        show-size
                        class="flex-grow-1"
                        variant="outlined"
                        :disabled="!torFile"
                      ></v-file-input>

                      <v-btn :disabled="!torFile" @click="upload('tor')" class="ml-4 bg-green mb-4">Upload</v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-window-item>

            <v-window-item :value="3" style="height: 50vh;">
              <v-card style=" display: flex; align-items: center; justify-content: center;">
                
                <v-card-text>
                  <v-row>
                    <v-col cols="6" style="display: flex; flex-direction: column; align-items: center;">
                    <div class="academic" style="border-bottom: 2px solid var(--dark)">
                      <h1 class="fw-bold fs-4 d-flex align-items-center mb-4" style="color: var(--dark)">
                        <v-icon class="mr-2" style="color: var(--dark)">mdi-image</v-icon>
                        Front side
                      </h1>
                    </div>
                    <div style="overflow: auto; height: 100%;">
                      <Dropzone @file-dropped="handleFileUpload('psa', $event)" />
                      <v-file-input
                        v-model="editedItem.psa"
                        label="PSA/Birth Certificate"
                        counter
                        accept=".jpg, .jpeg, .png"
                        show-size
                        class="flex-grow-1"
                        variant="outlined"
                        :disabled="!psaFile"
                        ></v-file-input>
                        
                        <v-btn :disabled="!psaFile" @click="upload('psa')" class="ml-4 bg-green mb-4">Upload</v-btn>
                    </div>
                  </v-col>
                    <v-col cols="12" sm="8">
                      

                      <v-btn :disabled="!goodMoralFile" @click="upload('goodmoral')" class="ml-4 bg-green mb-4">Upload</v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card-text>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Dropzone from "./dropzone.vue";
import { ref } from "vue";

export default {
  setup() {
    const dropzoneFile = ref("");

    return { dropzoneFile };
  },
  data: () => ({
    tab: 1,
    goodMoralFile: true,
    torFile: true,
    psafFile: true,
    psabFile: true,
    editedItem: {
      psaf: null,
      psab: null,
      goodmoral: null,
      tor: null,
    },
  }),
  components: {
    Dropzone,
  },
  props: {
    studlrn: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleFileUpload(type, file) {
      this.editedItem[type] = file;
    },
    upload(type) {
      const file = this.editedItem[type];
      console.log(file);
      let tp = type === 'goodmoral' ? "Good Moral" : type.toUpperCase();
      
      if (file) {
        const formData = new FormData();
        formData.append("student_lrn", this.studlrn);
        formData.append("image", file);
        formData.append("file_type", tp);
        
        axios.post("imageStud", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          Swal.fire({
            title: "Upload Success!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            this[type + "File"] = false;
            if (!this.torFile && !this.psaFilef && !this.psaFileb) {
              let stat = true;
              this.$emit('upload', stat);
            }
          });
        })
        .catch((error) => {
          console.error(error.response);
          Swal.fire({
            icon: "error",
            title: "Bad Request",
            text: error.response.data.message,
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
  },
};
</script>

<style lang="scss" scoped>
.sweet-alert-container {
  z-index: 999;
}
.fileinput {
  width: 12vh !important;
}
.v-card-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
}
.title-icon {
  font-size: 4rem;
  color: var(--dark);
}
.title-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--dark);
}
.instructions {
  font-size: 1.2rem;
  line-height: 1.6;
}
.mb-5 {
  margin-bottom: 3rem !important;
}
h4 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--dark);
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
