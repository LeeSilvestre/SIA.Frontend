<template>
  <v-app class="app">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-row>
                <v-col cols="12" md="5" class="rectangle-color">
                  <v-card-text class="white--text mt-16 pt-14 mx-auto">
                    <div class="logo-container">
                      <img
                        src="/src/assets/schoolLogo3.png"
                        max-height="900"
                        max-width="900"
                        class="logo"
                      />
                    </div>
                    <div class="text-container text-center mt-16">
                      <h1 class="mt-auto h1 font-weight-black">
                        ST.NICHOLAS ACADEMY OF CASTILLEJOS INC.
                      </h1>
                      <p class="h6 font-weight-normal">CASTILLEJOS, ZAMBALES</p>
                    </div>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="7">
                  <v-card-text class="mt-1">
                    <div class="text-center mb-1">
                      <img src="/src/assets/schoolLogo.png" class="logo-logo" />
                    </div>
                    <h2 class="text-center lh-0 fs-4 fw-normal">
                      Welcome to <span class="sna-text">SNACI</span>
                    </h2>
                    <div v-if="panel == 'Registrar'">
                      <h4 class="text-center pt-0 fs-6">
                        REGISTRAR ADMIN PORTAL
                      </h4>
                    </div>
                    <div v-if="panel == 'Encoder'">
                      <h4 class="text-center pt-0 fs-6">ENCODER PORTAL</h4>
                    </div>
                    <div v-if="panel == 'Assessor'">
                      <h4 class="text-center pt-0 fs-6">ASSESSOR PORTAL</h4>
                    </div>
                    <v-select
                      v-model="panel"
                      :items="['Registrar', 'Encoder', 'Assessor']"
                      label="LOG IN AS"
                      clearable
                      variant="underlined"
                      prepend-icon="mdi-arrow-right"
                    ></v-select>
                    <v-form class="pt-4" @keydown.enter="login">
                      <v-text-field
                        v-model="email"
                        label="Email/ID"
                        name="Email"
                        prepend-icon="mdi-email"
                        type="text"
                        color="var(--dark)"
                        variant="underlined"
                      />
                      <v-text-field
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        label="Password"
                        name="Password"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="togglePasswordVisibility"
                        color="var(--dark)"
                        variant="underlined"
                      />
                    </v-form>
                  </v-card-text>
                  <div class="text-center pb-2 mx-md-auto">
                    <v-btn
                      rectangle
                      color="var(--dark)"
                      style="
                        color: white;
                        text-decoration: none;
                        width: auto;
                        font-size: 15px;
                      "
                      @click="login"
                    >
                      Log in
                    </v-btn>   
                  </div>

    <div class="pa-1 text-center">
      <v-dialog
        width="auto"
        scrollable
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            color="#2F3F64"
            text="St. Nicholas Academy General Privacy Notice"
            variant="text"
            v-bind="activatorProps"
            class="policy-btn"
          ></v-btn>
        </template>
  
        <template v-slot:default="{ isActive }">
          <v-card 
          >
          <h2>St. Nicholas Academy General Privacy Notice</h2>
          <v-card-text class="policy" style="max-width:1000px">
            <p>
              ST. NICHOLAS ACADEMY OF CASTILLEJOS, INC. ("we", "us", or "our") is committed to protecting your privacy. This Privacy Notice explains how we collect, use, disclose, and safeguard your information when you visit our web application.
            </p>
          
            <h4>Information We Collect</h4>
            <p>
              We may collect and process the following categories of personal information:
              <ul>
                <li>Contact Information: such as your name, email address, phone number.</li>
                <li>Usage Data: information about how you interact with our application, including IP address, browser type, and device identifiers.</li>
                <li>Communications: when you contact us or we contact you, we may collect the content of your communications.</li>
              </ul>
            </p>
          
            <h4>How We Use Your Information</h4>
            <p>
              We use the information we collect for the following purposes:
              <ul>
                <li>To provide and maintain our web application;</li>
                <li>To process your requests and transactions;</li>
                <li>To personalize your experience and improve our services;</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </p>
          
            <h4>Sharing of Your Information</h4>
            <p>
              We may share your information with third-party service providers who assist us in operating our application and providing services to you. These service providers are authorized to use your personal information only as necessary to provide these services to us.
            </p>
          
            <h4>Data Security</h4>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, please be aware that no method of transmission over the internet or electronic storage is completely secure.
            </p>
          
            <h4>Your Rights</h4>
            <p>
              You have the right to:
              <ul>
                <li>Access and receive a copy of your personal information;</li>
                <li>Correct any personal information that is inaccurate or incomplete;</li>
                <li>Request deletion of your personal information under certain circumstances;</li>
                <li>Object to the processing of your personal information.</li>
              </ul>
              To exercise these rights, please contact us using the contact information provided below.
            </p>
          
            <h4>Cookies and Similar Technologies</h4>
            <p>
              Our application may use cookies and similar technologies to enhance your experience. You can manage cookies through your browser settings.
            </p>
        
            <h4>Changes to This Privacy Notice</h4>
            <p>
              We may update this Privacy Notice from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the updated Privacy Notice on our website with a new effective date.
            </p>
          
            <h4>Contact Us</h4>
            <p>
              If you have any questions or concerns about our Privacy Notice or our data practices, please contact us at: <br>
              <span class="material-icons">email</span>st_nicholas_academy@hotmail.com <br>
              <span class="material-icons">call</span>+49 6022 261
            </p>
          </v-card-text>
          

            <v-card-actions>
            <v-spacer></v-spacer>

              <v-btn
                text="Close"
                @click="isActive.value = false"
              ></v-btn>
  
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
                </v-col>
              </v-row>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import UAParser from "ua-parser-js";

export default {
  data: () => ({
    step: 1,
    panel: "",
    dialog: '',
    email: "",
    password: "",
    errorMessage: "",
    showPassword: false,
    emptyFieldsError: false,
  }),
  props: {
    source: String,
  },
  mounted() {
    // Any setup logic can go here
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      // const userAgent = navigator.userAgent;
      // const deviceInfo = this.getDeviceInfo(userAgent);

      try {
        const response = await axios.post("loginadmin", {
          email: this.email,
          password: this.password,
          device_info: "browser",
          system_name: this.panel,
        });

        // Handle successful login
        console.log(response.data);
        console.log(JSON.stringify(response.data.user));
        let user = response.data.user;
        if (
          user.role == this.panel.toLowerCase() ||
          (user.role == "admin" && this.panel == "Registrar")
        ) {
          this.showToast('Login Suc cesfully', 'success', 2000)
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
          this.$router.push("/dashboard");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Unauthorized Access Wrong portal. Please try again later!",
          });
        }
        // Redirect or update UI as needed
      } catch (error) {
        console.log("Error details:", error);
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors;
          let errorMessage = "";
          for (const key in errors) {
            errorMessage += `${key}: ${errors[key].join(", ")}\n`;
          }
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage || "Error logging in. Please try again later!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error logging in. Please try again later!",
          });
        }
      }
    },
    getDeviceInfo(userAgent) {
      // This function can use a library to parse the user agent string
      const agent = new UAParser(userAgent);
      console.log(agent.getBrowser);
      return `${agent.browser.name} on ${agent.os.name}`;
    },
    showToast(message , icon , duration) { 
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: duration,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icon,
      title: message
    })
  }
  },
};
</script>

<style scoped>
.app {
  position: relative;
  background-image: url("../assets/BG.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.app::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.logo-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 100%;
  right: 100%;
}

.logo {
  width: 600px;
  height: 100%;
  object-fit: cover;
  filter: brightness(250%) grayscale(0%);
  opacity: 10%;
}

.logo-logo {
  max-height: 150px;
  max-width: 150px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.sna-text {
  color: var(--dark);
  text-shadow: 0px 1px, 1px 0px, 1px 1px;
}

.text-container {
  position: relative;
  z-index: 1;
  color: white;
}

.rectangle-color {
  background-color: var(--dark);
}

.policy-btn{
  font-weight: 900;
  text-decoration: underline;

}

h2{
  color: var(--dark);
  font-weight: 700;
  margin: 1.5rem;
   }
.policy{
  margin: 1rem;

  h4{
    color: var(--dark);
    padding-top: 1.5rem;
    font-weight: 600;
  }
  .material-icons{
    position: relative;
    top: 5px;
    margin-right: 0.5rem;
    color: var(--dark);
  }
}

</style>
