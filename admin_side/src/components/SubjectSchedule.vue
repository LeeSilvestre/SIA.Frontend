<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="academicYear"
            :counter="10"
            :rules="academicRules"
            label="Academic Year"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="Strand"
            :counter="10"
            :rules="strandRules"
            label="Strand"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="gradeTerm"
            :rules="gradeTermRules"
            label="Grade/Term"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="Section"
            :rules="sectionRules"
            label="Section"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="AdviserID"
            :rules="adviserIDRules"
            label="Adviser ID"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="Adviser"
            :rules="adviserRules"
            label="Adviser Name"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="SubjectCode"
            :rules="subjectCodeRules"
            label="Subject Code"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <hr>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  
}
</script>

<style>


</style>