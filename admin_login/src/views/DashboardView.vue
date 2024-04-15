<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1 class="display-1">Dashboard</h1>
          </v-card-title>
          <v-card-text>
            <!-- Content specific to Registrar Dashboard -->
            <v-divider class="mt-4 mb-6"></v-divider>
            <h2 class="subtitle-1 mb-2">Announcements</h2>
            <v-data-table
              :headers="announcementHeaders"
              :items="announcements"
              :items-per-page="5"
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      announcementHeaders: [
        { text: 'Date', align: 'start', sortable: true, value: 'date' },
        { text: 'Announcement', value: 'announcement' }
      ],
      announcements: []
    };
  },
  mounted() {
    this.generateAnnouncements();
  },
  methods: {
    generateAnnouncements() {
      const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dolor eget nisi pharetra suscipit.';
      for (let i = 0; i < 5; i++) {
        this.announcements.push({
          date: new Date().toLocaleDateString(),
          announcement: loremIpsum
        });
      }
    }
  }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
