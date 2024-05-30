<template>
    <div v-if="isOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <h3>Edit Image Component</h3>
        <label for="content">Image URL:</label>
        <input type="text" id="content" v-model="localContent" />
  
        <h4>Container Style</h4>
        <label for="backgroundColor">Background Color:</label>
        <input type="color" id="backgroundColor" v-model="localContainerStyle.backgroundColor" />
  
        <h4>Image Style</h4>
        <label for="width">Width:</label>
        <input type="text" id="width" v-model="localImageStyle.width" />
  
        <label for="height">Height:</label>
        <input type="text" id="height" v-model="localImageStyle.height" />
  
        <button @click="save">Save</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      containerStyle: {
        type: Object,
        required: true
      },
      imageStyle: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localContent: this.content,
        localContainerStyle: { ...this.containerStyle },
        localImageStyle: { ...this.imageStyle }
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      save() {
        this.$emit('save', {
          content: this.localContent,
          containerStyle: this.localContainerStyle,
          imageStyle: this.localImageStyle
        });
      }
    }
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