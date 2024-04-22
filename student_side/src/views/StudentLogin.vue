<template >
  <v-app class="app">
      <div >
        <v-card
          class="mx-auto pa-10 pb-8 mt-6 "
          elevation="8"
          max-width="630"
          rounded="lg"
        >
        
        <div class="logo-container">
          <img src="../assets/schoolLogo.png" class="logo"> 
        </div>

        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <p
              class="h4 mt-2 "
              style="color:var(--dark); font-weight:900"
            >
            Saint Nicholas Academy School Management System
            </p>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <p
              class="h4  mb-5"
              style="color:var(--dark); text-shadow: 0px 1px, 1px 0px, 1px 1px;"
            >
            WELCOME STUDENTS!
            </p>
          </v-col>
        </v-row>
        <v-form>
          <v-text-field 
            label="Email/ID"
            name="Email"
            prepend-icon="mdi-email"
            type="text"
            color="var(--dark)"
            />
          <v-text-field
            id="password"
            label="Password"
            name="Password"
            prepend-icon="mdi-lock"
            type="password"
            color="var(--dark)"
            />
        </v-form>
    
          <v-card
            class="mb-2"
            color="surface-variant"
            variant="tonal"
          >
          </v-card>

          <v-btn
            class="mb-2 font-weigt-black"
            color="blue"
            size="large"
            variant="tonal"
            block
          >
            Log In
          </v-btn>

          <v-col cols="12" class="text-center">
            <a
              class=" text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Forgot Password?
            </a>
          </v-col>
        </v-card>
      </div>
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

<style scoped> 

  .app {
    position: relative; /* Ensure the parent is positioned relative */
    background-image: url('../assets/BG alt.jpg');
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .app::before {
    content: ''; /* Required for pseudo-elements */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Adjust the opacity value as needed */
  }

  .logo-container {
    max-width: 10rem; 
    margin: auto; 
  }
  
  .logo {
    max-width: 100%; 
    height: 10rem; 
  }
</style>

