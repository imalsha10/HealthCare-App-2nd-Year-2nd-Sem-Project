const router = require("express").Router();
const passport = require("passport");
const Log = require("../Models/login");

// Middleware for authentication
const authenticateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized access" });
    }
};

// Middleware for authorization
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ error: "Forbidden access" });
        }
    };
};

// Route for user registration
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    const newUser = new Log({
        username,
        email,
        password,
        role: "user" // Assign a default role to new users
    });

    Log.register(newUser, password, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Registration Unsuccessful!" });
        } else {
            res.status(201).json({ message: "Registration Success!", user });
        }
    });
});

// Route for user login
router.post("/login", passport.authenticate("local"), (req, res) => {
    const user = req.user;
    res.json({ message: "Login Success!", roles: user.role});
});

// Route for user logout
router.get("/logout", (req, res) => {
    req.logout();
    res.json({ message: "Logout Success!" });
});

// Example route accessible only to authenticated users
router.get("/dashboard", authenticateUser, (req, res) => {
    res.json({ message: "Welcome to the dashboard!" });
});

// Example route accessible only to users with admin role
router.get("/admin", authenticateUser, authorizeRole(["admin"]), (req, res) => {
    res.json({ message: "Welcome to the admin panel!" });
});

module.exports = router;
