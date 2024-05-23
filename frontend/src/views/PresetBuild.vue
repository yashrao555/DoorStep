<template>
  <div id="app">
    <div class="sidebar">
      <DraggableText />
      <DraggableImage/>
    </div>
    <div class="canvas" @dragover.prevent @drop="onDrop">
      <div v-for="(comp, index) in components" :key="index">
        <component :is="comp" @remove="removeComponent(index)" />
      </div>
    </div>
  </div>
</template>

<script>
import DraggableText from '../builderNav/DraggableText.vue';
import TextComponent from '../builderComponents/TextComponent.vue';
import DraggableImage from '../builderNav/DraggableImage.vue';
import ImageComponent from '../builderComponents/ImageComponent.vue';

export default {
  
  components: {
    DraggableText,
    TextComponent,
    DraggableImage,
    ImageComponent
  },
  data() {
    return {
      components: [],
    };
  },
  methods: {
    onDrop(event) {
      const component = event.dataTransfer.getData('component');

      if (component) {
        this.components.push(component);
      }
    },
    removeComponent(index) {
      this.components.splice(index, 1);
    },
  },
};
</script>

<style>
#app {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.canvas {
  flex-grow: 1;
  padding: 10px;
  background-color: #ffffff;
  border-left: 1px solid #ccc;
  overflow-y: auto;
}
</style>
