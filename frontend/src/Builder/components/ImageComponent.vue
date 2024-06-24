<template>
  <div :style="containerStyle">
    <!-- {{ content }} -->
    <img
      :src="newContents"
      height="150"
      width="150"
      alt="Image Not Found"
      @click="openModal"
    />
    <!-- <img src="./images(1).jpeg"  alt="Image Not Found"/> -->
    <!-- <img src="./diwali-festival-patterned-background_53876-118874.avif" alt="MY NAME IS KHAN"> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      newContent: "",
    };
  },
  computed: {
    newContents() {
      console.log(this.content);
      const fileNameWithExtension = this.content.split("/").pop();
      return "http://localhost:3000/uploads/" + fileNameWithExtension;
    },
  },
  props: {
    content: {
      type: String,
      required: true,
      default:()=>("")
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
      this.$emit("open-modal-image", {
        content: this.content,
        containerStyle: this.containerStyle,
        imageStyle: this.imageStyle,
        type: "ImageComponent",
      });
    },
  },
  mounted() {
    console.log("Content URL hello:", this.content);
    this.newContent = `@${this.content}`;
    console.log("new content", this.newContent);
    // this.image = require(this.content)
    // console.log(this.image)
  },
};
</script>

<style scoped>
.image-content {
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  cursor: pointer;
}
.containerStyle {
  background-image: url("./images\ \(1\).jpeg");
  background-color: aquamarine;
}
</style>
