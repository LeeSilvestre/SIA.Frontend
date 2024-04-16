<template>
    <div class="academics">
      <h1>Academics Record</h1>
      
    </div>
  </template>
  
  <script>
  export default {
    created() {
      this.$http.post('student').then(function (response){
        console.log(response);
      })
    }
  }

  </script>