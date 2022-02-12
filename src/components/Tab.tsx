import React from 'react';

import styled from 'styled-components';

const TabBox = styled.div`
  border: solid 1px black;
  margin: 10px;
  padding: 3px;
`;

interface TabProps {
  favIconUrl: string | undefined;
  title: string | undefined;
  url: string | undefined;
}

function Tab({ favIconUrl, title, url }: TabProps) {
  return (
    <TabBox>
      <img src={favIconUrl} alt="X" width="30" height="30" />
      {title}
      <br />
      {url}
    </TabBox>
  );
}

export default Tab;
