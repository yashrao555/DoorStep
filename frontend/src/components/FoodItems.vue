<template>
  <div class="food-item-container ">
    <div class="food-item-details ">
      <h2 class="food-item-name ">{{ foodItem.name }}</h2>
      <p class="food-item-price  ">Price: {{ foodItem.price }}</p>
      <div class="">
        <div v-if="showQuantityButtons" class="add-to-cart">
          <span class="quantity-button" @click="decrementQuantity">-</span>
          <span class="quantity">{{ quantity }}</span>
          <span class="quantity-button" @click="incrementQuantity">+</span>
        </div>
        <button v-else class="add-to-cart-button " @click="addToCart">
          Add to Cart
        </button>
      </div>
    </div>

    <div class="food-item-image bg-warning">
      <img
        src="https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg"
        alt="Food Item Image"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";
export default {
  props: {
    foodItem: {
      type: Object,
      required: true,
    },
    currentRestaurantId: {
      type: Number,
      required: true,
    },
    currentCityId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      quantity: 1,
      showQuantityButtons: false,
    };
  },
  computed: {
    formattedPrice() {
      // Format the price based on the quantity
      return (this.foodItem.price * this.quantity).toFixed(2);
    },
  },

  methods: {
    addToCart() {
      const token = this.$cookies.get("token");
      if (!token) {
        // alert('Please log in before adding items to cart. Log in?');
        this.$toast.warning("Please log in before adding items to cart", {
          position: "top",
        });
        return;
      }

      // Check token expiration
      try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
        console.log("decoded token : ", decodedToken);
        console.log("exp time : ", expirationTime);
        console.log("date ", Date.now());

        if (Date.now() >= expirationTime) {
          // alert('Your session has expired. Please log in again.');
          this.$toast.error("Your session has expired. Please log in again.", {
            position: "top",
          });
          this.$router.push("/login");
          return; // Stop execution if the token has expired
        }

        if (decodedToken.restaurantId) {
          // alert('Please log in with customer id');
          this.$toast.warning("Please log in with customer id", {
            position: "top",
          });
          // this.$router.push('/login');
          return;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle decoding error, e.g., token is not a valid JWT
        // alert('Invalid token. Please log in again.');
        this.$toast.error("Invalid token. Please log in again.", {
          position: "top",
        });
        this.$router.push("/login");
        return; // Stop execution if there's a decoding error
      }

      // Fetch existing items in the cart
      axios
        .get("http://localhost:3000/get-cart", {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          const cartItems = response.data.data;
          console.log("cart items: ", cartItems);

          // Check if there are items in the cart
          if (cartItems !== null) {
            // Check if the current item in the cart belongs to the same restaurant
            if (cartItems.restaurant_id !== this.foodItem.restaurant_id) {
              // alert('Cannot add food item. Please clear your previous cart.');
              this.$toast.error(
                "Cannot add food item. Please clear your previous cart.",
                {
                  position: "top",
                }
              );
              console.error(
                "Cannot add items from different restaurants to the cart."
              );
              return;
            }
          }

          // If the cart is empty or items belong to the same restaurant, proceed to add the item
          axios
            .post(
              "http://localhost:3000/add-to-cart",
              {
                restaurant_id: this.foodItem.restaurant_id,
                items: {
                  id: this.foodItem.id,
                  name: this.foodItem.name,
                  price: this.foodItem.price,
                  // Add other necessary details from your food item
                },
                cityId: this.currentCityId,
              },
              {
                headers: {
                  Authorization: `${token}`,
                },
              }
            )
            .then((response) => {
              console.log("res: ", response);
              this.showQuantityButtons = true;
              this.$toast.success("Item added to cart.", {
                position: "top-right",
              });
            })
            .catch((error) => {
              this.$toast.error("Error adding to cart.", {
                position: "top",
              });
              console.error("Error adding to cart:", error);
            });
        })
        .catch((error) => {
          this.$toast.error("Error fetching cart", {
            position: "top",
          });
          console.error("Error fetching cart:", error);
        });
    },

    incrementQuantity() {
      const token = this.$cookies.get("token");
      axios
        .post(
          "http://localhost:3000/add-to-cart",
          {
            restaurant_id: this.foodItem.restaurant_id,
            items: {
              id: this.foodItem.id,
              name: this.foodItem.name,
              price: this.foodItem.price,
            },
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then(this.quantity++)
        .catch((error) => {
          console.error("Error updating cart:", error);
        });
    },

    decrementQuantity() {
      const token = this.$cookies.get("token");

      axios
        .post(
          "http://localhost:3000/delete-from-cart",
          {
            restaurant_id: this.foodItem.restaurant_id,
            items: {
              id: this.foodItem.id,
              name: this.foodItem.name,
              price: this.foodItem.price,
            },
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.quantity--;
          if (this.quantity < 1) {
            this.showQuantityButtons = false;
            this.$toast.error("Item removed from cart.", {
              position: "top-right",
            });
          }
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap");

.food-item-container {
  width: 39vw; /* Set the width to 70% of the viewport width */
  height: 12vw;
  margin: 20px auto; /* Center the container horizontally with margin */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.food-item-details {
  width: 30vw;
  flex-grow: 1;
  padding: 1vw;
  text-align: left;
}

h2 {
  font-size: 1.5vw;
  /* font-weight: bold; */
  font-family: "Tenor Sans", sans-serif;
  font-weight: bold;
  font-style: normal;
  width: 25vw;
}

.food-item-description {
  font-size: 1vw;
  margin-bottom: 10px;
}

.food-item-price {
  font-size: 0.8vw;
  color: #27ae60;
  font-family: "Tenor Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.food-item-image {
  width: 12vw;
  height: 12vw;
  overflow: hidden;
}

.food-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.add-to-cart {
  display: flex;
  align-items: center;
  /* margin-top: 10px; */
}

.add-to-cart .quantity-button {
  color: #0a0101; /* White text */
  border: none;
  border-radius: 50%; /* Rounded border */
  padding: 0.8vw 1vw;
  font-size: 1.2vw;
  cursor: pointer;
}

.add-to-cart .quantity {
  margin: 0 0.5vw;
  font-size: 1vw;
}

.add-to-cart-button {
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.8vw 1vw;
  font-size: 0.8vw;
  cursor: pointer;
}

/* @media (min-width: 768px) {
  .food-item-container {
  width: 700px; 
}
}

@media (max-width: 768px) {
  .food-item-container {
  height: 13vw;
  width: 60vw; 
}
} */
</style>
