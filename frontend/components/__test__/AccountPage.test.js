import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import { AccountPage } from '../AccountPage';

describe('Pages With Snapshot Testing', () => {
  it('snapshot AccountPage Component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <AccountPage
        account={{}}
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
        fetchAccountDetail$={() => {}}
        updateAccountDetail$={() => {}}
        setField$={() => {}}
        setError$={() => {}}
        toggleBackArrow$={() => {}}
        t={() => {}}
      />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
