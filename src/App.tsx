/* global chrome */
import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Category } from './common/types';
import categoryExample from './data/categoryExample';
import CategoryEntry from './components/Category';

function App() {
  const [categoryInfo, setCategoryInfo] = useState<Category[]>([]);

  useEffect(() => {
    // fetch() // GET /category
    setCategoryInfo(categoryExample);
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
    const srcColumn = categoryInfo.find(({ id }) => {
      return id === source.droppableId;
    });
    const destColumn = categoryInfo.find(({ id }) => {
      return id === destination.droppableId;
    });

    if (!srcColumn || !destColumn) return; // null check
    const movedTab: chrome.tabs.Tab = srcColumn.tabs.splice(source.index, 1)[0];
    destColumn.tabs.splice(destination.index, 0, movedTab);
    // 'Array.find' returns reference, so changing order is reflected

    setCategoryInfo(categoryInfo); // notify React of updates
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {categoryExample.map((cat, idx) => {
        return (
          <CategoryEntry
            key={cat.id}
            id={cat.id}
            name={cat.name}
            tabs={cat.tabs}
          />
        );
      })}
    </DragDropContext>
  );
}

export default App;
