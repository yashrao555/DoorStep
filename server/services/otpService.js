const generateOTP = (expirationTime = 120) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiration = new Date(Date.now() + expirationTime * 1000);
    return { otp, expiration };
  };
  

  module.exports={generateOTP}