import { Schema, model } from 'mongoose';

export interface Category {
  name: string;
  tags?: string[];
}

const categorySchema = new Schema<Category>({
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
});

export const categoryModel = model<Category>('Category', categorySchema);
