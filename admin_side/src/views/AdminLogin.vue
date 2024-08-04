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
                    <div class="text-container text-center">
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
                    <v-form class="pt-4">
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
        console.log("Error details:", error.response.data);
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
</style>
