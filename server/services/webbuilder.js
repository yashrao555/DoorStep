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
        layout_id:1
      });
      console.log(component);
      const textComp = await TextComponent.create({
        content:"sample text",
        css:layout.css,
        componentPositionId:component.dataValues.id
      }) 
      
      //createdComponents.push(component);
    } catch (error) {
      console.error('Error creating component:', error);
      return error;
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