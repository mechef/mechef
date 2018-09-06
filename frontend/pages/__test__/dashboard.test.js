import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import Dashboard from '../dashboard';
jest.mock('react-geosuggest', () => '[MOCK]Geosuggest');
describe('Pages With Snapshot Testing', () => {
  it('snapshot dashboard page', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Dashboard
        router={{
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
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
