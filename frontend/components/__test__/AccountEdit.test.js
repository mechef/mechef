import renderer from 'react-test-renderer';
import React from 'react';

import AccountEdit from '../AccountEdit';

describe('Pages With Snapshot Testing', () => {
  it('snapshot AccountEdit Component', () => {
    const component = renderer.create(
      <AccountEdit
        account={{}}
        goBack={() => {}}
        onUpdateField={() => {}}
        onSubmit={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
