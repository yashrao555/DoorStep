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
    <button class="btn btn-primary ms-4">+ New Layout</button>
    <select
      class="btn btn-primary ms-4 mb-3 mt-3"
      v-model="selectedLayout"
      style="height: 3.8vh"
    >
      <option value="" disabled>Layouts</option>
      <option value="1">Layout 1</option>
      <option value="2">Layout 2</option>
    </select>
    <select
      class="btn btn-primary ms-4 mb-3 mt-3"
      style="height: 3.8vh"
      v-model="selectedComponent"
    >
      <option value="" disabled>Components</option>
      <option value="TextComponent">Text</option>
      <option value="ImageComponent">Image</option>
      <option value="AddHTML">HTML</option>
    </select>
    <button class="btn btn-primary ms-4" @click="addItem">Add item</button>
    <input class="checkBox" type="checkbox" v-model="draggable" /> Draggable
    <input class="checkBox" type="checkbox" v-model="resizable" /> Resizable

    <button
      type="button"
      class="btn btn-primary"
      
      data-bs-target="#exampleModal"
      style="margin-left: 34vw"
      @click="convertToHTML"
    >
      Publish
    </button>
    
    <button
      class="btn btn-primary"
      style="margin-left: 1vw"
      @click="openEditModal"
    >
      Edit Background
    </button>
    <button
      @click="setPreview"
      class="btn btn-warning"
      style="margin-left: 1vw"
    >
      {{ text }}
    </button>
    <button
      class="btn btn-success"
      style="margin-left: 1vw"
      @click="saveLayout(selectedLayout)"
    >
      Save Layout
    </button>

    <div
      v-if="openLinkModal"
      class="modal "
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Congratulations! Your WebPage is now LIVE</h1>
            <button
              type="button"
              class="btn-close"
              @click="closeEditModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Here is the link of your web page</div>
          <div class="modal-body">{{ pageLink }}</div>
          <div class="modal-body">Please copy and paste the above link on your browser to view your page</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeEditModal"
            >
              Close
            </button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>
    
    <!--preview-->
    <div v-if="preview" ref="previewSection">
      <grid-layout
        v-model:layout="internalLayout"
        :col-num="colNum"
        :row-height="60"
        :is-draggable="false"
        :is-resizable="false"
        :vertical-compact="true"
        :use-css-transforms="true"
        :margin="[0, 0]"
        @layout-updated="updateLayout"
        :style="{
          backgroundImage: `url(${imageContent})`,
          backgroundColor: bgColor,
        }"
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
            />
          </div>
        </grid-item>
      </grid-layout>
    </div>

    <!--no preview-->
    <grid-layout
      v-else
      v-model:layout="internalLayout"
      :col-num="colNum"
      :row-height="60"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :vertical-compact="true"
      :use-css-transforms="true"
      :margin="[5, 5]"
      @layout-updated="updateLayout"
      class="no-preview-item"
      :style="{
        backgroundImage: `url(${imageContent})`,
        backgroundColor: bgColor,
      }"
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
            @open-modal-text="openModal(item.i, $event, item.type)"
            @open-modal-image="openModal(item.i, $event, item.type)"
            @open-modal-html ="openModal(item.i,$event,item.type)"
          />
          <span class="remove" @click.stop="removeItem(item.PositionId,item.type)"
            >x</span
          >
        </div>
      </grid-item>
    </grid-layout>

    <!-- Edit Modal -->
    <TextEditModal
      v-if="isEditModalOpen && editingItemType === 'TextComponent'"
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
    <htmlModal
      v-if="isEditModalOpen && editingItemType === 'AddHTML'"
      :isOpen="isEditModalOpen"
      :content="editableContent"
      :containerStyle="editableContainerStyle"
      :imageStyle="editableImageStyle"
      @close="closeEditModal"
      @save="saveChanges"
    />
    <canvasEditModal
      v-if="isCanvasModalOpen"
      :isOpen="isCanvasModalOpen"
      @close="closeEditModal"
      @save="handleBackgroundChange"
    />
  </div>
</template>

<script>
import { GridLayout, GridItem } from "vue3-grid-layout-next";
import TextComponent from "../components/TextComponent.vue";
import ImageComponent from "../components/ImageComponent.vue";
import TextEditModal from "../editModals/textEditModal.vue"; // Import the new modal component
import ImageEditModal from "../editModals/imageEditModal.vue";
import axios from "axios";
import canvasEditModal from "../editModals/canvasEditModal.vue";
import AddHTML from '../components/AddHTML.vue';
import htmlModal from '../editModals/htmlModal.vue'

export default {
  components: {
    GridLayout,
    GridItem,
    TextComponent,
    ImageComponent,
    TextEditModal,
    ImageEditModal,
    canvasEditModal,
    AddHTML,
    htmlModal
  
  },
  data() {
    return {
      internalLayout: [],
      draggable: true,
      resizable: true,
      colNum: 12,
      index: 0,
      selectedLayout: "1", //
      selectedComponent: "",
      isEditModalOpen: false,
      editableContent: "",
      editableContainerStyle: {},
      editableTextStyle: {},
      editingItemId: null, // To keep track of which item is being edited
      editableImageStyle: {},
      editingItemType: null,
      preview: false,
      text: "See Preview",
      isCanvasModalOpen: false,
      imageContent: null,
      bgColor: null,
      openLinkModal:false,
      pageLink:"",
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
    },
  },
  methods: {
    convertToHTML() {
      this.openLinkModal=!this.openLinkModal;
      // Toggle to preview mode
      // this.preview = !this.preview;

      // Capture HTML content of preview section
      const previewsection = this.$refs.previewSection; // Ensure you have a ref="previewSection" on your preview section div
      const htmlContent = previewsection.innerHTML;

      // TODO: Send htmlContent to backend or save it to a file
      console.log(htmlContent);
      const blob = new Blob([htmlContent], { type: "text/html" });

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      
      link.href = URL.createObjectURL(blob);
      this.pageLink = link.href
      // link.download = "generated.html";
      // console.log("link ", link);
      // Append the <a> element to the document body
      // document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      // link.click();

      // Clean up: remove the <a> element from the document body
      // document.body.removeChild(link);

      // Example: You can send this HTML content to your backend for further processing and saving
      // Example: axios.post('/save-html', { htmlContent })
    },

    async getItem(layout_id) {
      try {
        console.log(layout_id);
        const result = await axios.get(
          `http://localhost:3000/get-all-text/${layout_id}`
        );
        console.log("Fetched result:", result);
        const cssResult = await axios.get(
          `http://localhost:3000/get-css/${layout_id}`
        );
        console.log("CSS is", cssResult);
        const canvasResult = await axios.get(
          `http://localhost:3000/get-layout/${layout_id}`
        );
        console.log("canvas result", canvasResult.data.css);

        const binaryData = canvasResult.data.image.data; // Assuming fileData is your object containing the buffer
        let base64Data = window.btoa(
          new Uint8Array(binaryData).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const mimeType = "image/jpeg"; // Set appropriate MIME type based on your image format
        // console.log("base64data", typeof base64Data);
        this.imageContent = `data:${mimeType};base64,${base64Data}`;
        console.log("image content ", this.imageContent);

        this.bgColor = canvasResult.data.css;

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

          this.internalLayout = [];
          for (const item of result.data) {
            const cssData = cssMap[item.id];
            let parsedCSS = {
              containerStyle: {},
              textStyle: {},
              imageStyle: {},
            };

            if (cssData) {
              try {
                parsedCSS = JSON.parse(cssData.css);
              } catch (error) {
                console.error("Error parsing CSS:", error);
              }
            }

            let content = null;

            if (cssData && cssData.FileData) {
              // const CHUNK_SIZE = 8192; // Adjust chunk size as needed

              const binaryData = cssData.FileData.data; // Assuming fileData is your object containing the buffer
              let base64Data = window.btoa(
                new Uint8Array(binaryData).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              //       for (let i = 0; i < binaryData.length; i += CHUNK_SIZE) {
              //         // const chunk = binaryData.slice(i, i + CHUNK_SIZE);
              //          base64Data = window.btoa(
              //   new Uint8Array(binaryData).reduce(
              //     (data, byte) => data + String.fromCharCode(byte),
              //     ""
              //   )
              // );
              //       }
              const mimeType = "image/jpeg"; // Set appropriate MIME type based on your image format
              console.log("base64data", typeof base64Data);
              content = `data:${mimeType};base64,${base64Data}`;
            } else {
              content = cssData.content;
            }

            this.internalLayout.push({
              x: item.x ?? 0,
              y: item.y ?? 0,
              w: item.w ?? 1,
              h: item.h ?? 1,
              i: item.i ?? String(this.index++),
              type: item.type ?? "TextComponent",
              content: content,
              sendFile: null,
              containerStyle:
                item.type === "TextComponent"
                  ? JSON.parse(parsedCSS).containerStyle
                  : parsedCSS.containerStyle,
              textStyle:
                item.type === "TextComponent"
                  ? JSON.parse(parsedCSS).textStyle
                  : parsedCSS.textStyle,
              imageStyle:
                item.type === "TextComponent"
                  ? JSON.parse(parsedCSS).imageStyle
                  : parsedCSS.imageStyle,
              PositionId: cssData ? cssData.componentPositionId : null,
            });
          }

          console.log("Internal Layout:", this.internalLayout);
        } else {
          console.error("Fetched data is not an array");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },

    addItem() {
      if (!this.selectedComponent) {
        alert("Please select a component type");
        return;
      }
      this.internalLayout.push({
        x: (this.internalLayout.length * 2) % (this.colNum || 12),
        y: this.internalLayout.length + (this.colNum || 12),
        w: 2,
        h: this.selectedComponent === "TextCompnent" ? 1 : 5,
        i: this.index.toString(),
        type: this.selectedComponent,
        content:
          this.selectedComponent === "TextComponent"
            ? "Sample text"
            : "https://via.placeholder.com/150", // Default content for TextComponent
        containerStyle: {}, // Default container style
        textStyle: {}, // Default text style
        imageStyle: {},
        PositionId: null,
      });
      this.index++;
    },
    async removeItem(id,type) {
      console.log("type",type);
      const result = await axios.delete(
        "http://localhost:3000/remove-element",
        { data: { id: id,type:type } }
      );
      this.internalLayout = this.internalLayout.filter(
        (item) => item.PositionId !== id
      );
      console.log("result", result);
    },
    updateItem(id, content, sendFile, containerStyle, textStyle, imageStyle) {
      const item = this.internalLayout.find((item) => item.i === id);
      if (item) {
        item.content = content;
        item.sendFile = sendFile;
        item.containerStyle = containerStyle;
        item.textStyle = textStyle;
        item.imageStyle = imageStyle;
      }
    },
    updateLayout(newLayout) {
      this.internalLayout = newLayout;
    },
    openEditModal() {
      this.isCanvasModalOpen = true;
    },
    openModal(id, data, type) {
      this.editingItemId = id;
      this.editingItemType = type;
      this.editableContent = data.content;
      this.editableContainerStyle = { ...data.containerStyle };
      this.editableTextStyle = { ...data.textStyle };
      this.editableImageStyle = { ...data.imageStyle };
      this.isEditModalOpen = true;
      console.log("id", type);
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.isCanvasModalOpen = false;
      this.openLinkModal=false;
    },
    saveChanges(data) {
      // console.log(data)
      if (this.editingItemId !== null) {
        this.updateItem(
          this.editingItemId,
          data.content,
          data.sendFile,
          data.containerStyle,
          data.textStyle,
          data.imageStyle
        );
        this.isEditModalOpen = false;
      }
    },
    async saveLayout(layout_id) {
      try {
        console.log("backend data", this.internalLayout);

        const formData = new FormData();
        // let images = []
        for (let i = 0; i < this.internalLayout.length; i++) {
          console.log(this.internalLayout[i].sendFile);

          formData.append("images[]", this.internalLayout[i].sendFile);
        }
        // console.log(formData)
        formData.append("internalLayout", JSON.stringify(this.internalLayout));
        const response = await axios.post(
          `http://localhost:3000/text-builder/${layout_id}`,
          formData
          // { internalLayout: this.internalLayout }
        );
        console.log(response);
        alert("Layout saved successfully");
      } catch (error) {
        console.error("Error saving layout:", error);
        alert("Failed to save layout");
      }
    },
    async handleBackgroundChange(option, data) {
      try {
        const formdata = new FormData();
        console.log("option", option);
        console.log("data", typeof data);
        if (option === "color") {
          formdata.append("color", data); // Make sure data is a string representing the color
        } else if (option === "image" && data instanceof File) {
          formdata.append("image", data); // Make sure data is a File object representing the image
        } else {
          console.error("Invalid data type or option");
          return;
        }
        console.log("formdata ", formdata);
        const response = await axios.post(
          `http://localhost:3000/text-builder/change-layout/${this.selectedLayout}`,
          formdata
        );
        console.log(response.data); // Log response or handle success message
        // Optionally, update canvas background here
      } catch (error) {
        console.error("Error saving background to database:", error);
        // Handle error or display error message
      }
    },

    setPreview() {
      this.preview = !this.preview;
      this.text = this.preview ? "Unsee Preview" : "See Preview";
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

.select {
  margin-top: 2vh;
  /* border-color: #ffa500; */
  /* border-width: 3px; */
  padding: 0.5rem;
  width: 250px;
  height: 5vh;
  background-color: rgb(78, 135, 242);
  color: #ffffff;
  font-weight: bold;
  font-size: 2.2vh;
}

.addItemButton {
  margin-left: 1.5vw;
  /* border-color: #ffa500; */
  /* border-width: 3px; */
  padding: 0.5rem;
  width: 150px;
  height: 5vh;
  background-color: rgb(78, 135, 242);
  color: #fffefd;
  font-weight: bold;
  font-size: 2.2vh;
}

.checkBox {
  margin-left: 1.5vw;
}

.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}

.preview {
  cursor: pointer;
}

.vue-grid-layout {
  background: #c4c1c1;
  position: relative;

  /* border: 2px solid black; */
}

.preview-item .vue-grid-item:not(.vue-grid-placeholder) {
  background: #ffffff;
}

.no-preview-item .vue-grid-item:not(.vue-grid-placeholder) {
  background: #ffffff;
  /* opacity: 0.1; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  /* border: 1px solid black; */
}

.no-preview-item .vue-grid-item:hover {
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
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
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
