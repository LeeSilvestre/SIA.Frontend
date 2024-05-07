<template>
    <main>
        <div class="top-container">
            <div class="buttons">
                <v-btn class="mb-2 custom-btn bg-primary" @click="goBack">
                    <v-icon>mdi-chevron-left</v-icon>
                    BACK
                </v-btn>       
            </div>
            <div class="studentProfile">
                <span class="material-icons">summarize</span>
                <span class="text"> View Details</span>
            </div>
        </div>  
        <hr>

        <div>
            <RecordsTab @tab-clicked="handleTabClicked"/>
        </div>
      <div class="main-content">
        <div v-if="activeTab === 'StudentInfo'">
          <StudentInfo/>
        </div>
        <div v-else>
          <InfoDocuments/>
        </div>
      </div>

        
</main>

</template>

<script>
import RecordsTab from '../components/RecordsTab.vue';
import StudentInfo from '../components/StudentInfo.vue';
import InfoDocuments from '../components/InfoDocuments.vue';


export default {
  components: {
    RecordsTab,
    StudentInfo,
    InfoDocuments
  },
  data() {
      return {
        activeTab: 'StudentInfo',  // Set default active tab
      };
    },
    methods: {
      handleTabClicked(tab) {
        this.activeTab = tab;
      }
    },
  methods:{
    goBack(){
        this.$router.push('/enrollment');
    },
  },
};
</script>

<style lang="scss" scoped>
.top-container{
    display: right;
    margin-top: 0;
    .studentProfile{
        flex: 1;
        
        .material-icons{
            color: var(--dark);
            font-size: 2.5rem;
        }
        .text{
            position: relative;
            color: var(--dark);
            font-size: 2rem;
            font-weight: 900;
            bottom: 0.5rem;
        }
    }

}
.main-content {
    display: flex;
    flex-direction: column;

    .student-table{
        border-radius: 10px;
        background-color: #f0f0f0;
        padding: 0.5rem;
        height: 100vh;
    }
}

.custom-btn {
    background-color: primary;
    border: none;
    text-transform: none;
    font-weight: normal;
    font-size: inherit;
    border-radius: 50px;
}
.custom-btn .v-icon {
    margin-left: none;
}

</style>