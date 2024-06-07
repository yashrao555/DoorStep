<template>
    <div v-if="isOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        
        <h3 class="mt-5" style="color: #ffa500; font-weight: bold">
          Canvas Style
        </h3>
        <div class="mb-4 mt-2">
          <label for="formGroupExampleInput1" class="form-label"
            >Background Color:</label
          >
          <input
            type="color"
            v-model="backgroundColor"
            class="form-control"
            id="formGroupExampleInput1"
            placeholder="Another input placeholder"
          />
        </div>

        <div class="mb-4 mt-2">
          <label for="formGroupExampleInput2" class="form-label"
            >Background Image:</label
          >
          <input
            type="file"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Another input placeholder"
            @change="handleImageChange"
          />
        </div>
        <button class="btn btn-primary mt-2" @click="saveChanges">Save</button>
      </div>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      backgroundColor: '', // Data for background color
      backgroundImage: null // Data for background image
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    handleImageChange(event) {
      // Handle image change event
      this.backgroundImage = event.target.files[0];
    },
    saveChanges() {
      // Emit event based on selected option
      if (this.backgroundImage) {
        this.$emit('save', 'image', this.backgroundImage);
      } else {
        this.$emit('save', 'color', this.backgroundColor);
      }
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    }
  }
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
  