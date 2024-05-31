const ComponentPosition = require('../models/position.js');
const TextComponent = require('../models/text.js')

async function createTextComponent(internalLayout,layout_id) {

  console.log(internalLayout);
  //  await TextComponent.destroy({ where: {}, truncate: true });
  //  await ComponentPosition.destroy({ where: {}, truncate: true })
  
  for (const layout of internalLayout) {
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
        
        else
        {
          const component = await ComponentPosition.create({
            x: layout.x,
            y: layout.y,
            w: layout.w,
            h: layout.h,
            layout_id: layout_id
          });
    
          const cssData = JSON.stringify({
            containerStyle: layout.containerStyle,
            textStyle: layout.textStyle,
            imageStyle: layout.imageStyle
          });
    
          const textComp = await TextComponent.create({
            content: layout.content,
            css: cssData,
            componentPositionId: component.dataValues.id,
            layout_id:layout_id
          });
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
      const result = await TextComponent.findAll({where:{
        layout_id:layout_id
      }});
      return result; 
    } catch (error) {
      throw error;
    }
  }

  module.exports = {createTextComponent,getAllTextComponents,getCss}