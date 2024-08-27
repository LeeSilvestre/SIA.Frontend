<template>
    <v-card flat class="stepper-card">
        <v-card-title>
            <v-icon class="mr-2">mdi-book-open</v-icon>
            <span class="card-title fw-bold fs-3"
            >PRE-REGISTRATION INSTRUCTIONS</span
            >
        </v-card-title>
        <hr>
        <div class="pa-1">
            <v-card-text class="instructions" style="max-width: 1000px">
            <!-- New Instructions Content -->
            <div
                v-for="(instruction, index) in instructions"
                :key="index"
                class="mb-5"
            >
                <div class="d-flex align-items-center mb-2">
                <v-icon class="mr-2">{{ instruction.icon }}</v-icon>
                <h4 class="fw-bold">{{ instruction.title }}</h4>
                </div>
                <ul>
                <li
                    v-for="(detail, detailIndex) in instruction.details"
                    :key="detailIndex"
                >
                    {{ detail }}
                </li>
                </ul>
            </div>
            </v-card-text>
        </div>
    </v-card>
</template>



<script>
export default{
    data: ()=>({
        
    instructions: [
      {
        icon: "mdi-account",
        title: "Step 1: Personal Information",
        details: [
          "Enter your Learner Reference Number (LRN).",
          "Fill out your last name, first name, and middle name accurately.",
          "Select your gender from the options available (Male/Female).",
          "Provide your date of birth in the correct format (MM/DD/YYYY).",
          "Enter a valid email address where you can be contacted.",
          "Specify your religion.",
        ],
      },
      {
        icon: "mdi-home",
        title: "Step 2: Address Information",
        details: [
          "Provide your complete house number and street address.",
          "Ensure these fields are filled with accurate details about your residence.",
          "Enter the correct postal code for your area.",
        ],
      },
      {
        icon: "mdi-phone",
        title: "Step 3: Contact Information",
        details: [
          "Provide a valid contact number where you or your guardian can be reached.",
        ],
      },
      {
        icon: "mdi-school",
        title: "Step 4: Academic Information",
        details: [
          "Choose whether you are an incoming or returning student.",
          "Select the grade level you are applying for. If you are entering Grade 11 or 12, select the strand (e.g., HUMSS, STEM) that applies to you.",
        ],
      },
      {
        icon: "mdi-check-circle",
        title: "Step 5: Submission",
        details: [
          "After filling out all required fields, review your entries to ensure accuracy.",
          'Click the "Submit" button to complete your pre-registration. Ensure that all the required documents are ready for submission to avoid any delays in processing your enrollment.',
        ],
      },
    ],
    })
}

</script>



<style lang="scss" scoped>
.pa-1{
  overflow:auto;
}

.sweet-alert-container{
  z-index: 999;
}
.fileinput {
  width: 12vh !important;
}
.v-card-title {
  display: flex;
  align-items: center; /* Align items vertically */
  font-size: 1.5rem;
  font-weight: bold;
}

.title-icon {
  font-size: 4rem; /* Adjust icon size if needed */
  color: var(--dark); /* Color for the icon */
}

.title-text {
  font-size: 1.8rem; /* Increase the title size */
  font-weight: bold;
  color: var(--dark); /* Title color */
}

.instructions {
  overflow-y: auto;
  font-size: 1.2rem; /* Increase the instruction text size */
  line-height: 1.6;
}

.mb-5 {
  margin-bottom: 3rem !important;
}

h4 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--dark); /* Title color */
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