import renderer from 'react-test-renderer';
import React from 'react';

import Dashboard from '../dashboard';

describe('Pages With Snapshot Testing', () => {
  it('snapshot dashboard page', () => {
    const component = renderer.create(
      <Dashboard
        url={{
          query: {
            page: 'menu',
          },
        }}
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
