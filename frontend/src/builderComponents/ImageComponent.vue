<template>
    <div>
      <vue-draggable-resizable
        :w="200"
        :h="200"
        :min-width="100"
        :min-height="100"
        :axis="'both'"
        @dragging="onDrag"
        @resizing="onResize"
        ref="imageComponent"
      >
        <div class="image-component" :style="dynamicStyles">
          <button @click="removeComponent" class="remove-btn">X</button>
          <button @click="togglePanel" class="edit-btn">Edit</button>
          <button @click="triggerFileUpload" class="upload-btn">Upload</button>
          <input type="file" @change="onImageUpload" class="image-upload" ref="fileInput" />
          <img v-if="imageSrc" :src="imageSrc" class="uploaded-image" />
        </div>
      </vue-draggable-resizable>
  
      <!-- Panel for editing image and CSS properties -->
      <div v-if="showPanel" class="edit-panel">
        <!-- Dynamically generate input fields for CSS properties -->
        <input v-for="(property, index) in cssProperties" :key="index" v-model="property.value" :type="property.type" class="edit-input" @input="applyCSSProperty(property)">
      </div>
    </div>
  </template>
  
  <script>
  import VueDraggableResizable from "vue-draggable-resizable";
  
  export default {
    name: "ImageComponent",
    components: {
      VueDraggableResizable,
    },
    data() {
      return {
        showPanel: false,
        imageSrc: null, // Holds the source of the uploaded image
        cssProperties: [
          { name: "width", value: "100%", type: "text" },
          { name: "height", value: "100%", type: "text" },
          { name: "border-radius", value: "0px", type: "text" },
          { name: "box-shadow", value: "none", type: "text" },
          // Add more CSS properties as needed
        ]
      };
    },
    computed: {
      dynamicStyles() {
        return this.cssProperties.reduce((styles, property) => {
          styles[property.name] = property.value;
          return styles;
        }, {});
      }
    },
    methods: {
      removeComponent() {
        this.$emit("remove");
      },
      onDrag(left, top) {
        console.log(`Dragging to: left ${left}px, top ${top}px`);
      },
      onResize(left, top, width, height) {
        console.log(`Resizing to: width ${width}px, height ${height}px`);
      },
      togglePanel() {
        this.showPanel = !this.showPanel;
      },
      triggerFileUpload() {
        this.$refs.fileInput.click();
      },
      onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageSrc = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      applyCSSProperty(property) {
        // Check if this.$refs.imageComponent exists before accessing its properties
        if (this.$refs.imageComponent) {
          this.$refs.imageComponent.$el.style[property.name] = property.value;
        }
      }
    },
  };
  </script>
  
  <style>
  /* Your existing styles */
  
  .image-component {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid black;
  }
  
  .image-upload {
    position: absolute;
    top: 10px;
    left: 10px;
    opacity: 0;
    cursor: pointer;
  }
  
  .uploaded-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .edit-btn {
    position: absolute;
    top: 0;
    right: 30px; /* Adjust as needed */
    border: none;
    background: blue; /* Adjust as needed */
    color: white;
    cursor: pointer;
  }
  
  .remove-btn {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: red;
    color: white;
    cursor: pointer;
  }
  
  .edit-panel {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px; /* Adjust as needed */
    height: 100%; /* Adjust as needed */
    background: #fff; /* Adjust as needed */
    border-left: 1px solid #ccc; /* Adjust as needed */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Adjust as needed */
  }
  
  .edit-input {
    width: 100%; /* Adjust as needed */
    padding: 10px; /* Adjust as needed */
    box-sizing: border-box;
  }

  .vdr {
    touch-action: none;
    position: absolute;
    box-sizing: border-box;
  }
  .handle {
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 10px;
    background: #eee;
    border: 1px solid #333;
  }
  .handle-tl {
    top: -10px;
    left: -10px;
    cursor: nw-resize;
  }
  .handle-tm {
    top: -10px;
    left: 50%;
    margin-left: -5px;
    cursor: n-resize;
  }
  .handle-tr {
    top: -10px;
    right: -10px;
    cursor: ne-resize;
  }
  .handle-ml {
    top: 50%;
    margin-top: -5px;
    left: -10px;
    cursor: w-resize;
  }
  .handle-mr {
    top: 50%;
    margin-top: -5px;
    right: -10px;
    cursor: e-resize;
  }
  .handle-bl {
    bottom: -10px;
    left: -10px;
    cursor: sw-resize;
  }
  .handle-bm {
    bottom: -10px;
    left: 50%;
    margin-left: -5px;
    cursor: s-resize;
  }
  .handle-br {
    bottom: -10px;
    right: -10px;
    cursor: se-resize;
  }
  @media only screen and (max-width: 768px) {
    [class*="handle-"]:before {
      content: "";
      left: -10px;
      right: -10px;
      bottom: -10px;
      top: -10px;
      position: absolute;
    }
  }
  </style>
  