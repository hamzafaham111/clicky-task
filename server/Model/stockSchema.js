const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    variant: {
    type: String,
    required: true
  },
  stock: {
    type: String,
    required: true,
  },
});
const Stocks = mongoose.model('Stocks', StockSchema);
module.exports = Stocks;
