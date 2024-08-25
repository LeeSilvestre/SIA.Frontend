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