import renderer from 'react-test-renderer';
import React from 'react';

import AccountDetail from '../AccountDetail';


describe('Pages With Snapshot Testing', () => {
  it('snapshot AccountDetail Component', () => {
    const component = renderer.create(
      <AccountDetail
        account={{
          name: 'bible',
        }}
        onUpdateAccount={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
