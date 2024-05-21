<template>
  <div>
    <div class="layoutJSON">
      Displayed as <code>[x, y, w, h]</code>:
      <div class="columns">
        <div class="layoutItem" v-for="item in internalLayout" :key="item.i">
          <b>{{ item.i }}</b>: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
        </div>
      </div>
    </div>
    <select v-model="selectedComponent">
      <option value="" disabled>Select component</option>
      <option value="div">Div</option>
      <option value="image">Image</option>
      <option value="paragraph">Paragraph</option>
    </select>
    <button @click="addItem">Add selected item dynamically</button>
    <input type="checkbox" v-model="draggable" /> Draggable
    <input type="checkbox" v-model="resizable" /> Resizable
    <grid-layout
      v-model:layout="internalLayout"
      :col-num="colNum"
      :row-height="30"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :vertical-compact="true"
      :use-css-transforms="true"
      @layout-updated="updateLayout"
    >
      <grid-item
        v-for="item in internalLayout"
        :static="item.static"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <div class="content-wrapper" @click="openEditModal(item)">
          <component :is="item.type" class="content">
            <img v-if="item.type === 'image'" :src="item.src" alt="" class="image-content" />
            <div v-else>{{ item.content }}</div>
          </component>
          <span class="remove" @click.stop="removeItem(item.i)">x</span>
        </div>
      </grid-item>
    </grid-layout>

    <div v-if="isEditModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <div v-if="selectedItem.type === 'image'">
          <input type="file" @change="uploadImage" />
        </div>
        <div v-else>
          <textarea v-model="selectedItem.content"></textarea>
        </div>
        <button @click="saveChanges">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { GridLayout, GridItem } from "vue3-grid-layout-next";

export default {
  components: {
    GridLayout,
    GridItem
  },
  data() {
    return {
      internalLayout: [
        { x: 0, y: 0, w: 2, h: 2, i: "0", type: 'div', content: 'Div 0' },
        { x: 2, y: 0, w: 2, h: 2, i: "1", type: 'div', content: 'Div 1' },
        { x: 4, y: 0, w: 2, h: 2, i: "2", type: 'div', content: 'Div 2' },
        { x: 6, y: 0, w: 2, h: 2, i: "3", type: 'div', content: 'Div 3' },
        { x: 8, y: 0, w: 2, h: 2, i: "4", type: 'div', content: 'Div 4' },
      ],
      draggable: true,
      resizable: true,
      colNum: 12,
      index: 0,
      selectedComponent: '',
      isEditModalOpen: false,
      selectedItem: null
    };
  },
  watch: {
    layout: {
      handler(newLayout) {
        this.internalLayout = newLayout;
      },
      deep: true
    }
  },
  mounted() {
    this.index = this.internalLayout.length;
  },
  methods: {
    addItem() {
      if (!this.selectedComponent) {
        alert("Please select a component type");
        return;
      }
      this.internalLayout.push({
        x: (this.internalLayout.length * 2) % (this.colNum || 12),
        y: this.internalLayout.length + (this.colNum || 12),
        w: 2,
        h: 2,
        i: this.index.toString(),
        type: this.selectedComponent,
        content: this.selectedComponent === 'image' ? '' : `New ${this.selectedComponent}`
      });
      this.index++;
      console.log(this.internalLayout);
      this.$emit("update:layout", this.internalLayout);
    },
    removeItem(val) {
      const index = this.internalLayout.map(item => item.i).indexOf(val);
      this.internalLayout.splice(index, 1);
      this.$emit("update:layout", this.internalLayout);
    },
    openEditModal(item) {
      this.selectedItem = item;
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.selectedItem = null;
    },
    saveChanges() {
      this.isEditModalOpen = false;
      this.$emit("update:layout", this.internalLayout);
    },
    uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedItem.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    updateLayout(newLayout) {
      this.internalLayout = newLayout;
      this.$emit("update:layout", newLayout);
    }
  }
};
</script>

<style scoped>
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}

.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}

.vue-grid-layout {
  background: #eee;
  position: relative;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
  position: absolute;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.content-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
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

.vue-grid-item {
  z-index: 1; /* Ensure grid items are stacked */
}
</style>
