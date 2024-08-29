<template>
    <div class="dropzone"
         @dragenter.prevent="toggleActive" 
         @dragleave.prevent="toggleActive"
         @dragover.prevent
         @drop.prevent="onDrop($event)"
         :class="{'active-dropzone': active}"
    >
      <h1>Drop your file here!</h1>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    setup(_, { emit }) {
      const active = ref(false);
  
      const toggleActive = () => {
        active.value = !active.value;
      };
  
      const onDrop = (event) => {
        const files = event.dataTransfer.files;
        if (files.length) {
          emit('file-dropped', files[0]);
        }
        toggleActive(); // Reset the dropzone state
      };
  
      return { active, toggleActive, onDrop };
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .dropzone {
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px dashed #41b883;
    background-color: #fff;
    transition: .1s ease all;
    h1 {
      color: #41b883;
    }
  }
  
  .active-dropzone {
    color: #fff;
    border-color: #fff;
    background-color: #41b883;
    h1 {
      color: white;
    }
  }
  
  </style>
  