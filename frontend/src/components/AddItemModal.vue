<template>
  <div v-if="showModal" class="modal-container">
    <div class="modal-box">
      <h2>Add Food Item</h2>

      <!-- Your form fields for updating food items -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="FoodItemData.name" id="name" placeholder="Name" class="rounded-input" />
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input v-model="FoodItemData.price" id="price" placeholder="Price" class="rounded-input" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="FoodItemData.description" id="description" placeholder="Description" class="rounded-input"></textarea>
      </div>
      <div class="form-group">
        <label for="image_url">Image URL:</label>
        <input v-model="FoodItemData.image_url" id="image_url" placeholder="Image URL" class="rounded-input" />
      </div>

      <button class="update-button" @click="addFoodItem">Add</button>
      <button class="close-button" @click="closeModal">Close</button>
      <p class="or">or</p>
      <form @submit.prevent="uploadFile">
        <input type="file" ref="fileInput" accept=".csv" required />
        <button class="update-button" type="submit">Upload</button>
      </form>
      
      <!-- Progress bar -->
      <div class="progress-bar">
    <div class="progress" :style="{ width: progressWidth }"></div>
  </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import io from "socket.io-client";
export default {
  props: {
    showModal: Boolean,
    foodItem: Object,
  },
  data() {
    return {
      FoodItemData: {
        name: '',
        price: '',
        description: '',
        image_url: '',
      },
      socket: null,
      processedCount: 0,
      totalRows:100,
      uploaded: false,
      
    };
  },

  beforeUnmount() {
    // Close the socket connection when the component is destroyed
    if (this.socket) {
      this.socket.close();
    }
  },

  mounted() {
    this.initializeSocket();
   
  },

  computed: {
    progressWidth() {
      // Calculate the width of the progress bar based on the processed count
      return `${(this.processedCount / this.totalRows) * 100}%`;
    },
  },

  methods: {

    initializeSocket() {
      // const token = this.$cookies.get("token");
      // const decoded = jwtDecode(token);
      this.socket = io("http://localhost:3000", {
        transports: ["websocket"],
      });
      this.socket.on("rowcount", (eventCaptured) => {
        this.totalRows = eventCaptured.rowCount;
        console.log('rows ',this.totalRows)
      });


      // Listen for real-time updates
      this.socket.on("progress", (eventCaptured) => {
        console.log(eventCaptured.processedCount);
        this.processedCount = eventCaptured.processedCount;
      });


    },

    

    closeModal() {
      location.reload();
      this.$emit('closeModal');
    },

    addFoodItem() {
      this.$emit('addFoodItem', this.FoodItemData);
    },

    async uploadFile() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      if (!file) {
        alert("Please select a CSV file.");
        return;
      }

      this.uploading = true;
      const formData = new FormData();
      formData.append("file", file);
      const token = this.$cookies.get("token");
      try {
        const response = await axios.post(
          "http://localhost:3000/restaurants/uploadFoodItems",
          formData,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        
        console.log(response);
        // alert("Successfully uploaded file.")
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file.");
      } finally {
        this.uploading = false;
        // Clear the file input after submission
        fileInput.value = null;
      }
    },
  },
};
</script>
  
  <style scoped>
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-box {
    background: #fff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  textarea,
  .rounded-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd; /* Soft border color */
    border-radius: 8px; /* Rounded borders */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
    margin-top: 5px;
  }
  
  textarea {
    resize: vertical;
  }
  
  .update-button,
  .close-button {
    background-color: #ffa500;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 10px;
    
  }
  
  .close-button {
    background-color: #666;
  }

  .or{
    margin-top: 8px;
  }

  .progress-bar {
  margin-top: 20px;
  width: 100%;
  background-color: #ddd;
  border-radius: 5px;
}

.progress {
  height: 20px;
  background-color: #4caf50;
  border-radius: 5px;
  transition: width 0.3s ease;
}
  </style>
  