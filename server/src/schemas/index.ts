import mongoose from 'mongoose';

export { categoryModel } from './categoryModel';
export type { Category } from './categoryModel';
export { categoryOrderModel } from './categoryOrderModel';
export type { CategoryOrder } from './categoryOrderModel';
export { tabModel } from './tabModel';
export type { Tab } from './tabModel';
export { tabOrderModel } from './tabOrderModel';
export type { TabOrder } from './tabOrderModel';
// import tagModel from './tag';

// const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
// const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;
const MONGO_URL = 'mongodb://localhost:27017/admin';

const mongoDBConnect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.connect(
    MONGO_URL,
    {
      dbName: 'saveTabs',
    },
    (error) => {
      if (error) {
        console.log('MongoDB connection error', error);
      } else {
        console.log('MongoDB connected');
      }
    },
  );
};

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected: re-establishing connection');
  mongoDBConnect();
});

export { mongoDBConnect };
