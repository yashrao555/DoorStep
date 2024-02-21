const Restaurant= require('../models/restaurant');
const { generateOTP } = require('./otpService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yrao@argusoft.com", // Replace with your Gmail email
      pass: `${process.env.GMAIL_PASS}` // Replace with your Gmail password
    },
  });

const registerRestaurant = async (restaurantData) => {
    const {
        name,
        opens_at,
        closes_at,
        email,
        phone,
        address,
        city,
        state,
        zip,
        password,
        location_lat,
        location_long,
    } = restaurantData;

    try {
        // Check if the user already exists
        const existingRestaurant = await Restaurant.findOne({
            where: {
                email: email,
            },
        });

        if (existingRestaurant) {
            return { error: 'Restaurant with this email already exists' };
        }

        // Generate OTP with expiration time of 5 minutes (300 seconds)
        const { otp, expiration } = generateOTP();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user data with hashed password, OTP, and expiration to the database
        const newRestaurantData = {
            name,
        opens_at,
        closes_at,
        email,
        phone,
        address,
        city,
        state,
        zip,
        password:hashedPassword,
        location_lat,
        location_long,
        otp,
        otp_expiration:expiration,
        is_verified:false
        };

        const createdRestaurant = await Restaurant.create(newRestaurantData);
        console.log("New customer created:", createdRestaurant.toJSON());

        // Send OTP via email
        const mailOptions = {
            from: "yrao@argusoft.com",
            to: email,
            subject: "OTP Verification",
            text: `Your OTP for registration is: ${otp}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending OTP:", error);
                return { error: "Failed to send OTP" };
            } else {
                console.log("OTP sent successfully:", info.response);
                return { message: "Restaurant registered. OTP sent successfully." };
            }
        });

        return {message:"Restaurant registerd but unverified"}
    } catch (error) {
        console.error("Error creating restaurant:", error);
        return { error: "Failed to register restaurant" };
    }
};

const verifyRestaurantOTP = async (email, otp) => {
    try {
        // Find customer by email using Sequelize
        const restaurant = await Restaurant.findOne({
            where: {
                email: email,
            },
        });

        // Check if customer exists
        if (!restaurant) {
            return { error: 'Restaurant not found' };
        }

        // Check if OTP is correct
        if (restaurant.otp.toString() === otp.toString()) {
            // Check if OTP has expired
            if (restaurant.otp_expiration && new Date(restaurant.otp_expiration) > new Date()) {
                // Update customer verification status and save customer data to the database
                restaurant.is_verified = true;
                // Optionally, you can save customer data to the database
                // For example, using a database connection and an ORM like Sequelize or Mongoose
                await restaurant.save(); // Save the updated customer data

                return { message: 'OTP verification successful. Restaurant registered.' };
            } else {
                // OTP has expired, handle accordingly (e.g., set is_verified to false, delete the customer)
                // For demonstration purposes, here we set is_verified to false
                restaurant.is_verified = false;
                await restaurant.save();

                return { error: 'OTP has expired. Registration canceled.' };
            }
        }

        return { error: 'Invalid OTP or email' };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { error: 'Internal server error' };
    }
};

const loginRestaurant = async (email, password) => {
    try {
        // Find the customer by email
        const restaurant = await Restaurant.findOne({
            where: {
                email: email,
            },
        });

        // Check if the customer exists
        if (!restaurant) {
            return { error: 'No user found' };
        }

        if(restaurant)
        {
            if(restaurant.is_verified===false){
                const {otp,otp_expiration} = generateOTP()
                restaurant.otp=otp;
                restaurant.otp_expiration=otp_expiration;
                await restaurant.save();
                const mailOptions = {
                    from: "yrao@argusoft.com",
                    to: email,
                    subject: "OTP Verification",
                    text: `Your OTP for registration is: ${otp}`,
                };
        
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.error("Error sending OTP:", error);
                        return { error: "Failed to send OTP" };
                    } else {
                        console.log("OTP sent successfully:", info.response);
                        return { message: "Restaurant registered. OTP sent successfully." };
                    }
                });
                return { message: 'OTP has been reset. Verify to login.' };
            }
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, restaurant.password);

        if (isPasswordValid) {
            // Check if the customer is verified
            if (restaurant.is_verified) {
                // Generate JWT token
                const token = jwt.sign({ restaurantId: restaurant.restaurant_id }, 'your_secret_key', {
                    expiresIn: '1h', // Token expiration time (e.g., 1 hour)
                });
                console.log(token)

                return {
                    message: 'Login successful',
                    token: token,
                    
                };
            } else {
                return { error: 'Account not verified. Please complete the registration process.' };
            }
        } else {
            return { error: 'Invalid email or password' };
        }
    } catch (error) {
        console.error('Error during login:', error);
        return { error: 'Failed to login' };
    }
};

module.exports = {registerRestaurant,verifyRestaurantOTP,loginRestaurant}