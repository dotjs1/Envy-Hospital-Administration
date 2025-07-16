const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const express = require("express");
const routes = express.Router();
const predefinedPass = process.env.PREDEF_PASS;
const predefinedAdminNum = process.env.PREDEF_ADMNUM;

const JWT_SECRETKEY = process.env.JWT_SECRET || "your_secret_key";

// Middleware to parse JSON requests
routes.use(bodyParser.json());

// Login Route
routes.post("/login", async (req, res) => {
    const { adminnumber, adminpass } = req.body;
    try {
        if (!adminnumber || !adminpass) {
  return res.status(400).json({ error: "Missing credentials" });
}
        if (adminnumber === predefinedAdminNum && adminpass === predefinedPass) {
            const token = jwt.sign({ adminnumber }, JWT_SECRETKEY, { expiresIn: "1h" });

            return res.status(200).json({
                message: `Welcome, Admin ${adminnumber}! You have logged in successfully.`,token:token
            });
        } else {
            return res.status(400).json({
                error: "Invalid credentials. Please check your administration number and password."
            });
        }
    } catch (error) {
        console.error("Error during authentication:", error.message);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
});

module.exports =  routes;