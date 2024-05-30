const ComponentPosition = require('../models/position.js');
const TextComponent = require('../models/text.js')

async function createTextComponent(internalLayout) {

  //console.log(internalLayout);
  //  await TextComponent.destroy({ where: {}, truncate: true });
  //  await ComponentPosition.destroy({ where: {}, truncate: true })
  
  for (const layout of internalLayout) {
    try {
      const component = await ComponentPosition.create({
        x: layout.x,
        y: layout.y,
        w: layout.w,
        h: layout.h,
        layout_id: 1
      });

      const cssData = JSON.stringify({
        containerStyle: layout.containerStyle,
        textStyle: layout.textStyle,
        imageStyle: layout.imageStyle
      });

      const textComp = await TextComponent.create({
        content: layout.content,
        css: cssData,
        componentPositionId: component.dataValues.id
      });

      console.log(component, textComp);
    } catch (error) {
      console.error('Error creating component:', error);
      return res.status(500).json({ error: 'Error creating component' });
    }
  }

  }

  async function getAllTextComponents() {
    try {
      const textComponents = await ComponentPosition.findAll();
      return textComponents;
    } catch (error) {
      console.error('Error fetching text components:', error);
      throw error; // You can handle this error in your application logic
    }
  }
  

  async function getCss(){
    try {
      const result = await TextComponent.findAll();
      return result; 
    } catch (error) {
      throw error;
    }
  }

  module.exports = {createTextComponent,getAllTextComponents,getCss}