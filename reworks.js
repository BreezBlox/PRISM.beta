// reworks.js
const express = require('express');
const pool = require('./db');
const router = express.Router();

// Export reworks to CSV
router.get('/export', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM reworks ORDER BY date DESC');
    
    // CSV header row
    let csv = 'ID,Date,Reason,Item Affected,Department,Cost,Time Spent,Notes\n';
    
    // Add each row of data
    rows.forEach(row => {
      // Format data and handle possible commas in text fields by wrapping in quotes
      const formattedRow = [
        row.id,
        row.date ? row.date.toISOString().split('T')[0] : '',
        `"${(row.reason || '').replace(/"/g, '""')}"`,
        `"${(row.item_affected || '').replace(/"/g, '""')}"`,
        `"${(row.department || '').replace(/"/g, '""')}"`,
        row.cost || 0,
        row.time_spent || 0,
        `"${(row.notes || '').replace(/"/g, '""')}"`
      ];
      csv += formattedRow.join(',') + '\n';
    });

    // Set response headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=reworks-export.csv');
    
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new rework entry
router.post('/', async (req, res) => {
  try {
    const { date, reason, item_affected, department, cost, time_spent, notes } = req.body;
    if (!date || !reason || !item_affected || !department || cost === undefined || time_spent === undefined) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const [result] = await pool.execute(
      'INSERT INTO reworks (date, reason, item_affected, department, cost, time_spent, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [date, reason, item_affected, department, cost, time_spent, notes || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List/filter all reworks
router.get('/', async (req, res) => {
  try {
    // You can add query params for filtering later
    const [rows] = await pool.execute('SELECT * FROM reworks ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics/summary endpoint
router.get('/summary', async (req, res) => {
  try {
    const [totals] = await pool.execute('SELECT COUNT(*) as count, SUM(cost) as total_cost, SUM(time_spent) as total_time FROM reworks');
    const [byDept] = await pool.execute('SELECT department, COUNT(*) as count, SUM(cost) as total_cost FROM reworks GROUP BY department');
    const [byReason] = await pool.execute('SELECT reason, COUNT(*) as count, SUM(cost) as total_cost FROM reworks GROUP BY reason');
    res.json({ totals: totals[0], byDept, byReason });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing rework record
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { date, reason, item_affected, department, cost, time_spent, notes } = req.body;
    console.log('Updating rework:', id, req.body);
    const [result] = await pool.execute(
      'UPDATE reworks SET date=?, reason=?, item_affected=?, department=?, cost=?, time_spent=?, notes=? WHERE id=?',
      [date, reason, item_affected, department, cost, time_spent, notes, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rework not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a rework record
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.execute('DELETE FROM reworks WHERE id=?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rework not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;