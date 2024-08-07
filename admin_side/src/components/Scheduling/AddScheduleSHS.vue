<template>
  <v-card-text>
    <v-select
      v-model="newItem.strand"
      :items="strandLevels"
      label="Strand"
      variant="solo-filled"
      class="mr-2 m-auto"
      required
    ></v-select>
    
    <!-- Form for adding details -->
    <v-form ref="form">
      <!-- Class Code -->
      <v-text-field
        v-model="newItem.classCode"
        label="Class Code"
        required
      ></v-text-field>

      <v-row dense>
        <v-col cols="6" sm="">
          <!-- Day -->
          <v-select
            v-model="newItem.day"
            :items="daysOfWeek"
            label="Day"
            required
          ></v-select>
        </v-col>

        <v-col cols="6" sm="6">
          <!-- Time -->
          <v-text-field
            v-model="newItem.time"
            label="Time"
            type="time"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Section -->
      <v-text-field
        v-model="newItem.section"
        label="Section"
        required
      ></v-text-field>

      <!-- Room -->
      <v-text-field 
        v-model="newItem.room" 
        label="Room" 
        required
      ></v-text-field>

      <!-- Faculty -->
      <v-text-field
        v-model="newItem.faculty"
        label="Faculty"
        required
      ></v-text-field>
    </v-form>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      newItem: {
        strand: '',
        classCode: '',
        day: '',
        time: '',
        section: '',
        room: '',
        faculty: ''
      },
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      strandLevels: [
        { value: 'STEM', text: 'STEM' },
        { value: 'ABM', text: 'ABM' },
        { value: 'HUMSS', text: 'HUMSS' },
        { value: 'TVL', text: 'TVL' }
      ],
    };
  },
  methods: {
    clearForm() {
      this.newItem = {
        strand: '',
        classCode: '',
        day: '',
        time: '',
        section: '',
        room: '',
        faculty: ''
      };
    }
  }
};
</script>
  
  <style>

</style>
  