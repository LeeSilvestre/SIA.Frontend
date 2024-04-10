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
                            <v-img src="..\src\assets\schoolLogo.png" max-height="150" max-width="150" class="d-inline-block"></v-img>
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
                        <h4 class="text-right mt-n4 font-weight-light">
                          Forget Password
                        </h4>
                      </v-card-text>
                      <div class="text-center pb-3">
                        <v-btn rectangle color="indigo darken-4" dark> Sign in</v-btn>
                      </div>
                      <div class="text-center pb-3">
                        <a href="" style="display: inline-block;">
                          St. Nicholas Academy General Privacy Notice
                        </a>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="indigo darken-4">
                      
                      <v-card-text class="white--text mt-16 pt-16">
                        <h1 class="text-center display-1 font-weight-bold">ST. NICHOLAS ACADEMY OF CASTILLEJOS INC.</h1>
                        <h5 class="text-center display-5 font-weight-light">CASTILLEJOS, ZAMBALES</h5>
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
  export default {
    data: () => ({
      step: 1
    }),
    props: {
      source: String
    }
  }
</script>


