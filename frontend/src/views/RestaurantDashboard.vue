<template>
  <!-- <div>
  <div v-if="loading" class="loading-spinner"></div>

  <div v-else>
    <div class="banner">
      <img
        src="https://www.shutterstock.com/image-photo/healthy-meal-diet-plan-daily-260nw-1756843007.jpg"
        alt="Banner Image"
      />
      <div class="banner-text">
        <h1>DoorStep</h1>
        <p>From Our Kitchen To Your Doorstep!</p>
        <h2 @click="openAddModal" class="add-item-link">Add food items?</h2>
        <h5
          v-if="!isStaff"
          @click="navigateToRegisterStaff"
          class="add-item-link"
        >
          Register staff members ?
        </h5>
      </div>
    </div>

  
    <div class="card-section">
      <div
        class="food-card"
        v-for="(foodItem, index) in foodItems"
        :key="index"
      >
        <img :src="foodItem.image_url" :alt="foodItem.name" />
        <div class="food-details">
          <h3>{{ foodItem.name }}</h3>
          <h5>Price: {{ foodItem.price }}</h5>
          <button class="update-button" @click="openUpdateModal(foodItem)">
            Update
          </button>
          <button class="update-button" @click="openDeleteModal(foodItem)">
            Delete
          </button>
        </div>
      </div>
    </div>

    <AddItemModal
      :showModal="showAddModal"
      :foodItem="selectedFoodItem"
      @closeModal="closeModal"
      @addFoodItem="addFoodItem"
    />

    <UpdateModal
      :showModal="showUpdateModal"
      :foodItem="selectedFoodItem"
      @closeModal="closeModal"
      @updateFoodItem="updateFoodItem"
    />

    <DeleteModal
      :showModal="showDeleteModal"
      :foodItem="selectedFoodItem"
      @closeModal="closeModal"
      @deleteFoodItem="deleteFoodItem"
    />
  </div>
</div> -->

  <div>
    <div v-if="loading" class="loading-spinner"></div>

    <div v-else class="">
      <div class="top-section">
        <p class="d-inline-flex gap-1">
          <button
            class="btn option-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i class="fa-sharp fa-solid fa-circle-info"></i>
            More Options
          </button>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <div
              class="d-flex flex-wrap justify-content-start align-items-center"
            >
              <h5 @click="openAddModal" class="add-item-link">
                <i class="fa-sharp fa-solid fa-plus"></i> Add food items?
              </h5>
              <h5
                v-if="!isStaff"
                @click="navigateToRegisterStaff"
                class="add-item-link ms-5"
              >
                <i class="fa-sharp fa-solid fa-address-card"></i>
                Register staff members ?
              </h5>

              <!-- Button trigger modal -->
              <h5
                class="add-item-link ms-5"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="fa-sharp fa-solid fa-clock"></i>
                Schedule Timings?
              </h5>

              <!-- Modal -->
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-4" style="color:#ffa500;font-weight:600" id="exampleModalLabel">
                        Set the timings
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body"> 
                      <div class="form-group">
                        <label for="days" class="form-label fs-5">Select Days</label>
                        <select v-model="days" id="days" class="form-select">
                          <option selected>Choose ...</option>
                          <option>Weekdays</option>
                          <option>Weekends</option>
                          <option>Special Days</option>
                        </select>
                      </div>
                      <div v-if="days==='Special Days'" class="form-group">
                        <label for="from" class="form-label fs-5">From Date</label>
                        <input
                          type="date"
                          id="from"
                          class="form-control"
                          v-model="from"
                        />
                      </div>
                      <div v-if="days==='Special Days'" class="form-group">
                        <label for="to" class="form-label fs-5">To Date</label>
                        <input
                          type="date"
                          id="to"
                          class="form-control"
                          v-model="to"
                        />
                      </div>
                      <div class="form-group">
                        <label for="opensat" class="form-label fs-5">Opening Time</label>
                        <input
                          type="time"
                          id="opensat"
                          class="form-control"
                          v-model="opensAt"
                        />
                      </div>
                      <div class="form-group">
                        <label for="closesat" class="form-label fs-5">Closing Time</label>
                        <input
                          type="time"
                          id="closesat"
                          class="form-control"
                          v-model="closesAt"
                        />
                      </div>
                      <div v-if="days!=='Special Days'" class="form-group">
                        <label for="duration" class="form-label fs-5">No. of weekends/weekdays</label>
                        <input
                          type="number"
                          id="duration"
                          class="form-control"
                          v-model="duration"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="save-button" @click="save">
                        Set time
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="middle-section">
        <div v-for="(foodItem, index) in foodItems" :key="index" class="p-3">
          <div class="row d-flex">
            <div class="list-group col-lg-1 col-sm-1 fs-4">{{ index + 1 }}</div>
            <div class="list-group col-lg-8 col-sm-11 fs-4">
              {{ foodItem.name }}
            </div>
            <div
              @click="openUpdateModal(foodItem)"
              class="list-group col-lg-1 col-sm-4 fs-5 text-center"
              style="color: blue; cursor: pointer"
            >
              <i class="fa-sharp fa-solid fa-pen"></i> Update
            </div>
            <div
              @click="openDeleteModal(foodItem)"
              class="list-group col-lg-1 col-sm-4 fs-5 text-center"
              style="color: red; cursor: pointer"
            >
              <i class="fa-sharp fa-solid fa-trash"></i> Delete
            </div>
            <div
              class="list-group col-lg-1 col-sm-4 fs-4 text-center"
              style="cursor: pointer"
            >
              <i class="fa-sharp fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
          <hr />
        </div>
      </div>

      <AddItemModal
        :showModal="showAddModal"
        :foodItem="selectedFoodItem"
        @closeModal="closeModal"
        @addFoodItem="addFoodItem"
      />

      <UpdateModal
        :showModal="showUpdateModal"
        :foodItem="selectedFoodItem"
        @closeModal="closeModal"
        @updateFoodItem="updateFoodItem"
      />

      <DeleteModal
        :showModal="showDeleteModal"
        :foodItem="selectedFoodItem"
        @closeModal="closeModal"
        @deleteFoodItem="deleteFoodItem"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { jwtDecode } from "jwt-decode";
import UpdateModal from "@/components/UpdateModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import AddItemModal from "../components/AddItemModal.vue";

export default {
  name: "FoodItems",
  data() {
    return {
      loading: false,
      foodItems: [],
      showUpdateModal: false,
      showDeleteModal: false,
      showAddModal: false,
      selectedFoodItem: null,
      restaurantId: null, // Variable to store the restaurant id
      isStaff: false,
      days:"",
      from:"",
      to:""
    };
  },
  mounted() {
    if (this.decodeToken(VueCookies.get("token")).staffId) {
      this.isStaff = true;
    }
    // Retrieve restaurant id from cookies
    this.restaurantId = VueCookies.get("token")
      ? this.decodeToken(VueCookies.get("token")).restaurantId
      : null;
    //console.log('decoded : ',this.decodeToken(VueCookies.get('token')))
    // Fetch food items using the restaurant id
    if (this.restaurantId) {
      this.fetchFoodItems(this.restaurantId);
    }
  },

  methods: {
    save(){
      console.log('from', typeof(this.from));
      console.log('from', this.to);
    },

    decodeToken(token) {
      try {
        const decoded = jwtDecode(token);
        return decoded;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    },

    async fetchFoodItems(restaurantId) {
      try {
        this.loading = true;
        const response = await axios.get(
          `http://localhost:3000/restaurants/${restaurantId}/getAllFoodItems`
        );
        this.foodItems = response.data.data;
        console.log(this.foodItems);
      } catch (error) {
        console.error("Failed to fetch food items:", error);
      } finally {
        this.loading = false;
      }
    },

    openUpdateModal(foodItem) {
      this.selectedFoodItem = foodItem;
      console.log(this.selectedFoodItem);
      this.showUpdateModal = true;
    },

    openDeleteModal(foodItem) {
      this.selectedFoodItem = foodItem;
      this.showDeleteModal = true;
    },

    openAddModal() {
      this.showAddModal = true;
    },

    closeModal() {
      this.showUpdateModal = false;
      this.showDeleteModal = false;
      this.showAddModal = false;
      this.selectedFoodItem = null;
    },

    addFoodItem(FoodItemData) {
      // Call your API to update the food item

      const token = this.$cookies.get("token");
      axios
        .post(`http://localhost:3000/restaurants/addFoodItems`, FoodItemData, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          // Handle success, e.g., close the modal and refresh the food items
          console.log("res : ", response);
          this.closeModal();
          this.fetchFoodItems(this.restaurantId);
        })
        .catch((error) => {
          console.error("Failed to add food item:", error);
          // Handle error as needed
        });
    },

    deleteFoodItem() {
      const foodItemId = this.selectedFoodItem.id;
      console.log("id :", foodItemId);
      const token = this.$cookies.get("token");
      axios
        .delete(
          `http://localhost:3000/restaurants/delete-food-item/${foodItemId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          console.log("res : ", response);
          this.closeModal();
          this.fetchFoodItems(this.restaurantId);
        })
        .catch((error) => {
          console.error("Failed to delete food item:", error);
        });
    },

    updateFoodItem(updatedFoodItemData) {
      // Call your API to update the food item
      const foodItemId = this.selectedFoodItem.id;
      console.log("id :", foodItemId);
      const token = this.$cookies.get("token");
      axios
        .put(
          `http://localhost:3000/restaurants/update-food-item/${foodItemId}`,
          updatedFoodItemData,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          // Handle success, e.g., close the modal and refresh the food items
          console.log("res : ", response);
          this.closeModal();
          this.fetchFoodItems(this.restaurantId);
        })
        .catch((error) => {
          console.error("Failed to update food item:", error);
          // Handle error as needed
        });
    },

    navigateToRegisterStaff() {
      this.$router.push("/register/staff");
    },
  },
  components: { UpdateModal, DeleteModal, AddItemModal },
};
</script>

<style scoped>
.top-section {
  margin-left: 10vw;
  margin-top: 1.5vw;
  width: 80vw;
}

.option-button {
  background-color: #f3f3f3;
  color: #ffa500;
  font-weight: bold;
  font-size: 0.9vw;
  padding: 0.6vw;
  border-color: #ffa500;
}

.add-item-link {
  cursor: pointer;
  margin-left: 2vh;
  color: #f3f3f3;
  font-size: 1.1vw;
}

.card {
  width: 80vw !important;
  padding: 20px; /* Adjust padding as needed */
  border-radius: 10px; /* Adjust the radius for rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adjust the shadow properties */
  background-color: #ffa500; /* Adjust the background color */
}

.middle-section {
  margin-left: 10vw;
  margin-top: 3vw;
  width: 80vw;
  padding: 20px; /* Adjust padding as needed */
  border-radius: 10px; /* Adjust the radius for rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adjust the shadow properties */
  border: 3px solid #ffa500;
}

.item-row {
  height: 8rem;
  margin-top: 2rem;
  color: #ffa500;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.6vw;
  border: 3px solid #ffa500;
  border-radius: 10px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

hr {
  margin-top: 1rem;
  color: #ffa500;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
}

.form-label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

label{
  font-weight:500;
}
/* 
.banner {
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
}

.banner img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.banner-text {
  position: absolute;
  top: 20%;
  left: 20%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffa500;
  font-size: 180%;
}

h1 {
  font-size: 250%;
} */
.food-card {
  width: calc(
    33.33% - 140px
  ); /* Adjust the width to fit 3 cards in a row with margin */
  margin: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;
  overflow: hidden; /* Ensure the image doesn't overflow */
  position: relative; /* Position relative for absolute positioning of button */
}

.food-card img {
  width: 100%;
  height: 220px; /* Set a fixed height for uniformity */
  object-fit: cover; /* Cover the entire card with the image */
}

.food-card:hover {
  transform: scale(1.05);
}

.update-button {
  margin-bottom: 20px; /* Adjust margin from the bottom */
  margin-left: 20%;
  margin-top: 20px;
  transform: translateX(-50%);
  border-radius: 8px; /* Round the button border */
  border-color: #fff;
  background-color: #ffa500; /* Classy shade of orange */
  color: #fff; /* White text for better visibility */
  padding: 8px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.update-button:hover {
  background-color: #e57200; /* Darker shade on hover */
}

.save-button {
  border-radius: 8px; /* Round the button border */
  border-color: #fff;
  background-color: #ffa500; /* Classy shade of orange */
  color: #fff; /* White text for better visibility */
  padding: 8px 20px;
  cursor: pointer;
}

.card-section {
  display: flex;
  justify-content: space-around; /* Adjust spacing between cards */
  flex-wrap: wrap;
  padding: 2rem;
}

.food-details {
  margin-top: 10px;
}

.loading-spinner {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 400px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
