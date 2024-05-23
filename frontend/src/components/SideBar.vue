<template>
  <div class="sidebar">
    <h3>Components</h3>
    <div
      class="draggable-item"
      draggable="true"
      @dragstart="dragStart($event, 'text')"
    >
      Text
    </div>
    <div
      class="draggable-item"
      draggable="true"
      @dragstart="dragStart($event, 'image')"
    >
      Image
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    dragStart(event, type) {
      event.dataTransfer.setData('componentType', type);
    }
  }
};
</script>
<style>
.sidebar {
  width: 200px;
  background-color: #F4F4F4;
  padding: 20px;
}
.draggable-item {
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: grab;
}
</style>