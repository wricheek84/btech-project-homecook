// backend/routes/statsRoutes.js

const express = require('express');
const router = express.Router();
const { getTrendingDishes } = require('../controllers/statsController');
const protect = require('../middlewares/authmiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Define the route: GET /api/stats/trending-dishes
// This is only for homecooks
router.get(
  '/trending-dishes',
  protect,
  authorizeRoles('homecook'),
  getTrendingDishes
);

module.exports = router;