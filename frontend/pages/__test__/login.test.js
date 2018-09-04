import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';

import Login from '../login';

describe('Pages With Snapshot Testing', () => {
  it('snapshot login page', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Login />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
