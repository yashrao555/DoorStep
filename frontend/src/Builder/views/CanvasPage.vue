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
    <select class="select mb-3" v-model="selectedComponent">
      <option value="" disabled>Select component</option>
      <option value="TextComponent">Text</option>
      <option value="ImageComponent">Image</option>
    </select>
    <button class="addItemButton" @click="addItem">Add item</button>
    <input class="checkBox" type="checkbox" v-model="draggable" /> Draggable
    <input class="checkBox" type="checkbox" v-model="resizable" /> Resizable
    <grid-layout
      v-model:layout="internalLayout"
      :col-num="colNum"
      :row-height="60"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :vertical-compact="true"
      :use-css-transforms="true"
      :margin=[0,0]
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

    <!-- Edit Modal -->
    <EditModal
      v-if="isEditModalOpen"
      :isOpen="isEditModalOpen"
      :content="editableContent"
      :containerStyle="editableContainerStyle"
      :textStyle="editableTextStyle"
      @close="closeEditModal"
      @save="saveChanges"
    />

    <button class="btn btn-primary" @click="saveLayout">Save Layout</button>
  </div>
  
</template>

<script>
import { GridLayout, GridItem } from 'vue3-grid-layout-next';
import TextComponent from '../components/TextComponent.vue';
import ImageComponent from '../components/ImageComponent.vue';
import EditModal from '../components/EditModal.vue'; // Import the new modal component
import axios from 'axios';

export default {
  components: {
    GridLayout,
    GridItem,
    TextComponent,
    ImageComponent,
    EditModal, // Register the new modal component
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
  mounted(){
    this.getItem();
  },
  methods: {
    async getItem() {
    try {
      const result = await axios.get('http://localhost:3000/get-all-text');
      console.log('Fetched result:', result);
      

      if (Array.isArray(result.data)) {
        this.internalLayout = result.data.map(item => ({
          x: item.x ?? 0,
          y: item.y ?? 0,
          w: item.w ?? 1,
          h: item.h ?? 1,
          i: item.id ?? String(Math.random()),
         // type: item.type ?? 'TextComponent',
          //content: item.content ?? 'Sample text',
          //containerStyle: JSON.parse(item.css).containerStyle ?? {},
          //textStyle: JSON.parse(item.css).textStyle ?? {},
        }));

        const css = await axios.get('http://localhost:3000/get-css')
        console.log('CSS is',css);
      } else {
        console.error('Fetched data is not an array');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  },

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
    saveChanges(data) {
      if (this.editingItemId !== null) {
        this.updateItem(
          this.editingItemId,
          data.content,
          data.containerStyle,
          data.textStyle
        );
        this.isEditModalOpen = false;
      }
    },
    async saveLayout() {
      try {
        console.log("backend data",this.internalLayout);
        const response = await axios.post('http://localhost:3000/text-builder', {internalLayout:this.internalLayout});
        console.log(response);
        alert('Layout saved successfully');
      } catch (error) {
        console.error('Error saving layout:', error);
        alert('Failed to save layout');
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

.select{
  margin-top:2vh;
  border-radius: 20px;
  padding: 0.5rem;
  /* width: 8vw; */
  width: 150px;
  height: 5vh;
  background-color: #ddd;
  color: #0d0c0c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.addItemButton{
  margin-left: 1.5vw;
  border-radius: 20px;
  padding: 0.5rem;
  /* width: 8vw; */
  width: 150px;
  height: 5vh;
  background-color: #ddd;
  color: #0d0c0c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.checkBox{
  margin-left: 1.5vw;
  
}

.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}

.vue-grid-layout {
  background: #ffffff;
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
  right: 0;
  width: 20%;
  height: 100%;
  overflow: auto;
  background-color: rgba(215, 24, 24, 0.4);
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
