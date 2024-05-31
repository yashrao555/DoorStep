<template>
  <div>
    <!-- <div class="layoutJSON">
      Displayed as <code>[x, y, w, h]</code>:
      <div class="columns">
        <div class="layoutItem" v-for="item in internalLayout" :key="item.i">
          <b>{{ item.i }}</b>: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
        </div>
      </div>
    </div> -->
    <button class="btn btn-primary ms-4" >+ New Layout</button>
    <select class="btn btn-primary ms-4 mb-3 mt-3 " v-model="selectedLayout"  style="height:3.8vh" >
      <option value="" disabled>Layouts</option>
      <option value="1">Layout 1</option> 
      <option value="2">Layout 2</option>
    </select>
    <select class="btn btn-primary ms-4 mb-3 mt-3 " style="height:3.8vh" v-model="selectedComponent">
      <option value="" disabled>Components</option>
      <option value="TextComponent">Text</option>
      <option value="ImageComponent">Image</option>
    </select>
    <button class="btn btn-primary ms-4" @click="addItem">Add item</button>
    <input class="checkBox" type="checkbox" v-model="draggable" /> Draggable
    <input class="checkBox" type="checkbox" v-model="resizable" /> Resizable
    <button class="btn btn-success " style="margin-left:54vw" @click="saveLayout(selectedLayout)">Save Layout</button>
    <grid-layout
      v-model:layout="internalLayout"
      :col-num="colNum"
      :row-height="60"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :vertical-compact="true"
      :use-css-transforms="true"
      :margin=[5,5]
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
            :imageStyle="item.imageStyle"
            @open-modal="openModal(item.i, $event)"
          />
          <span class="remove" @click.stop="removeItem(item.i)">x</span>
        </div>
      </grid-item>
    </grid-layout>

    <!-- Edit Modal -->
    <TextEditModal
      v-if="isEditModalOpen"
      :isOpen="isEditModalOpen"
      :content="editableContent"
      :containerStyle="editableContainerStyle"
      :textStyle="editableTextStyle"
      @close="closeEditModal"
      @save="saveChanges"
    />
    <ImageEditModal
      v-if="isEditModalOpen && editingItemType === 'ImageComponent'"
      :isOpen="isEditModalOpen"
      :content="editableContent"
      :containerStyle="editableContainerStyle"
      :imageStyle="editableImageStyle"
      @close="closeEditModal"
      @save="saveChanges"
    />

    
  </div>
  
</template>

<script>
import { GridLayout, GridItem } from 'vue3-grid-layout-next';
import TextComponent from '../components/TextComponent.vue';
import ImageComponent from '../components/ImageComponent.vue';
import TextEditModal from '../editModals/textEditModal.vue'; // Import the new modal component
import ImageEditModal from '../editModals/imageEditModal.vue';
import axios from 'axios';

export default {
  components: {
    GridLayout,
    GridItem,
    TextComponent,
    ImageComponent,
    TextEditModal, 
    ImageEditModal
  },
  data() {
    return {
      internalLayout: [],
      draggable: true,
      resizable: true,
      colNum: 12,
      index: 0,
      selectedLayout: '1', //
      selectedComponent: '',
      isEditModalOpen: false,
      editableContent: '',
      editableContainerStyle: {},
      editableTextStyle: {},
      editingItemId: null, // To keep track of which item is being edited
      editableImageStyle: {},
      editingItemType: null,
    };
  },
  mounted() {
    this.getItem(this.selectedLayout); // Fetch initial data based on default layout
  },
  watch: {
    selectedLayout(newLayoutId) {
      if (newLayoutId) {
        this.getItem(newLayoutId);
      }
    }
  },
  methods: {
    async getItem(layout_id) {
    try {
      console.log(layout_id);
      const result = await axios.get(`http://localhost:3000/get-all-text/${layout_id}`);
      console.log('Fetched result:', result);
      const cssResult = await axios.get(`http://localhost:3000/get-css/${layout_id}`)
        console.log('CSS is',cssResult);

      // if (Array.isArray(result.data)) {
      //   this.internalLayout = result.data.map(item => ({
      //     x: item.x ?? 0,
      //     y: item.y ?? 0,
      //     w: item.w ?? 1,
      //     h: item.h ?? 1,
      //     i: item.i ?? String(Math.random()),
      //     type: item.type ?? 'TextComponent',
      //     content: item.content ?? 'Sample text',
      //     containerStyle: JSON.parse(item.css).containerStyle ?? {},
      //     textStyle: JSON.parse(item.css).textStyle ?? {},
      //     imageStyle: JSON.parse(item.css).imageStyle ?? {},
      //   }));

      //   const css = await axios.get('http://localhost:3000/get-css')
      //   console.log('CSS is',css);
      // } else {
      //   console.error('Fetched data is not an array');
      // }

      
        
        
      if (Array.isArray(result.data) && Array.isArray(cssResult.data)) {
          const cssMap = cssResult.data.reduce((acc, cssItem) => {
            acc[cssItem.componentPositionId] = cssItem;
            return acc;
          }, {});

          this.internalLayout = result.data.map(item => {
            const cssData = cssMap[item.id];
            console.log('cssdata :',cssData);
            let parsedCSS = { containerStyle: {}, textStyle: {}, imageStyle: {} };

            if (cssData) {
              try {
                parsedCSS = JSON.parse(cssData.css);
                console.log('parsedcss',parsedCSS);
              } catch (error) {
                console.error('Error parsing CSS:', error);
              }
            }

            return {
              x: item.x ?? 0,
              y: item.y ?? 0,
              w: item.w ?? 1,
              h: item.h ?? 1,
              i: item.i ?? String(this.index++),
              type: item.type ?? 'TextComponent',
              content: cssData ? cssData.content : 'Sample text',
              containerStyle: JSON.parse(parsedCSS).containerStyle ?? {},
              textStyle:JSON.parse(parsedCSS).textStyle ?? {},
              imageStyle: parsedCSS.imageStyle ?? {},
              PositionId:cssData?cssData.componentPositionId:null,
            };
          });
          console.log('Internal Layout:', this.internalLayout);
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
        h: 1,
        i: this.index.toString(),
        type: this.selectedComponent,
        content: this.selectedComponent === 'TextComponent' ? 'Sample text' : 'https://via.placeholder.com/150', // Default content for TextComponent
        containerStyle: {}, // Default container style
        textStyle: {}, // Default text style
        imageStyle: {},
        PositionId:null
        
      });
      this.index++;
    },
    removeItem(val) {
      const index = this.internalLayout.map((item) => item.i).indexOf(val);
      this.internalLayout.splice(index, 1);
    },
    updateItem(id, content, containerStyle, textStyle, imageStyle) {
      const item = this.internalLayout.find((item) => item.i === id);
      if (item) {
        item.content = content;
        item.containerStyle = containerStyle;
        item.textStyle = textStyle;
        item.imageStyle = imageStyle;
      }
    },
    updateLayout(newLayout) {
      this.internalLayout = newLayout;
    },
    openModal(id, data) {
      
      this.editingItemId = id;
      
      this.editingItemType = data.type;
      this.editableContent = data.content;
      this.editableContainerStyle = { ...data.containerStyle };
      this.editableTextStyle = { ...data.textStyle };
      this.editableImageStyle = { ...data.imageStyle };
      this.isEditModalOpen = true;
      console.log("id");
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
          data.textStyle,
          data.imageStyle
        );
        this.isEditModalOpen = false;
      }
    },
    async saveLayout(layout_id) {
      try {
        console.log("backend data",this.internalLayout);
        const response = await axios.post(`http://localhost:3000/text-builder/${layout_id}`, {internalLayout:this.internalLayout});
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
  /* border-color: #ffa500; */
  /* border-width: 3px; */
  padding: 0.5rem;
  width: 250px;
  height: 5vh;
  background-color:rgb(78, 135, 242);
  color: #ffffff;
  font-weight: bold;
  font-size: 2.2vh;
}

.addItemButton{
  margin-left: 1.5vw;
  /* border-color: #ffa500; */
  /* border-width: 3px; */
  padding: 0.5rem;
  width: 150px;
  height: 5vh;
  background-color:rgb(78, 135, 242);
  color: #fffefd;
  font-weight: bold;
  font-size: 2.2vh;
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
  background: #c4c1c1;
  position: relative;
  
  /* border: 2px solid black; */
  
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  /* border: 1px solid black; */
}

.vue-grid-item:hover{
  border: 3px solid black;
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
