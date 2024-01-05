// imports
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// Middleware
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

// export
module.exports = router;