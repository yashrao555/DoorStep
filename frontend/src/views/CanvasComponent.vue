<template>
    <div
      class="canvas"
      @dragover.prevent
      @drop="drop"
    >
      <GridLayout
        v-model:layout="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :use-css-transforms="true"
      >
        <GridItem
          v-for="item in layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
        >
          <component :is="getComponent(item.type)" :item="item" @remove="removeItem(item.i)" @edit-css="editCSS(item)" />
        </GridItem>
      </GridLayout>
      <EditCSSModal v-if="showEditModal" :item="selectedItem" @save="saveCSS" @close="closeModal" />
    </div>
  </template>
  <script>
  
  import { GridLayout, GridItem } from 'vue3-grid-layout-next';
  import TextComponent from './TextComponent.vue';
  import ImageComponent from './ImageComponent.vue';
  import EditCSSModal from './EditCSSModal.vue';
  export default {
    components: {
      GridLayout,
      GridItem,
      TextComponent,
      ImageComponent,
      EditCSSModal
    },
    data() {
      return {
        layout: [],
        showEditModal: false,
        selectedItem: null
      };
    },
    methods: {
      drop(event) {
        const type = event.dataTransfer.getData('componentType');
        const id = Date.now().toString();
        this.layout.push({ i: id, x: 0, y: 0, w: 2, h: 2, type, css: {} });
      },
      getComponent(type) {
        return type === 'text' ? TextComponent : ImageComponent;
      },
      removeItem(id) {
        this.layout = this.layout.filter(item => item.i !== id);
      },
      editCSS(item) {
        this.selectedItem = item;
        this.showEditModal = true;
      },
      saveCSS(css) {
        this.selectedItem.css = css;
        this.showEditModal = false;
      },
      closeModal() {
        this.showEditModal = false;
      }
    }
  };
  </script>
  <style>
  .canvas {
    width: 100%;
    height: 100vh;
    border: 2px dashed #ccc;
  }
  </style>