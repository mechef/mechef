import renderer from 'react-test-renderer';
import React from 'react';

import IngredientList from '../IngredientList';


describe('Pages With Snapshot Testing', () => {
  it('snapshot IngredientList Component', () => {
    const component = renderer.create(
      <IngredientList
        memos={[{
          sum: '100',
          name: 'bible memo',
          ingredients: [
            {
              name: 'ingredient2',
              amount: '1234',
            },
          ],
        }]}
        onEditMemo$={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
