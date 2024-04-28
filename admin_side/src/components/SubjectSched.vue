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
        <v-combobox
          clearable
          label="Grade Level"
          :items="['Grade 7', 'Grade 8', 'Grade 8', 
          'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']"
        ></v-combobox>
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