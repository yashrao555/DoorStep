<template>
  <div :style="containerStyle">
    <!-- {{ content }} -->
    <div class="html-style" @click="openModal">Click Here</div>
    <p v-html="content"  @click="openModal"></p>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    containerStyle: {
      type: Object,
      default: () => ({}),
    },
    imageStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    openModal() {
      this.$emit("open-modal-html", {
        content: this.content,
        containerStyle: this.containerStyle,
        imageStyle: this.imageStyle,
        type: "AddHTML",
      });
    },
  },
  mounted() {
    console.log("Content URL:", this.content);
  },
};
</script>

<style scoped>
.html-style {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* object-fit: cover; */
  cursor: pointer;
}
</style>
