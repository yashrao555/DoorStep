const Staff = require("../models/staff");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerStaff = async (staffData) => {
  try {
    // Destructure staff data
    const { name, email, password, role,cityId } = staffData;

    // Check if staff with the same email already exists
    const existingStaff = await Staff.findOne({ where: { email: email } });
    if (existingStaff) {
      return { error: "Staff with this email already exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new staff member in the database
    console.log(cityId);
    const newStaff = await Staff.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
      restaurant_id: 1,
      cityId:JSON.stringify(cityId)
    });

    // Return success message
    return { message: "Staff registered successfully", staff: newStaff };
  } catch (error) {
    console.error("Error registering staff:", error);
    return { error: "Failed to register staff" };
  }
};

const loginStaff = async (email, password) => {
  try {
    // Find the staff member by email
    const staff = await Staff.findOne({
      where: {
        email: email,
      },
    });

    // Check if the staff member exists
    if (!staff) {
      return { error: "No user found" };
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, staff.password);

    if (isPasswordValid) {
      // Generate JWT token with restaurant_id and role
      const token = jwt.sign(
        {
          staffId: staff.id,
          restaurant_Id: staff.restaurant_id,
          role: staff.role,
        },
        "your_secret_key",
        {
          expiresIn: "8h", // Token expiration time (e.g., 1 hour)
        }
      );

      return {
        message: "Login successful",
        token: token,
      };
    } else {
      return { error: "Invalid email or password" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Failed to login" };
  }
};

const getAllStaff = async () => {
  try {
    // Retrieve all staff members from the database
    const allStaff = await Staff.findAll();

    // Return the retrieved staff members
    return allStaff;
  } catch (error) {
    console.error("Error retrieving staff:", error);
    throw new Error("Failed to retrieve staff");
  }
};

const accessProtectedStaffResource = (req) => {
    try {
        // Access the customer ID from the decoded token payload attached to the request
        const staffId = req.staffId;

        // Perform actions with the customer ID or respond accordingly
        return { message: `Protected resource accessed by customer ID: ${staffId}` };
    } catch (error) {
        console.error('Error accessing protected resource:', error);
        return { error: 'Failed to access protected resource' };
    }
};


module.exports = { registerStaff, getAllStaff, loginStaff,accessProtectedStaffResource };
