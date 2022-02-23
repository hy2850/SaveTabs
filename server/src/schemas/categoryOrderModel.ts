import { Schema, model, Types } from 'mongoose';

const {
  Types: { ObjectId },
} = Schema;

export interface CategoryOrder {
  order?: Types.ObjectId[];
}

const categoryOrderSchema = new Schema<CategoryOrder>({
  order: {
    type: [ObjectId],
    default: [],
  },
});

export const categoryOrderModel = model<CategoryOrder>(
  'CategoryOrder',
  categoryOrderSchema,
);
