import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sportSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  date: Date,
  duration: Number,
  comments: String
});

const Sport = mongoose.model('Sport', sportSchema);
export default Sport;
