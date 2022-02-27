/* global chrome */
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import axios from 'axios';
import { updateTabOrder, orderArrById } from './common/helper';

import {
  Category as CategoryType,
  Tab as TabType,
  CategoryWithTabs,
} from './common/types';
// import categoryExample from './data/categoryExample';
import { Category } from './components/Category';

function App() {
  const [categoryInfo, setCategoryInfo] = useState<CategoryWithTabs[]>([]);
  // const [isSidebarLoading, setIsSideBarLoading] = useState<boolean>(false);
  // const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      // GET /category
      const fetchResult = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/category`,
      );
      const unorderedCategoryList: CategoryType[] = fetchResult.data;

      console.log('GET /category :', unorderedCategoryList);

      // const categoryList: CategoryType[] = Array(unorderedCategoryList.length);
      const categoryList: CategoryType[] = unorderedCategoryList;

      // GET /category/:catid/order
      // @TODO

      const tabsPromiseList = categoryList.map((cat) => {
        return axios.get(
          `${process.env.REACT_APP_SERVER_URL}/category/${cat._id}`,
        );
      });
      const tabOrderPromiseList = categoryList.map((cat) => {
        return axios.get(
          `${process.env.REACT_APP_SERVER_URL}/category/${cat._id}/order`,
        );
      });

      const tabFetchResults = await Promise.all(tabsPromiseList);
      const tabOrderFetchResults = await Promise.all(tabOrderPromiseList);

      const res: CategoryWithTabs[] = [];
      for (let idx = 0; idx < tabFetchResults.length; idx += 1) {
        const orderedTabs = orderArrById(
          tabFetchResults[idx].data,
          tabOrderFetchResults[idx].data,
        );
        console.log(orderedTabs);
        res.push({ ...categoryList[idx], tabs: orderedTabs });
      }

      // const res: CategoryWithTabs[] = tabFetchResults.map((fetchRes, idx) => {
      //   return { ...categoryList[idx], tabs: fetchRes.data };
      // });

      console.log('set category info :', res);
      setCategoryInfo(res);
    };
    fetchData();
  }, []);

  // // Only works on extensions
  // chrome.tabs.query(
  //   { windowId: chrome.windows.WINDOW_ID_CURRENT },
  //   (tabArr) => {
  //     console.log(tabArr);

  //     // eslint-disable-next-line react/no-array-index-key
  //     setTabInfo(tabArr.map((tab, idx) => <li key={idx}>{tab.title}</li>));
  //   },
  // );

  // synchronously update your state to reflect the drag and drop result.
  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;

    // Dropped outside the droppable
    if (!destination) {
      return;
    }

    // Did nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // find object that has corresponding 'id' in an array of objs
    const srcColumn = categoryInfo.find(({ _id: id }) => {
      return id === source.droppableId;
    });
    const destColumn = categoryInfo.find(({ _id: id }) => {
      return id === destination.droppableId;
    });

    if (!srcColumn || !destColumn) return; // null check
    const movedTab: TabType = srcColumn.tabs.splice(source.index, 1)[0];
    destColumn.tabs.splice(destination.index, 0, movedTab);
    // 'Array.find' returns reference, so changing order is reflected

    setCategoryInfo(categoryInfo); // notify React of updates

    updateTabOrder(source, destination)
      .then((res) => {})
      .catch((err) => {
        console.error(err); // Fix) Replace with winston
      });
  };

  // const onDragEnd = () => {
  //   console.log('Drag successful!');
  // };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {categoryInfo.map((cat: CategoryWithTabs) => {
        return (
          <Category
            key={cat._id}
            _id={cat._id}
            name={cat.name}
            tabs={cat.tabs}
            tags={cat.tags}
          />
        );
      })}
    </DragDropContext>
  );
}

export default App;
