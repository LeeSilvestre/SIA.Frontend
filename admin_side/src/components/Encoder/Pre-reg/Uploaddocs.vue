<template>
 <v-card>
    <v-card-text>
        <div class="academic">
            <h1 class="fw-bold fs-4 d-flex align-items-center mb-4" style="color: var(--dark)">
            <v-icon class="mr-2" style="color: var(--dark)">mdi-school</v-icon>
            Initial File Uploading
            </h1>
        </div>
        <div class="d-flex flex-row">
            <v-tabs
                v-model="tab"
                color="primary"
                direction="vertical"
              >
                <v-tab prepend-icon="mdi-account" text="PSA / BIRTH CERTIFICATE " :value="1"></v-tab>
                <v-tab prepend-icon="mdi-lock" text="FORM 138 / Transcript of Record" :value="2"></v-tab>
                <v-tab prepend-icon="mdi-access-point" text="GOODS MORAL 3" :value="3"></v-tab>
              </v-tabs>
        
            <v-card-text>
              <v-window v-model="tab" direction="vertical">
                <v-window-item :value="1">
                    <v-card>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="4" class="d-flex align-items-center mb-4">
                                    <v-file-input
                                    v-model="editedItem.psa"
                                    label="PSA/Birth Certificate"
                                    counter
                                    accept=".jpg, .jpeg, .png"
                                    show-size
                                    @change="handleFileUpload('psa', $event)"
                                    class="flex-grow-1"
                                    variant="outlined"
                                    :disabled="!psaFile"
                                    ></v-file-input>
                                    
                                    <v-btn :disabled="!psaFile" @click="upload('psa')" class="ml-4 bg-green mb-4">Upload</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-window-item>
                
                <v-window-item :value="2">
                    <v-card>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="4" class="d-flex align-items-center mb-4">
                                    <v-file-input
                                    v-model="editedItem.tor"
                                    label="Form 137/Transcript of Record"
                                    counter
                                    accept=".jpg, .jpeg, .png"
                                    show-size
                                    @change="handleFileUpload('tor', $event)"
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
        
                <v-window-item :value="3">
                    <v-card>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="4" class="d-flex align-items-center mb-4">
                                    <v-file-input
                                    v-model="editedItem.goodmoral"
                                    label="Good Moral"
                                    counter
                                    accept=".jpg, .jpeg, .png"
                                    show-size
                                    @change="handleFileUpload('goodmoral', $event)"
                                    class="flex-grow-1"
                                    variant="outlined"
                                    :disabled="!goodMoralFile"
                                    ></v-file-input>
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
  
  export default {
    data:() => ( { 
        tab: 1,
        goodMoralFile: true,
        torFile: true,
        psaFile: true,
        editedItem: {
            psa: null,
            goodmoral: null,
            tor: null,
            },
    }),
    props: {
      studlrn: {
        type: String,
        required: true,
      },
    },
    mounted() {
      console.log(this.studlrn);
    },
    methods: {
      handleFileUpload(type, event) {
        const file = event.target.files[0];
        if (file) {
          this.editedItem[type] = file;
        }
      },
      upload(type) { 
            const file = this.editedItem[type];
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
            // Handle successful upload
            Swal.fire({
                title: "Upload Success!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                switch(tp) {
                case 'PSA':
                    this.psaFile = false;
                    break;
                case 'TOR':
                    this.torFile = false;
                    break;
                case 'Good Moral':
                    this.goodMoralFile = false;
                    break;
                default:
                    Swal.fire({
                    icon: "error",
                    title: "Wrong file type!",
                    text: "Invalid file type or data truncated",
                    });
                }

                // Check if both PSA and TOR files are uploaded
                if (!this.torFile && !this.psaFile) {
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
        }       

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
  