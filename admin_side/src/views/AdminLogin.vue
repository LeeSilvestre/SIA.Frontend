<template>
  <v-app>
    <v-content>
      <v-container class="mt-16 fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-windown-item :value="1">
                  <v-row>
                    <v-col cols="12" md="4" class="bg-indigo-darken-4">
                      
                      <v-card-text class="white--text mt-16 pt-14 mx-auto">
                        <div class="logo-container">
                        <!-- Logo positioned at the right side -->
                        <img src="/src/assets/schoolLogo3.png" max-height="900" max-width="900" class="logo">
                      </div>
                      <div class="text-container text-center">
                        <h1 class="h1 font-weight-bold">ST.NICHOLAS ACADEMY OF CASTILLEJOS INC.</h1>
                        <p class="h6 font-weight-normal">CASTILLEJOS, ZAMBALES</p>
                      </div>
                      
                    </v-card-text>
                    </v-col>
                    <v-col cols="12" md="8">
                      
                      <v-card-text class="mt-1">
                        <div class="text-center mb-1">
                          <img src="/src/assets/schoolLogo.png" class="logo-logo">
                        </div>
                        <h2 class="text-center lh-0 fs-4 fw-normal">
                          Welcome to  <span class=" fw-bolder text-indigo-darken-4">SNA!</span>
                        </h2>
                        <h4 class="text-center pt-0 fs-6">
                          Registrar Panel
                        </h4>
                        <v-form>
                          <v-text-field 
                            label="Email/ID"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="indigo-darken-4 fw-bold"
                            />
                          <v-text-field
                            id="password"
                            label="Password"
                            name="Password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="indigo-darken-4 fw-bold"/>
                        </v-form> 
                      </v-card-text>
                      <div class="text-center pb-2 mx-md-auto">
                        <v-btn rectangle color="#11235A"> <router-link to="/dashboard" style="color:white; text-decoration: none; width: auto; font-size: 15px; ">Sign in</router-link></v-btn>
                      </div>
                      <div class="text-center pb-2">
                        <a href="" style="display: inline-block;">
                          St. Nicholas Academy General Privacy Notice
                        </a>
                      </div>
                    </v-col>
                  </v-row>
                </v-windown-item>
                <v-windown-item :value="2">

                </v-windown-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
 export default {
    data: () => ({
      step: 1
    }),
    props: {
      source: String
    }
  }
</script>

<style> 

.logo-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 100%;
    right: 100%; /* Adjust this value to move the container to the left */
}

  
  .logo {
    width: 600px; 
    height: 100%; 
    object-fit: cover; 
    filter: brightness(250%) grayscale(0%); 
    opacity: 12%;
  }

  .logo-logo {
  max-height: 150px;
  max-width: 150px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

  .text-container {
    position: relative;
    z-index: 1; 
  }
</style>


