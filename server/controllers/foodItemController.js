const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const { addFoodItem,getFoodItemsByRestaurantId, updateFoodItem, deleteFoodItem, updateOrInsertFoodItem} = require('../services/foodItems');
const { authenticateToken } = require('../util/verifyToken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '../uploads/') // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname) // Use the original file name
  }
});
const upload = multer({ storage: storage });
const foodController = express.Router()

foodController.post('/restaurants/uploadFoodItems',  authenticateToken,upload.single('file'), async (req, res) => {
  const restaurantId = req.restaurantId;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = file.path;
  const io=req.app.get('io')

  try {
    const result = await processCSVFile(restaurantId, filePath,io);
    return res.status(201).json({ message: 'Food items uploaded successfully',result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to upload food items' });
  } finally {
    // Clean up: Delete the temporary file
    fs.unlinkSync(filePath);
  }
});

  
  // const processCSVFile = async (restaurantId, filePath,io) => {
  //   return new Promise((resolve, reject) => {
  //     let processedCount=0;
      
  //     const stream = fs.createReadStream(filePath)
  //       .pipe(csvParser())
  //       .on('data', async (foodItemData) => {
  //         try {
  //           await updateOrInsertFoodItem(restaurantId, foodItemData);
  //           processedCount++;
  //           io.emit('progress',{processedCount},()=>{
  //             console.log("event emitteddddd")
  //           })
  //         } catch (error) {
  //           console.error('Error processing food item:', error);
  //           reject('Failed to process food items');
  //         }
  //       })
  //       .on('end', () => {
  //         resolve();
  //       })
  //       .on('error', (error) => {
  //         console.error('Error reading CSV file:', error);
  //         reject('Failed to read CSV file');
  //       });
  //   });
  // };

  const processCSVFile = async (restaurantId, filePath, io) => {
    return new Promise((resolve, reject) => {
      let buffer = [];
      const stream = fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', async (foodItemData) => {
          buffer.push(foodItemData);
          if (buffer.length === 5) {
            // Pause the stream after filling the buffer
            stream.pause();
            try {
              // Process the buffer
              await processBuffer(restaurantId, buffer);
              // Clear the buffer
              buffer = [];
              // Resume the stream
              stream.resume();
            } catch (error) {
              console.error('Error processing buffer:', error);
              reject('Failed to process buffer');
            }
          }
        })
        .on('end', async () => {
          // Process remaining items in the buffer if any
          if (buffer.length > 0) {
            try {
              await processBuffer(restaurantId, buffer);
            } catch (error) {
              console.error('Error processing remaining buffer:', error);
              reject('Failed to process remaining buffer');
            }
          }
          resolve();
        })
        .on('error', (error) => {
          console.error('Error reading CSV file:', error);
          reject('Failed to read CSV file');
        });
    });
  };
  const processBuffer = async (restaurantId, buffer) => {
    for (const foodItemData of buffer) {
      try {
        await updateOrInsertFoodItem(restaurantId, foodItemData);
      } catch (error) {
        console.error('Error processing food item:', error);
        throw new Error('Failed to process food items');
      }
    }
  };


  foodController.post('/restaurants/addFoodItems', authenticateToken,async (req, res) => {
    const restaurantId  = req.restaurantId;
    const foodItemData = req.body;
    
  
    try {
      const newFoodItem = await addFoodItem(restaurantId, foodItemData);
      res.json({ message: 'FoodItem added successfully', data: newFoodItem });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Failed to add FoodItem' });
    }
  });


  foodController.put('/restaurants/update-food-item/:food_item_id',authenticateToken,async(req,res)=>{
    const food_item_id=req.params.food_item_id
    const updatedFoodItemData = req.body;
    try {
      const updatedItem =await updateFoodItem(food_item_id,updatedFoodItemData)
      res.json({ message: 'FoodItem updated successfully', data: updatedItem });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update FoodItem' });
    }
  })

  foodController.delete('/restaurants/delete-food-item/:food_item_id', authenticateToken, async (req, res) => {
    const food_item_id = req.params.food_item_id;
  
    try {
      const deletedItem = await deleteFoodItem(food_item_id);
      res.json({ message: 'FoodItem deleted successfully', data: deletedItem });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete FoodItem' });
    }
  });
  

  foodController.get('/restaurants/:restaurantId/getAllFoodItems',async(req,res)=>{
    const restaurantId  = req.params.restaurantId;
  
    try {
      const allFoodItems = await getFoodItemsByRestaurantId(restaurantId);
      res.json({ message: 'FoodItems fetched successfully', data: allFoodItems });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Failed to fetch FoodItems' });
    }
  })

  module.exports = foodController