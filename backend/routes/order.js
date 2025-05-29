const express = require('express');
const db = require('../config');
const router = express.Router();

// Place an order
router.post('/', async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({ error: 'user_id and product_id are required' });
    }

    const result = await db.query(
      'INSERT INTO orders(user_id, product_id, status) VALUES($1, $2, $3) RETURNING *',
      [user_id, product_id, 'Placed']
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
