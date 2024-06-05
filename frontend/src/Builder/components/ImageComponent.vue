<template>
  <div :style="containerStyle">
    <!-- {{ content }} -->
    <img :src="content" :style="imageStyle" class="image-content" alt="Image Not Found" @click="openModal" />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    },
    containerStyle: {
      type: Object,
      default: () => ({})
    },
    imageStyle: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    openModal() {
      this.$emit('open-modal-image', {
        content: this.content,
        containerStyle: this.containerStyle,
        imageStyle: this.imageStyle,
        type: 'ImageComponent'
      });
    }
  },
  mounted() {
    console.log('Content URL:', this.content);
  }
};
</script>

<style scoped>
.image-content {
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  cursor: pointer;
}
</style>
