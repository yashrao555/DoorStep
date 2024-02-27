var NodeGeocoder = require('node-geocoder');

var geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: '387526b8aec84277b6d545adf1fb4f6e'
});


const getCoordinatesFromAddress = async (address) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode(address, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };
  
  
  

module.exports = {getCoordinatesFromAddress}