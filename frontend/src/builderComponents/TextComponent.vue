<template>
    <div>
      <vue-draggable-resizable
        :w="200"
        :h="100"
        :min-width="100"
        :min-height="50"
        :axis="'both'"
        @dragging="onDrag"
        @resizing="onResize"
        ref="textComponent"
      >
        <div class="text-component" :style="dynamicStyles">
          <button @click="removeComponent" class="remove-btn">X</button>
          <button @click="togglePanel" class="edit-btn">Edit</button>
          <div v-if="!isEditing" @click="enableEditing" class="text-display">{{ text }}</div>
          <input
            v-else
            v-model="text"
            @blur="disableEditing"
            @keyup.enter="disableEditing"
            class="text-input"
            ref="input"
          />
        </div>
      </vue-draggable-resizable>
  
      <!-- Panel for editing text and CSS properties -->
      <div v-if="showPanel" class="edit-panel">
        <!-- Text editing -->
        <input v-model="editedText" class="edit-input" @input="applyEditedText">
        
        <!-- Dynamically generate input fields for CSS properties -->
        <input v-for="(property, index) in cssProperties" :key="index" v-model="property.value" :type="property.type" class="edit-input" @input="applyCSSProperty(property)">
      </div>
    </div>
  </template>
  
  <script>
  import VueDraggableResizable from "vue-draggable-resizable";
  
  export default {
    name: "TextComponent",
    components: {
      VueDraggableResizable,
    },
    data() {
      return {
        isEditing: false,
        text: "Example text",
        showPanel: false,
        editedText: "",
        cssProperties: [
          { name: "background-color", value: "#ffffff", type: "color" },
          { name: "color", value: "#000000", type: "color" },
          { name: "font-size", value: "16px", type: "text" },
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
      enableEditing() {
        this.isEditing = true;
        this.$nextTick(() => {
          if (this.$refs.input) {
            this.$refs.input.focus();
          }
        });
      },
      disableEditing() {
        this.isEditing = false;
      },
      togglePanel() {
        this.showPanel = !this.showPanel;
      },
      applyEditedText() {
        this.text = this.editedText;
      },
      applyCSSProperty(property) {
        // Update the corresponding CSS property dynamically
        this.$refs.textComponent.$el.style[property.name] = property.value;
      }
    },
  };
  </script>
  
  <style>
  .text-component {
    position: relative;
    padding: 10px;
    border: 1px solid black;
    background-color: #f9f9f9;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
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

  .edit-btn {
  position: absolute;
  top: 0;
  right: 30px; /* Adjust as needed */
  border: none;
  background: blue; /* Adjust as needed */
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