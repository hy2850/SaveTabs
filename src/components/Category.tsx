import React from 'react';
import styled from 'styled-components';
import { Category as CategoryProps } from '../common/types';
import TabEntry from './Tab';

const CategoryBox = styled.div`
  border: solid 3px red;
  margin: 10px;
`;

function Category({ id, name, tabs }: CategoryProps) {
  return (
    <CategoryBox>
      {tabs.map((tab, idx) => {
        return (
          <TabEntry
            key={tab.id}
            favIconUrl={tab.favIconUrl}
            title={tab.title}
            url={tab.url}
          />
        );
      })}
    </CategoryBox>
  );
}

export default Category;
