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
      <option value="TextComponent">Text</option>
      <option value="ImageComponent">Image</option>
    </select>
    <button @click="addItem">Add selected item dynamically</button>
    <input type="checkbox" v-model="draggable" /> Draggable
    <input type="checkbox" v-model="resizable" /> Resizable
    <grid-layout
      v-model:layout="internalLayout"
      :col-num="colNum"
      :row-height="60"
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
        <div>
          <component
          
            :is="item.type"
            :content="item.content"
            :containerStyle="item.containerStyle"
            :textStyle="item.textStyle"
            @open-modal="openModal(item.i, $event)"
          />
          <span class="remove" @click.stop="removeItem(item.i)">x</span>
        </div>
      </grid-item>
    </grid-layout>

    <!-- Modal -->
    <div v-if="isEditModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <div>
          <label>Text Content:</label>
          <textarea v-model="editableContent"></textarea>
        </div>
        <div>
          <h3>Container Style</h3>
          <div>
            <label>Background Color:</label>
            <input type="color" v-model="editableContainerStyle.backgroundColor" />
          </div>
          <div>
            <label>Padding:</label>
            <input type="text" v-model="editableContainerStyle.padding" />
          </div>
          <!-- Add more container styles as needed -->
        </div>
        <div>
          <h3>Text Style</h3>
          <div>
            <label>Font Size (px):</label>
            <input type="number" v-model.number="editableTextStyle.fontSize" />
          </div>
          <div>
            <label>Text Color:</label>
            <input type="color" v-model="editableTextStyle.color" />
          </div>
          <!-- Add more text styles as needed -->
        </div>
        <button @click="saveChanges">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue3-grid-layout-next';
import TextComponent from '../components/TextComponent.vue';
import ImageComponent from '../components/ImageComponent.vue';

export default {
  components: {
    GridLayout,
    GridItem,
    TextComponent,
    ImageComponent,
  },
  data() {
    return {
      internalLayout: [],
      draggable: true,
      resizable: true,
      colNum: 12,
      index: 0,
      selectedComponent: '',
      isEditModalOpen: false,
      editableContent: '',
      editableContainerStyle: {},
      editableTextStyle: {},
      editingItemId: null, // To keep track of which item is being edited
    };
  },
  methods: {
    addItem() {
      if (!this.selectedComponent) {
        alert('Please select a component type');
        return;
      }
      this.internalLayout.push({
        x: (this.internalLayout.length * 2) % (this.colNum || 12),
        y: this.internalLayout.length + (this.colNum || 12),
        w: 2,
        h: 2,
        i: this.index.toString(),
        type: this.selectedComponent,
        content: 'Sample text', // Default content for TextComponent
        containerStyle: {}, // Default container style
        textStyle: {}, // Default text style
      });
      this.index++;
    },
    removeItem(val) {
      const index = this.internalLayout.map((item) => item.i).indexOf(val);
      this.internalLayout.splice(index, 1);
    },
    updateItem(id, content, containerStyle, textStyle) {
      const item = this.internalLayout.find((item) => item.i === id);
      if (item) {
        item.content = content;
        item.containerStyle = containerStyle;
        item.textStyle = textStyle;
      }
    },
    updateLayout(newLayout) {
      this.internalLayout = newLayout;
    },
    openModal(id, data) {
      this.editingItemId = id;
      this.editableContent = data.content;
      this.editableContainerStyle = { ...data.containerStyle };
      this.editableTextStyle = { ...data.textStyle };
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    saveChanges() {
      if (this.editingItemId !== null) {
        this.updateItem(
          this.editingItemId,
          this.editableContent,
          this.editableContainerStyle,
          this.editableTextStyle
        );
        this.isEditModalOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
  overflow: hidden;
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
  background: #f33636;
  position: relative;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ffffff;
  border: 1px solid black;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fff;
  margin: 0;
  padding: 20px;
  border: 1px solid #888;
  height: 100%;
  box-sizing: border-box;
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
