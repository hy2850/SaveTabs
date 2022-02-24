import express from 'express';

import {
  categoryModel,
  categoryOrderModel,
  tabModel,
  tabOrderModel,
} from '../schemas';

import type { CategoryOrder, TabOrder } from '../schemas';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categoryList = await categoryModel.find({});
    res.status(200).json(categoryList);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/order', async (req, res, next) => {
  try {
    const categoryOrder: CategoryOrder | null =
      await categoryOrderModel.findOne({});
    console.log(categoryOrder);
    res.status(200).send(categoryOrder?.order);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:catid', async (req, res, next) => {
  try {
    const tabList = await tabModel.find({ categoryId: req.params.catid });
    res.status(200).json(tabList);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router
  .route('/:catid/order')
  .get(async (req, res, next) => {
    try {
      const tabOrder: TabOrder | null = await tabOrderModel.findOne({
        categoryId: req.params.catid,
      });
      res.status(200).json(tabOrder?.order);
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updateRes = await tabOrderModel.updateOne(
        {
          categoryId: req.params.catid,
        },
        {
          order: req.body,
        },
      );
      res.status(200).send(updateRes.acknowledged);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

export default router;
