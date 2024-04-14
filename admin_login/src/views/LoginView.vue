<template>
    <v-app>
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="8">
              <v-card class="elevation-12">
                <v-window v-model="step">
                  <v-windown-item value="1">
                    <v-row>
                      <v-col cols="12" md="8">
                        <v-card-text class="mt-1">
                          <div class="text-center mb-1">
                              <v-img src="..\src\assets\img\schoolLogo.png" max-height="150" max-width="150" class="d-inline-block"></v-img>
                          </div>
                          <h2 class="text-center mlt-4">
                            Welcome to  <span class="indigo--text text--darken-4">SNA!</span>
                          </h2>
                          <h4 class="text-center mlt-4">
                            Registrar Panel
                          </h4>
                          <v-form>
                            <v-text-field 
                              label="Email/ID"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="indigo darken-4" />
                            <v-text-field 
                              id="password"
                              label="Password"
                              name="Password"
                              prepend-icon="lock"
                              type="password"
                              color="indigo darken-4" />
  
                            
                          </v-form> 
                        </v-card-text>
                        <div class="text-center pb-3">
                          <v-btn rectangle color="indigo darken-4" dark> <router-link to="/home" style="color:white; text-decoration: none;">Sign in</router-link></v-btn>
                        </div>
                        <div class="text-center pb-3">
                          <a href="" style="display: inline-block;">
                            St. Nicholas Academy General Privacy Notice
                          </a>
                        </div>
                      </v-col>
                      <v-col cols="12" md="4" class="indigo darken-4">
                        
                        <v-card-text class="white--text mt-16 pt-16" style="height: 300px;">
                        <div class="text-container text-center">
                          <h1 class="display-1 font-weight-bold">ST. NICHOLAS ACADEMY OF CASTILLEJOS INC.</h1>
                          <h5 class="display-5 font-weight-light">CASTILLEJOS, ZAMBALES</h5>
                        </div>
                        <div class="logo-container">
                          <!-- Logo positioned at the right side -->
                          <v-img src="..\src\assets\img\schoolLogo3.png" max-height="500" max-width="500" class="logo"></v-img>
                        </div>
                      </v-card-text>
                      </v-col>
                    </v-row>
                  </v-windown-item>
                  <v-windown-item value="2">
  
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
    import ('@/assets/js/login.js');
  </script>
  
<style> 
@import url('@/assets/css/admin_login.css');
</style>
  
  
  