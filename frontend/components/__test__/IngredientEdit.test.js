import renderer from 'react-test-renderer';
import React from 'react';

import IngredientEdit from '../IngredientEdit';

describe('Pages With Snapshot Testing', () => {
  it('snapshot IngredientEdit Component', () => {
    const component = renderer.create(
      <IngredientEdit
        memos={[
          {
            _id: '59d054c8a70e5b90e75111b8',
            sum: '100',
            name: 'bible memo',
            ingredients: [
              {
                name: 'ingredient2',
                amount: '1234',
              },
            ],
          },
        ]}
        onCreateMemo={() => {}}
        onUpdateMemo={() => {}}
        onDeleteMemo={() => {}}
        goBack={() => {}}
        currentMemoId="59d054c8a70e5b90e75111b8"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
