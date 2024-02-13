import { createStore } from 'vuex';
export default createStore({
    state: {
      cartItems: [],
      restaurantMenus: [],
      restaurant:{},
      restaurantId: null,
    },
    mutations: {
        addToCart(state, { foodItem, quantity = 1 }) {
            const existingItem = state.cartItems.find(item => item.foodItem.food_item_id === foodItem.food_item_id);
            if (existingItem) {
              existingItem.quantity += quantity;
            } else {
              state.cartItems.push({ foodItem, quantity });
            }
          },
      updateCartItemQuantity(state, { foodItemId, quantity }) {
        const existingItem = state.cartItems.find(item => item.foodItem.food_item_id === foodItemId);
        if (existingItem) {
          existingItem.quantity = quantity;
        }
      },
      setRestaurantId(state, restaurantId) {
        state.restaurantId = restaurantId;
      },
      setRestaurant(state, restaurant) {
        state.restaurant = restaurant;
      },
    },
    actions: {
      addToCart({ commit }, { foodItem, quantity }) {
        commit('addToCart', { foodItem, quantity });
      },
      updateCartItemQuantity({ commit }, { foodItemId, quantity }) {
        commit('updateCartItemQuantity', { foodItemId, quantity });
      },
      setRestaurantId({ commit }, restaurantId) {
        commit('setRestaurantId', restaurantId);
      },
      async fetchRestaurantData({ commit }, restaurantId) {
        // Simulate fetching restaurant data from a database
        // Replace this with your actual implementation
        const restaurant = await fetchRestaurantById(restaurantId);
  
        // Commit the restaurant data to the store
        commit('setRestaurant', restaurant);
      },
    },
    getters: {
      getCartItems(state) {
        return state.cartItems;
      },
      getRestaurantId(state) {
        return state.restaurantId;
      },
      getRestaurant(state) {
        return state.restaurant;
      },
    },
  });

  import { restaurants } from './dummyRestaurantDb';

// Add a function to fetch restaurant data by ID
async function fetchRestaurantById(restaurantId) {
  // Simulate fetching restaurant data
  return new Promise(resolve => {
    setTimeout(() => {
      // Replace this with your actual logic to find a restaurant by ID
      const restaurant = restaurants.find(restaurant => restaurant.restaurant_id === restaurantId);
      resolve(restaurant);
    }, 500); // Simulating an asynchronous fetch
  });
}