/* global chrome */
import React, { useState, useEffect } from 'react';

import { Category } from './common/types';
import categoryExample from './data/categoryExample';
import CategoryEntry from './components/Category';

function App() {
  const [categoryInfo, setCategoryInfo] = useState<Category[]>([]);

  useEffect(() => {
    // fetch() // GET /category
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

  return (
    <>
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
    </>
  );
}

export default App;
