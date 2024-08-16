<template>
    <main>
        <div class="top-container">
            <h1 class="bg-title">ADMISSION</h1>
        <div class="inventory">
            <span class="material-icons">feed</span>
            <span class="text">ADMISSION</span>
        </div>
            
        </div>  
        <hr style="margin: 0;">

        <div class="main-content">

            <div class="student-table">
                <StudentTable/>
                
            </div>
        </div>

        
</main>

</template>

<script>
// import AddStudent from '../components/AddStudent.vue';
import StudentTable from '../components/Encoder/Admission.vue';

export default {
  components: {
    // AddStudent,
    StudentTable
  }
};
</script>

<style lang="scss" scoped>
.top-container{
    // padding : 10px !important;
    display: flex;
    .studentProfile{
        flex: 1;
        
        .material-icons{
            color: var(--dark);
            font-size: 2.5rem;
        }
        .text{
            position: relative;
            color: var(--dark);
            font-size: 1rem;
            font-weight: 900;
            bottom: 0.5rem;
        }
    }

} 

.main-content {
    display: flex;
    flex-direction: column;
    padding-top: 15px;
    .student-table{
        border-radius: 10px;
        background-color: #f0f0f0;
        padding: 0.5rem;
    }
}

.bg-title{
    z-index: -1;
    position: absolute;
    opacity: 4%;
    margin-top: -40px;
    font-size: 75px;
    font-family: Impact, fantasy;
}
.top-container{
    display: flex;
    .inventory{
        flex: 1;
        
        .material-icons{
            color: var(--dark);
            font-size: 2.5rem;
        }
        .text{
            position: relative;
            color: var(--dark);
            font-size: 2.5rem;
            font-weight: 900;
            bottom: 0.6rem;
            left: 0.5rem;
        }
    }

} 

</style>