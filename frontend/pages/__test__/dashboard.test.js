import renderer from 'react-test-renderer';
import React from 'react';

import Dashboard from '../dashboard';

describe('Pages With Snapshot Testing', () => {
  it('snapshot dashboard page', () => {
    const component = renderer.create(
      <Dashboard
        asPath="/dashboard/home"
        global={{
          backArrow: {
            isShow: false,
            title: '',
          },
        }}
        toggleBackArrow$={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
