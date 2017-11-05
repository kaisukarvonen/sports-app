import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sportSchema = new Schema({
  name: String,
  date: Date,
  duration: Number,
  comments: String,
});

const Sport = mongoose.model('Sport', sportSchema);
export default Sport;
