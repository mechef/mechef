import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import IngredientEdit from '../IngredientEdit';

describe('Pages With Snapshot Testing', () => {
  it('snapshot IngredientEdit Component', () => {
    const renderer = new ShallowRenderer();
    const component = renderer.render(
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
        displayMemo={{
          _id: '59d054c8a70e5b90e75111b8',
          sum: '100',
          name: 'bible memo',
          ingredients: [
            {
              name: 'ingredient2',
              amount: '1234',
            },
          ],
        }}
        onCreateMemo={() => {}}
        onUpdateMemo={() => {}}
        onDeleteMemo={() => {}}
        setLoading$={() => {}}
        goBack={() => {}}
        t={() => {}}
        currentMemoId="59d054c8a70e5b90e75111b8"
      />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
