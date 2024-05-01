<template>
    <main>
        <div class="top-container">
            <div class="studentProfile">
                <span class="material-icons">badge</span>
                <span class="text">Student Profile</span>
            </div>

        </div>  
        <hr>

        <div class="main-content">

            <div class="enrollment-nav">
                <EnrollmentNav/>
            </div>
        </div>

        
</main>

</template>

<script>
// import AddStudent from '../components/AddStudent.vue';
import EnrollmentNav from '../components/EnrollmentNav.vue';

export default {
  components: {
    // AddStudent,
    EnrollmentNav   
  }
};
</script>

<style lang="scss" scoped>

</style>