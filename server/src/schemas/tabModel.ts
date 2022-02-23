import { Schema, model, Types } from 'mongoose';

const {
  Types: { ObjectId },
} = Schema;

export interface Tab {
  categoryId: Types.ObjectId;
  title?: string;
  url: string;
  favIconUrl?: string;
  createdAt: Date;
}

const tabSchema = new Schema<Tab>({
  categoryId: {
    type: ObjectId,
    required: true,
    ref: 'Category',
  },
  title: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  favIconUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const tabModel = model<Tab>('Tab', tabSchema);
