const ComponentPosition = require('../models/position.js');
const TextComponent = require('../models/text.js')
const ImageComponent = require('../models/imagecomponent.js');
const LayoutItem = require('../models/layoutitem.js');
// const fs = require("fs");
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { log } = require('console');
const HTMLComponent = require('../models/htmlComponent.js');

const uploadDir = path.join(__dirname, 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const createLayoutItem = async (layoutData) => {
  try {
    const existingLayout = await LayoutItem.findOne({
      where:{
          layout_id:layoutData.layout_id
      }
  })
  // console.log("current data ",layoutData);

  if(existingLayout)
    {
      if(layoutData.image===null){
        const updatedLayout = await  existingLayout.update({
          image:0,
          css:layoutData.css
        })
      }
      else{
        const updatedLayout = await  existingLayout.update({
          image:layoutData.image,
          css:layoutData.css
        })
      }
     

      return updatedLayout
    }
    else{
      // console.log("hiii");
      const layoutItem = await LayoutItem.create(layoutData);
    return layoutItem;
    }
    
  } catch (error) {
    throw new Error('Error creating layout item: ' + error.message);
  }
};

const getLayout = async(layout_id)=>{
  try {
    const result = await LayoutItem.findOne({where:{
      layout_id:layout_id
    }});

    return result;
  } catch (error) {
    throw error;
  }
}

async function createURL(layout_id,new_url){
  try {
    const layout = await LayoutItem.findOne({
      where:{
        layout_id:1
      }
    })
    console.log(layout);
    await layout.update({
      url:new_url
    })
    return layout;

  } catch (error) {
    
  }
}

async function createTextComponent(internalLayout, layout_id, files) {
  let count = 0;
  for (const layout of internalLayout) {
    let file;
    let imagePath;
    
    if (layout.sendFile) {
      console.log("Entered in sendfile");
      file = files[count];
      if (file) {
        imageBuffer = file.buffer;
        filePath = path.join(uploadDir, file.originalname);
        try {
          fs.writeFileSync(filePath, imageBuffer);
          console.log("File saved to:", filePath);
          imagePath=filePath
        } catch (err) {
          console.error("Error saving file:", err);
          return res.status(500).json({ error: 'Error saving file' });
        }
      }
      count += 1;
    }

    try {
      if (layout.PositionId) {
        const component = await ComponentPosition.findByPk(layout.PositionId);

        if (!component) {
          console.log(`Component with id ${layout.PositionId} not found!`);
          continue;
        }

        await component.update({
          x: layout.x,
          y: layout.y,
          w: layout.w,
          h: layout.h,
        });

        const cssData = JSON.stringify({
          containerStyle: layout.containerStyle,
          textStyle: layout.textStyle,
          imageStyle: layout.imageStyle
        });

        if (layout.type === 'TextComponent') {
          const textComp = await TextComponent.findOne({
            where: {
              componentPositionId: layout.PositionId
            }
          });

          await textComp.update({
            content: layout.content,
            css: cssData,
          });
        } else if(layout.type==='ImageComponent') {
          if (file || cssData) {
            const imgComp = await ImageComponent.findOne({
              where: {
                componentPositionId: layout.PositionId
              }
            });
            await imgComp.update({
              FilePath: imagePath,
            
              css: cssData
            });
          }
        }
        else{
          const htmlComp = await HTMLComponent.findOne({
            where:{
              componentPositionId:layout.PositionId
            }
          })

          await htmlComp.update({
            html:layout.content.htmlContent,
            css:layout.content.cssContent,
            script:layout.content.jsContent
          })
        }
      } else {
        const component = await ComponentPosition.create({
          x: layout.x,
          y: layout.y,
          w: layout.w,
          h: layout.h,
          layout_id: layout_id,
          type: layout.type
        });

        const cssData = JSON.stringify({
          containerStyle: layout.containerStyle,
          textStyle: layout.textStyle,
          imageStyle: layout.imageStyle
        });

        if (layout.type === 'TextComponent' || layout.type === 'AddHTML') {
          await TextComponent.create({
            content: JSON.stringify(layout.content),
            css: cssData,
            componentPositionId: component.dataValues.id,
            layout_id: layout_id
          });
        } else if(layout.type==='ImageComponent') {
          await ImageComponent.create({
            FileName: 'Image1',
            FilePath: imagePath,
            componentPositionId: component.dataValues.id,
            layout_id: layout_id,
            css: cssData,
          });
        }
        else{
        await HTMLComponent.create({
          html:layout.content.htmlContent,
          css:layout.content.cssContent,
          script:layout.content.jsContent,
          componentPositionId: component.dataValues.id,
            layout_id: layout_id,
        })
      }
      }
    } catch (error) {
      console.error('Error creating component:', error);
      return res.status(500).json({ error: 'Error creating component' });
    }
  }
}

  async function getAllTextComponents(layout_id) {
    try {
      const textComponents = await ComponentPosition.findAll({
        where:{
          layout_id:layout_id
        }
      });
      return textComponents;
    } catch (error) {
      console.error('Error fetching text components:', error);
      throw error; // You can handle this error in your application logic
    }
  }
  

  async function getCss(layout_id){
    try {
      const resultText = await TextComponent.findAll({where:{
        layout_id:layout_id
      }});

      const resultImg = await ImageComponent.findAll({where:{
        layout_id:layout_id
      }})

      const resultHTML = await HTMLComponent.findAll({where:{
      layout_id:layout_id
      }})


      const result = resultText.concat(resultImg)
      console.log("this is the result :",result);
      return result.concat(resultHTML); 
    } catch (error) {
      throw error;
    }
  }

  async function removeElement(Id,Type){
    try {

      if(Type==="ImageComponent"){
        const destroyedImage= await ImageComponent.destroy({
          where: {
            componentPositionId: Id
          }
        })
      }
      else {
        const destroyedText= await TextComponent.destroy({
          where: {
            componentPositionId: Id
          }
        })
  
      }


      const destroyedComponent = await ComponentPosition.destroy({
        where: {
          id: Id
        }
      })

      return {destroyedText,destroyedComponent,destroyedImage};
    } catch (error) {
      
    }
  }

  module.exports = {createTextComponent,getAllTextComponents,getCss,removeElement,createLayoutItem,getLayout,createURL}