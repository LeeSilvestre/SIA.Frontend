<template>
    <main>
        <div class="top-container">
            <div class="studentProfile">
                <span class="material-icons">person_add</span>
                <span class="text"> Enrollment</span>
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
export default {

};
</script>

<style lang="scss" scoped>
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
            font-size: 1.5rem;
            font-weight: 900;
            bottom: 0.5rem;
        }
    }

} 
</style>