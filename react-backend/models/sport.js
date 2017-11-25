import mongoose from 'mongoose';

const sportSchema = new mongoose.Schema({
  name: String,
  date: Date,
  duration: Number,
  comments: String,
});

const Sport = mongoose.model('Sport', sportSchema);
export default Sport;
