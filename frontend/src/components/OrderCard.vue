<template>
  <div class="order-card" @click="openOrderModal">
    <div class="card-content">
      <div class="upper-section">
        <div class="left-section">
          <img
            style="border-radius: 20px; width: 250px"
            src="data:image/jpeg;base64,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"
            alt="altText"
          />
          <div class="res-details">
           <h3 class="restaurant-name">{{ name }}</h3>
            <p class="restaurant-address">{{ city }}</p>
            <p class="restaurant-timings">
              {{ $t('order.timings') }} : {{ opensAtHours }}:{{ opensAtMinutes }} -
              {{ closesAtHours }}:{{ closesAtMinutes }}
            </p>
            <p class="orderDate">{{ $t('order.ordered_on') }} : {{ orderDate }}</p>
          </div>
        </div>

        <p class="order-status">{{ $t('order.status') }}: {{ order.status }}</p>
      </div>

      <hr class="solid" />

      <div class="lower-section">
        <div class="order-item-container">
          <div
            v-for="(item, index) in order.items"
            :key="item.id"
            class="order-item"
          >
            <span>{{ item.name }} x {{ item.quantity }}</span>
            <template v-if="index !== order.items.length - 1">, </template>
          </div>
        </div>

        <p class="order-amount">{{ $t('order.total') }}: {{ order.total_amount.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    order: Object,
  },
  data() {
    return {
      name: null,
      city: null,
      opensAtHours: "",
      opensAtMinutes: "",
      closesAtHours: "",
      closesAtMinutes: "",
      orderDate: "",
    };
  },

  methods: {
    async getRestaurant() {
      try {
        const restaurantId = this.order.restaurant_id;
        const cityId = this.order.cityId;
        const response = await axios.get(
          `http://localhost:3000/restaurants/${restaurantId}`
        );
        const restaurantData = response.data.data;

        const cityResponse = await axios.post(
          "http://localhost:3000/getCityName",
          { cityId }
        );
        this.city = cityResponse.data.cityName;
        console.log("res data ", restaurantData);
        this.name = restaurantData.name;

        //--------------------------------opening and closing time-------------------------------
        const timestamp1 = restaurantData.opens_at;
        const date1 = new Date(timestamp1);

        const timestamp2 = restaurantData.closes_at;
        const date2 = new Date(timestamp2);

        const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5.5 hours)
        const istDate1 = new Date(date1.getTime() + istOffset);
        const istDate2 = new Date(date2.getTime() + istOffset);

        this.opensAtHours = istDate1.getHours().toString().padStart(2, "0");
        this.opensAtMinutes = istDate1.getMinutes().toString().padStart(2, "0");

        this.closesAtHours = istDate2.getHours().toString().padStart(2, "0");
        this.closesAtMinutes = istDate2
          .getMinutes()
          .toString()
          .padStart(2, "0");

        // ---------------------------order date-----------------------------------------------------
        const timestamp = this.order.createdAt;
        const date = new Date(timestamp);

        // Get day of the week
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = daysOfWeek[date.getDay()];

        // Get month
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = months[date.getMonth()];

        // Get date and year
        const day = date.getDate();
        const year = date.getFullYear();

        // Get hours and minutes
        let hours = date.getHours();
        const minutes = date.getMinutes();

        // Convert hours to 12-hour format and determine AM/PM
        const ampm = hours >= 12 ? "PM" : "AM";
        hours %= 12;
        hours = hours || 12; // 0 should be displayed as 12 in 12-hour format

        // Format hours and minutes with leading zeros if needed
        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");

        // Construct the formatted string
        this.orderDate = `${dayOfWeek}, ${month} ${day} ${year} | ${formattedHours}:${formattedMinutes} ${ampm}`;
      } catch (error) {
        console.log(error);
      }
    },

    async openOrderModal() {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/${this.order.id}`
        );
        const orderDetails = response.data;
        this.$emit("open-modal", orderDetails);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    },
  },

  mounted() {
    this.getRestaurant();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Philosopher&display=swap");

.order-card {
  display: flex;
  justify-content: space-between;
  margin: 0 20%;
  padding: 10px;
  box-sizing: border-box;
}

.card-content {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  margin-bottom: 40px;
}

.upper-section {
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 30px;
  justify-content: space-between;
}

.left-section{
  display: flex;
}

.res-details {
  margin-top: 20px;
  margin-left: 40px;
}

.restaurant-name {
  font-size: 32px;
  /* font-weight: bold; */
  margin-bottom: 17px;
  font-family: "Tilt Warp", sans-serif;
  font-optical-sizing: auto;
  /* font-weight: 200; */
  font-style: normal;
  font-variation-settings: "XROT" 0, "YROT" 0;
}

.restaurant-address,
.restaurant-timings {
  /* color: #777; */
  font-size: 18px;
  /* font-weight: bold; */
  font-family: "Tenor Sans", sans-serif;
  /* font-weight: 400; */
  font-style: normal;
}

.order-status {
  margin-top: 25px;
  /* margin-left: 350px; */
  font-size: 20px;
  font-family: "Tenor Sans", sans-serif;
  /* font-weight: bold; */
  font-style: normal;
}

.orderDate {
  font-size: 18px;
  font-family: "Tenor Sans", sans-serif;
  /* font-weight: bold; */
  font-style: normal;
}

.solid {
  margin: 2rem;
}

.lower-section {
  display: flex;
  margin-left: 20px;
  margin-right: 30px;
  justify-content: space-between;
}

.order-item-container {
  display: flex;
}

.order-item {
  /* display: flex; */
  /* justify-content: space-between; */
  /* margin-top: 5px; */
  font-family: "Philosopher", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  /* background-color: aqua; */
  min-width: 100px;
}

.order-amount {
  /* margin-left:500px; */
  font-weight: bold;
  color: #27ae60;
  font-size: 18px;
  /* background-color: aqua; */
}
</style>
