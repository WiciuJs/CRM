const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const actionRoutes = require('./routes/actionRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://192.0.0.1:27017/crm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.use('/api/customers', customerRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api', authRoutes);
app.use((req, res) => {
  res.status(404).json({ message: 'Nie znaleziono' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Wystąpił błąd serwera' });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
