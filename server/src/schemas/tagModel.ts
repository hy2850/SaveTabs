// @deprecated
import mongoose from 'mongoose';

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const tagSchema = new Schema({
  category: {
    type: ObjectId,
    required: true,
    ref: 'Category',
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Tag', tagSchema);
