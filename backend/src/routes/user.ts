// Import the necessary modules
import { Router, Request, Response } from "express";
import User from "../models/user"; // User model to interact with the database
import bcrypt from "bcrypt"; // bcrypt to hash passwords
import { registerValidation, loginValidation } from "../validation"; // Validation functions
import jwt from "jsonwebtoken"; // jsonwebtoken to create authentication tokens

// Express router to define the routes
const router = Router();

// Allowed email domain
const allowedDomain = "slavic.media";

// Restrict registration in production
router.post("/register", async (req: Request, res: Response) => {
  try {
    // Only allow registration in non-production environments
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({
        error: "Registration is disabled in production environment",
      });
    }

    // Continue with existing registration logic for test environment
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Extract the domain from the email address
    const emailDomain = req.body.email.split("@")[1];
    // Check if the domain matches the allowed domain
    if (emailDomain !== allowedDomain) {
      return res.status(400).json({ error: "Email domain not allowed" });
    }

    // Check if the email is already registered
    // If the email is already registered, return an error message
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password using bcrypt
    // The salt is a random value that is used to create the hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user object and save it to the database
    const userObject = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user object to the database
    // If the save is successful, return the user's id
    const savedUser = await userObject.save();
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    // If there is an error, return a server error message
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add admin seeding functionality
const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;

    if (!adminEmail || !adminPassword || !adminName) {
      throw new Error(
        "Admin credentials not provided in environment variables"
      );
    }

    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      await User.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
      });
      console.log("Admin account seeded successfully");
    }
  } catch (error) {
    console.error("Admin seeding failed:", error);
  }
};

// Call seedAdmin when the app starts in production
if (process.env.NODE_ENV === "production") {
  seedAdmin();
}
// User login endpoint
router.post("/login", async (req: Request, res: Response) => {
  try {
    // Validate user login info
    // If the validation fails, return an error message
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    // If login info is valid, find the user in the database
    const user = await User.findOne({ email: req.body.email });

    // If the user does not exist, return an error message
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // If the user exists, check if the password is correct
    // If the password is incorrect, return an error message
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // If the password is correct, create an authentication token
    // The token includes the user's name and id
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      process.env.TOKEN_SECRET || "your_default_secret",
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      } as jwt.SignOptions
    );

    // Attach the authentication token to the header and return it in the response
    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (error) {
    // If there is an error, return a server error message
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export the router to be used in other parts of the application
export default router;
