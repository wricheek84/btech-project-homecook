// backend/controllers/statsController.js

const db = require('../config/db');
const moment = require('moment'); // Use the 'moment' library we just installed

/**
 * AI Trend Analyzer
 * Finds the top 5 most-ordered dishes in a homecook's location
 * from the last 30 days.
 */
const getTrendingDishes = (req, res) => {
  const homecookId = req.user.id;
  const homecookLocation = req.user.location; // We get this from the 'protect' middleware

  if (!homecookLocation) {
    return res.status(400).json({ error: 'Homecook location not found.' });
  }

  // Set the time for "30 days ago"
  const thirtyDaysAgo = moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');

  // This is the "AI" query.
  // It joins orders, dishes, and users
  // It counts orders grouped by dish
  // It filters by the homecook's location AND the 30-day time window
  const query = `
    SELECT
      o.dish_id,
      d.name,
      d.image_url,
      COUNT(o.id) AS order_count
    FROM orders o
    JOIN dishes d ON o.dish_id = d.id
    JOIN users u ON d.cook_id = u.id
    WHERE
      u.location = ? 
      AND o.order_time >= ?
      AND o.status = 'delivered' 
    GROUP BY
      o.dish_id, d.name, d.image_url
    ORDER BY
      order_count DESC
    LIMIT 5;
  `;

  db.query(query, [homecookLocation, thirtyDaysAgo], (err, results) => {
    if (err) {
      console.error('❌ Error fetching trending dishes:', err);
      return res.status(500).json({ error: 'Failed to fetch trending dishes.' });
    }
    
    // Successfully return the list of trending dishes
    res.status(200).json(results);
  });
};

module.exports = {
  getTrendingDishes,
};