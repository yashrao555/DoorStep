const Staff = require("../models/staff");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerStaff = async (staffData) => {
    try {
        // Destructure staff data
        const { name, email, password, role } = staffData;

        // Check if staff with the same email already exists
        const existingStaff = await Staff.findOne({ where: { email: email } });
        if (existingStaff) {
            return { error: 'Staff with this email already exists' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new staff member in the database
        const newStaff = await Staff.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            restaurant_id: 1
        });

        // Return success message
        return { message: 'Staff registered successfully', staff: newStaff };
    } catch (error) {
        console.error('Error registering staff:', error);
        return { error: 'Failed to register staff' };
    }
};

const getAllStaff = async () => {
    try {
        // Retrieve all staff members from the database
        const allStaff = await Staff.findAll();

        // Return the retrieved staff members
        return allStaff;
    } catch (error) {
        console.error('Error retrieving staff:', error);
        throw new Error('Failed to retrieve staff');
    }
};

module.exports={registerStaff,getAllStaff}