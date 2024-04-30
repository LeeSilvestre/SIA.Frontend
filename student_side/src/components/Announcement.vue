<template>
    <v-sheet
      class="mx-auto"
      elevation="3"
      max-width="600"
    >
      <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-primary"
        show-arrows
      >
        <v-slide-group-item
          v-for="n in 5"
          :key="n"
          v-slot="{ isSelected, toggle, selectedClass }"
        >
          <v-card
            :class="['ma-4', selectedClass]"
            height="220"
            width="200"
            @click="toggle"
          >                   
          <v-card-text class="white--text mt-16 pt-14 mx-auto">
            <div class="logo-container">
            <img src="/src/assets/BG alt.jpg" class="logo">
          </div>
          <div class="text-container text-center">
            <p class="h4 font-weight-black ">Announcement {{ model }}</p>
          </div>
        </v-card-text>

            <div class="d-flex fill-height align-center justify-center">
              <v-scale-transition>
                <v-icon
                  v-if="isSelected"
                  color="white"
                  icon="mdi-close-circle-outline"
                  size="48"
                ></v-icon>
              </v-scale-transition>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
  
      <v-expand-transition>
        <v-sheet
          v-if="model != null"
          height="200"
        >
          <div class="d-flex fill-height align-center justify-center">
            <AnnouncementTable/>
          </div>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
  </template>

  <script>
import AnnouncementTable from './AnnouncementTable.vue';

  export default {
    components:{
        AnnouncementTable
    },
    data: () => ({
      model: null,
    }),
  }
</script>

<style lang="scss" scoped>
.logo-container {
    position: absolute;
    top: 0%;
    left: -100%;
    width: 100px;
    height: 100%;
    right: 100%; /* Adjust this value to move the container to the left */
    z-index: -1;
    
    

    .logo {
        width: 600px; 
        height: 100%; 
        object-fit: cover; 
        opacity: 0.4;
    }
}
</style>