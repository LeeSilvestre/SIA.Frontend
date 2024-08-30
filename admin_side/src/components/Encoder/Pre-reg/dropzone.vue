<template>
  <div class="dropzone"
  @dragenter.prevent="toggleActive" 
  @dragleave.prevent="toggleActive"
  @dragover.prevent
  @drop.prevent="onDrop($event)"
  :class="{'active-dropzone': active}">
  <div v-if="imageUrl" class="imagecont">
    <img :src="imageUrl" class="preview" />
  </div>
  <h1 v-else>Drop your file here!</h1>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(_, { emit }) {
    const active = ref(false);
    const imageUrl = ref(null);

    const toggleActive = () => {
      active.value = !active.value;
    };

    const onDrop = (event) => {
      const files = event.dataTransfer.files;
      if (files.length) {
        const file = files[0];
        imageUrl.value = URL.createObjectURL(file);
        emit('file-dropped', file);
      }
      toggleActive(); // Reset the dropzone state
    };

    return { active, toggleActive, onDrop, imageUrl };
  }
};
</script>

<style lang="scss" scoped>
.dropzone {
  width: 650px;
  height: 650px;
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
.imagecont{
  width: 100%;
  height: 100%;
}
.preview {
  width: 100%;
  height: 100%;
}
</style>
