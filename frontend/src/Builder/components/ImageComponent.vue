<template>
    <div>
      <div @click="openEditModal">
        <img :src="src" alt="" class="image-content" />
      </div>
      <div v-if="isEditModalOpen" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeEditModal">&times;</span>
          <div>
            <label>Upload Image:</label>
            <input type="file" @change="uploadImage" />
          </div>
          <button @click="saveChanges">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      src: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        editableSrc: this.src,
        isEditModalOpen: false
      };
    },
    methods: {
      openEditModal() {
        this.isEditModalOpen = true;
      },
      closeEditModal() {
        this.isEditModalOpen = false;
      },
      saveChanges() {
        this.isEditModalOpen = false;
        this.$emit('update', this.editableSrc);
      },
      uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.editableSrc = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };
  </script>
  
  <style scoped>
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
  </style>
  