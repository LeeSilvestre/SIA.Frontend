<template>
    <main>
        <div class="top-container">
            <div class='buttons'>
                <v-btn class="mb-2" color="primary" dark @click="goBack">BACK</v-btn>
            </div>


        </div>  
        <hr>

        <div class="main-content">

            <div class="student-table">
                <StudentTable/>
            </div>
        </div>

        
</main>

</template>

<script>
// import AddStudent from '../components/AddStudent.vue';
import StudentTable from '../components/StudentTable.vue';

export default {
  components: {
    // AddStudent,
    StudentTable
  },
  methods:{
    goBack(){
        this.$router.push('/enrollment');
    },
  },
};
</script>

<style lang="scss" scoped>
.buttons{
    display: flex;
    align-items: center;
    margin-right: 20px;
}
.top-container{
    display: flex;
    margin: 0.5rem;
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


</style>