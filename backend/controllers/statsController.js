// backend/controllers/statsController.js

const db = require('../config/db');
const moment = require('moment');

/**
 * AI Trend Analyzer
 * Finds the top 5 most-ordered dishes in a homecook's location
 * from the last 30 days.
 */
const getTrendingDishes = async (req, res) => {
  const homecookId = req.user.id;

  try {
    // 1. Fetch location directly from DB to be 100% sure
    const [userResult] = await db.promise().query(
      'SELECT location FROM users WHERE id = ?', 
      [homecookId]
    );

    if (userResult.length === 0 || !userResult[0].location) {
      return res.status(400).json({ error: 'Homecook location not found.' });
    }

    const homecookLocation = userResult[0].location;

    // 2. Set the time for "30 days ago"
    const thirtyDaysAgo = moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');

    // 3. Run the Smart Query
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
        AND o.status IN ('delivered', 'paid', 'preparing','accepted')
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
      
      res.status(200).json(results);
    });

  } catch (error) {
    console.error('❌ Error in getTrendingDishes:', error);
    return res.status(500).json({ error: 'Server error fetching stats.' });
  }
};

module.exports = {
  getTrendingDishes,
};