import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styled from 'styled-components';

const TabBox = styled.div`
  border: solid 1px black;
  margin: 10px;
  padding: 3px;
  background-color: white;
`;

interface TabProps {
  index: number;
  id: string | undefined;
  title: string | undefined;
  url: string | undefined;
  favIconUrl: string | undefined;
}

function Tab({ id, index, favIconUrl = '', title, url }: TabProps) {
  return (
    <Draggable draggableId={id!} index={index}>
      {(provided) => (
        <TabBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img src={favIconUrl} alt="X" width="30" height="30" />
          {title}
          <br />
          {url}
        </TabBox>
      )}
    </Draggable>
  );
}

export default Tab;
