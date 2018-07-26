import renderer from 'react-test-renderer';
import React from 'react';

import { IngredientPage } from '../IngredientPage';

describe('Pages With Snapshot Testing', () => {
  it('snapshot IngredientPage Component', () => {
    const component = renderer.create(
      <IngredientPage
        ingredient={{
          memos: [
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
          ],
          currentMemoId: '59d054c8a70e5b90e75111b8',
        }}
        fetchMemos$={() => {}}
        createMemo$={() => {}}
        updateMemo$={() => {}}
        deleteMemo$={() => {}}
        setCurrentMemoId$={() => {}}
        setError$={() => {}}
        toggleBackArrow$={() => {}}
        error={{
          title: '',
          message: '',
          isShowModal: false,
        }}
        global={{
          backArrow: {
            isShow: false,
            title: '',
          },
        }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
