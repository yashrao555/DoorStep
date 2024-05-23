<!-- src/components/DraggableText.vue -->
<template>
    <div class="draggable-text" @dragstart="onDragStart" draggable="true">
      <span>Text</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DraggableText',
    methods: {
      onDragStart(event) {
        event.dataTransfer.setData('component', 'TextComponent');
      },
    },
  };
  </script>
  
  <style>
  .draggable-text {
    padding: 10px;
    margin: 10px;
    border: 1px solid #007bff;
    background-color: #e9ecef;
    cursor: grab;
  }
  </style>
  