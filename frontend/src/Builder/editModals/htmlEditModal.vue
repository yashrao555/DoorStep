<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
    
      <div class="editor">
        <h3>HTML</h3>
        <textarea v-model="htmlContent" rows="6" cols="30"></textarea>
      </div>
      <div class="editor">
        <h3>CSS</h3>
        <textarea v-model="cssContent" rows="6" cols="30"></textarea>
      </div>
      <div class="editor">
        <h3>JavaScript</h3>
        <textarea v-model="jsContent" rows="6" cols="30"></textarea>
      </div>
      <button class="btn btn-primary mt-2" @click="saveChanges">Save</button>
     </div>
   
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      htmlContent:this.content,
      cssContent:"",
      jsContent:""

    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    
    saveChanges() {
      this.$emit("save", {
        content: {htmlContent:this.htmlContent,
                  jsContent:this.jsContent,
                  cssContent:this.cssContent},
      });
    },
  },
};
</script>
<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  background-color: #fff;
}

.modal-content {
  background-color: #ffffff;
  margin: 0;
  padding: 20px;
  overflow-y: scroll;
  height: 100%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>

