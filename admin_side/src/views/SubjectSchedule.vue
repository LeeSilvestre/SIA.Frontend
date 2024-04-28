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
                <SubjectSchedule/>
            </div>
        </div>
        <hr>

        <div class="container-fluid">

        </div>


        
</main>

</template>

<script>
// import AddStudent from '../components/AddStudent.vue';
import EnrollmentNav from '../components/EnrollmentNav.vue';
import SubjectSchedule from '../components/SubjectSchedule.vue';

export default {
  components: {
    // AddStudent,
    SubjectSchedule,
    EnrollmentNav
  }
};
</script>

<style lang="scss" scoped>

</style>