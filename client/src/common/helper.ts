import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DraggableLocation } from 'react-beautiful-dnd';

export async function updateTabOrder(
  src: DraggableLocation,
  dest: DraggableLocation,
): Promise<boolean> {
  // is moving tab within the same category
  const withinSame: boolean = src.droppableId === dest.droppableId;

  // Get order info from DB
  const srcCatTabOrder: string[] = (
    await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/category/${src.droppableId}/order`,
    )
  ).data;

  const destCatTabOrder: string[] = withinSame
    ? srcCatTabOrder // aliasing
    : (
        await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/category/${dest.droppableId}/order`,
        )
      ).data;

  // Update array
  const movedTabId: string = srcCatTabOrder.splice(src.index, 1)[0];
  destCatTabOrder.splice(dest.index, 0, movedTabId);

  // Reflect changes to DB
  // 1. Same category
  await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/category/${dest.droppableId}/order`,
    destCatTabOrder,
  );

  // 2. Diff categories
  if (src.droppableId !== dest.droppableId) {
    await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/category/${src.droppableId}/order`,
      srcCatTabOrder,
    );

    // Change 'categoryId' of Tab model to new destination category
    // @TODO
  }
  return true;
}

export function orderArrById(arr: any[], idArr: string[]): any[] {
  // const orderedArr = Array(arr.length); // dummy
  console.log('helper : ', arr, idArr);
  return idArr.map((id, idx) => {
    return arr.find(({ _id }) => {
      return _id === idArr[idx];
    });
    // @TODO undefined 에러 처리
  });
}
