// cartService.js

const Cart = require("../models/cart");

async function getCartByCustomerAndRestaurant(customer_id) {
  const cart = await Cart.findOne({
    where: {
      customer_id: customer_id,
    },
  });
  if(cart)
  cart.items = JSON.parse(cart.items)
  return cart;
}

async function updateCart(cart, newItem) {
  // Copy the existing items array to avoid direct references
 

  let existingItems = cart.items;

  // Find the index of the item with the same food_item_id in the existing items array
  const existingItemIndex = existingItems.findIndex(
    (item) => item.name=== newItem.name
  );
  if (existingItemIndex !== -1) {
    // If the item already exists, log the current quantity and attempt to update it
    existingItems[existingItemIndex].quantity += 1;
  } else {
    // If the item doesn't exist, add it to the array // Set initial quantity for new items
    newItem.quantity = 1; 
  

    existingItems.push(newItem);
  }

  cart.setDataValue("items", existingItems);

  cart.setDataValue("total_amount", cart.total_amount + newItem.price);
  cart.items=JSON.stringify(cart.items)
  await cart.save({ fields: ["items"] });
  await cart.save({ fields: ["total_amount"] });
  await cart.reload();
  console.log('cart value is : ',cart)

  console.log("Cart saved successfully");
}

async function deleteFromCart(cart, newItem, total_amount) {
  // Copy the existing items array to avoid direct references
  let existingItems = cart.items;

  // Find the index of the item with the same food_item_id in the existing items array
  const existingItemIndex = existingItems.findIndex(
    (item) => item.name === newItem.name
  );
  if (existingItemIndex !== -1) {
    {
      if (existingItems[existingItemIndex].quantity > 1) {
        existingItems[existingItemIndex].quantity -= 1;
      } else {
        if (existingItems[existingItemIndex].quantity === 1) {
          existingItems.splice(existingItemIndex, 1);
        }
      }
    }
    // If the item already exists, log the current quantity and attempt to update it
  }

  // Set the updated items array to the Cart instance
  cart.setDataValue("items",existingItems);

  // Update other properties as needed
  cart.setDataValue("total_amount", cart.total_amount - newItem.price);
  cart.items=JSON.stringify(cart.items)
  await cart.save({ fields: ["items"] });
  await cart.save({ fields: ["total_amount"] });
  await cart.reload();

  console.log("Cart saved successfully");
}

async function deleteCart(customer_id){
  const cart =await Cart.findOne({
    where: {
      customer_id: customer_id,
    },
})
return await cart.destroy();
}
async function createCart(customer_id, restaurant_id, items,cityId) {
  console.log('city id inside service ',cityId);
  items.quantity=1;
  let newItems  = JSON.stringify([items])
  return await Cart.create({
    customer_id,
    restaurant_id,
    items: newItems,
    total_amount:items.price,
    cityId:cityId,
  });
}

module.exports = {
  getCartByCustomerAndRestaurant,
  updateCart,
  createCart,
  deleteFromCart,
  deleteCart
};
