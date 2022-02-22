import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { Category as CategoryProps } from '../common/types';
import TabEntry from './Tab';

const CategoryBox = styled.div`
  border: solid 3px red;
  margin: 10px;
`;

const TabList = styled.div``;
const Header = styled.h1`
  margin: 10px;
`;

function Category({ id, name, tabs }: CategoryProps) {
  return (
    <CategoryBox>
      <Droppable droppableId={id}>
        {(provided) => (
          <TabList ref={provided.innerRef} {...provided.droppableProps}>
            {tabs.map((tab, idx) => {
              return (
                <TabEntry
                  key={tab.id}
                  id={tab.id?.toString()}
                  favIconUrl={tab.favIconUrl}
                  title={tab.title}
                  url={tab.url}
                  index={idx}
                />
              );
            })}
            {provided.placeholder}
          </TabList>
        )}
      </Droppable>
    </CategoryBox>
  );
}

export default Category;
