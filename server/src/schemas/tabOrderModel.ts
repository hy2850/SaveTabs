import { Schema, model, Types } from 'mongoose';

const {
  Types: { ObjectId },
} = Schema;

export interface TabOrder {
  categoryId: Types.ObjectId;
  order: Types.ObjectId[];
}

const tabOrderSchema = new Schema<TabOrder>({
  categoryId: {
    type: ObjectId,
    required: true,
    ref: 'Category',
  },
  order: {
    type: [ObjectId],
    default: [],
  },
});

export const tabOrderModel = model<TabOrder>('TabOrder', tabOrderSchema);
