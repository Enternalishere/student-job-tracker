const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: { type: String, enum: ['Applied', 'Interview', 'Offer', 'Rejected'] },
  appliedDate: { type: Date, default: Date.now },
  link: String,
});
module.exports = mongoose.model('Job', jobSchema);
