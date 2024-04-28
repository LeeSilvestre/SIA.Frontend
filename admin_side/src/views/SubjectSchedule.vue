<template>
    <main>
        <div class="top-container">
            <div class="enrollment-nav">
                <EnrollmentNav/>
            </div>
        </div>  
        <hr>

        <div class="main-content">

            <div class="subject-schedule">
                <SubjectSched/>
            </div>
        </div>
        <hr>

        <div class="bottom-container">

            <div class="scheduling-table">
                <SchedulingTable/>
            </div>
            </div>


        
</main>

</template>

<script>
// import AddStudent from '../components/AddStudent.vue';
import EnrollmentNav from '../components/EnrollmentNav.vue';
import SubjectSched from '../components/SubjectSched.vue';
import SchedulingTable from '../components/SchedulingTable.vue';

export default {
  components: {
    // AddStudent,
    
    EnrollmentNav,
    SubjectSched,
    SchedulingTable
  }
};
</script>

<style lang="scss" scoped>

</style>