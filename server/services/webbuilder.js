const TextComponent = require('../models/text.js')

async function createTextComponent(internalLayout) {

  console.log(internalLayout);
  await TextComponent.destroy({ where: {}, truncate: true });
  for (const layout of internalLayout) {
    try {
      const component = await TextComponent.create({
        type: layout.type,
        x: layout.x,
        y: layout.y,
        w: layout.w,
        h: layout.h,
        css: {
          containerStyle: layout.containerStyle,
          textStyle: layout.textStyle
        }
      });
      console.log('Component created:', component.toJSON());
      //createdComponents.push(component);
    } catch (error) {
      console.error('Error creating component:', error);
      return error;
    }
  }

  }

  async function getAllTextComponents() {
    try {
      const textComponents = await TextComponent.findAll();
      return textComponents;
    } catch (error) {
      console.error('Error fetching text components:', error);
      throw error; // You can handle this error in your application logic
    }
  }
  

  module.exports = {createTextComponent,getAllTextComponents}