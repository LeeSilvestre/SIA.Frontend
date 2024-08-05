<template>
    <main>
      <div class="top-container">
          <h1 class="bg-title">SUBJECT SCHEDULING</h1>
          <div class="studentProfile">
              <span class="material-icons">edit_calendar</span>
              <span class="text fw-bolder">SUBJECT SCHEDULING</span>   
          </div>    
      </div> 
      <hr>
  
      <div class="bottom-container">
  
          <div class="upload-container">
  
              <DocumentUploadTable/>
          </div>

      </div>
    </main>
  
  </template>
  
  <script>
  import DocumentUploadTable from '../components/DocumentUploadTable.vue';
  export default {
      components:{
        DocumentUploadTable,
      }
  }
  </script >
  
  <style lang="scss" scoped>
  main {
      display: flex;
      flex-direction: column;
  }
  
  .top-container{
      display: flex;
      margin: 0.5rem;
  
      .bg-title{
        z-index: -1;
  position: absolute;
  opacity: 4%;
  margin-top: -40px;
  font-size: 100px;
  font-family: Impact, fantasy;
      }
      .studentProfile{
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
  
  .bottom-container{
      display: flex;
      justify-content: center;

  
    .upload-container{
        flex: 1;
        border-radius: 10px;
        background-color: #f0f0f0;
        padding: 0.5rem;
        overflow: auto;
        margin: 0;

      }
  
  }
  </style>