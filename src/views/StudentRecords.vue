<template>
    <main>

        <div class="main-content">
            <!-- <div class="add-student" >
                <span class="material-icons">add_circle</span>
                <span class="text">Add Student</span>
                <AddStudent/>
            </div> -->
            

            <div class="student-records">
                <!-- <h1>Student Records</h1> -->
                <StudentRecords/>
            </div>
        </div>

        
</main>

</template>

<script>
// import AddStudent from '../components/AddStudent.vue';
import StudentRecords from '../components/StudentRecords.vue';

export default {
  components: {
    // AddStudent,
    StudentRecords
  }
};
</script>

<style lang="scss" scoped>
.top-container{
    display: flex;
    margin: 0.5rem;
    .studentrecords{
        flex: 1;
        
        .material-icons{
            color: var(--dark);
            font-size: 2.5rem;
        }
        .text{
            position: relative;
            color: var(--dark);
            font-size: 1.5rem;
            font-weight: 900;
            bottom: 0.5rem;
        }
    }

} 

.main-content {
    display: flex;
    flex-direction: column;

    .student-records{
        border-radius: 10px;
        background-color: #f0f0f0;
        padding: 0.5rem;
        height: 100vh;
    }
}


</style>