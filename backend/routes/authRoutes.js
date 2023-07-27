const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const token = 'example-token';
  res.json({ token });
});

module.exports = router;
