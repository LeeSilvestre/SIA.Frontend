import { ref, defineComponent } from 'vue';

export default defineComponent({
  props: {
    source: String
  },
  setup() {
    // Define step as a reactive variable using ref()
    const step = ref(1);

    // Return step along with any other properties or methods needed
    return { step };
  }
});
