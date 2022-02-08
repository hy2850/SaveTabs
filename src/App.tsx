/* global chrome */
import './App.css';
import React, { useState } from 'react';
import tabData from './data/tabExample';

function App() {
  const [tabInfo, setTabInfo] = useState<chrome.tabs.Tab[]>(tabData);
  // const [tabInfo, setTabInfo] = useState<Array<JSX.Element>>([]);

  console.log('App running - to make index.html');

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
      <ul>
        {tabInfo.map((tab) => {
          return <li>{JSON.stringify(tab)}</li>;
        })}
      </ul>
      <div className="App">Hello React</div>
    </>
  );
}

export default App;
