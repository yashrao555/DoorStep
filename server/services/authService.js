const Customer = require('../models/customer.js');
const { generateOTP } = require('./otpService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { getCoordinatesFromAddress } = require('./locationService');
const { transporter } = require('../util/mail');




const registerCustomer = async (userData) => {
    const {
        name,
        dob,
        gender,
        email,
        phone,
        address,
        city,
        state,
        zip,
        password,
       
    } = userData;
    try {
        //Check if the user already exists
        const existingCustomer = await Customer.findOne({ where: { email: email } });

        if (existingCustomer) {
            return { error: 'Customer with this email already exists' };
        }

        // Generate OTP with expiration time of 5 minutes (300 seconds)
        const { otp, expiration } = generateOTP();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const coordinates = await getCoordinatesFromAddress(`${address},${city},${zip},Gujarat`)
        // Save user data with hashed password, OTP, and expiration to the database
        const newCustomerData = {
            name,
            dob,
            gender,
            email,
            phone,
            address,
            city,
            state:'Gujarat',
            zip,
            password: hashedPassword, // Store the hashed password
            location_lat:coordinates[0].latitude,
            location_long:coordinates[0].longitude,
            otp,
            otp_expiration: expiration,
            is_verified: false,
        };

        

        const createdCustomer = await Customer.create(newCustomerData);
        console.log("New customer created:", createdCustomer.toJSON());

        // Send OTP via email
        const mailOptions = {
            from: "yrao@argusoft.com",
            to: email,
            subject: "OTP Verification",
            text: `Your OTP for registration is: ${otp}`,
        };
        console.log(transporter);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending OTP:", error);
                return { error: "Failed to send OTP" };
            } else {
                console.log("OTP sent successfully:", info.response);
                return { message: "Customer registered. OTP sent successfully." };
            }
        });

        return {message:"User registerd but unverified"}
    } catch (error) {
        console.error("Error creating customer:", error);
        return { error: "Failed to register customer" };
    }
};

const verifyOTP = async (email, otp) => {
    try {
        // Find customer by email using Sequelize
        const customer = await Customer.findOne({
            where: {
                email: email,
            },
        });


        // Check if customer exists
        if (!customer) {
            return { error: 'Customer not found' };
        }
        
        // Check if OTP is correct
        if (customer.otp.toString() === otp.toString()) {
            // Check if OTP has expired
            if (customer.otp_expiration && new Date(customer.otp_expiration) > new Date()) {
                // Update customer verification status and save customer data to the database
                customer.is_verified = true;
                // Optionally, you can save customer data to the database
                // For example, using a database connection and an ORM like Sequelize or Mongoose
                await customer.save(); // Save the updated customer data

                return { message: 'OTP verification successful. Customer registered.' };
            } else {
                // OTP has expired, handle accordingly (e.g., set is_verified to false, delete the customer)
                // For demonstration purposes, here we set is_verified to false
                customer.is_verified = false;
                await customer.destroy();

                return { error: 'OTP has expired. Registration canceled.' };
            }
        }

        return { error: 'Invalid OTP or email' };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { error: 'Internal server error' };
    }
};

const loginCustomer = async (email, password) => {
    try {
        let myinterval;
        // console.log(process.env.GMAIL_PASS, typeof process.env.GMAIL_PASS);
        // Find the customer by email
        const customer = await Customer.findOne({
            where: {
                email: email,
            },
        });

        // Check if the customer exists
        if (!customer) {
            return { error: 'This user is not registered' };
        }

        if (customer.counter === 3) {
            // Wrap the setTimeout in a Promise for async/await support
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
           
           clearInterval(myinterval)
            // Set a timeout to reset the counter after 1 minute
            myinterval=setInterval(async () => {
              // Reset the counter to 0
              customer.counter = 0;
          
              // Save the changes
              await customer.save();
          
              console.log('Counter reset to 0');
            }, 1 * 60 * 1000);
          
            return { message: 'Try after 1 minute' };
          }
          


        if(customer)
        {
            if(customer.is_verified===false){
                const {otp,otp_expiration} = generateOTP()
                customer.otp=otp;
                customer.otp_expiration=otp_expiration;
                await customer.save();
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
        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if (isPasswordValid) {
            // Check if the customer is verified
            if (customer.is_verified) {
                // Generate JWT token
                const token = jwt.sign({ customerId: customer.id }, 'your_secret_key', {
                    expiresIn: '8h', // Token expiration time (e.g., 1 hour)
                });

                return {
                    message: 'Login successful',
                    token: token,
                };
            } else {
                return { error: 'Account not verified. Please complete the registration process.' };
            }
        } else {
            if(customer.counter<3){
                customer.counter+=1;
                await customer.save()
                clearInterval(myinterval)
                // Set a timeout to reset the counter after 1 minute
                myinterval=setInterval(async () => {
                  // Reset the counter to 0
                  customer.counter = 0;
              
                  // Save the changes
                  await customer.save();
              
                  console.log('Counter reset to 0');
                }, 1 * 60 * 1000);
                return { error: 'Invalid email or password' };
            }
           
        }
    } catch (error) {
        console.error('Error during login:', error);
        return { error: 'Failed to login' };
    }
};

const accessProtectedResource = (req) => {
    try {
        // Access the customer ID from the decoded token payload attached to the request
        const customerId = req.customerId;

        // Perform actions with the customer ID or respond accordingly
        return { message: `Protected resource accessed by customer ID: ${customerId}` };
    } catch (error) {
        console.error('Error accessing protected resource:', error);
        return { error: 'Failed to access protected resource' };
    }
};

module.exports = { verifyOTP,registerCustomer,loginCustomer,accessProtectedResource };
