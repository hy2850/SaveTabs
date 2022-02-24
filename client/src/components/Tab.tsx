import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { Tab as TabType } from '../common/types';

const TabBox = styled.div`
  border: solid 1px black;
  margin: 10px;
  padding: 3px;
  background-color: white;
`;

export function Tab({
  _id,
  index,
  favIconUrl = '',
  title,
  url,
}: TabType & { index: number }) {
  return (
    <Draggable draggableId={_id} index={index}>
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

// export default Tab;
