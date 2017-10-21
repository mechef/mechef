import renderer from 'react-test-renderer';
import React from 'react';

import { AccountPage } from '../AccountPage';


describe('Pages With Snapshot Testing', () => {
  it('snapshot AccountPage Component', () => {
    const component = renderer.create(
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
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});