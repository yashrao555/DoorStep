<!-- src/components/DraggableText.vue -->
<template>
    <div class="draggable-image" @dragstart="onDragStart" draggable="true">
      <span>Image</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DraggableImage',
    methods: {
      onDragStart(event) {
        event.dataTransfer.setData('component', 'ImageComponent');
      },
    },
  };
  </script>
  
  <style>
  .draggable-image {
    padding: 10px;
    margin: 10px;
    border: 1px solid #007bff;
    background-color: #e9ecef;
    cursor: grab;
  }
  </style>