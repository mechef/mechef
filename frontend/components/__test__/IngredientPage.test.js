import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import { IngredientPage } from '../IngredientPage';

describe('Pages With Snapshot Testing', () => {
  it('snapshot IngredientPage Component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
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
        setLoading$={() => {}}
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
        t={() => {}}
      />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
