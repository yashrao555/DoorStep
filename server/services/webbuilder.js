const ComponentPosition = require('../models/position.js');
const TextComponent = require('../models/text.js')
const ImageComponent = require('../models/imagecomponent.js')
// const fs = require("fs");


async function createTextComponent(internalLayout,layout_id,files) {

  console.log("sfdskljfklsdjfldsjklfsdjlfkjsdlkfjdslkfjldskf",internalLayout.length);
  //  await TextComponent.destroy({ where: {}, truncate: true });
  //  await ComponentPosition.destroy({ where: {}, truncate: true })
  let count = 0
  for (const layout of internalLayout) {
    // console.log("position id", layout.PositionId)
    let file;
    let imageBuffer;
    console.log("sendfile",)
    if(layout.sendFile){
      console.log("hellooo")
       file = files[count]
      if(file){
        imageBuffer = file.buffer;
     }
     // console.log("shfkjsdfklsdjflkjdsf",imageBuffer)
     count+=1
    }
    
    // console.log(file)
   
    
    // console.log("shfklsdjfklsdjlkf",layout)
    try {

      if (layout.PositionId)
        {
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
            //layout_id: 2
          });

         

          const cssData = JSON.stringify({
            containerStyle: layout.containerStyle,
            textStyle: layout.textStyle,
            imageStyle: layout.imageStyle
          });

          if(layout.type==='TextComponent'){
            
          const textComp = await TextComponent.findOne({
            where:{
              componentPositionId:layout.PositionId
            }
          })

           textComp.update({
            content: layout.content,
            css: cssData,
            
          });
          }
          else{
            if(file){
              const imgComp = await ImageComponent.findOne({
                where:{
                  componentPositionId:layout.PositionId
                }
              })
              imgComp.update({
                FileData:imageBuffer,
                css:cssData
              })
            }
            
          }
    
        }
        
        else
        {
          const component = await ComponentPosition.create({
            x: layout.x,
            y: layout.y,
            w: layout.w,
            h: layout.h,
            layout_id: layout_id,
            type:layout.type
          });
    
          const cssData = JSON.stringify({
            containerStyle: layout.containerStyle,
            textStyle: layout.textStyle,
            imageStyle: layout.imageStyle
          });

          if(layout.type==='TextComponent'){
            const textComp = await TextComponent.create({
              content: layout.content,
              css: cssData,
              componentPositionId: component.dataValues.id,
              layout_id:layout_id
            });
          }
          else{
            // console.log("layout.content ",layout.content);
            const imgComp = await ImageComponent.create({
              FileName:'Image1',
              FileData:imageBuffer,
              componentPositionId: component.dataValues.id,
              layout_id:layout_id,
              css: cssData,
            })
          }
    
         
        }

      //console.log(component, textComp);
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

      const result = resultText.concat(resultImg)
      console.log("this is the result :",result);
      return result; 
    } catch (error) {
      throw error;
    }
  }

  async function removeElement(Id){
    try {
     const destroyedText= await TextComponent.destroy({
        where: {
          componentPositionId: Id
        }
      })

      const destroyedComponent = await ComponentPosition.destroy({
        where: {
          id: Id
        }
      })

      return {destroyedText,destroyedComponent};
    } catch (error) {
      
    }
  }

  module.exports = {createTextComponent,getAllTextComponents,getCss,removeElement}