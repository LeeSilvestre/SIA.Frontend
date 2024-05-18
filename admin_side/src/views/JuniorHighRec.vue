<template>
    <main>
        <div class="top-container">
            <h1 class="bg-title">RECORDS</h1>
                <div class="inventory">
                    <span class="material-icons">person</span>
                    <span class="text">RECORDS</span>
                </div>
            
        </div>  
        <hr>

        <div class="main-content">

            <div class="student-table">
                <JuniorHigh/>
            </div>
        </div>

        
</main>

</template>

<script>
// import AddStudent from '../components/AddStudent.vue';
import JuniorHigh from '../components/JuniorHigh.vue';

export default {
  components: {
    // AddStudent,
    JuniorHigh
  }
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
        overflow: auto;
        margin: 1rem;
    }
}

.bg-title{
    z-index: -1;
    position: absolute;
    opacity: 4%;
    margin-top: -40px;
    font-size: 100px;
    font-family: Impact, fantasy;
}
.top-container{
    display: flex;
    margin: 0.5rem;
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
            bottom: 0.3rem;
            left: 0.5rem;
        }
    }

} 


</style>