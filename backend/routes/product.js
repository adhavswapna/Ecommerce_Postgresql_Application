const express = require('express');
const db = require('../config');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a product
router.post('/', async (req, res) => {
  try {
    const { name, price, seller_id } = req.body;

    // Basic validation
    if (!name || !price || !seller_id) {
      return res.status(400).json({ error: 'Name, price, and seller_id are required' });
    }

    const result = await db.query(
      'INSERT INTO products(name, price, seller_id) VALUES($1, $2, $3) RETURNING *',
      [name, price, seller_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
