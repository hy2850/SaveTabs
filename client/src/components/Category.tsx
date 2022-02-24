import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import {
  Category as CategoryType,
  Tab as TabType,
  CategoryWithTabs as CategoryProps,
} from '../common/types';
import { Tab } from './Tab';

const CategoryBox = styled.div`
  border: solid 3px red;
  margin: 10px;
`;

const TabList = styled.div``;
const Header = styled.h1`
  margin: 10px;
`;

export function Category({ _id, name, tabs }: CategoryProps) {
  return (
    <CategoryBox>
      <Header>{name}</Header>
      <Droppable droppableId={_id}>
        {(provided) => (
          <TabList ref={provided.innerRef} {...provided.droppableProps}>
            {tabs.map((tab, idx) => {
              return (
                <Tab
                  key={tab._id}
                  index={idx}
                  _id={tab._id}
                  favIconUrl={tab.favIconUrl}
                  title={tab.title}
                  url={tab.url}
                  createdAt={tab.createdAt}
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

// export default Category;
