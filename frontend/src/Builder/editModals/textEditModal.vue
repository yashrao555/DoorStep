<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <!-- <div>
          <label>Text Content:</label>
          <textarea v-model="editableContent"></textarea>
        </div> -->
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label"
          >Text Content:</label
        >
        <input
          v-model="editableContent"
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Enter your heading"
        />
      </div>
      <h3 class="mt-5" style="color: #ffa500; font-weight: bold">
        Container Style
      </h3>
      <div class="mb-4 mt-2">
        <label for="formGroupExampleInput2" class="form-label"
          >Background Color:</label
        >
        <input
          type="color"
          v-model="editableContainerStyle.backgroundColor"
          class="form-control"
          id="formGroupExampleInput2"
          placeholder="Another input placeholder"
        />
      </div>
      <div class="mb-4">
        <label for="formGroupExampleInput2" class="form-label">Padding:</label>
        <input
          type="text"
          v-model="editableContainerStyle.padding"
          class="form-control"
          id="formGroupExampleInput2"
          placeholder="Another input placeholder"
        />
      </div>

      <!-- <div>
            <label>Background Color:</label>
            <input type="color" v-model="editableContainerStyle.backgroundColor" />
          </div> -->
      <!-- <div>
            <label>Padding:</label>
            <input type="text" v-model="editableContainerStyle.padding" />
          </div> -->
      <!-- Add more container styles as needed -->

      <div>
        <h3 class="mt-5" style="color: #ffa500; font-weight: bold">
          Text Style
        </h3>
        <div class="mb-4 mt-3">
          <label for="formGroupExampleInput2" class="form-label"
            >Font Size (px):</label
          >
          <input
            type="number"
            v-model.number="editableTextStyle.fontSize"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Another input placeholder"
          />
        </div>
        <div class="mb-4">
          <label for="formGroupExampleInput2" class="form-label"
            >Text Color:</label
          >
          <input
            type="color"
            v-model="editableTextStyle.color"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Another input placeholder"
          />
        </div>
        <div class="mb-4">
          <label for="textAlignment" class="form-label">Text Alignment:</label>
          <select
            v-model="editableTextStyle.textAlign"
            class="form-control"
            id="textAlignment"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="fontWeight" class="form-label">Font Weight:</label>
          <select
            v-model="editableTextStyle.fontWeight"
            class="form-control"
            id="fontWeight"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
            <option value="lighter">Lighter</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="textDecoration" class="form-label"
            >Text Decoration:</label
          >
          <select
            v-model="editableTextStyle.textDecoration"
            class="form-control"
            id="textDecoration"
          >
            <option value="none">None</option>
            <option value="underline">Underline</option>
            <option value="overline">Overline</option>
            <option value="line-through">Line-through</option>
          </select>
        </div>
        <div class="mb-4 ">
          <label for="lineHeight" class="form-label">Line Height:</label>
          <input
            v-model="editableTextStyle.lineHeight"
            type="text"
            class="form-control"
            id="lineHeight"
            placeholder="e.g., 1.5, 2"
          />
        </div>
        <!-- <div>
            <label>Font Size (px):</label>
            <input type="number" v-model.number="editableTextStyle.fontSize" />
          </div>
          <div>
            <label>Text Color:</label>
            <input type="color" v-model="editableTextStyle.color" />
          </div> -->
        <!-- Add more text styles as needed -->
      </div>
      <button class="btn btn-primary mt-2" @click="saveChanges">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    containerStyle: {
      type: Object,
      required: true,
    },
    textStyle: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editableContent: this.content,
      editableContainerStyle: { ...this.containerStyle },
      editableTextStyle: { ...this.textStyle },
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    saveChanges() {
      this.$emit("save", {
        content: this.editableContent,
        containerStyle: this.editableContainerStyle,
        textStyle: this.editableTextStyle,
      });
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  
  background-color: #fff;
}

.modal-content {
  background-color: #ffffff;
  margin: 0;
  padding: 20px;
  overflow-y: scroll;
  height: 100%;
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
