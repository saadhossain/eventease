import mongoose, { Schema } from 'mongoose';

const eventSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // date: {
  //   type: Date,
  //   required: true,
  // },
  location: {
    type: String,
    required: true,
  },
});

export default mongoose.model('events', eventSchema);
