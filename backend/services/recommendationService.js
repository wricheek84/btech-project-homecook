// backend/services/recommendationService.js

const stringSimilarity = require('string-similarity'); // Use the new library
const db = require('../config/db');

const recommendationService = {
  dishDocuments: [], // We will store our dish "documents" here
  isReady: false,

  // Simple helper to create a "document" from a dish
  createDishDocument(dish) {
    const name = dish.name || '';
    const description = dish.description || '';
    const cuisine = dish.cuisine || '';
    
    // Combine all text into one string for comparison
    return `${name} ${description} ${cuisine}`
      .toLowerCase()
      .replace(/[\n\r,.]/g, ' ')
      .replace(/\s+/g, ' ');
  },

  async initialize() {
    console.log('🧠 Initializing Recommendation Service (New Method)...');
    try {
      const [dishes] = await db.promise().query('SELECT id, name, description, cuisine FROM dishes');
      
      if (dishes.length === 0) {
        console.warn('⚠️ No dishes found for recommendation engine.');
        return;
      }

      // Store all dish documents in memory
      this.dishDocuments = dishes.map(dish => ({
        id: dish.id,
        doc: this.createDishDocument(dish) // Create the clean string
      }));
      
      this.isReady = true;
      console.log(`✅ Recommendation Service is ready. Loaded ${dishes.length} dishes.`);

    } catch (error) {
      console.error('❌ Error initializing Recommendation Service:', error);
    }
  },

  getSimilarDishes(dishId) {
    if (!this.isReady) return [];

    // 1. Find the "document" for the dish we are looking at
    const mainDish = this.dishDocuments.find(dish => dish.id === dishId);
    if (!mainDish) return [];

    // 2. Get all *other* dishes
    const otherDishes = this.dishDocuments.filter(dish => dish.id !== dishId);
    
    // 3. Compare the main dish string to all other dish strings
    const ratings = stringSimilarity.findBestMatch(
      mainDish.doc, // The string of our main dish
      otherDishes.map(dish => dish.doc) // An array of strings of all other dishes
    );

    // 4. Combine the ratings with the dish IDs
    const similarDishes = ratings.ratings
      .map((rating, index) => ({
        id: otherDishes[index].id,
        score: rating.rating,
      }))
      .filter(dish => dish.score > 0.1); // Only show if similarity is > 10%

    // 5. Sort by the best match
    similarDishes.sort((a, b) => b.score - a.score);

    return similarDishes.slice(0, 5);
  }
};

module.exports = recommendationService;